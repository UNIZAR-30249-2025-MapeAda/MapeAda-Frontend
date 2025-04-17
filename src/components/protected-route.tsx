import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../lib/auth";
import { Role } from "../common/constants";
import { paths } from "../config/paths";

interface ProtectedRouteProps {
  allowedRoles: readonly Role[];
  children?: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role))
    return <Navigate to={paths.auth.unauthorized.getHref()} replace />;

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
