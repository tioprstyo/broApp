/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Route from '../routes';
import { Provider } from 'react-redux';
import { store } from './redux';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};


export default App;
