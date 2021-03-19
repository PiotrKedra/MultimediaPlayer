import { StyleSheet } from 'react-native';
import {
  FILTER_SELECTOR_HEIGHT,
  FILTER_SELECTOR_WIDTH,
  MARGIN_ONE,
  SMALL_MARGIN,
} from '../../../../assets/values/dimensions';

export default StyleSheet.create({
  filterContainer: { padding: SMALL_MARGIN, alignItems: 'center' },
  surface: { width: FILTER_SELECTOR_WIDTH, height: FILTER_SELECTOR_HEIGHT },
  text: { fontSize: 15, margin: MARGIN_ONE },
});
