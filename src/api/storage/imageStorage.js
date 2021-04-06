import { DIR_FILE, DIR_IMAGES } from '../../assets/values/directories';
import map from './mediaObjectMapper';
import { IMAGE_TYPE } from './mediaConsts';
import { getAllFavoriteMediaByType } from './favoriteStorage';

const RNFS = require('react-native-fs');
const moment = require('moment');

export const saveImage = async (filePath) => {
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

export const getAllImages = async () => {
  const path = `${DIR_FILE}${DIR_IMAGES}`;
  try {
    const images = await RNFS.readDir(path);
    const favorites = await getAllFavoriteMediaByType(IMAGE_TYPE);
    return images.map((img) => map(img, IMAGE_TYPE, favorites));
  } catch (error) {
    return [];
  }
};
