import {
  AUDIO_FORMAT, PHOTO_FORMAT, SORT_NAME, VIDEO_FORMAT,
} from '../../redux/media/mediaConsts';
import { AUDIO_TYPE, IMAGE_TYPE, VIDEO_TYPE } from '../../storage/mediaConsts';
import { getAllMediaTagObjects } from '../../storage/tagStorage';

export default async (mediaList, sortBy, format, searchInput, searchTags) => {
  let selectedMedia = filterByFormat(format, mediaList);

  selectedMedia = filterBySearchInput(searchInput, selectedMedia);

  if (searchTags.length !== 0) {
    selectedMedia = await filterByTags(selectedMedia, searchTags);
  }

  if (sortBy === SORT_NAME) {
    return selectedMedia.sort((a, b) => a.name.localeCompare(b.name));
  }
  return selectedMedia.sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
};

function filterByFormat(format, mediaList) {
  switch (format) {
    case PHOTO_FORMAT:
      return mediaList.filter((m) => m.type === IMAGE_TYPE);
    case VIDEO_FORMAT:
      return mediaList.filter((m) => m.type === VIDEO_TYPE);
    case AUDIO_FORMAT:
      return mediaList.filter((m) => m.type === AUDIO_TYPE);
    default:
      return mediaList;
  }
}

function filterBySearchInput(searchInput, selectedMedia) {
  if (searchInput !== undefined || searchInput !== '') {
    return selectedMedia.filter((m) => m.name.includes(searchInput));
  }
  return selectedMedia;
}

async function filterByTags(media, tags) {
  const mediaTagsArray = await getAllMediaTagObjects();
  const matchedMediaNames = [];
  mediaTagsArray.forEach((tagObj) => {
    if (tagObj.tags.some((ele) => tags.includes(ele))) {
      matchedMediaNames.push(tagObj.name);
    }
  });
  return media.filter((mediaObj) => matchedMediaNames.includes(mediaObj.name));
}
