import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITE_IMAGES = '@favorite_images';

export const addToFavorite = async (imgName) => {
  try {
    const images = await getAllFavoriteImages();
    images.push(imgName);
    const jsonValue = JSON.stringify(images);
    await AsyncStorage.setItem(FAVORITE_IMAGES, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const removeFromFavorite = async (imgName) => {
  try {
    const images = await getAllFavoriteImages();
    const result = images.filter((e) => e !== imgName);
    const jsonValue = JSON.stringify(result);
    await AsyncStorage.setItem(FAVORITE_IMAGES, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getAllFavoriteImages = async () => {
  try {
    const value = await AsyncStorage.getItem(FAVORITE_IMAGES);
    if (value !== null) {
      return JSON.parse(value);
    }
    return [];
  } catch (e) {
    return [];
  }
};
