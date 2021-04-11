import React from 'react';
import {
  Image, View, StyleSheet, TextInput, Keyboard,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { CLEAR, SEARCH } from '../../../assets/values/images';
import { BLACK, SECONDARY_TEXT } from '../../../assets/values/colors';
import {
  BORDER_RADIUS, SEARCH_BAR_MARGIN,
  SEARCH_ICON_SIZE,
  SMALL_BORDER_WIDTH,
  SMALL_MARGIN,
  TINY_MARGIN,
} from '../../../assets/values/dimensions';
import { SEARCH_TEXT } from '../../../assets/values/strings';
import { setSearchInput } from '../../redux/media/media.actions';

const SearchBar = ({ input, setInput }) => (
  <View style={styles.bar}>
    <Image
      style={styles.icon}
      source={SEARCH}
    />
    <TextInput
      onChangeText={(value) => setInput(value)}
      value={input}
      style={styles.input}
      placeholder={SEARCH_TEXT}
      InputProps={{ disableUnderline: true }}
      underlineColorAndroid="transparent"
      borderWidth={0}
    />
    <TouchableOpacity
      style={styles.clearButton}
      onPress={() => { setInput(''); Keyboard.dismiss(); }}
    >
      <Image
        style={styles.clearIcon}
        source={CLEAR}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderWidth: SMALL_BORDER_WIDTH,
    borderColor: BLACK,
    borderRadius: BORDER_RADIUS,
    paddingTop: TINY_MARGIN,
    paddingBottom: TINY_MARGIN,
    marginBottom: SMALL_MARGIN,
    justifyContent: 'space-between',
  },
  icon: {
    width: SEARCH_ICON_SIZE,
    height: SEARCH_ICON_SIZE,
    opacity: 0.6,
    marginLeft: SEARCH_BAR_MARGIN,
    marginTop: 3,
  },
  clearButton: { marginRight: SEARCH_BAR_MARGIN },
  clearIcon: { width: 25, height: 25 },
  input: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 17,
    color: SECONDARY_TEXT,
    width: '70%',
    margin: 0,
    padding: 0,
  },
});

const mapStateToProps = (state) => ({
  input: state.searchInput,
});

const mapDispatchToProps = (dispatch) => ({
  setInput: (input) => dispatch(setSearchInput(input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
