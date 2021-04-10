import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Image, FlatList, Dimensions, Pressable,
} from 'react-native';
import { connect } from 'react-redux';
import { mediaRefreshed, setMediaQuantity } from '../redux/media/media.actions';
import { SORT_NAME } from '../redux/media/sortConsts';
import getAllMedia from '../storage/mediaStorage';
import { AUDIO_TYPE, IMAGE_TYPE, VIDEO_TYPE } from '../storage/mediaConsts';
import { AUDIO_FILE, VIDEO } from '../../assets/values/images';
import {
  ICON_SIZE,
  LARGE_MARGIN, MARGIN_TWO, MEDIA_GRID_MARGIN, SMALL_MARGIN,
} from '../../assets/values/dimensions';
import { GRAY, WHITE_GRADIENT_END } from '../../assets/values/colors';
import Text from '../custom-components/Text';

const MAX_X_CORD = Dimensions.get('window').width * 0.5;
const Y_SHIFT = 80;

const MediaGrid = ({
  navigation, globalProps, mediaGridRefreshed, setMediaListLength, showDetails,
}) => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    loadMedia();
    mediaGridRefreshed();
  }, [globalProps.shouldRefreshMedia, globalProps.sortBy]);

  const loadMedia = () => {
    getAllMedia().then((result) => {
      sortMedia(result);
      setMedia(result);
      setMediaListLength(result.length);
    });
  };

  const sortMedia = (mediaList) => {
    if (globalProps.sortBy === SORT_NAME) {
      mediaList.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      mediaList.sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
    }
  };

  const showDetailsModal = (nativeEvent, details) => {
    const style = {
      position: 'absolute',
      top: nativeEvent.pageY - Y_SHIFT,
      left: nativeEvent.pageX > MAX_X_CORD ? MAX_X_CORD : nativeEvent.pageX,
    };
    const detailsObject = {
      style,
      ...details,
    };
    showDetails(detailsObject);
  };

  const displayItem = (item) => {
    switch (item.type) {
      case IMAGE_TYPE:
        return (
          <Pressable
            onPress={() => navigation.navigate('ImgDetailScreen', { img: item })}
            onLongPress={({ nativeEvent }) => showDetailsModal(nativeEvent, item)}
          >
            <Image
              style={styles.mediaThumbnail}
              source={item.path}
            />
          </Pressable>
        );
      case VIDEO_TYPE:
        return (
          <Pressable
            onPress={() => navigation.navigate('PlayerDetailScreen', { video: item })}
            onLongPress={({ nativeEvent }) => showDetailsModal(nativeEvent, item)}
          >
            <Image
              style={styles.mediaThumbnail}
              source={item.path}
            />
            <View style={styles.movieIconContainer}>
              <View style={styles.iconBackground}>
                <Image source={VIDEO} style={styles.icon} />
              </View>
            </View>
          </Pressable>
        );
      case AUDIO_TYPE:
        return (
          <Pressable
            onPress={() => navigation.navigate('PlayerDetailScreen', { video: item })}
            onLongPress={({ nativeEvent }) => showDetailsModal(nativeEvent, item)}
            style={styles.audioItem}
          >
            <Image source={AUDIO_FILE} style={styles.icon} />
            <Text numberOfLines={1}>{item.name}</Text>
          </Pressable>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={media}
        renderItem={({ item }) => displayItem(item)}
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const imgSize = (Dimensions.get('window').width / 3) - 4;

const styles = StyleSheet.create({
  container: { flex: 1, marginRight: MEDIA_GRID_MARGIN },
  mediaThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: imgSize,
    width: imgSize,
    marginLeft: MEDIA_GRID_MARGIN,
    marginBottom: MARGIN_TWO,
  },
  movieIconContainer: {
    position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, justifyContent: 'center', alignItems: 'center',
  },
  audioItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: imgSize,
    width: imgSize,
    backgroundColor: GRAY,
    marginLeft: MEDIA_GRID_MARGIN,
    marginBottom: MARGIN_TWO,
  },
  iconBackground: {
    padding: SMALL_MARGIN, borderRadius: LARGE_MARGIN, backgroundColor: WHITE_GRADIENT_END,
  },
  icon: { width: ICON_SIZE, height: ICON_SIZE, opacity: 0.8 },
});

const mapStateToProps = (state) => ({
  globalProps: {
    shouldRefreshMedia: state.shouldRefreshMedia,
    sortBy: state.sortBy,
  },
});

const mapDispatchToProps = (dispatch) => ({
  mediaGridRefreshed: () => dispatch(mediaRefreshed()),
  setMediaListLength: (number) => dispatch(setMediaQuantity(number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaGrid);
