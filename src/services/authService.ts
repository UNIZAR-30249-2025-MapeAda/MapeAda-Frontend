import { ADMIN_ROLE, Role, USER_ROLE } from "../common/constants";

export interface User {
  email: string;
  username: string;
  role: Role;
  token: string;
}

interface LoginData {
  email: string;
}

// Simulamos un retardo para las peticiones
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Login mock: si el email contiene "admin" asigna rol admin, sino usuario.
export const login = async (data: LoginData): Promise<User> => {
  await delay(1000);
  if (!data.email) {
    return Promise.reject("Datos inválidos");
  }
  const role = data.email.includes("admin") ? ADMIN_ROLE : USER_ROLE;
  const token = "fake-jwt-token"; // token ficticio
  return { email: data.email, username: "MockUser", role, token };
};
