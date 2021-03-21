import {
  MEDIA_GRID_REFRESHED,
  MEDIA_QUANTITY,
  REFRESH_MEDIA_GRID,
  SORT_BY_AGE,
  SORT_BY_NAME,
} from './media.types';
import { SORT_AGE, SORT_NAME } from './sortConsts';

const INITIAL_STATE = {
  shouldRefreshMedia: false,
  mediaQuantity: null,
  sortBy: SORT_AGE,
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
    case SORT_BY_AGE:
      return {
        ...state,
        sortBy: SORT_AGE,
      };
    case SORT_BY_NAME:
      return {
        ...state,
        sortBy: SORT_NAME,
      };
    default: return state;
  }
};

export default reducer;
