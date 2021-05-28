import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { FirebaseContext } from './context/firebase';
import { firebase } from './firebase/utils'
import store from './state/store';
ReactDOM.render(
  <React.StrictMode>

   
    <BrowserRouter>
     <FirebaseContext.Provider value={{ firebase }}>
      <Provider store={store}>
        <App />

      </Provider>
      
    </FirebaseContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

