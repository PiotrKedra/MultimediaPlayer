import {
  MEDIA_GRID_REFRESHED,
  MEDIA_QUANTITY,
  REFRESH_MEDIA_GRID, SET_SEARCH_INPUT, SET_SELECTED_FORMAT,
  SORT_BY_AGE,
  SORT_BY_NAME,
} from './media.types';
import { ALL_FORMAT, SORT_AGE, SORT_NAME } from './mediaConsts';

const INITIAL_STATE = {
  shouldRefreshMedia: false,
  mediaQuantity: null,
  sortBy: SORT_AGE,
  selectedFormat: ALL_FORMAT,
  searchInput: '',
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
    case SET_SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.input,
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
    case SET_SELECTED_FORMAT:
      return {
        ...state,
        selectedFormat: action.format,
      };
    default: return state;
  }
};

export default reducer;
