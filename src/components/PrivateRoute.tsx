// components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactElement;
  /** Jeśli jest podana, to user.role musi być jedną z tych ról */
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;

  // Brak zalogowanego użytkownika → przekieruj do logowania
  if (!user?.email) {
    return <Navigate to="/login" replace />;
  }

  // Ograniczenie dostępu wg roli
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;