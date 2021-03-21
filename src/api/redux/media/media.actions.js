import {
  MEDIA_GRID_REFRESHED,
  MEDIA_QUANTITY,
  REFRESH_MEDIA_GRID,
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
