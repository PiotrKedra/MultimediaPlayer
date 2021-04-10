import { DIR_FILE, DIR_VIDEOS } from '../../assets/values/directories';
import map from './mediaObjectMapper';
import { VIDEO_TYPE } from './mediaConsts';
import { getAllFavoriteMediaByType } from './favoriteStorage';

const RNFS = require('react-native-fs');
const moment = require('moment');

export const saveVideo = async (filePath) => {
  try {
    const newVideoName = `v${moment().format('DDMMYY_HHmmSSS')}.mp4`;
    const newFilepath = `${DIR_VIDEOS}/${newVideoName}`;
    await RNFS.mkdir(DIR_VIDEOS);
    await RNFS.moveFile(filePath, newFilepath);
    return {
      createTime: null,
      path: { uri: newFilepath },
      name: newVideoName,
      favorite: false,
      type: VIDEO_TYPE,
    };
  } catch (error) {
    return null;
  }
};

export const getAllVideos = async () => {
  const path = `${DIR_FILE}${DIR_VIDEOS}`;
  try {
    const videos = await RNFS.readDir(path);
    const favorites = await getAllFavoriteMediaByType(VIDEO_TYPE);
    return videos.map((video) => map(video, VIDEO_TYPE, favorites));
  } catch (error) {
    return [];
  }
};
