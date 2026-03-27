import React from 'react';
import { Navigate } from 'react-router-dom';

import { ChangePasswordForm } from '../components/ChangePasswordForm';
import { useAuth } from '../hooks/useAuth';

export const ChangePassword = () => {
  const { isLoggedIn, isEmployee } = useAuth();

  if (isLoggedIn) {
    if (isEmployee) {
      return <Navigate to="/scheduled" />;
    }

    return <Navigate to="/" />;
  }

  return <ChangePasswordForm />;
};
