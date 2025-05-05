import React from "react";
import { Spinner } from "react-bootstrap";

export const LoadingIndicator: React.FC<{ message?: string }> = ({
  message = "Cargando...",
}) => (
  <div
    className="position-absolute top-0 start-0 d-flex flex-column justify-content-center align-items-center vh-100 vw-100 bg-white"
    style={{ zIndex: 10000 }}
  >
    <Spinner animation="border" className="mb-3" /> {message}
  </div>
);
