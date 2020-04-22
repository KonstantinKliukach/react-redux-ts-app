import { combineReducers, createStore } from 'redux';

import userEventsReducer from '../reducers/userEvents';
import recorderReducer from '../reducers/recorder';

const rootReducer = combineReducers({
  userEvents: userEventsReducer,
  recorder: recorderReducer,
});

// eslint-disable-next-line no-undef
export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
