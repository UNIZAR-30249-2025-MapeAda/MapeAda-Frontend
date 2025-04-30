import React from "react";
import { Spinner } from "react-bootstrap";

export const LoadingIndicator: React.FC<{ message?: string }> = ({
  message = "Cargando...",
}) => (
  <div className="d-flex flex-column justify-content-center align-items-center vh-100">
    <Spinner animation="border" className="mb-3" /> {message}
  </div>
);
