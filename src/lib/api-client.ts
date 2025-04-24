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

export const apiPygeoapi = axios.create({
  baseURL: "http://localhost:5000",
});

apiPygeoapi.interceptors.request.use((config) => {
  console.log("[apiPygeoapi] REQUEST 👉", config.method, config.baseURL + config.url, config.params);
  return config;
});

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams();
      const redirectTo =
        searchParams.get("redirectTo") || window.location.pathname;
      window.location.href = paths.auth.unauthorized.getHref(redirectTo);
    }

    return Promise.reject(error);
  }
);
