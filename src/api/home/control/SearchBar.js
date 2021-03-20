import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { SEARCH } from '../../../assets/values/images';
import { BLACK, SECONDARY_TEXT } from '../../../assets/values/colors';
import Text from '../../custom-components/Text';

const SearchBar = () => (
  <View style={styles.bar}>
    <Image
      style={styles.icon}
      source={SEARCH}
    />
    <Text style={styles.text}>Search</Text>
  </View>
);

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: BLACK,
    borderRadius: 2,
    paddingTop: 5,
    paddingBottom: 8,
  },
  icon: {
    width: 23,
    height: 23,
    opacity: 0.6,
    marginHorizontal: 12,
    marginTop: 3,
  },
  text: {
    fontSize: 17,
    color: SECONDARY_TEXT,
  },
});

export default SearchBar;
