import { useLocation, Navigate } from "react-router";
import { paths } from "../config/paths";
import { useUser } from "../lib/auth";
import { Rol } from "../features/auth/types/enums";

interface ProtectedRouteProps {
  allowedRoles: readonly Rol[];
  children: React.ReactNode;
}

export const ProtectedRoute = ({
  allowedRoles,
  children,
}: ProtectedRouteProps) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data || !allowedRoles.includes(user.data.rol))
    return (
      <Navigate
        to={paths.auth.unauthorized.getHref(location.pathname)}
        replace
      />
    );

  return children;
};
