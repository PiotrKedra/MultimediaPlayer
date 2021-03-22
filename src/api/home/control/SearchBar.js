import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { SEARCH } from '../../../assets/values/images';
import { BLACK, SECONDARY_TEXT } from '../../../assets/values/colors';
import Text from '../../custom-components/Text';
import {
  BORDER_RADIUS,
  SEARCH_ICON_SIZE,
  SMALL_BORDER_WIDTH,
  SMALL_MARGIN,
  TINY_MARGIN,
} from '../../../assets/values/dimensions';

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
    borderWidth: SMALL_BORDER_WIDTH,
    borderColor: BLACK,
    borderRadius: BORDER_RADIUS,
    paddingTop: TINY_MARGIN,
    paddingBottom: SMALL_MARGIN,
  },
  icon: {
    width: SEARCH_ICON_SIZE,
    height: SEARCH_ICON_SIZE,
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
