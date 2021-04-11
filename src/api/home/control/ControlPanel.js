import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SMALL_MARGIN, STD_MARGIN } from '../../../assets/values/dimensions';
import FileFormatSelector from './FileFormatSelector';
import Text from '../../custom-components/Text';
import { PRIMARY, SECONDARY_TEXT } from '../../../assets/values/colors';
import SortByPanel from './SortByPanel';
import {
  ALL, FILES, PHOTOS, RECORDS, SEARCH_BY_TAGS, TAGS, VIDEOS,
} from '../../../assets/values/strings';
import { AUDIO_FORMAT, PHOTO_FORMAT, VIDEO_FORMAT } from '../../redux/media/mediaConsts';
import SearchBar from './SearchBar';

const ControlPanel = ({ searchByTags, mediaQuantity, format }) => {
  const mapFormatToText = () => {
    switch (format) {
      case PHOTO_FORMAT:
        return PHOTOS;
      case VIDEO_FORMAT:
        return VIDEOS;
      case AUDIO_FORMAT:
        return RECORDS;
      default:
        return ALL;
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar />
      <TouchableOpacity style={styles.searchByTagsButton} onPress={searchByTags}>
        <Text>{SEARCH_BY_TAGS}</Text>
        <Text style={styles.tagText}>{TAGS}</Text>
      </TouchableOpacity>
      <FileFormatSelector />
      <View style={styles.titleAndSortContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {`${mapFormatToText(format)} ${FILES}`}
          </Text>
          <Text style={styles.fileQuantity}>{`${mediaQuantity} ${FILES}`}</Text>
        </View>
        <SortByPanel />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: STD_MARGIN,
  },
  titleAndSortContainer: {
    marginTop: SMALL_MARGIN,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
  },
  title: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 25,
  },
  fileQuantity: {
    color: SECONDARY_TEXT,
    fontSize: 10,
  },
  searchByTagsButton: { flexDirection: 'row', marginBottom: SMALL_MARGIN },
  tagText: { fontFamily: 'Comfortaa-Bold', color: PRIMARY },
});

const mapStateToProps = (state) => ({
  mediaQuantity: state.mediaQuantity,
  format: state.selectedFormat,
});

export default connect(mapStateToProps)(ControlPanel);
