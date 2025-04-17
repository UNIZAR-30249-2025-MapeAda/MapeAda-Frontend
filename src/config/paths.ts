import { ADMIN_ROLE, ALL_ROLES } from "../common/constants";

export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },

  auth: {
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    unauthorized: {
      path: '/auth/unauthorized',
      getHref: () => '/auth/unauthorized',
    },
  },

  app: {
    root: {
      path: '/app',
      getHref: () => '/app',
      allowedRoles: ALL_ROLES,
    },
    dashboard: {
      path: '',
      getHref: () => '/app',
    },
    bookings: {
      alive: {
        path: 'reservas',
        getHref: () => '/app/reservas',
        allowedRoles: [ADMIN_ROLE],
      },
      user: {
        path: 'reservas/:userId',
        getHref: (userId: string) => `/app/reservas/${userId}`,
        allowedRoles: ALL_ROLES,
      },
    },
  },
} as const;