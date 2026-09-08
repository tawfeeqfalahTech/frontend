"use client";
import { createContext, useState, useContext } from "react";

export const Context = createContext(null);

export const AuthContext = ({ children, initialUser }) => {
  const [currentUser, setCurrentUser] = useState(initialUser);
  return (
    <Context.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => useContext(Context);
