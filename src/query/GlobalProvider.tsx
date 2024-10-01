import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const GlobalProvider = ({children}: any) => {
  return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
