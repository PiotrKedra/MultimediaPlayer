import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { WHITE } from '../../assets/values/colors';

const ImgTakenScreen = ({ navigation, route }) => {
  console.log(route);
  const { img } = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: img }} style={styles.img} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  img: { width: 'auto', height: '100%', resizeMode: 'contain' },
});

export default ImgTakenScreen;
