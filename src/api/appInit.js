import { DIR_HOME, DIR_IMAGES } from '../assets/values/directories';

const RNFS = require('react-native-fs');

const init = () => {
  RNFS.mkdir(DIR_HOME)
    .then(() => console.log('init DIR_HOME'))
    .catch(() => console.log('error init DIR_HOME'));
  RNFS.mkdir(DIR_IMAGES)
    .then(() => console.log('init DIR_IMAGES'))
    .catch(() => console.log('error init DIR_IMAGES'));
};

export default init;
