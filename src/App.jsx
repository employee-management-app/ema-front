import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import { AuthProvider } from './AuthContext';
import { Header } from './components/Header';
import { CreateOrderDrawer } from './components/CreateOrderDrawer';
import { FiltersDrawer } from './components/FIltersDrawer';
import { EditOrderDrawer } from './components/EditOrderDrawer';
import { DuplicateOrderDrawer } from './components/DuplicateOrderDrawer';
import { AddEmployeeModal } from './components/AddEmployeeModal';
import { AddManagerModal } from './components/AddManagerModal';
import { AddCompanyModal } from './components/AddCompanyModal';
import { EditEmployeeModal } from './components/EditEmployeeModal';
import { CompleteOrderModal } from './components/CompleteOrderModal';
import { DeleteOrderModal } from './components/DeleteOrderModal';
import { AssignOrderModal } from './components/AssignOrderModal';
import { ScheduleOrderModal } from './components/ScheduleOrderModal';
import { OverlapOrdersModal } from './components/OverlapOrdersModal';
import { Notifications } from './components/Notifications';
import { AppSpinner } from './components/AppSpinner';
import { useAuth } from './hooks/useAuth';
import { Anytime } from './pages/anytime';
import { Completed } from './pages/completed';
import { Employees } from './pages/employees';
import { Managers } from './pages/managers';
import { Error } from './pages/error';
import { Inbox } from './pages/inbox';
import { Invitation } from './pages/invitation';
import { Login } from './pages/login';
import { Scheduled } from './pages/scheduled';
import { Order } from './pages/order';
import { UI } from './pages/ui';
import { Companies } from './pages/companies';
import { ResetPassword } from './pages/reset-password';
import { ChangePassword } from './pages/change-password';
import { EditManagerModal } from './components/EditManagerModal';

const ProtectedRoute = ({ children, roles }) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { isLoggedIn, isLoading, USER_TYPES } = useAuth();

  if (isLoading) {
    return <AppSpinner />;
  }

  return (
    <>
      <Routes>
        {/* Mixed views */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/invitation/:token" element={<Invitation />} />
        <Route
          path="/"
          element={(
            <ProtectedRoute>
              <Inbox />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/list"
          element={(
            <ProtectedRoute>
              <Inbox />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/timeline"
          element={(
            <ProtectedRoute>
              <Inbox />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/orders/:id"
          element={(
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/completed"
          element={(
            <ProtectedRoute>
              <Completed />
            </ProtectedRoute>
          )}
        />
        <Route path="/ui" element={<UI />} />
        <Route path="*" element={<Error />} />
        {/* Admin views */}
        <Route
          path="/companies"
          element={(
            <ProtectedRoute roles={[USER_TYPES.ADMIN]}>
              <Companies />
            </ProtectedRoute>
          )}
        />
        {/* Manager views */}
        <Route
          path="/employees"
          element={(
            <ProtectedRoute roles={[USER_TYPES.OWNER, USER_TYPES.MANAGER]}>
              <Employees />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/managers"
          element={(
            <ProtectedRoute roles={[USER_TYPES.OWNER]}>
              <Managers />
            </ProtectedRoute>
          )}
        />
        {/* Employee views */}
        <Route
          path="/anytime"
          element={(
            <ProtectedRoute roles={[USER_TYPES.EMPLOYEE]}>
              <Anytime />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/anytime/list"
          element={(
            <ProtectedRoute roles={[USER_TYPES.EMPLOYEE]}>
              <Anytime />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/anytime/timeline"
          element={(
            <ProtectedRoute roles={[USER_TYPES.EMPLOYEE]}>
              <Anytime />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/scheduled"
          element={(
            <ProtectedRoute roles={[USER_TYPES.EMPLOYEE, USER_TYPES.OWNER, USER_TYPES.MANAGER]}>
              <Scheduled />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/scheduled/list"
          element={(
            <ProtectedRoute roles={[USER_TYPES.EMPLOYEE, USER_TYPES.OWNER, USER_TYPES.MANAGER]}>
              <Scheduled />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/scheduled/timeline"
          element={(
            <ProtectedRoute roles={[USER_TYPES.EMPLOYEE, USER_TYPES.OWNER, USER_TYPES.MANAGER]}>
              <Scheduled />
            </ProtectedRoute>
          )}
        />
      </Routes>
      {isLoggedIn && (
        <>
          <FiltersDrawer />
          <CreateOrderDrawer />
          <EditOrderDrawer />
          <DuplicateOrderDrawer />
          <AddEmployeeModal />
          <AddManagerModal />
          <AddCompanyModal />
          <EditEmployeeModal />
          <EditManagerModal />
          <CompleteOrderModal />
          <DeleteOrderModal />
          <AssignOrderModal />
          <ScheduleOrderModal />
          <OverlapOrdersModal />
        </>
      )}
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <AuthProvider>
        <Header />
        <main>
          <AppRoutes />
        </main>
      </AuthProvider>
      <Notifications />
    </QueryParamProvider>
  </BrowserRouter>
);

export default App;
