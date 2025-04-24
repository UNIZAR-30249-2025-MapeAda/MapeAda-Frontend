import { useLocation, Navigate } from "react-router";
import { paths } from "../config/paths";
import { useUser } from "../lib/auth";
import { Role } from "../config/constants";

interface ProtectedRouteProps {
  allowedRoles: readonly Role[];
  children: React.ReactNode;
}

export const ProtectedRoute = ({
  allowedRoles,
  children,
}: ProtectedRouteProps) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data || !allowedRoles.includes(user.data.role))
    return (
      <Navigate
        to={paths.auth.unauthorized.getHref(location.pathname)}
        replace
      />
    );

  return children;
};
