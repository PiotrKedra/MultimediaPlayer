import React, { useState, useRef } from 'react';
import {
  View, StyleSheet, Dimensions, Image, TouchableOpacity,
} from 'react-native';
import { Surface } from 'gl-react-native';
import Saturation from './filters-gl/Saturation';
import Negative from './filters-gl/Negative';
import GLImage from './filters-gl/GLImage';
import Lokofi from './filters-gl/Lokofi';
import Brannan from './filters-gl/Brannan';
import Hefe from './filters-gl/Hefe';
import Inkwell from './filters-gl/Inkwell';
import {
  BRANNAN, HEFE, INKWELL, LOKOFI, NEGATIVE, SATURATION,
} from './filterConsts';
import { BACK } from '../../../../assets/values/images';
import { ICON_SIZE, STD_MARGIN } from '../../../../assets/values/dimensions';
import Text from '../../../custom-components/Text';
import FilterSelector from './FilterSelector';
import { DIR_FILE } from '../../../../assets/values/directories';
import { SAVE_TEXT } from '../../../../assets/values/strings';
import { saveImage } from '../../../storage/imageStorage';

const FilterComponent = ({ navigation, img }) => {
  const [filter, setFilter] = useState('');

  const surface = useRef(null);

  const path = `${DIR_FILE}${img}`;

  const saveImg = () => {
    if (surface.current === null) return;
    surface.current.glView.capture()
      .then((uri) => saveImage(uri.uri));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.controlContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={BACK}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => saveImg()}
        >
          <Text style={styles.saveText}>{SAVE_TEXT}</Text>
        </TouchableOpacity>
      </View>

      <Surface ref={surface} style={styles.surface}>
        <Inkwell on={filter === INKWELL}>
          <Hefe on={filter === HEFE}>
            <Brannan on={filter === BRANNAN}>
              <Lokofi on={filter === LOKOFI}>
                <Negative on={filter === NEGATIVE}>
                  <Saturation on={filter === SATURATION}>
                    <GLImage path={path} />
                  </Saturation>
                </Negative>
              </Lokofi>
            </Brannan>
          </Hefe>
        </Inkwell>
      </Surface>

      <FilterSelector path={path} setFilter={setFilter} />
    </View>
  );
};

const { width } = Dimensions.get('window');
const height = width * 1.33;

const styles = StyleSheet.create({
  container: { flex: 1 },
  controlContainer: { flexDirection: 'row', margin: STD_MARGIN, justifyContent: 'space-between' },
  surface: { width, height },
  icon: { width: ICON_SIZE, height: ICON_SIZE },
  saveText: { fontSize: 25 },
});

export default FilterComponent;
