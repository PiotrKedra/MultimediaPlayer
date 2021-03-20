import { MEDIA_GRID_REFRESHED, MEDIA_QUANTITY, REFRESH_MEDIA_GRID } from './media.types';

const INITIAL_STATE = {
  shouldRefreshMedia: false,
  mediaQuantity: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REFRESH_MEDIA_GRID:
      return {
        ...state,
        shouldRefreshMedia: true,
      };
    case MEDIA_GRID_REFRESHED:
      return {
        ...state,
        shouldRefreshMedia: false,
      };
    case MEDIA_QUANTITY:
      return {
        ...state,
        mediaQuantity: action.mediaQuantity,
      };
    default: return state;
  }
};

export default reducer;
