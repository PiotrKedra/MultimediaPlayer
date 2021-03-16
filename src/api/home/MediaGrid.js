import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Image, FlatList, Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getAllImages } from '../storage/storage';
import { mediaRefreshed } from '../redux/media/media.actions';

const MediaGrid = ({ navigation, shouldRefreshMedia, mediaGridRefreshed }) => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    loadMedia();
    mediaGridRefreshed();
  }, [shouldRefreshMedia]);

  const loadMedia = () => {
    getAllImages().then((result) => setMedia(result));
  };

  console.log(media.length);
  return (
    <View style={{
      flex: 1,
      marginRight: 2,
    }}
    >
      <FlatList
        data={media}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ImgDetailScreen', { img: item })}>
            <Image
              style={styles.imageThumbnail}
              source={item.path}
            />
          </TouchableOpacity>
        )}
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const imgSize = (Dimensions.get('window').width / 3) - 8;

const styles = StyleSheet.create({
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: imgSize,
    width: imgSize,
    marginLeft: 2,
    marginBottom: 2,
  },
});

const mapStateToProps = (state) => ({
  shouldRefreshMedia: state.shouldRefreshMedia,
});

const mapDispatchToProps = (dispatch) => ({
  mediaGridRefreshed: () => dispatch(mediaRefreshed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaGrid);
