import React, { useRef, useState } from 'react';
import {
  Image, StatusBar, StyleSheet, Pressable, TouchableOpacity,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import {
  BACK, PLAY, RECORD_ON, STOP,
} from '../../assets/values/images';
import {
  BORDER_WIDTH, CAMERA_BUTTON_SIZE, ICON_SIZE, LARGE_MARGIN, RECORD_ICON, STD_MARGIN, TINY_MARGIN,
} from '../../assets/values/dimensions';
import { BLACK } from '../../assets/values/colors';
import { refreshMedia } from '../redux/media/media.actions';
import { saveVideo } from '../storage/videoStorage';

const VideoScreen = ({ navigation, refreshMediaGrid }) => {
  const camera = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    setIsRecording(true);
    const options = { maxDuration: 60 };
    console.log('recording ...');
    const video = await camera.current.recordAsync(options);
    console.log(video);
    const path = await saveVideo(video.uri);
    console.log(path);
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
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
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
  button: {
    width: CAMERA_BUTTON_SIZE,
    height: CAMERA_BUTTON_SIZE,
    borderRadius: CAMERA_BUTTON_SIZE / 2,
    borderColor: BLACK,
    borderWidth: BORDER_WIDTH,
    marginBottom: LARGE_MARGIN,
    justifyContent: 'center',
    alignItems: 'center',
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
