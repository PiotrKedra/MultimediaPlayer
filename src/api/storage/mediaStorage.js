import { getAllImages } from './imageStorage';
import { getAllVideos } from './videoStorage';

const getAllMedia = async () => {
  const images = await getAllImages();
  const videos = await getAllVideos();
  return images.concat(videos);
};

export default getAllMedia;
