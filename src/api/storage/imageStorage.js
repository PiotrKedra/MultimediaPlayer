import { DIR_FILE, DIR_IMAGES } from '../../assets/values/directories';
import { getAllFavoriteImages, removeFromFavorite } from './imageFavoriteStorage';
import map from './mapper';
import { IMAGE_TYPE } from './mediaConsts';

const RNFS = require('react-native-fs');
const moment = require('moment');

const saveImage = async (filePath) => {
  try {
    const newImageName = `i${moment().format('DDMMYY_HHmmSSS')}.jpg`;
    const newFilepath = `${DIR_IMAGES}/${newImageName}`;
    await RNFS.mkdir(DIR_IMAGES);
    await RNFS.moveFile(filePath, newFilepath);
    return newFilepath;
  } catch (error) {
    return null;
  }
};

const getAllImages = async () => {
  const path = `${DIR_FILE}${DIR_IMAGES}`;
  try {
    const images = await RNFS.readDir(path);
    const favorites = await getAllFavoriteImages();
    return images.map((img) => map(img, IMAGE_TYPE, favorites));
  } catch (error) {
    return [];
  }
};

const deleteImg = (img) => {
  RNFS.unlink(img.path.uri)
    .then(() => removeFromFavorite(img.name))
    .catch((e) => console.log(e));
};

export { saveImage, getAllImages, deleteImg };
