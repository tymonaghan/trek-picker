import React from 'react';
import axios from "axios"

// Create a context with a default value
const UserContext = React.createContext({ username: 'unknown', rank: 'Cadet' });

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ username: 'unknown', rank: 'Cadet' });

  // make this call whenever this context provider mounts
  // set the response as "user"
  React.useEffect(() => {
    axios.get('/api/example').then(response => {
      // Assume the response has a 'data' object with 'username' and 'rank'
      setUser(response.data);
    });
  }, []);

  return (
    // any component wrapped in this provider can access the context
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
