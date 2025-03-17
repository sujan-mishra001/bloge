import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "../store/slices/authSlice";
import { RootState } from "../store/store";


export const useAuth = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, token, user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateSession = () => {
      if (!token || !user || !isLoggedIn) {
        dispatch(logout());
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    };
    validateSession();
  }, [dispatch, token, user, isLoggedIn]);

  return { isLoggedIn, token, user, isLoading };
};
