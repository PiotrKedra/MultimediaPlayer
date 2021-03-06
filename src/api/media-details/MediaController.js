import React from 'react';
import {
  StyleSheet, Pressable, Image, TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import {
  BACKWARD, FORWARD, PAUSE_PLAYER, PLAY_PLAYER,
} from '../../assets/values/images';
import {
  BLACK, PRIMARY, WHITE_GRADIENT_END, WHITE_GRADIENT_START,
} from '../../assets/values/colors';
import Text from '../custom-components/Text';
import {
  ICON_SIZE, LARGE_MARGIN, SMALL_ICON_SIZE, STD_MARGIN, TINY_MARGIN,
} from '../../assets/values/dimensions';

const NORMAL_SPEED_RATE = 1.0;
const SPEED_RATE_1_5 = 1.5;
const SPEED_RATE_2_0 = 2.0;

const MediaController = ({
  playOrResumeVideo,
  paused,
  moveBackward,
  moveForward,
  progress,
  startSeeking,
  seekToExactTime,
  videoTime,
  currentTime,
  setSpeedRate,
  speedRate,
}) => {
  const mapTime = (time) => {
    if (Math.round(time) < 10) {
      return `0:0${Math.round(time)}`;
    }
    return `0:${Math.round(time)}`;
  };

  const changeSpeedRate = () => {
    switch (speedRate) {
      case NORMAL_SPEED_RATE:
        setSpeedRate(SPEED_RATE_1_5);
        return;
      case SPEED_RATE_1_5:
        setSpeedRate(SPEED_RATE_2_0);
        return;
      default:
        setSpeedRate(NORMAL_SPEED_RATE);
    }
  };

  return (
    <LinearGradient
      colors={[WHITE_GRADIENT_START, WHITE_GRADIENT_END]}
      style={styles.playerControl}
    >
      <Pressable style={styles.itemContainer} onPress={() => moveBackward()}>
        <Image source={BACKWARD} style={styles.moveTimeIcon} />
      </Pressable>
      <Pressable style={styles.itemContainer} onPress={() => moveForward()}>
        <Image source={FORWARD} style={styles.moveTimeIcon} />
      </Pressable>
      <Pressable style={styles.itemContainer} onPress={() => playOrResumeVideo()}>
        {
          paused === true
            ? <Image source={PLAY_PLAYER} style={styles.playerIcon} />
            : <Image source={PAUSE_PLAYER} style={styles.playerIcon} />
        }
      </Pressable>
      <Slider
        value={progress}
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        thumbTintColor={PRIMARY}
        minimumTrackTintColor={PRIMARY}
        maximumTrackTintColor={BLACK}
        onSlidingStart={() => startSeeking()}
        onSlidingComplete={(value) => seekToExactTime(value)}
      />
      <Text style={styles.itemContainer}>{mapTime(videoTime - currentTime)}</Text>
      <TouchableOpacity style={styles.speedRateContainer} onPress={() => changeSpeedRate()}>
        <Text numberOfLines={1} style={styles.speedRate}>{`${speedRate}x`}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  playerControl: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    padding: STD_MARGIN,
    paddingTop: 2 * LARGE_MARGIN,
    alignItems: 'center',
    // backgroundColor: 'rgba(255,255,255,0.2)',
  },
  moveTimeIcon: { width: SMALL_ICON_SIZE, height: SMALL_ICON_SIZE, marginRight: TINY_MARGIN },
  icon: { width: ICON_SIZE, height: ICON_SIZE, marginLeft: STD_MARGIN },
  playerIcon: { width: SMALL_ICON_SIZE, height: SMALL_ICON_SIZE, marginLeft: TINY_MARGIN },
  itemContainer: { flex: 1 },
  slider: { flex: 4 },
  speedRateContainer: { flex: 1, alignItems: 'flex-end' },
  speedRate: { fontFamily: 'Comfortaa-Bold', fontSize: 18 },
});

export default MediaController;
