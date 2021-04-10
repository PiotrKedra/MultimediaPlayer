import { getAllImages } from './imageStorage';
import { getAllVideos } from './videoStorage';
import { removeFromFavorite } from './favoriteStorage';
import { getAllAudios } from './audioStorage';

const RNFS = require('react-native-fs');

const getAllMedia = async () => {
  const images = await getAllImages();
  const videos = await getAllVideos();
  const audios = await getAllAudios();
  return images.concat(videos, audios);
};

export const deleteMedia = (media) => {
  RNFS.unlink(media.path.uri)
    .then(() => removeFromFavorite(media.name, media.type))
    .catch((e) => console.log(e));
};

export default getAllMedia;
