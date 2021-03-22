import React from 'react';
import {
  Image, StatusBar, StyleSheet, TouchableOpacity,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import { BLACK } from '../../assets/values/colors';
import { saveImage } from '../storage/imageStorage';
import { refreshMedia } from '../redux/media/media.actions';
import { BACK, CAMERA } from '../../assets/values/images';
import {
  BORDER_WIDTH,
  CAMERA_BUTTON_SIZE,
  ICON_SIZE,
  LARGE_MARGIN,
  STD_MARGIN,
} from '../../assets/values/dimensions';

const CameraScreen = ({ navigation, refreshMediaGrid }) => {
  const camera = React.useRef(null);

  const takePicture = async () => {
    const options = { quality: 1, base64: true, fixOrientation: true };
    const data = await camera.current.takePictureAsync(options);
    const path = await saveImage(data.uri);
    navigation.navigate('ImgTakenScreen', { img: path });
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
      <TouchableOpacity
        onPress={() => takePicture()}
        style={styles.button}
      >
        <Image
          source={CAMERA}
          style={styles.icon}
        />
      </TouchableOpacity>
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
  icon: { width: ICON_SIZE, height: ICON_SIZE },
});

const mapDispatchToProps = (dispatch) => ({
  refreshMediaGrid: () => dispatch(refreshMedia()),
});

export default connect(null, mapDispatchToProps)(CameraScreen);
