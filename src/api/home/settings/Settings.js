import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ADD_NEW_TAG, REMOVE_TAG } from '../../../assets/values/strings';
import Text from '../../custom-components/Text';
import { BLACK, WHITE } from '../../../assets/values/colors';
import {
  BORDER_RADIUS, SMALL_BORDER_WIDTH, SMALL_MARGIN, STD_MARGIN,
} from '../../../assets/values/dimensions';

const Settings = ({ close, openNewTagModal, openRemoveTagModal }) => (
  <View style={styles.container}>
    <View style={styles.upperContainer}>
      <Pressable style={styles.upperCloseContainer} onPress={close} />
      <View style={styles.settingView}>
        <TouchableOpacity onPress={() => { openNewTagModal(); close(); }}>
          <Text style={styles.text}>{ADD_NEW_TAG}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { openRemoveTagModal(); close(); }}>
          <Text style={styles.text}>{REMOVE_TAG}</Text>
        </TouchableOpacity>
      </View>
    </View>
    <Pressable style={styles.lowerContainer} onPress={close} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
  },
  upperContainer: { height: '30%', flexDirection: 'row' },
  upperCloseContainer: { flex: 1 },
  lowerContainer: { height: '70%', width: '100%' },
  settingView: {
    marginTop: 4 * STD_MARGIN,
    marginRight: STD_MARGIN,
    backgroundColor: WHITE,
    padding: STD_MARGIN,
    borderWidth: SMALL_BORDER_WIDTH,
    borderColor: BLACK,
    borderRadius: BORDER_RADIUS,
    shadowColor: BLACK,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  text: { fontSize: 18, padding: SMALL_MARGIN },
});

export default Settings;
