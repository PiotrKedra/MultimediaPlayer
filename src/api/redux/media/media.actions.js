import {
  MEDIA_GRID_REFRESHED,
  MEDIA_QUANTITY,
  REFRESH_MEDIA_GRID, SET_SEARCH_INPUT, SET_SEARCH_TAGS, SET_SELECTED_FORMAT,
  SORT_BY_AGE,
  SORT_BY_NAME,
} from './media.types';

export const refreshMedia = () => ({
  type: REFRESH_MEDIA_GRID,
});

export const mediaRefreshed = () => ({
  type: MEDIA_GRID_REFRESHED,
});

export const setMediaQuantity = (number) => ({
  type: MEDIA_QUANTITY,
  mediaQuantity: number,
});

export const sortByAge = () => ({
  type: SORT_BY_AGE,
});

export const sortByName = () => ({
  type: SORT_BY_NAME,
});

export const setSelectedFormat = (format) => ({
  type: SET_SELECTED_FORMAT,
  format,
});

export const setSearchInput = (input) => ({
  type: SET_SEARCH_INPUT,
  input,
});

export const setSearchTags = (searchTags) => ({
  type: SET_SEARCH_TAGS,
  searchTags,
});
