import { ADMIN_ROLE, ALL_ROLES } from "./constants";

export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },

  auth: {
    login: {
      path: "/auth/login",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
    unauthorized: {
      path: "/auth/unauthorized",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/unauthorized${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
  },

  app: {
    root: {
      path: "/app",
      getHref: () => "/app",
      allowedRoles: ALL_ROLES,
    },
    dashboard: {
      path: "",
      getHref: () => "/app",
    },
    bookings: {
      alive: {
        path: "reservas",
        getHref: () => "/app/reservas",
        allowedRoles: [ADMIN_ROLE],
      },
      user: {
        path: "reservas/:userId",
        getHref: (userId: string) => `/app/reservas/${userId}`,
        allowedRoles: ALL_ROLES,
      },
    },
  },
} as const;
