import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Surface } from 'gl-react-native/lib';
import GLImage from '../filters-gl/GLImage';
import Text from '../../../../custom-components/Text';
import styles from './selectorStyles';
import { HEFE } from '../filterConsts';
import { HEFE_TEXT } from '../../../../../assets/values/strings';
import Hefe from '../filters-gl/Hefe';

const HefeSelector = ({ path, setFilter }) => (
  <TouchableOpacity style={styles.filterContainer} onPress={() => setFilter(HEFE)}>
    <Text style={styles.text}>{HEFE_TEXT}</Text>
    <Surface style={styles.surface}>
      <Hefe on>
        <GLImage path={path} />
      </Hefe>
    </Surface>
  </TouchableOpacity>
);

export default HefeSelector;
