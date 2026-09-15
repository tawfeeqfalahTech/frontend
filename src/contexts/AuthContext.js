"use client";
import { logout } from "@/features/auth/authApi";
import { deleteCookie, getCookie } from "@/lib/action";
import { useRouter } from "next/navigation";
import { createContext, useState, useContext } from "react";

export const Context = createContext(null);

export const AuthContext = ({ initialUser, children }) => {
  const [currentUser, setCurrentUser] = useState(initialUser);

  const router = useRouter();

  const Logout = async () => {
    try {
      const token = await getCookie("token");

      if (token) {
        await logout(token);
      }
    } catch (error) {
      console.log(error);
    } finally {
      await deleteCookie("token");
      router.replace("/login");
    }
  };

  return (
    <Context.Provider value={{ currentUser, setCurrentUser, Logout }}>
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => useContext(Context);
