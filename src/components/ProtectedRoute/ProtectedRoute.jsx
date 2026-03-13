import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const hasRequiredRole = (user, allowedRoles) => {
  if (!allowedRoles?.length) return true;
  return allowedRoles.includes(user?.role);
};

function ProtectedRoute({ component: Component, allowedRoles, redirectTo = '/home', ...rest }) {
  const { isAuthenticated, user, loading } = useSelector((state) => state.authReducer);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (loading) return null;
        if (!isAuthenticated) return <Redirect to="/login" />;
        if (!hasRequiredRole(user, allowedRoles)) return <Redirect to={redirectTo} />;
        return <Component {...routeProps} />;
      }}
    />
  );
}

export default ProtectedRoute;
