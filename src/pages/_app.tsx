import type { AppProps } from "next/app";

import { AppContextProvider } from "../common/context/appContext";
import { MantineProvider } from "@mantine/core";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
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
          <Component {...pageProps} />
        </MantineProvider>
      </AppContextProvider>
    </>
  );
};

export default App;
