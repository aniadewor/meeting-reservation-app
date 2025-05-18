import { Navigate } from "react-router-dom"
import React from "react"

interface Props {
  children: React.ReactElement
}

function PrivateRoute({ children }: Props) {
  const user = JSON.parse(localStorage.getItem("user") || "null")

  if (!user || !user.email) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
