import {
  faCircleUser,
  faBookmark,
  faEye,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Link, useNavigate } from "react-router";
import { paths } from "../../config/paths";
import { useUser, useLogout } from "../../lib/auth";
import { ADMIN_ROLE } from "../../features/auth/types/enums";

interface UserMenuProps {
  className?: string;
}

export const UserMenu: FC<UserMenuProps> = ({ className = "" }) => {
  const user = useUser();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout.mutate(undefined);
    navigate(paths.auth.login.getHref());
  };

  return (
    <div className={`dropdown ${className}`}>
      <button
        className="btn rounded-circle p-0 h-100 shadow"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <FontAwesomeIcon
          icon={faCircleUser}
          className="h-100 bg-white rounded-circle"
        />
      </button>
      <div
        className="dropdown-menu mt-3 p-2 border-0 bg-light text-center shadow"
        style={{ minWidth: "300px" }}
      >
        <div className="d-flex mb-2">
          <div className="col-1" />
          <span className="text-muted col">{user.data?.email}</span>
          <button
            type="button"
            className="btn-close col-1"
            aria-label="Close"
          ></button>
        </div>
        <span className="fs-5 fw-bold">¡Hola {user.data?.nombre}!</span>
        <div className="bg-white rounded mt-3">
          <Link
            to={paths.app.bookings.user.getHref(user.data!.nip)}
            className="btn pt-3"
          >
            <FontAwesomeIcon icon={faBookmark} className="me-3" />
            <span>Mis Reservas</span>
          </Link>
          <hr className="dropdown-divider mx-3" />
          {ADMIN_ROLE.includes(user.data!.rol) && (
            <>
              <Link to={paths.app.bookings.alive.getHref()} className="btn">
                <FontAwesomeIcon icon={faEye} className="me-3" />
                <span>Reservas vivas</span>
              </Link>
              <hr className="dropdown-divider mx-3" />
            </>
          )}
          <button
            className="w-100 bg-transparent border-0 pb-3"
            type="button"
            onClick={handleLogout}
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="me-3"
              color="red"
            />
            <span className="text-danger">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};
