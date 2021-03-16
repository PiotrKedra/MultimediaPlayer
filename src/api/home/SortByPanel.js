import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from '../custom-components/Text';
import { EXPAND_ARROW } from '../../assets/values/images';
import { SECONDARY_TEXT } from '../../assets/values/colors';

const SortByPanel = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Sort by: </Text>
    <Text>age</Text>
    <Image
      style={styles.arrow}
      source={EXPAND_ARROW}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingRight: 6,
  },
  arrow: {
    width: 18,
    height: 18,
    margin: 1,
  },
  text: {
    color: SECONDARY_TEXT,
  },
});

export default SortByPanel;
