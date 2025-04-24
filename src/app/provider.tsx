import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Spinner } from "react-bootstrap";
import { AuthLoader } from "../lib/auth";
import { ErrorBoundary } from "react-error-boundary";
import { MainErrorFallback } from "../components/errors/main";

type AppProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense fallback={<SpinnerScreen />}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {/*import.meta.env.DEV && <ReactQueryDevtools />*/}
          <AuthLoader
            renderLoading={() => (
              <div className="flex h-screen w-screen items-center justify-center">
                <Spinner />
              </div>
            )}
          >
            {children}
          </AuthLoader>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

const SpinnerScreen = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <Spinner />
  </div>
);
