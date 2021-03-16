import { MEDIA_GRID_REFRESHED, REFRESH_MEDIA_GRID } from './media.types';

const INITIAL_STATE = {
  shouldRefreshMedia: false,
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
    default: return state;
  }
};

export default reducer;
