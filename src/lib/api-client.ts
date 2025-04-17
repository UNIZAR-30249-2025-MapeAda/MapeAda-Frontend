import axios, { InternalAxiosRequestConfig } from "axios";
import { paths } from "../config/paths";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }
  config.withCredentials = true;

  return config;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5157",
});

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams();
      const redirectTo =
        searchParams.get("redirectTo") || window.location.pathname;
      window.location.href = paths.auth.login.getHref(redirectTo);
    }

    return Promise.reject(error);
  }
);
