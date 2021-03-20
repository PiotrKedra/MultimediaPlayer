import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../../custom-components/Text';
import {
  BLACK, LIGHT, PRIMARY, SECONDARY_TEXT,
} from '../../../assets/values/colors';

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
    marginTop: 24,
    paddingLeft: 3,
    paddingRight: 24,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: LIGHT,
  },
  formatSelectedText: {
    color: BLACK,
  },
  text: {
    fontSize: 17,
    color: SECONDARY_TEXT,
  },
  selected: {
    backgroundColor: PRIMARY,
    width: 35,
    height: 4,
    position: 'absolute',
    left: 0,
    bottom: -2,
  },
});

export default FileFormatSelector;
