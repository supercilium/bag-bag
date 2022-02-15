import React from "react";
import { User } from "../types/user";

export const AuthContext = React.createContext<{
  user?: User;
  setUser?: (user?: User) => void;
}>({});
