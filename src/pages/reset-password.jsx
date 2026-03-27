import React from 'react';
import { Navigate } from 'react-router-dom';

import { ResetPasswordForm } from '../components/ResetPasswordForm';
import { useAuth } from '../hooks/useAuth';

export const ResetPassword = () => {
  const { isLoggedIn, isEmployee } = useAuth();

  if (isLoggedIn) {
    if (isEmployee) {
      return <Navigate to="/scheduled" />;
    }

    return <Navigate to="/" />;
  }

  return <ResetPasswordForm />;
};
