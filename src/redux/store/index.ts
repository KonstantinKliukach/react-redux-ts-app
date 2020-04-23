import { combineReducers, createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import userEventsReducer from 'redux/reducers/userEvents';
import recorderReducer from 'redux/reducers/recorder';

const rootReducer = combineReducers({
  userEvents: userEventsReducer,
  recorder: recorderReducer,
});

// eslint-disable-next-line no-undef
export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
