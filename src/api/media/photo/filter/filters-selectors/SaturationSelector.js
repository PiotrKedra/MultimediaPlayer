import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Surface } from 'gl-react-native/lib';
import Saturation from '../filters-gl/Saturation';
import GLImage from '../filters-gl/GLImage';
import Text from '../../../../custom-components/Text';
import { SATURATION } from '../filterConsts';
import { SATURATION_TEXT } from '../../../../../assets/values/strings';
import styles from './selectorStyles';

const SaturationSelector = ({ path, setFilter }) => (
  <TouchableOpacity style={styles.filterContainer} onPress={() => setFilter(SATURATION)}>
    <Text style={styles.text}>{SATURATION_TEXT}</Text>
    <Surface style={styles.surface}>
      <Saturation on>
        <GLImage path={path} />
      </Saturation>
    </Surface>
  </TouchableOpacity>
);

export default SaturationSelector;
