import React from "react";

export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <h1 className="text-danger">{message}</h1>
);
