import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Surface } from 'gl-react-native/lib';
import GLImage from '../filters-gl/GLImage';
import Text from '../../../../custom-components/Text';
import { BRANNAN } from '../filterConsts';
import { BRANNAN_TEXT } from '../../../../../assets/values/strings';
import styles from './selectorStyles';
import Brannan from '../filters-gl/Brannan';

const BrannanSelector = ({ path, setFilter }) => (
  <TouchableOpacity style={styles.filterContainer} onPress={() => setFilter(BRANNAN)}>
    <Text style={styles.text}>{BRANNAN_TEXT}</Text>
    <Surface style={styles.surface}>
      <Brannan on>
        <GLImage path={path} />
      </Brannan>
    </Surface>
  </TouchableOpacity>
);

export default BrannanSelector;
