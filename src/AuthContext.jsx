import React from 'react';
import { useNavigate } from 'react-router-dom';

import axios from './services/axios';
import { fetchCurrentUser } from './services/fetchCurrentUser';
import { getTokenFromLocalStorage } from './utils/getTokenFromLocalStorage';

const tokenFromLocalStorage = getTokenFromLocalStorage();

const defaultContextValue = {
  isLoggedIn: false,
  isAdmin: false,
  isManager: false,
  isOwner: false,
  isEmployee: false,
  company: null,
  user: {},
};

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(tokenFromLocalStorage);
  const [auth, setAuth] = React.useState(defaultContextValue);
  const [isLoading, setIsLoading] = React.useState(true);

  const navigate = useNavigate();

  const handleLogout = React.useCallback(() => {
    setAuth(defaultContextValue);
    setToken(null);
    navigate('/login');
    window.localStorage.removeItem('auth');
  }, [navigate]);

  const getUser = () => {
    fetchCurrentUser()
      .then(({ user, company }) => {
        const authData = {
          isLoggedIn: true,
          ...(user.role === 'manager' && { isManager: true }),
          ...(user.role === 'employee' && { isEmployee: true }),
          ...(user.role === 'admin' && { isAdmin: true }),
          ...(user.role === 'owner' && { isOwner: true }),
          company,
          user,
        };

        setAuth(authData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    if (token) {
      getUser();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const handleLogin = (fields) => new Promise((resolve, reject) => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/signin`, fields)
      .then(({ data }) => {
        setToken(data.token);
        window.localStorage.setItem('auth', data.token);
        resolve();
      })
      .catch((err) => {
        reject(err.response.data || {});
      });
  });

  const value = React.useMemo(() => ({
    ...auth,
    isLoading,
    USER_TYPES: {
      ADMIN: 'admin',
      MANAGER: 'manager',
      EMPLOYEE: 'employee',
      OWNER: 'owner',
    },
    onLogin: handleLogin,
    onLogout: handleLogout,
  }), [auth, handleLogout, isLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
