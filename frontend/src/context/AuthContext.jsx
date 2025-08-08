import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const BE_URL = import.meta.env.VITE_BE_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // Stores { id, name, email, role }
  const [loading, setLoading] = useState(true); // Shows spinner while checking auth

  // Fetch user on first load (based on token in cookies)
  
  
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BE_URL}/api/auth/me`, {
          withCredentials: true,  // send cookie
        });
        setUser(res.data.user); // Save user data in context
      } catch (err) {
        setUser(null); // Not logged in
      } finally {
        setLoading(false);
      }
    };
   
   useEffect(() => {
    fetchUser();
  }, []);


  // Logout function
  const logout = async () => {
    await axios.post(`${BE_URL}/api/auth/logout`, {}, {
      withCredentials: true,
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use context
export const useAuth = () => useContext(AuthContext);
