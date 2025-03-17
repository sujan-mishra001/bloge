import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearSessionStorage, getFromSessionStorage, saveToSessionStorage, tokenKey, userKey } from "../../utils/sessionStorage";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: any;
}


const storedToken = getFromSessionStorage(tokenKey);
const storedUser = getFromSessionStorage(userKey);

const initialState: AuthState = {
  isLoggedIn: storedToken ? true : false,
  token: storedToken ?? null,
  user: storedUser ?? null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      saveToSessionStorage(tokenKey, action.payload.token);
      saveToSessionStorage(userKey, action.payload.user);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      clearSessionStorage(tokenKey);
      clearSessionStorage(userKey);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
