import React, { useState } from 'react';
import {
  View, StyleSheet, StatusBar, Image, TouchableOpacity, ToastAndroid,
} from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { connect } from 'react-redux';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {
  BACK, DELETE, FAVORITE, FAVORITE_FILLED, TAG,
} from '../../assets/values/images';
import {
  BORDER_RADIUS, ICON_SIZE, SMALL_MARGIN, STD_MARGIN, TINY_MARGIN,
} from '../../assets/values/dimensions';
import { refreshMedia } from '../redux/media/media.actions';
import { BLACK, PRIMARY, WHITE } from '../../assets/values/colors';
import Text from '../custom-components/Text';
import { addToFavorite, removeFromFavorite } from '../storage/favoriteStorage';
import { deleteMedia } from '../storage/mediaStorage';
import { getTagsForMedia, removeTagFromMedia } from '../storage/tagStorage';
import AttachTagToMediaModal from './AttachTagToMediaModal';
import { TAG_REMOVED } from '../../assets/values/strings';

const ImgDetailScreen = ({ route, navigation, refreshMediaGrid }) => {
  const { img } = route.params;
  const [isFavorite, setIsFavorite] = useState(img.favorite);
  const [isAddTagModal, setIsTagModal] = useState(false);
  const [tags, setTags] = useState([]);

  React.useEffect(() => {
    getTagsForMedia(img.name).then((t) => setTags(t));
  }, [isAddTagModal]);

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
        <View style={styles.innerBottomContainer}>
          {
            tags.map((t) => (
              <Pressable
                style={styles.tagContainer}
                key={t}
                onLongPress={() => removeTagFromMedia(img.name, t)
                  .then(() => getTagsForMedia(img.name))
                  .then((updatedTags) => {
                    setTags(updatedTags);
                    ToastAndroid.show(TAG_REMOVED, ToastAndroid.SHORT);
                  })}
              >
                <Text style={styles.tagText}>{t}</Text>
              </Pressable>
            ))
          }
        </View>
        <View style={styles.innerBottomContainer}>
          <TouchableOpacity
            disabled={tags.length === 3}
            onPress={() => setIsTagModal(true)}
          >
            <Image
              source={TAG}
              style={styles.icon}
            />
          </TouchableOpacity>
          {
            isFavorite === false ? (
              <TouchableOpacity
                onPress={() => {
                  addToFavorite(img.name, img.type);
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
                  removeFromFavorite(img.name, img.type);
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
              deleteMedia(img);
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
      {
        isAddTagModal
        && (
          <AttachTagToMediaModal
            mediaName={img.name}
            close={() => setIsTagModal(false)}
          />
        )
      }
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
  },
  innerBottomContainer: { flexDirection: 'row', justifyContent: 'flex-end' },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginLeft: STD_MARGIN,
  },
  tagContainer: {
    paddingHorizontal: STD_MARGIN,
    backgroundColor: PRIMARY,
    opacity: 0.7,
    marginBottom: SMALL_MARGIN,
    marginRight: TINY_MARGIN,
    borderRadius: BORDER_RADIUS,
    shadowColor: BLACK,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
  },
  tagText: { fontSize: 13 },
});

const mapDispatchToProps = (dispatch) => ({
  refreshMediaGrid: () => dispatch(refreshMedia()),
});

export default connect(null, mapDispatchToProps)(ImgDetailScreen);
