import {
  AUDIO_FORMAT, PHOTO_FORMAT, SORT_NAME, VIDEO_FORMAT,
} from '../../redux/media/mediaConsts';
import { AUDIO_TYPE, IMAGE_TYPE, VIDEO_TYPE } from '../../storage/mediaConsts';

export default (mediaList, sortBy, format, searchInput) => {
  let selectedMedia;
  switch (format) {
    case PHOTO_FORMAT:
      selectedMedia = mediaList.filter((m) => m.type === IMAGE_TYPE);
      break;
    case VIDEO_FORMAT:
      selectedMedia = mediaList.filter((m) => m.type === VIDEO_TYPE);
      break;
    case AUDIO_FORMAT:
      selectedMedia = mediaList.filter((m) => m.type === AUDIO_TYPE);
      break;
    default:
      selectedMedia = mediaList;
  }

  if (searchInput !== undefined || searchInput !== '') {
    selectedMedia = selectedMedia.filter((m) => m.name.includes(searchInput));
  }

  if (sortBy === SORT_NAME) {
    return selectedMedia.sort((a, b) => a.name.localeCompare(b.name));
  }
  return selectedMedia.sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
};
