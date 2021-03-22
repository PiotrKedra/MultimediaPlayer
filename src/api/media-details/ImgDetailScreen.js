import React from 'react';
import {
  View, StyleSheet, StatusBar, Image, TouchableOpacity,
} from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { connect } from 'react-redux';
import {
  BACK, DELETE, FAVORITE, FAVORITE_FILLED,
} from '../../assets/values/images';
import { ICON_SIZE, STD_MARGIN } from '../../assets/values/dimensions';
import { deleteImg } from '../storage/imageStorage';
import { refreshMedia } from '../redux/media/media.actions';
import { WHITE } from '../../assets/values/colors';
import Text from '../custom-components/Text';
import { addToFavorite, removeFromFavorite } from '../storage/imageFavoriteStorage';

const ImgDetailScreen = ({ route, navigation, refreshMediaGrid }) => {
  const { img } = route.params;
  const [isFavorite, setIsFavorite] = React.useState(img.favorite);
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ReactNativeZoomableView
        maxZoom={2}
        minZoom={1}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders
      >
        <Image source={img.path} style={styles.img} />
      </ReactNativeZoomableView>

      <View style={styles.topContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Image
            source={BACK}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.nameText}>{img.name}</Text>
      </View>

      <View style={styles.bottomContainer}>
        {
          isFavorite === false ? (
            <TouchableOpacity
              onPress={() => {
                addToFavorite(img.name);
                refreshMediaGrid();
                setIsFavorite(true);
              }}
            >
              <Image
                source={FAVORITE}
                style={styles.icon}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                removeFromFavorite(img.name);
                refreshMediaGrid();
                setIsFavorite(false);
              }}
            >
              <Image
                source={FAVORITE_FILLED}
                style={styles.icon}
              />
            </TouchableOpacity>
          )
        }

        <TouchableOpacity
          onPress={() => {
            deleteImg(img);
            refreshMediaGrid();
            navigation.goBack();
          }}
        >
          <Image
            source={DELETE}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  img: { width: 'auto', height: '100%', resizeMode: 'contain' },
  topContainer: {
    position: 'absolute',
    top: STD_MARGIN,
    left: 0,
    paddingTop: STD_MARGIN,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: { fontSize: 15, marginLeft: STD_MARGIN },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: STD_MARGIN,
    flexDirection: 'row',
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginLeft: STD_MARGIN,
  },
});

const mapDispatchToProps = (dispatch) => ({
  refreshMediaGrid: () => dispatch(refreshMedia()),
});

export default connect(null, mapDispatchToProps)(ImgDetailScreen);
