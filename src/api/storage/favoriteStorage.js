import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUDIO_TYPE, IMAGE_TYPE, VIDEO_TYPE } from './mediaConsts';

const FAVORITE_IMAGES = '@favorite_images';
const FAVORITE_VIDEOS = '@favorite_videos';
const FAVORITE_AUDIO = '@favorite_audio';

export const addToFavorite = async (mediaName, type) => {
  try {
    const mediaByType = await getAllFavoriteMediaByType(type);
    mediaByType.push(mediaName);
    const jsonValue = JSON.stringify(mediaByType);
    await AsyncStorage.setItem(mapType(type), jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const removeFromFavorite = async (mediaName, type) => {
  try {
    const mediaByType = await getAllFavoriteMediaByType(type);
    const result = mediaByType.filter((e) => e !== mediaName);
    const jsonValue = JSON.stringify(result);
    await AsyncStorage.setItem(mapType(type), jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getAllFavoriteMediaByType = async (type) => {
  try {
    const value = await AsyncStorage.getItem(mapType(type));
    if (value !== null) {
      return JSON.parse(value);
    }
    return [];
  } catch (e) {
    return [];
  }
};

const mapType = (type) => {
  switch (type) {
    case IMAGE_TYPE:
      return FAVORITE_IMAGES;
    case VIDEO_TYPE:
      return FAVORITE_VIDEOS;
    case AUDIO_TYPE:
      return FAVORITE_AUDIO;
    default:
      return null;
  }
};
