import React from 'react';
import { Navigate } from 'react-router-dom';

import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
  const { isLoggedIn, isEmployee } = useAuth();

  if (isLoggedIn) {
    if (isEmployee) {
      return <Navigate to="/scheduled" />;
    }

    return <Navigate to="/" />;
  }

  return <LoginForm />;
};
