import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Surface } from 'gl-react-native/lib';
import GLImage from '../filters-gl/GLImage';
import Text from '../../../../custom-components/Text';
import { NEGATIVE } from '../filterConsts';
import { NEGATIVE_TEXT } from '../../../../../assets/values/strings';
import styles from './selectorStyles';
import Negative from '../filters-gl/Negative';

const NegativeSelector = ({ path, setFilter }) => (
  <TouchableOpacity style={styles.filterContainer} onPress={() => setFilter(NEGATIVE)}>
    <Text style={styles.text}>{NEGATIVE_TEXT}</Text>
    <Surface style={styles.surface}>
      <Negative on>
        <GLImage path={path} />
      </Negative>
    </Surface>
  </TouchableOpacity>
);

export default NegativeSelector;
