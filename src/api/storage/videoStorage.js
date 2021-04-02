import { DIR_FILE, DIR_VIDEOS } from '../../assets/values/directories';
import map from './mapper';
import { VIDEO_TYPE } from './mediaConsts';

const RNFS = require('react-native-fs');
const moment = require('moment');

export const saveVideo = async (filePath) => {
  try {
    const newVideoName = `v${moment().format('DDMMYY_HHmmSSS')}.mp4`;
    const newFilepath = `${DIR_VIDEOS}/${newVideoName}`;
    await RNFS.mkdir(DIR_VIDEOS);
    await RNFS.moveFile(filePath, newFilepath);
    return newFilepath;
  } catch (error) {
    return null;
  }
};

export const getAllVideos = async () => {
  const path = `${DIR_FILE}${DIR_VIDEOS}`;
  try {
    const videos = await RNFS.readDir(path);
    return videos.map((video) => map(video, VIDEO_TYPE, []));
  } catch (error) {
    return [];
  }
};

// const mapImgObject = (img, favorites) => ({
//   createTime: img.mtime.toString(),
//   path: { uri: `${DIR_FILE}${img.path}` },
//   name: img.name,
//   favorite: isFavorite(favorites, img),
// });
