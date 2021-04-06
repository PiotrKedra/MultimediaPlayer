import React, { useState, useRef } from 'react';
import {
  View, StyleSheet, StatusBar, Image, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import {
  BACK, DELETE, FAVORITE, FAVORITE_FILLED,
} from '../../assets/values/images';
import Text from '../custom-components/Text';
import { refreshMedia } from '../redux/media/media.actions';
import { WHITE } from '../../assets/values/colors';
import {
  ICON_SIZE, STD_MARGIN,
} from '../../assets/values/dimensions';
import MediaController from './MediaController';

const VideoDetailScreen = ({ route, navigation, refreshMediaGrid }) => {
  const { video } = route.params;
  const [isFavorite, setIsFavorite] = useState(video.favorite);
  const player = useRef(null);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0.0);
  const [videoTime, setVideoTime] = useState(0.0);
  const [progress, setProgress] = useState(0.0);
  const [seeking, setSeeking] = useState(false);
  const [speedRate, setSpeedRate] = useState(1.0);

  const stopVideo = () => {
    setPaused(!paused);
  };

  const moveForward = () => {
    if (player.current === null) return;
    if (currentTime + 5 > videoTime) {
      player.current.seek(videoTime);
      setCurrentTime(videoTime);
    } else {
      player.current.seek(currentTime + 5);
      setCurrentTime(currentTime + 5);
    }
  };

  const moveBackward = () => {
    if (player.current === null) return;
    if (currentTime < 5) {
      player.current.seek(0);
      setCurrentTime(0);
    } else {
      player.current.seek(currentTime - 5);
      setCurrentTime(currentTime - 5);
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
      <Video
        ref={player}
        source={video.path}
        style={styles.backgroundVideo}
        resizeMode="cover"
        paused={paused}
        repeat
        rate={speedRate}
        onProgress={(data) => setTimes(data)}
      />

      <MediaController
        paused={paused}
        progress={progress}
        currentTime={currentTime}
        videoTime={videoTime}
        moveBackward={() => moveBackward()}
        moveForward={() => moveForward()}
        stopVideo={() => stopVideo()}
        startSeeking={() => setSeeking(true)}
        seekToExactTime={(value) => seekToExactTime(value)}
        setSpeedRate={(value) => setSpeedRate(value)}
        speedRate={speedRate}
      />

      <View style={styles.topContainer}>
        <View style={styles.topRightContainer}>
          {
            isFavorite === false ? (
              <TouchableOpacity
                onPress={() => {
                  // addToFavorite(img.name);
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
                  // removeFromFavorite(img.name);
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
              // deleteImg(img);
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Image
            source={BACK}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.nameText}>{video.name}</Text>
      </View>
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
    top: STD_MARGIN,
    left: 0,
    paddingTop: STD_MARGIN,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  nameText: { fontSize: 15, marginLeft: STD_MARGIN },
  topRightContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: STD_MARGIN,
    flexDirection: 'row',
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginLeft: STD_MARGIN,
  },
});

const mapDispatchToProps = (dispatch) => ({
  refreshMediaGrid: () => dispatch(refreshMedia()),
});

export default connect(null, mapDispatchToProps)(VideoDetailScreen);
