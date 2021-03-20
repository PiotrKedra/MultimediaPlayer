import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Image, FlatList, Dimensions, Pressable,
} from 'react-native';
import { connect } from 'react-redux';
import { getAllImages } from '../storage/storage';
import { mediaRefreshed, setMediaQuantity } from '../redux/media/media.actions';

const MAX_X_CORD = Dimensions.get('window').width * 0.6;

const MediaGrid = ({
  navigation, shouldRefreshMedia, mediaGridRefreshed, setMediaListLength, showDetails,
}) => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    loadMedia();
    mediaGridRefreshed();
  }, [shouldRefreshMedia]);

  const loadMedia = () => {
    getAllImages().then((result) => {
      setMedia(result);
      setMediaListLength(result.length);
    });
  };

  const showDetailsModal = (nativeEvent, details) => {
    const style = {
      position: 'absolute',
      top: nativeEvent.pageY - 80,
      left: nativeEvent.pageX > MAX_X_CORD ? MAX_X_CORD : nativeEvent.pageX,
    };
    const detailsObject = {
      style,
      ...details,
    };
    showDetails(detailsObject);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={media}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('ImgDetailScreen', { img: item })}
            onLongPress={({ nativeEvent }) => showDetailsModal(nativeEvent, item)}
          >
            <Image
              style={styles.imageThumbnail}
              source={item.path}
            />
          </Pressable>
        )}
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const imgSize = (Dimensions.get('window').width / 3) - 4;

const styles = StyleSheet.create({
  container: { flex: 1, marginRight: 3 },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: imgSize,
    width: imgSize,
    marginLeft: 3,
    marginBottom: 2,
  },
});

const mapStateToProps = (state) => ({
  shouldRefreshMedia: state.shouldRefreshMedia,
});

const mapDispatchToProps = (dispatch) => ({
  mediaGridRefreshed: () => dispatch(mediaRefreshed()),
  setMediaListLength: (number) => dispatch(setMediaQuantity(number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaGrid);
