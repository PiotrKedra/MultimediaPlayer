import { MEDIA_GRID_REFRESHED, REFRESH_MEDIA_GRID } from './media.types';

export const refreshMedia = () => ({
  type: REFRESH_MEDIA_GRID,
});

export const mediaRefreshed = () => ({
  type: MEDIA_GRID_REFRESHED,
});
