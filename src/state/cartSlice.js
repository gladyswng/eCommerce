import { createSelector, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart', 
  initialState: {
    cart:[],
    // totalPrice: 0,

    
  },
  reducers: {
    addToCart(state, action) {

      const productIndex = state.cart.findIndex(item => item.documentID === action.payload.documentID)

      if (productIndex > -1) {
      const quantity = state.cart[productIndex].quantity + 1
      state.cart[productIndex] = {...action.payload, quantity}
      } else {
        state.cart.push({...action.payload, quantity: 1})
      }
      // state.totalPrice += parseInt(action.payload.productPrice)
      
    },
    removeFromCart(state, action) {
      state.cart.filter(item => item.id === action.payload.documentID)
      // state.totalPrice -= parseInt(action.payload.productPrice)
      
    }
  },

})
export const { addToCart, removeFromCart} = cartSlice.actions


export default cartSlice.reducer

export const selectCart = state => state.cart.cart

export const selectTotalItem = createSelector([selectCart], (items) => items.reduce((quantity, cartItem) => quantity + cartItem.quantity, 0))

export const selectTotalPrice = createSelector([selectCart], items => items.reduce((price, item) => price + item.quantity * item.productPrice,0))
