import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Surface } from 'gl-react-native/lib';
import GLImage from '../filters-gl/GLImage';
import Text from '../../../../custom-components/Text';
import { LOKOFI } from '../filterConsts';
import { LOKOFI_TEXT } from '../../../../../assets/values/strings';
import styles from './selectorStyles';
import Lokofi from '../filters-gl/Lokofi';

const LokofiSelector = ({ path, setFilter }) => (
  <TouchableOpacity style={styles.filterContainer} onPress={() => setFilter(LOKOFI)}>
    <Text style={styles.text}>{LOKOFI_TEXT}</Text>
    <Surface style={styles.surface}>
      <Lokofi on>
        <GLImage path={path} />
      </Lokofi>
    </Surface>
  </TouchableOpacity>
);

export default LokofiSelector;
