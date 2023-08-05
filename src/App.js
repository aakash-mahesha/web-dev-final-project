import React from 'react';
import Map from './map';
import LoginComponent from './login-component';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import auth from './auth-reducers';
import LoginStateDisplay from './login-component/login-state-display';

const store = configureStore({reducer:{auth}});
const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Mapbox GL JS in React</h1>
        <Map />
        <LoginComponent/>
        <LoginStateDisplay/>
      </div>
    </Provider>
  );
};

export default App;