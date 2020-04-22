import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import store from '../redux/store';

interface IProps {}

const ReduxContext: React.FC<IProps> = (props) => (
  <ReduxProvider store={store}>
    {props.children}
  </ReduxProvider>
);

export default ReduxContext;
