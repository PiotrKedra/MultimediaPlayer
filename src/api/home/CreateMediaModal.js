import React from 'react';
import {
  View, StyleSheet, Pressable, Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  BLACK, MODAL_BACKGROUND, PRIMARY, WHITE,
} from '../../assets/values/colors';
import Text from '../custom-components/Text';
import {
  BORDER_RADIUS, ICON_SIZE, LARGE_MARGIN, SMALL_BORDER_WIDTH, STD_MARGIN, TINY_MARGIN,
} from '../../assets/values/dimensions';
import { CLOSE } from '../../assets/values/images';

const CreateMediaModal = ({ navigation, closeModal }) => (
  <View style={styles.container}>
    <Pressable style={styles.outerModal} onPress={() => closeModal()} />
    <View style={styles.modal}>
      <TouchableOpacity onPress={() => closeModal()}>
        <Image source={CLOSE} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('CameraScreen'); closeModal(); }}>
        <Text style={styles.text}>Make a photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('VideoScreen'); closeModal(); }}>
        <Text style={styles.text}>Make a video</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Make a recording</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, zIndex: 3,
  },
  outerModal: { flex: 2 },
  modal: {
    flex: 1,
    backgroundColor: WHITE,
    shadowColor: BLACK,
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
    padding: LARGE_MARGIN,
    borderTopWidth: SMALL_BORDER_WIDTH,
    borderColor: MODAL_BACKGROUND,
  },
  button: {
    width: '100%',
    backgroundColor: PRIMARY,
    borderRadius: BORDER_RADIUS,
    alignItems: 'center',
    padding: TINY_MARGIN,
    marginBottom: STD_MARGIN,
    shadowColor: BLACK,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  text: {
    fontFamily: 'Comfortaa-Bold',
    color: WHITE,
    fontSize: 20,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginBottom: STD_MARGIN,
  },
});

export default CreateMediaModal;
