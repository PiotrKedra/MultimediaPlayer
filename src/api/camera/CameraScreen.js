import React from 'react';
import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import Text from '../custom-components/Text';
import { BLACK } from '../../assets/values/colors';
import { saveImage } from '../storage/storage';
import { refreshMedia } from '../redux/media/media.actions';

const CameraScreen = ({ navigation, refreshMediaGrid }) => {
  const camera = React.useRef(null);

  const takePicture = () => {
    const options = { quality: 1, base64: true };
    camera.current.takePictureAsync(options)
      .then((data) => {
        saveImage(data.uri);
        navigation.navigate('ImgTakenScreen', { img: data.uri });
        // refreshMediaGrid();
        // navigation.goBack();
      })
      .catch((err) => {
        console.error('capture picture error', err);
      });
  };

  return (
    <RNCamera
      ref={camera}
      orientation="auto"
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
        onPress={() => takePicture()}
        style={styles.button}
      >
        <Text>HEHE</Text>
      </TouchableOpacity>
    </RNCamera>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: BLACK,
    borderWidth: 1,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapDispatchToProps = (dispatch) => ({
  refreshMediaGrid: () => dispatch(refreshMedia()),
});

export default connect(null, mapDispatchToProps)(CameraScreen);
