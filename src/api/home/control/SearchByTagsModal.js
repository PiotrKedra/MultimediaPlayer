import React from 'react';
import { View, StyleSheet } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {
  BLACK, GRAY, LIGHT, MODAL_BACKGROUND, PRIMARY, WHITE,
} from '../../../assets/values/colors';
import Text from '../../custom-components/Text';
import {
  BORDER_RADIUS, SMALL_MARGIN, STD_MARGIN, TINY_MARGIN,
} from '../../../assets/values/dimensions';
import {
  CLEAR_TEXT,
  CLOSE_TEXT, SEARCH_ACTION_TEXT, SEARCH_BY_TAGS_TITLE,
} from '../../../assets/values/strings';
import { getAllTags } from '../../storage/tagStorage';
import { setSearchTags } from '../../redux/media/media.actions';

const SearchByTagsModal = ({ close, selectedSearchTags, applyTags }) => {
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [tags, setTags] = React.useState([]);

  React.useEffect(() => {
    getAllTags().then(((result) => setTags(result)));
    setSelectedTags(selectedSearchTags);
  }, []);

  const isSelected = (tag) => selectedTags.includes(tag);

  const handleTagSelection = (tagName, selected) => {
    if (selected) {
      setSelectedTags(selectedTags.filter((t) => t !== tagName));
    } else {
      setSelectedTags(selectedTags.concat([tagName]));
    }
  };

  const Tag = ({ tagName }) => {
    const selected = isSelected(tagName);
    return (
      <TouchableOpacity
        style={[styles.tagContainer, selected ? styles.selectedTag : {}]}
        onPress={() => handleTagSelection(tagName, selected, selectedTags)}
      >
        <Text style={styles.tagName}>{tagName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.closeContainer} onPress={close} />
      <View style={styles.modalContainer}>
        <Text style={styles.title}>{SEARCH_BY_TAGS_TITLE}</Text>
        <View style={styles.tagsContainer}>
          {
            tags.map((tag) => (<Tag tagName={tag} key={tag} />))
          }
        </View>
        <View style={styles.controlContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={close}>
            <Text>{CLOSE_TEXT}</Text>
          </TouchableOpacity>
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.clearButton]}
              onPress={() => { applyTags([]); close(); }}
            >
              <Text>{CLEAR_TEXT}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.searchButton]}
              onPress={() => { applyTags(selectedTags); close(); }}
            >
              <Text>{SEARCH_ACTION_TEXT}</Text>
            </TouchableOpacity>
          </View>
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
  actionButtonsContainer: { flexDirection: 'row' },
  actionButton: {
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: STD_MARGIN,
    paddingVertical: TINY_MARGIN,
    marginLeft: TINY_MARGIN,
    shadowColor: BLACK,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
  },
  searchButton: { backgroundColor: PRIMARY },
  clearButton: { backgroundColor: LIGHT },
  closeButton: { paddingVertical: TINY_MARGIN },
  controlContainer: {
    flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: SMALL_MARGIN,
  },
});

const mapStateToProps = (state) => ({
  selectedSearchTags: state.searchTags,
});

const mapDispatchToProps = (dispatch) => ({
  applyTags: (tags) => dispatch(setSearchTags(tags)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchByTagsModal);
