import { DIR_AUDIO, DIR_FILE } from '../../assets/values/directories';
import map from './mediaObjectMapper';
import { AUDIO_TYPE } from './mediaConsts';
import { getAllFavoriteMediaByType } from './favoriteStorage';

const RNFS = require('react-native-fs');
const moment = require('moment');

export const saveAudio = async (filePath) => {
  try {
    const newVideoName = `a${moment().format('DDMMYY_HHmmSSS')}.wav`;
    const newFilepath = `${DIR_AUDIO}/${newVideoName}`;
    await RNFS.mkdir(DIR_AUDIO);
    await RNFS.moveFile(filePath, newFilepath);
    return {
      createTime: null,
      path: { uri: newFilepath },
      name: newVideoName,
      favorite: false,
      type: AUDIO_TYPE,
    };
  } catch (error) {
    return null;
  }
};

export const getAllAudios = async () => {
  const path = `${DIR_FILE}${DIR_AUDIO}`;
  try {
    const videos = await RNFS.readDir(path);
    const favorites = await getAllFavoriteMediaByType(AUDIO_TYPE);
    return videos.map((video) => map(video, AUDIO_TYPE, favorites));
  } catch (error) {
    return [];
  }
};
