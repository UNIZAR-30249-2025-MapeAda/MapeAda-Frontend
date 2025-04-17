import { useMemo } from "react";
import ProtectedRoute from "../components/protected-route";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { paths } from "../config/paths";
import Landing from "./routes/app/landing";
import AliveBookings from "./routes/app/aliveBookings";
import UserBookings from "./routes/app/userBookings";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convert = (queryClient: QueryClient) => (module: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = module;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={paths.auth.login.getHref()} replace />,
    },
    {
      path: paths.auth.login.path,
      lazy: () => import("./routes/auth/login").then(convert(queryClient)),
    },
    {
      path: paths.auth.unauthorized.path,
      lazy: () =>
        import("./routes/auth/unauthorized").then(convert(queryClient)),
    },
    {
      path: paths.app.root.path,
      element: (
        <ProtectedRoute allowedRoles={paths.app.root.allowedRoles}>
          <Outlet />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true, // equivale a /app
          element: <Landing />,
        },
        {
          path: paths.app.bookings.alive.path,
          element: (
            <ProtectedRoute
              allowedRoles={paths.app.bookings.alive.allowedRoles}
            >
              <AliveBookings />
            </ProtectedRoute>
          ),
          lazy: () =>
            import("./routes/app/aliveBookings").then(convert(queryClient)),
        },
        {
          path: paths.app.bookings.user.path,
          element: (
            <ProtectedRoute allowedRoles={paths.app.bookings.user.allowedRoles}>
              <UserBookings />
            </ProtectedRoute>
          ),
          lazy: () =>
            import("./routes/app/userBookings").then(convert(queryClient)),
        },
      ],
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();
  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);
  return <RouterProvider router={router} />;
};
