"use client";

import { ReactNode, useState } from "react";
import { Provider } from "jotai";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DevTools } from "jotai-devtools";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";

const TANSTACK_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
};

type RootProps = {
  children: ReactNode;
};

export function Providers({ children }: RootProps) {
  const [queryClient] = useState(() => new QueryClient(TANSTACK_CONFIG));

  return (
    <SessionProvider>
      <ThemeProvider attribute="class">
        <TooltipProvider>
          <QueryClientProvider client={queryClient}>
            <Provider>
              {children}

              <ReactQueryDevtools initialIsOpen={false} />
              <DevTools isInitialOpen={false} />
            </Provider>
          </QueryClientProvider>
        </TooltipProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
