import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  email: '',
  password: ''
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      console.log("asdasd");
      console.log(action.payload);
      console.log("asdasd");
      state.email = action.payload.email;
      state.password = action.payload.password;
      localStorage.setItem("email", action.payload.email);
    },
    logout() {
      localStorage.removeItem("email");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;