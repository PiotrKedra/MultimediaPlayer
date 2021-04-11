import React from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import Text from '../../custom-components/Text';
import { MENU } from '../../../assets/values/images';
import {
  HEADER_HEIGHT,
  SMALL_ICON_SIZE,
  SMALL_MARGIN, STD_MARGIN, TINY_MARGIN,
} from '../../../assets/values/dimensions';
import { APP_NAME } from '../../../assets/values/strings';
import { BLACK } from '../../../assets/values/colors';

const Header = ({ openSettings }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{APP_NAME}</Text>
    <TouchableOpacity style={styles.buttonContainer} onPress={() => openSettings()}>
      <Image
        source={MENU}
        style={styles.icon}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SMALL_MARGIN,
    paddingHorizontal: STD_MARGIN,
    paddingTop: SMALL_MARGIN,
    shadowColor: BLACK,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
    zIndex: 0,
  },
  title: { fontSize: 30, fontFamily: 'Comfortaa-Bold' },
  buttonContainer: { paddingLeft: TINY_MARGIN },
  icon: { width: SMALL_ICON_SIZE, height: SMALL_ICON_SIZE, marginTop: SMALL_MARGIN },
});

export default Header;
