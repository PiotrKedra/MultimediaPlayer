import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Surface } from 'gl-react-native/lib';
import GLImage from '../filters-gl/GLImage';
import Text from '../../../../custom-components/Text';
import { INKWELL } from '../filterConsts';
import Inkwell from '../filters-gl/Inkwell';
import { INKWELL_TEXT } from '../../../../../assets/values/strings';
import styles from './selectorStyles';

const InkwellSelector = ({ path, setFilter }) => (
  <TouchableOpacity style={styles.filterContainer} onPress={() => setFilter(INKWELL)}>
    <Text style={styles.text}>{INKWELL_TEXT}</Text>
    <Surface style={styles.surface}>
      <Inkwell on>
        <GLImage path={path} />
      </Inkwell>
    </Surface>
  </TouchableOpacity>
);

export default InkwellSelector;
