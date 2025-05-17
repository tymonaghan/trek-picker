import React, { createContext, useState } from "react";

// Create a context with a default value
const UserContext = createContext({
  username: "unknown",
  rank: "Ensign",
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "unknown", rank: "Ensign" });
  return (
    <UserContext.Provider value={{ ...user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
