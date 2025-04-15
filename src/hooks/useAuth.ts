import React from "react";
import { useDispatch } from "react-redux";

import { addCurrent, removeCurrent } from "@/store/currentUserSlice";

const TOKEN_KEY = "token_key";

export const useAuth = () => {
  const dispatch = useDispatch();

  const logIn = () => {
    localStorage.setItem(TOKEN_KEY, "token");
    dispatch(addCurrent({ isAuthenticated: true, token: "toke" }));
  };

  const logOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    dispatch(removeCurrent());
  };

  React.useEffect(() => {
    const currentToken = localStorage.getItem(TOKEN_KEY);

    if (currentToken) {
      dispatch(addCurrent({ isAuthenticated: true, token: currentToken }));
    }
  }, []);

  return { logIn, logOut };
};
