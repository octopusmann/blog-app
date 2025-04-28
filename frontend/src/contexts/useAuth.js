import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { is_authenticated, login } from "../endpoints/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const get_authenticated = async () => {
    try {
      const success = await is_authenticated();
      setIsAuthenticated(success);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login_user = async (username, password) => {
    const success = await login(username, password);
    if (success) {
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  useEffect(() => {
    get_authenticated();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, loading, login_user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
