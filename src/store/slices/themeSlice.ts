import { createSlice } from "@reduxjs/toolkit";
import { clearLocalStorage, getFromLocalStorage, saveToLocalStorage, themeKey } from "../../utils/localStorage";

type ThemeState = {
  isDarkMode: boolean;
};

const storedTheme = getFromLocalStorage(themeKey);

const initialState: ThemeState = {
  isDarkMode: storedTheme !== null ? storedTheme : false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      saveToLocalStorage(themeKey, state.isDarkMode);
      if (state.isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    default: (state) => {
      state.isDarkMode = false;
      clearLocalStorage(themeKey);
      document.documentElement.classList.remove("dark");
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
