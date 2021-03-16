import React from 'react';
import { View, StyleSheet } from 'react-native';
import { STD_MARGIN } from '../../assets/values/dimensions';
import SearchBar from './SearchBar';
import FileFormatSelector from './FileFormatSelector';
import Text from '../custom-components/Text';
import { SECONDARY_TEXT } from '../../assets/values/colors';
import SortByPanel from './SortByPanel';

const ControlPanel = () => (
  <View style={styles.container}>
    <SearchBar />
    <FileFormatSelector />
    <View style={styles.titleAndSortContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          All files
        </Text>
        <Text style={styles.fileQuantity}>4 files</Text>
      </View>
      <SortByPanel />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: STD_MARGIN,
  },
  titleAndSortContainer: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
  },
  title: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 30,
  },
  fileQuantity: {
    color: SECONDARY_TEXT,
    fontSize: 10,
  },
});

export default ControlPanel;
