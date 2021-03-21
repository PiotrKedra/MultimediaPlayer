import React, { useState } from 'react';
import {
  View, StyleSheet, Image, Pressable, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Text from '../../custom-components/Text';
import { EXPAND_ARROW } from '../../../assets/values/images';
import { BLACK, SECONDARY_TEXT, WHITE } from '../../../assets/values/colors';
import { AGE_TEXT, NAME_TEXT, SORT_BY_TEXT } from '../../../assets/values/strings';
import { SORT_NAME } from '../../redux/media/sortConsts';
import {
  ARROW_ICON_SIZE,
  BORDER_RADIUS,
  MARGIN_ONE,
  SMALL_BORDER_WIDTH,
  SMALL_MARGIN,
  SORT_SELECTOR_HEIGHT,
  SORT_SELECTOR_SHIFT,
  SORT_SELECTOR_WIDTH,
  TINY_MARGIN,
} from '../../../assets/values/dimensions';
import { sortByAge, sortByName } from '../../redux/media/media.actions';

const SortByPanel = ({ sortBy, setSortByAge, setSortByName }) => {
  const [isSortSelector, setIsSortSelector] = useState(false);

  const mapSortByToText = () => {
    if (sortBy === SORT_NAME) return NAME_TEXT;
    return AGE_TEXT;
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.sortByContainer}
        onPress={() => setIsSortSelector(!isSortSelector)}
      >
        <Text style={styles.text}>{SORT_BY_TEXT}</Text>
        <Text>{mapSortByToText()}</Text>
        <Image
          style={styles.arrow}
          source={EXPAND_ARROW}
        />
      </Pressable>
      {
        isSortSelector
        && (
        <View style={styles.selectorContainer}>
          <TouchableOpacity onPress={() => {
            setSortByAge();
            setIsSortSelector(false);
          }}
          >
            <Text>{AGE_TEXT}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setSortByName();
            setIsSortSelector(false);
          }}
          >
            <Text>{NAME_TEXT}</Text>
          </TouchableOpacity>
        </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: TINY_MARGIN,
  },
  sortByContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  arrow: {
    width: ARROW_ICON_SIZE,
    height: ARROW_ICON_SIZE,
    margin: MARGIN_ONE,
  },
  text: {
    color: SECONDARY_TEXT,
  },
  selectorContainer: {
    position: 'absolute',
    right: SMALL_MARGIN,
    bottom: -(SORT_SELECTOR_HEIGHT + SORT_SELECTOR_SHIFT),
    height: SORT_SELECTOR_HEIGHT,
    width: SORT_SELECTOR_WIDTH,
    zIndex: 1,
    justifyContent: 'space-between',
    borderWidth: SMALL_BORDER_WIDTH,
    borderColor: BLACK,
    borderRadius: BORDER_RADIUS,
    padding: SMALL_MARGIN,
    backgroundColor: WHITE,
  },
});

const mapStateToProps = (state) => ({
  sortBy: state.sortBy,
});

const mapDispatchToProps = (dispatch) => ({
  setSortByAge: () => dispatch(sortByAge()),
  setSortByName: () => dispatch(sortByName()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SortByPanel);
