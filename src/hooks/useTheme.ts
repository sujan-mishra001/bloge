
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../store/store";
import { toggleTheme } from "../store/slices/themeSlice";


const useTheme = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const toggle = () => {
    dispatch(toggleTheme());
  };
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return { isDarkMode, toggle };
};

export default useTheme;
