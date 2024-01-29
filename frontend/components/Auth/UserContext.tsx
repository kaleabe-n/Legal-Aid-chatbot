"use client";

import React, { createContext, useContext, useState } from "react";

interface UserContextType {
  userEmail: string;
  setUserEmail: (email: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userEmail, setUserEmail] = useState("");

  const value = {
    userEmail,
    setUserEmail,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
