import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { auth, handleUserProfile } from '../firebase/utils'


export const signIn = createAsyncThunk('user/signIn', async ({ email, password }) => {
  await auth.signInWithEmailAndPassword(email, password)
})

export const signup = createAsyncThunk('user/signup', async ({ email, password, displayName }) => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password)
  await handleUserProfile(user, { displayName, userRoles: ['user'] })
})

export const resetPassword = createAsyncThunk('user/resetPassword', async ({ email }) => {
  const config = {
    url: 'http://localhost:3000/login'
  }
  console.log('sending')
  await auth.sendPasswordResetEmail(email, config)

})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null
  },
  reducers: {
    setCurrentUser:(state, action) => {
      state.user = action.payload
    }
  },
  extraReducers: {
    [signIn.fulfilled]: (state, action) => {
      state.status = 'succeeded'
    },
    [signIn.rejected]: (state, action) => {
      state.status = 'failed'
      state.error= action.error.message
    },


  }
  
})


export const { setCurrentUser } = userSlice.actions

export const selectUser = state => state.user.user

export default userSlice.reducer
