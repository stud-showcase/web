import { createContext, Dispatch, SetStateAction } from "react";

export const AuthContext = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}>({
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" ? true : false,
  setIsLoggedIn: () => {},
});
