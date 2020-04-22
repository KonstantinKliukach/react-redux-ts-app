import { combineReducers, createStore } from 'redux';

import userEventsReducer from '../reducers/userEvents';

const rootReducer = combineReducers({
  userEvents: userEventsReducer,
});

// eslint-disable-next-line no-undef
export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
