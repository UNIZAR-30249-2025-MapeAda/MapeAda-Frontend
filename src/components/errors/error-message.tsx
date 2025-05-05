import React from "react";

export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div
    className="position-absolute top-0 start-0 d-flex flex-column justify-content-center align-items-center vh-100 vw-100"
    style={{ zIndex: 10000 }}
  >
    <h4 className="text-danger bg-white rounded p-5 shadow">{message}</h4>
  </div>
);
