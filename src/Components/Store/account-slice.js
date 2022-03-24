import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  email: '',
  password: ''
};

const accountSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
      state.password = action.payload.password;
      localStorage.setItem("email", action.payload.email);
    },
    logout(state, action) {
      state.email = '';
      state.password = '';
      localStorage.removeItem("email");
    },
  },
});

export const authActions = accountSlice.actions;

export default accountSlice.reducer;