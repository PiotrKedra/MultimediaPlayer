import { createStore } from 'redux';
import reducer from './media/media.reducer';

const store = createStore(reducer);

export default store;
