import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { BLACK, WHITE } from '../../../assets/values/colors';
import SaturationSelector from './filters-selectors/SaturationSelector';
import InkwellSelector from './filters-selectors/InkwellSelector';
import HefeSelector from './filters-selectors/HefeSelector';
import BrannanSelector from './filters-selectors/BrannanSelector';
import LokofiSelector from './filters-selectors/LokofiSelector';
import NegativeSelector from './filters-selectors/NegativeSelector';
import { BORDER_WIDTH } from '../../../assets/values/dimensions';

const FilterSelector = ({ path, setFilter }) => {
  const filterSelectors = [
    <SaturationSelector path={path} setFilter={setFilter} />,
    <InkwellSelector path={path} setFilter={setFilter} />,
    <HefeSelector path={path} setFilter={setFilter} />,
    <BrannanSelector path={path} setFilter={setFilter} />,
    <LokofiSelector path={path} setFilter={setFilter} />,
    <NegativeSelector path={path} setFilter={setFilter} />,
  ];
  return (

    <View style={styles.container}>
      <FlatList
        data={filterSelectors}
        renderItem={({ item }) => item}
        horizontal
        removeClippedSubviews={false}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', bottom: 0, left: 0, borderTopWidth: BORDER_WIDTH, borderColor: BLACK, backgroundColor: WHITE,
  },
});

export default FilterSelector;
