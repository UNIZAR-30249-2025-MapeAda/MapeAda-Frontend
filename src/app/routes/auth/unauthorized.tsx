import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 text-center">
      <div className="card p-4 bg-light">
        <div className="card-body">
          <h1 className="card-title text-danger">
            <FontAwesomeIcon icon={faBan} /> Acceso denegado
          </h1>
          <p className="card-text">
            No tienes permiso para acceder a esta página.
          </p>
          <Link to="/" className="btn btn-warning shadow-sm rounded-pill">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
