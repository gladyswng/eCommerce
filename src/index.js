import './wdyr'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { FirebaseContext } from './context/firebase';
import { firebase } from './firebase/utils'
import store from './state/store';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';


let persistor = persistStore(store)

App.whyDidYouRender = true
ReactDOM.render(
  <React.StrictMode>

   
    <BrowserRouter>
     <FirebaseContext.Provider value={{ firebase }}>
      <Provider store={store}>

        <PersistGate loading={null} persistor={persistor}>
          <App />

        </PersistGate>

      </Provider>
      
    </FirebaseContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

