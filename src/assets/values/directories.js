import { Platform } from 'react-native';

const RNFS = require('react-native-fs');

export const DIR_FILE = 'file://';
export const DIR_HOME = Platform.select({
  ios: `${RNFS.DocumentDirectoryPath}/mplayer`,
  android: `${RNFS.ExternalStorageDirectoryPath}/mplayer`,
});

export const DIR_IMAGES = `${DIR_HOME}/images`;
export const DIR_VIDEOS = `${DIR_HOME}/videos`;
export const DIR_AUDIO = `${DIR_HOME}/audio`;
