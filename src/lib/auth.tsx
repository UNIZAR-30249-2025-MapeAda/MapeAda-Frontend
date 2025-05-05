import { configureAuth } from "react-query-auth";
import { api } from "./api-client";
import { LoginRequest, LoginResponse } from "../types/api";
import { User } from "../features/auth/types/models";

const userFn = async (): Promise<User | null> => {
  const userJson = localStorage.getItem("user");
  if (!userJson) {
    return null;
  }

  return JSON.parse(userJson) as User;
};

const logoutFn = async (): Promise<void> => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const loginFn = async (data: LoginRequest): Promise<User> => {
  const { data: loginResponse } = await api.post<LoginResponse>("/auth/login",data);
  localStorage.setItem("token", loginResponse.token);
  localStorage.setItem("user", JSON.stringify(loginResponse.usuario));

  return loginResponse.usuario;
};

const authConfig = {
  userFn,
  loginFn,
  registerFn: async () => null,
  logoutFn
};

export const { useUser, useLogin, useLogout, AuthLoader } = configureAuth(authConfig);
