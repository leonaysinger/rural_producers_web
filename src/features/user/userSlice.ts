import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
  name: string
  access_token: string
  refresh_token: string
  loggedIn: boolean
  hydrated: boolean
}

const initialState: UserState = {
  name: '',
  access_token: '',
  refresh_token: '',
  loggedIn: false,
  hydrated: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ name: string, access_token: string, refresh_token: string }>) {
      state.name = action.payload.name
      state.access_token = action.payload.access_token
      state.refresh_token = action.payload.refresh_token
      state.loggedIn = true
      localStorage.setItem('loggedIn', 'true')
      localStorage.setItem('name', action.payload.name)
      localStorage.setItem('access_token', action.payload.access_token)
      localStorage.setItem('refresh_token', action.payload.refresh_token)
    },
    logout(state) {
      state.name = ''
      state.access_token = ''
      state.refresh_token = ''
      state.loggedIn = false
      state.hydrated = true
      localStorage.clear()
    },
    hydrate(state) {
      state.hydrated = true
    }
  }
})

export const { login, logout, hydrate } = userSlice.actions
export default userSlice.reducer
