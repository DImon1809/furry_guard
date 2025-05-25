// Todo legacy
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/store";
import { setAuth } from "@/store/features/auth/authSlice";

const TOKEN_KEY = "token_key";

export const useAuth = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const logIn = () => {
    localStorage.setItem(TOKEN_KEY, "token");
    dispatch(setAuth({ isAuthenticated: true, token: "token" }));
    navigate("/");
  };

  const logOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    dispatch(removeCurrent());
    navigate("/");
  };

  return { logIn, logOut };
};
