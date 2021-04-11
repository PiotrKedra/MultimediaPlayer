import React, { useState, useRef } from 'react';
import {
  View, StyleSheet, StatusBar, Image, TouchableOpacity, ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import HeadphoneDetection from 'react-native-headphone-detection';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {
  BACK, DELETE, FAVORITE, FAVORITE_FILLED, TAG,
} from '../../assets/values/images';
import Text from '../custom-components/Text';
import { refreshMedia } from '../redux/media/media.actions';
import {
  BLACK, PRIMARY, WHITE, WHITE_GRADIENT_END, WHITE_GRADIENT_START,
} from '../../assets/values/colors';
import {
  BORDER_RADIUS,
  ICON_SIZE, LARGE_MARGIN, SMALL_MARGIN, STD_MARGIN, TINY_MARGIN,
} from '../../assets/values/dimensions';
import MediaController from './MediaController';
import { addToFavorite, removeFromFavorite } from '../storage/favoriteStorage';
import { deleteMedia } from '../storage/mediaStorage';
import { AUDIO_TYPE, VIDEO_TYPE } from '../storage/mediaConsts';
import AudioPlayerAnimation from './AudioPlayerAnimation';
import { getTagsForMedia, removeTagFromMedia } from '../storage/tagStorage';
import AttachTagToMediaModal from './AttachTagToMediaModal';
import { TAG_REMOVED } from '../../assets/values/strings';

const SEEK_TIME = 5;

const PlayerDetailScreen = ({ route, navigation, refreshMediaGrid }) => {
  const mediaObject = route.params.video;
  const [isFavorite, setIsFavorite] = useState(mediaObject.favorite);
  const player = useRef(null);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0.0);
  const [videoTime, setVideoTime] = useState(0.0);
  const [progress, setProgress] = useState(0.0);
  const [seeking, setSeeking] = useState(false);
  const [speedRate, setSpeedRate] = useState(1.0);
  const [isAddTagModal, setIsTagModal] = useState(false);
  const [tags, setTags] = useState([]);

  React.useEffect(() => {
    const listener = HeadphoneDetection.addListener(() => setPaused(true));
    getTagsForMedia(mediaObject.name).then((t) => setTags(t));
    return () => {
      listener.remove();
    };
  }, []);

  React.useEffect(() => {
    getTagsForMedia(mediaObject.name).then((t) => setTags(t));
  }, [isAddTagModal]);

  const playOrResumeVideo = () => {
    setPaused(!paused);
  };

  const moveForward = () => {
    if (player.current === null) return;
    if (currentTime + SEEK_TIME > videoTime) {
      player.current.seek(videoTime);
      setCurrentTime(videoTime);
    } else {
      player.current.seek(currentTime + SEEK_TIME);
      setCurrentTime(currentTime + SEEK_TIME);
    }
  };

  const moveBackward = () => {
    if (player.current === null) return;
    if (currentTime < SEEK_TIME) {
      player.current.seek(0);
      setCurrentTime(0);
    } else {
      player.current.seek(currentTime - SEEK_TIME);
      setCurrentTime(currentTime - SEEK_TIME);
    }
  };

  const seekToExactTime = (value) => {
    player.current.seek(value * videoTime);
    setCurrentTime(value * videoTime);
    setProgress(value);
    setTimeout(() => setSeeking(false), 200);
  };

  function setTimes(data) {
    if (seeking === false) {
      setProgress(data.currentTime / data.seekableDuration);
    }
    setCurrentTime(data.currentTime);
    setVideoTime(data.seekableDuration);
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      {
        mediaObject.type === VIDEO_TYPE
        && (
          <Video
            ref={player}
            source={mediaObject.path}
            style={styles.backgroundVideo}
            resizeMode="cover"
            paused={paused}
            repeat
            rate={speedRate}
            onProgress={(data) => setTimes(data)}
          />
        )
      }
      {
        mediaObject.type === AUDIO_TYPE
        && (
          <>
            <Video
              ref={player}
              source={mediaObject.path}
              paused={paused}
              repeat
              rate={speedRate}
              onProgress={(data) => setTimes(data)}
            />
            <AudioPlayerAnimation isPlaying={!paused} speed={speedRate} />
          </>
        )
      }

      <MediaController
        paused={paused}
        progress={progress}
        currentTime={currentTime}
        videoTime={videoTime}
        moveBackward={() => moveBackward()}
        moveForward={() => moveForward()}
        playOrResumeVideo={() => playOrResumeVideo()}
        startSeeking={() => setSeeking(true)}
        seekToExactTime={(value) => seekToExactTime(value)}
        setSpeedRate={(value) => setSpeedRate(value)}
        speedRate={speedRate}
      />

      <LinearGradient
        colors={[WHITE_GRADIENT_END, WHITE_GRADIENT_START]}
        style={styles.topContainer}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Image
            source={BACK}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.nameText}>{mediaObject.name}</Text>
        <View style={styles.topRightContainer}>
          <View style={styles.topRightContainerUpper}>
            <TouchableOpacity
              disabled={tags.length === 3}
              onPress={() => setIsTagModal(true)}
            >
              <Image
                source={TAG}
                style={styles.icon}
              />
            </TouchableOpacity>
            {
              isFavorite === false ? (
                <TouchableOpacity
                  onPress={() => {
                    addToFavorite(mediaObject.name, mediaObject.type);
                    refreshMediaGrid();
                    setIsFavorite(true);
                  }}
                >
                  <Image
                    source={FAVORITE}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    removeFromFavorite(mediaObject.name, mediaObject.type);
                    refreshMediaGrid();
                    setIsFavorite(false);
                  }}
                >
                  <Image
                    source={FAVORITE_FILLED}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              )
            }

            <TouchableOpacity
              onPress={() => {
                deleteMedia(mediaObject);
                refreshMediaGrid();
                navigation.goBack();
              }}
            >
              <Image
                source={DELETE}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.topRightContainerUpper}>
            {
              tags.map((t) => (
                <Pressable
                  style={styles.tagContainer}
                  key={t}
                  onLongPress={() => removeTagFromMedia(mediaObject.name, t)
                    .then(() => getTagsForMedia(mediaObject.name))
                    .then((updatedTags) => {
                      setTags(updatedTags);
                      ToastAndroid.show(TAG_REMOVED, ToastAndroid.SHORT);
                    })}
                >
                  <Text style={styles.tagText}>{t}</Text>
                </Pressable>
              ))
            }
          </View>
        </View>
      </LinearGradient>

      {
        isAddTagModal
        && (
        <AttachTagToMediaModal
          mediaName={mediaObject.name}
          close={() => setIsTagModal(false)}
        />
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  topContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: 2 * STD_MARGIN,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 2 * LARGE_MARGIN,
  },
  nameText: { fontSize: 12, marginLeft: STD_MARGIN },
  topRightContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: STD_MARGIN,
    paddingTop: 2 * STD_MARGIN,
  },
  topRightContainerUpper: { flexDirection: 'row', justifyContent: 'flex-end' },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginLeft: STD_MARGIN,
  },
  tagContainer: {
    marginTop: SMALL_MARGIN,
    paddingHorizontal: STD_MARGIN,
    backgroundColor: PRIMARY,
    opacity: 0.7,
    marginBottom: TINY_MARGIN,
    marginRight: TINY_MARGIN,
    borderRadius: BORDER_RADIUS,
    shadowColor: BLACK,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
  },
  tagText: { fontSize: 13 },
});

const mapDispatchToProps = (dispatch) => ({
  refreshMediaGrid: () => dispatch(refreshMedia()),
});

export default connect(null, mapDispatchToProps)(PlayerDetailScreen);
