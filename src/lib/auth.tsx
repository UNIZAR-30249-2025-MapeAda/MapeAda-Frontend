import { configureAuth } from "react-query-auth";
import { api } from "./api-client";
import { LoginResponse, MeResponse } from "../types/api";
import { z } from "zod";
import { ADMIN_ROLE } from "../config/constants";

const getUser = async (): Promise<MeResponse> => {
  /*
  const { data } = await api.get<MeResponseDto>("/auth/me");
  return data;
  */

  return {
    nip: "840091",
    email: "admin@example.com",
    username: "MockedAdmin",
    role: ADMIN_ROLE,
  };
};

const logout = (): Promise<void> => api.post("/auth/logout");

export const loginInputSchema = z.object({
  email: z.string().min(1, "Necesario").email("Email inválido"),
});
export type LoginInput = z.infer<typeof loginInputSchema>;

const login = async (data: LoginInput): Promise<LoginResponse> => {
  /*
  const { data: loginResponse } = await api.post<LoginResponseDto>(
    "/auth/login",
    data
  );

  api.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${loginResponse.token}`;
  return loginResponse;
  */

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    token: "fake-jwt-token",
    user: {
      nip: "000000",
      email: data.email,
      username: "MockedAdmin",
      role: ADMIN_ROLE,
    },
  };
};

const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response = await login(data);
    return response.user;
  },
  registerFn: async () => {
    return null;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, AuthLoader } =
  configureAuth(authConfig);
