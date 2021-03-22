import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../../custom-components/Text';
import {
  BLACK, LIGHT, PRIMARY, SECONDARY_TEXT,
} from '../../../assets/values/colors';
import {
  FILE_SELECTOR_HEIGHT,
  FILE_SELECTOR_WIDTH,
  SMALL_BORDER_WIDTH,
  STD_MARGIN,
  TINY_MARGIN,
} from '../../../assets/values/dimensions';

const FileFormatSelector = () => (
  <View style={styles.container}>
    <Text style={[styles.text, styles.formatSelectedText]}>All</Text>
    <Text style={styles.text}>Photos</Text>
    <Text style={styles.text}>Videos</Text>
    <Text style={styles.text}>Records</Text>
    <View style={styles.selected} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: TINY_MARGIN,
    paddingRight: STD_MARGIN,
    justifyContent: 'space-between',
    borderBottomWidth: SMALL_BORDER_WIDTH,
    borderColor: LIGHT,
  },
  formatSelectedText: { color: BLACK },
  text: { fontSize: 17, color: SECONDARY_TEXT },
  selected: {
    backgroundColor: PRIMARY,
    width: FILE_SELECTOR_WIDTH,
    height: FILE_SELECTOR_HEIGHT,
    position: 'absolute',
    left: 0,
    bottom: -2,
  },
});

export default FileFormatSelector;
