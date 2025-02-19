// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext); // Correct hook to access context

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const setUser = (data) => {
    setUserData(data);
  };

  return (
    <UserContext.Provider value={{ userData, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
