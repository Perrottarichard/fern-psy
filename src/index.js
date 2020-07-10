import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store } from './store'
import { persistor } from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import SpinningLoader from './components/SpinningLoader';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<SpinningLoader />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  ,
  document.getElementById('root')
);