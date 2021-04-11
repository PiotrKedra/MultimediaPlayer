import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Text from '../../custom-components/Text';
import {
  BLACK, LIGHT, PRIMARY, SECONDARY_TEXT,
} from '../../../assets/values/colors';
import {
  BORDER_WIDTH,
  SMALL_BORDER_WIDTH,
  STD_MARGIN,
  TINY_MARGIN,
} from '../../../assets/values/dimensions';
import {
  ALL, PHOTOS, RECORDS, VIDEOS,
} from '../../../assets/values/strings';
import { setSelectedFormat } from '../../redux/media/media.actions';
import {
  ALL_FORMAT, AUDIO_FORMAT, PHOTO_FORMAT, VIDEO_FORMAT,
} from '../../redux/media/mediaConsts';

const FileFormatSelector = ({ format, setFormat }) => {
  let allButtonStyle = styles.nonSelected;
  let photoButtonStyle = styles.nonSelected;
  let videoButtonStyle = styles.nonSelected;
  let audioButtonStyle = styles.nonSelected;
  let allTextStyle = styles.nonSelectedText;
  let photoTextStyle = styles.nonSelectedText;
  let videoTextStyle = styles.nonSelectedText;
  let audioTextStyle = styles.nonSelectedText;
  if (format === ALL_FORMAT) {
    allButtonStyle = styles.selected;
    allTextStyle = styles.selectedText;
  }
  if (format === PHOTO_FORMAT) {
    photoButtonStyle = styles.selected;
    photoTextStyle = styles.selectedText;
  }
  if (format === VIDEO_FORMAT) {
    videoButtonStyle = styles.selected;
    videoTextStyle = styles.selectedText;
  }
  if (format === AUDIO_FORMAT) {
    audioButtonStyle = styles.selected;
    audioTextStyle = styles.selectedText;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={allButtonStyle}
        onPress={() => setFormat(ALL_FORMAT)}
      >
        <Text style={allTextStyle}>{ALL}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={photoButtonStyle} onPress={() => setFormat(PHOTO_FORMAT)}>
        <Text style={photoTextStyle}>{PHOTOS}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={videoButtonStyle} onPress={() => setFormat(VIDEO_FORMAT)}>
        <Text style={videoTextStyle}>{VIDEOS}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={audioButtonStyle} onPress={() => setFormat(AUDIO_FORMAT)}>
        <Text style={audioTextStyle}>{RECORDS}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: TINY_MARGIN,
    paddingRight: STD_MARGIN,
    justifyContent: 'space-between',
    borderBottomWidth: SMALL_BORDER_WIDTH,
    borderColor: LIGHT,
  },
  selectedText: { color: BLACK, fontSize: 17 },
  nonSelectedText: { fontSize: 17, color: SECONDARY_TEXT },
  selected: {
    borderColor: PRIMARY,
    borderBottomWidth: BORDER_WIDTH,
    paddingHorizontal: TINY_MARGIN,
  },
  nonSelected: {
    paddingHorizontal: TINY_MARGIN,
  },
});

const mapStateToProps = (state) => ({
  format: state.selectedFormat,
});

const mapDispatchToProps = (dispatch) => ({
  setFormat: (format) => dispatch(setSelectedFormat(format)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileFormatSelector);
