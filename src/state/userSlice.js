import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fireStore, handleUserProfile } from '../firebase/utils'



const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {}
  },
  reducers: {
    setCurrentUser:(state, action) => {
      state.user = action.payload

    
    }
  },
  extraReducers: {
    // [fetchUser.fulfilled]: (state, action) => {
    //   console.log(action.payload)
    //   state = action.payload
    // }
  }
  
})


export const { setCurrentUser } = userSlice.actions

export const selectUser = state => state.user.user

export default userSlice.reducer
