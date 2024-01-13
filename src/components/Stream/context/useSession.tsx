"use client";

interface UserTypes {
  username: "";
  avatar: "";
  password: "";
  email: "";
  token: "";
}

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface AuthContextType {
  user: UserTypes | null;
  setAuthData: (userData: UserTypes) => void;
}

const UseSession = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserTypes | null>(null);

  useEffect(() => {
    const infoSession = sessionStorage.getItem("userData");
    if (infoSession) {
      setUser(JSON.parse(infoSession));
    }
  }, []);

  const setAuthData = (userData: UserTypes) => {
    setUser(userData);

    sessionStorage.setItem("userData", JSON.stringify(userData));
  };

  return (
    <UseSession.Provider value={{ user, setAuthData }}>
      {children}
    </UseSession.Provider>
  );
}

export function useAuth() {
  const context = useContext(UseSession);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
