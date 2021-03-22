import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { STD_MARGIN } from '../../../assets/values/dimensions';
import FileFormatSelector from './FileFormatSelector';
import Text from '../../custom-components/Text';
import { SECONDARY_TEXT } from '../../../assets/values/colors';
import SortByPanel from './SortByPanel';
import { ALL, FILES } from '../../../assets/values/strings';

const ControlPanel = ({ mediaQuantity }) => (
  <View style={styles.container}>
    <FileFormatSelector />
    <View style={styles.titleAndSortContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {`${ALL} ${FILES}`}
        </Text>
        <Text style={styles.fileQuantity}>{`${mediaQuantity} ${FILES}`}</Text>
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

const mapStateToProps = (state) => ({
  mediaQuantity: state.mediaQuantity,
});

export default connect(mapStateToProps)(ControlPanel);
