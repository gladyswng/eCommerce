import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { FirebaseContext } from './context/firebase';
import { firebase } from './firebase/utils'
ReactDOM.render(
  <React.StrictMode>
   
    <BrowserRouter>
     <FirebaseContext.Provider value={{ firebase }}>
      <App />
      
    </FirebaseContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

