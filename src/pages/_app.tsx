import type { AppProps } from "next/app";

import { AppContextProvider } from "../common/context/appContext";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const queryClient = new QueryClient();
  return (
    <>
      <AppContextProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "dark",
          }}
        >
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </MantineProvider>
      </AppContextProvider>
    </>
  );
};

export default App;
