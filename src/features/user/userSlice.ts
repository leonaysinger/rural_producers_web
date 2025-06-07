import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  name: string
  loggedIn: boolean
}

const initialState: UserState = {
  name: '',
  loggedIn: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.name = action.payload
      state.loggedIn = true
      localStorage.setItem('loggedIn', 'true')
      localStorage.setItem('name', action.payload)
    },
    logout(state) {
      state.name = ''
      state.loggedIn = false
      localStorage.removeItem('loggedIn')
      localStorage.removeItem('name')
    },
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
