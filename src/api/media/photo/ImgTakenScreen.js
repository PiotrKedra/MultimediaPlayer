import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { WHITE } from '../../../assets/values/colors';
import FilterComponent from './filter/FilterComponent';
import { STD_MARGIN } from '../../../assets/values/dimensions';

const ImgTakenScreen = ({ navigation, route }) => {
  const { img } = route.params;
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <FilterComponent navigation={navigation} img={img} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE, paddingTop: STD_MARGIN },
});

export default ImgTakenScreen;
