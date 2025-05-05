import axios, { InternalAxiosRequestConfig } from "axios";
import { paths } from "../config/paths";


/**********************
 PyGeoAPI
 ********************+*/
export const apiPygeoapi = axios.create({
  baseURL: import.meta.env.VITE_PYGEOAPI_URL,
});

apiPygeoapi.interceptors.response.use((res) => res.data);

/**********************
 API
 *********************/
function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  config.headers = config.headers ?? {};

  config.headers.Accept = "application/json";

  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
