import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addCurrent, removeCurrent } from "@/store/currentUserSlice";

const TOKEN_KEY = "token_key";

export const useAuth = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logIn = () => {
    localStorage.setItem(TOKEN_KEY, "token");
    dispatch(addCurrent({ isAuthenticated: true, token: "token" }));
    navigate("/");
  };

  const logOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    dispatch(removeCurrent());
    navigate("/");
  };

  return { logIn, logOut };
};
