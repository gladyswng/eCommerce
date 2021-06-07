import { configureStore } from "@reduxjs/toolkit";

import userReducer from './userSlice'
import productReducer from './productSlice'
import cartReducer from './cartSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    products : productReducer,
    cart: cartReducer
  }
})