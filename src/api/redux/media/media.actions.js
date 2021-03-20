import { MEDIA_GRID_REFRESHED, MEDIA_QUANTITY, REFRESH_MEDIA_GRID } from './media.types';

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
