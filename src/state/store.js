import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

// persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './userSlice'
import productReducer from './productSlice'
import cartReducer from './cartSlice'


const reducers = combineReducers({
    user: userReducer,
    products : productReducer,
    cart: cartReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, reducers)


export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

