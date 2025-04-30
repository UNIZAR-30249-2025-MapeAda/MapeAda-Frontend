import { ADMIN_ROLE, ALL_ROLES } from "./constants";

export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },

  auth: {
    login: {
      path: "/login",
      getHref: (redirectTo?: string | null | undefined) =>
        `/login${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
    unauthorized: {
      path: "/unauthorized",
      getHref: (redirectTo?: string | null | undefined) =>
        `/unauthorized${
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
        path: "bookings",
        getHref: () => "/app/bookings",
        allowedRoles: [ADMIN_ROLE],
      },
      user: {
        path: "bookings/user/:userId",
        getHref: (userId: string) => `/app/bookings/user/${userId}`,
        allowedRoles: ALL_ROLES,
      },
    },
  },
} as const;
