import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebaseConfig"; // Import your authentication module or provider

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap your app and provide authentication context
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use the `onAuthStateChanged` event to listen for changes in authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // Value to be provided by the context
  const value = {
    currentUser,
  };

  // Render the context provider with the value
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
