import React, { useState, useRef } from 'react';
import {
  View, StyleSheet, StatusBar, Image, TouchableOpacity, Pressable,
} from 'react-native';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import {
  BACK, DELETE, FAVORITE, FAVORITE_FILLED, PAUSE_PLAYER, PLAY_PLAYER,
} from '../../assets/values/images';
import Text from '../custom-components/Text';
import { refreshMedia } from '../redux/media/media.actions';
import { BLACK, SECONDARY_TEXT, WHITE } from '../../assets/values/colors';
import { ICON_SIZE, SMALL_BORDER_WIDTH, STD_MARGIN } from '../../assets/values/dimensions';

const VideoDetailScreen = ({ route, navigation, refreshMediaGrid }) => {
  const { video } = route.params;
  const [isFavorite, setIsFavorite] = useState(video.favorite);
  const player = useRef(null);
  const [paused, setPaused] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);

  const stopVideo = () => {
    setPaused(!paused);
  };

  const mapTime = (time) => `0:0${Math.floor(time)}`;

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Video
        ref={player}
        source={video.path}
        style={styles.backgroundVideo}
        resizeMode="cover"
        paused={paused}
        onProgress={(data) => setRemainingTime(data.seekableDuration - data.currentTime)}
      />

      <View style={styles.playerControl}>
        <Pressable onPress={() => stopVideo()}>
          {
            paused === true
              ? <Image source={PLAY_PLAYER} style={styles.playerIcon} />
              : <Image source={PAUSE_PLAYER} style={styles.playerIcon} />
          }
        </Pressable>
        <View style={{
          marginHorizontal: STD_MARGIN, width: '70%', height: 6, borderRadius: 3, backgroundColor: SECONDARY_TEXT,
        }}
        />
        <Text>{mapTime(remainingTime)}</Text>
      </View>

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
  playerIcon: { width: ICON_SIZE, height: ICON_SIZE },
  playerControl: {
    position: 'absolute', left: 0, bottom: 0, width: '100%', flexDirection: 'row', padding: STD_MARGIN, alignItems: 'center',
  },
  playPauseButton: {
    width: 60, height: 60, borderRadius: 30, borderColor: BLACK, borderWidth: SMALL_BORDER_WIDTH,
  },
});

const mapDispatchToProps = (dispatch) => ({
  refreshMediaGrid: () => dispatch(refreshMedia()),
});

export default connect(null, mapDispatchToProps)(VideoDetailScreen);
