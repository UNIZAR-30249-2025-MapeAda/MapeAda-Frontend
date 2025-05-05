import Swal from "sweetalert2";

export function getApiErrorMessage(error: unknown): string {
  const errorsObj = error.response?.data?.errors;
  return errorsObj && typeof errorsObj === "object"
    ? Object.keys(errorsObj).flat().filter(Boolean).join(", ")
    : error.message || "Ha ocurrido un error";
}

// Muestra un alert con el mensaje obtenido
export function showApiError(error: unknown): void {
  Swal.fire("Error", getApiErrorMessage(error), "error");
}
