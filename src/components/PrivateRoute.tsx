// components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import React from "react";

interface Props {
  children: React.ReactElement;
  /** Jeśli tablica ról jest podana, tylko użytkownicy z jedną z tych ról będą mieli dostęp */
  allowedRoles?: Array<"admin" | "user">;
}

function PrivateRoute({ children, allowedRoles }: Props) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Brak zalogowanego użytkownika → przekieruj do logowania
  if (!user || !user.email) {
    return <Navigate to="/login" replace />;
  }

  // Jeśli zdefiniowano allowedRoles i rola usera nie jest w tej tablicy → brak dostępu
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // W przeciwnym razie renderuj dzieci
  return children;
}

export default PrivateRoute;
