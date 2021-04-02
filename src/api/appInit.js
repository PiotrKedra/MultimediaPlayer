import {
  DIR_AUDIO, DIR_HOME, DIR_IMAGES, DIR_VIDEOS,
} from '../assets/values/directories';

const RNFS = require('react-native-fs');

const init = () => {
  RNFS.mkdir(DIR_HOME)
    .then(() => console.log('init DIR_HOME'))
    .catch(() => console.log('error init DIR_HOME'));
  RNFS.mkdir(DIR_IMAGES)
    .then(() => console.log('init DIR_IMAGES'))
    .catch(() => console.log('error init DIR_IMAGES'));
  RNFS.mkdir(DIR_VIDEOS)
    .then(() => console.log('init DIR_VIDEOS'))
    .catch(() => console.log('error init DIR_VIDEOS'));
  RNFS.mkdir(DIR_AUDIO)
    .then(() => console.log('init DIR_AUDIO'))
    .catch(() => console.log('error init DIR_AUDIO'));
};

export default init;
