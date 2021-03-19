import { DIR_FILE, DIR_IMAGES } from '../../assets/values/directories';

const RNFS = require('react-native-fs');
const moment = require('moment');

const saveImage = async (filePath) => {
  try {
    const newImageName = `${moment().format('DDMMYY_HHmmSSS')}.jpg`;
    const newFilepath = `${DIR_IMAGES}/${newImageName}`;
    await RNFS.mkdir(DIR_IMAGES);
    await RNFS.moveFile(filePath, newFilepath);
    return newFilepath;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAllImages = async () => {
  const path = `${DIR_FILE}${DIR_IMAGES}`;
  try {
    const images = await RNFS.readDir(path);
    return images.map((img) => mapImgObject(img));
  } catch (error) {
    console.log(error);
    return [];
  }
};

const mapImgObject = (img) => ({
  createTime: img.mtime.toString(),
  path: { uri: `${DIR_FILE}${img.path}` },
  name: img.name,
});

const deleteImg = (img) => {
  RNFS.unlink(img.path.uri)
    .then(() => console.log('deleted file'))
    .catch((e) => console.log(e));
};

export { saveImage, getAllImages, deleteImg };
