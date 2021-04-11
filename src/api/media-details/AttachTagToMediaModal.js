import React from 'react';
import { View, StyleSheet } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  BLACK, GRAY, LIGHT, MODAL_BACKGROUND, PRIMARY, WHITE,
} from '../../assets/values/colors';
import Text from '../custom-components/Text';
import {
  BORDER_RADIUS, SMALL_MARGIN, STD_MARGIN, TINY_MARGIN,
} from '../../assets/values/dimensions';
import {
  ADD_NEW_TAG,
  ADD_TEXT,
  CLOSE_TEXT,
} from '../../assets/values/strings';
import { addTagToMedia, getAllTags } from '../storage/tagStorage';

const AttachTagToMediaModal = ({ mediaName, close }) => {
  const [selectedTag, setSelectedTag] = React.useState(null);
  const [tags, setTags] = React.useState([]);

  React.useEffect(() => {
    getAllTags().then(((result) => setTags(result)));
  }, []);

  const isSelected = (tag) => selectedTag === tag;

  const handleTagSelection = (tagName, selected) => {
    if (selected) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tagName);
    }
  };

  const Tag = ({ tagName }) => {
    const selected = isSelected(tagName);
    return (
      <TouchableOpacity
        style={[styles.tagContainer, selected ? styles.selectedTag : {}]}
        onPress={() => handleTagSelection(tagName, selected)}
      >
        <Text style={styles.tagName}>{tagName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.closeContainer} onPress={close} />
      <View style={styles.modalContainer}>
        <Text style={styles.title}>{ADD_NEW_TAG}</Text>
        <View style={styles.tagsContainer}>
          {
            tags.map((tag) => (<Tag tagName={tag} key={tag} />))
          }
        </View>
        <View style={styles.controlContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={close}>
            <Text>{CLOSE_TEXT}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.saveButton, selectedTag === null ? styles.disableButton : {}]}
            onPress={() => addTagToMedia(mediaName, selectedTag).then(() => close())}
          >
            <Text>{ADD_TEXT}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Pressable style={styles.closeContainer} onPress={close} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: MODAL_BACKGROUND,
  },
  closeContainer: { flex: 2 },
  modalContainer: {
    margin: STD_MARGIN * 2,
    shadowColor: BLACK,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
    backgroundColor: WHITE,
    borderRadius: BORDER_RADIUS,
    padding: STD_MARGIN,
  },
  title: { fontSize: 20, fontFamily: 'Comfortaa-Bold' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: SMALL_MARGIN },
  tagContainer: {
    paddingHorizontal: STD_MARGIN,
    backgroundColor: GRAY,
    opacity: 0.7,
    marginBottom: TINY_MARGIN,
    marginRight: TINY_MARGIN,
    borderRadius: BORDER_RADIUS,
    shadowColor: BLACK,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
  },
  selectedTag: { backgroundColor: PRIMARY, opacity: 1 },
  tagName: { fontSize: 16 },
  saveButton: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: PRIMARY,
    paddingHorizontal: STD_MARGIN,
    paddingVertical: TINY_MARGIN,
    shadowColor: BLACK,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
  },
  disableButton: { backgroundColor: LIGHT },
  closeButton: { paddingVertical: TINY_MARGIN },
  controlContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
});

export default AttachTagToMediaModal;
