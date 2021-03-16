import React from 'react';
import {
  View, StyleSheet, Pressable, StatusBar,
} from 'react-native';
import { BLACK, PRIMARY, WHITE } from '../../assets/values/colors';
import { HOME_TOP_PADDING, STD_MARGIN } from '../../assets/values/dimensions';
import ControlPanel from './ControlPanel';
import Text from '../custom-components/Text';
import MediaGrid from './MediaGrid';
import { DIR_HOME, DIR_IMAGES } from '../../assets/values/directories';

const RNFS = require('react-native-fs');

const HomeScreen = ({ navigation }) => {
  React.useEffect(() => {
    RNFS.mkdir(DIR_HOME).then(() => console.log('git')).catch(() => console.log('dupa'));
    RNFS.mkdir(DIR_IMAGES).then(() => console.log('git2')).catch(() => console.log('dupa2'));
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ControlPanel />
      <MediaGrid navigation={navigation} />
      <Pressable onPress={() => navigation.navigate('CameraScreen')} style={styles.addButton}>
        <Text style={styles.textButton}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingTop: HOME_TOP_PADDING,
  },
  addButton: {
    position: 'absolute',
    right: STD_MARGIN,
    bottom: STD_MARGIN,
    width: 80,
    height: 80,
    borderRadius: 35,
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BLACK,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  textButton: {
    fontSize: 30,
    color: WHITE,
    fontFamily: 'Comfortaa-Light',
  },
});

export default HomeScreen;
