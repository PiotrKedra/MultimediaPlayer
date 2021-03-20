import React, { useState } from 'react';
import {
  View, StyleSheet, Pressable, StatusBar,
} from 'react-native';
import {
  BLACK, PRIMARY, WHITE,
} from '../../assets/values/colors';
import { HOME_TOP_PADDING, STD_MARGIN } from '../../assets/values/dimensions';
import ControlPanel from './control/ControlPanel';
import Text from '../custom-components/Text';
import MediaGrid from './MediaGrid';
import { DIR_HOME, DIR_IMAGES } from '../../assets/values/directories';
import DetailModal from './DetailModal';

const RNFS = require('react-native-fs');

const HomeScreen = ({ navigation }) => {
  const [isDetailModal, setIsDetailModal] = useState(false);
  const [details, setDetails] = useState({});

  React.useEffect(() => {
    RNFS.mkdir(DIR_HOME).then(() => console.log('git')).catch(() => console.log('dupa'));
    RNFS.mkdir(DIR_IMAGES).then(() => console.log('git2')).catch(() => console.log('dupa2'));
  }, []);

  const showDetails = (detailObject) => {
    setDetails(detailObject);
    setIsDetailModal(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ControlPanel />
      <MediaGrid
        navigation={navigation}
        isDetailModal={isDetailModal}
        setIsDetailModal={setIsDetailModal}
        showDetails={showDetails}
      />
      <Pressable onPress={() => navigation.navigate('CameraScreen')} style={styles.addButton}>
        <Text style={styles.textButton}>+</Text>
      </Pressable>
      {
        isDetailModal
        && (
          <View style={styles.modal}>
            <DetailModal setIsDetailModal={setIsDetailModal} details={details} />
          </View>
        )
      }
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
  modal: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
  },
});

export default HomeScreen;
