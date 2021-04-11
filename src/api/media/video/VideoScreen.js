import React, { useRef, useState } from 'react';
import {
  Image, StatusBar, StyleSheet, Pressable, TouchableOpacity, BackHandler,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {
  BACK, PLAY, RECORD_ON, STOP,
} from '../../../assets/values/images';
import {
  BORDER_WIDTH, CAMERA_BUTTON_SIZE, ICON_SIZE, LARGE_MARGIN, RECORD_ICON, STD_MARGIN, TINY_MARGIN,
} from '../../../assets/values/dimensions';
import { BLACK, WHITE_GRADIENT_END, WHITE_GRADIENT_START } from '../../../assets/values/colors';
import { refreshMedia } from '../../redux/media/media.actions';
import { saveVideo } from '../../storage/videoStorage';

const VideoScreen = ({ navigation, refreshMediaGrid }) => {
  const camera = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const backAction = () => {
    refreshMediaGrid();
  };

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => backAction());
    return () => backHandler.remove();
  }, []);

  const startRecording = async () => {
    setIsRecording(true);
    const options = { maxDuration: 60 };
    const video = await camera.current.recordAsync(options);
    const videoObject = await saveVideo(video.uri);
    navigation.navigate('VideoDetailScreen', { video: videoObject });
  };

  const stopRecording = () => {
    camera.current.stopRecording();
    setIsRecording(false);
  };

  return (
    <RNCamera
      ref={camera}
      orientation="up"
      type={RNCamera.Constants.Type.back}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      style={styles.container}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <LinearGradient
        colors={[WHITE_GRADIENT_END, WHITE_GRADIENT_START]}
        style={styles.topContainer}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
            refreshMediaGrid();
          }}
        >
          <Image
            source={BACK}
            style={styles.icon}
          />
        </TouchableOpacity>
      </LinearGradient>
      {
        isRecording
        && (
          <Image
            source={RECORD_ON}
            style={styles.recordIcon}
          />
        )
      }
      {
        isRecording === true
          ? (
            <Pressable
              onPress={() => stopRecording()}
              style={styles.button}
            >
              <Image
                source={STOP}
                style={styles.icon}
              />
            </Pressable>
          )
          : (
            <Pressable
              onPress={() => startRecording()}
              style={styles.button}
            >
              <Image
                source={PLAY}
                style={styles.playIcon}
              />
            </Pressable>
          )
      }

    </RNCamera>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'flex-end',
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
  button: {
    width: CAMERA_BUTTON_SIZE,
    height: CAMERA_BUTTON_SIZE,
    borderRadius: CAMERA_BUTTON_SIZE / 2,
    borderColor: BLACK,
    borderWidth: BORDER_WIDTH,
    marginBottom: LARGE_MARGIN,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE_GRADIENT_END,
  },
  backButton: {
    position: 'absolute', top: STD_MARGIN, left: STD_MARGIN, paddingTop: STD_MARGIN,
  },
  playIcon: { width: ICON_SIZE, height: ICON_SIZE, marginLeft: TINY_MARGIN },
  icon: { width: ICON_SIZE, height: ICON_SIZE },
  recordIcon: {
    width: RECORD_ICON, height: RECORD_ICON, position: 'absolute', top: LARGE_MARGIN, right: STD_MARGIN,
  },
});

const mapDispatchToProps = (dispatch) => ({
  refreshMediaGrid: () => dispatch(refreshMedia()),
});

export default connect(null, mapDispatchToProps)(VideoScreen);
