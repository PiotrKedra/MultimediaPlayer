import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  BLACK, GRAY, MODAL_BACKGROUND, PRIMARY, WHITE,
} from '../../../assets/values/colors';
import Text from '../../custom-components/Text';
import {
  BORDER_RADIUS, MARGIN_TWO,
  SMALL_BORDER_WIDTH,
  SMALL_MARGIN,
  STD_MARGIN,
  TINY_MARGIN,
} from '../../../assets/values/dimensions';
import {
  ADD_NEW_TAG, CLOSE_TEXT, NEW_TAG_NAME, SAVE_TEXT,
} from '../../../assets/values/strings';
import { addNewTag } from '../../storage/tagStorage';

const MAX_TAG_LENGTH = 10;

const NewTagModal = ({ close }) => {
  const [input, setInput] = React.useState('');
  return (
    <View style={styles.container}>
      <Pressable style={styles.closeContainer} onPress={close} />
      <View style={styles.modalContainer}>
        <Text style={styles.title}>{ADD_NEW_TAG}</Text>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder={NEW_TAG_NAME}
          style={styles.input}
          maxLength={MAX_TAG_LENGTH}
          autoFocus
          placeholderTextColor={GRAY}
        />
        <View style={styles.controlContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={close}>
            <Text>{CLOSE_TEXT}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => { close(); addNewTag(input); }}
          >
            <Text>{SAVE_TEXT}</Text>
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
  input: {
    borderWidth: SMALL_BORDER_WIDTH,
    borderColor: BLACK,
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: SMALL_MARGIN,
    paddingVertical: MARGIN_TWO,
    marginVertical: STD_MARGIN,
    fontFamily: 'Comfortaa-Regular',
    color: BLACK,
  },
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
  closeButton: { paddingVertical: TINY_MARGIN },
  controlContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
});

export default NewTagModal;
