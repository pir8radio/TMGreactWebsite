import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { AppContextProvider } from "@/app/contexts/AppContext";
import { ThemeContextProvider } from "@/app/contexts/ThemeContext";
import { store } from "@/states/store";

import "@/styles/globals.css";
import Layout from "@/app/components/Layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <ReduxProvider store={store}>
        <ThemeContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeContextProvider>
      </ReduxProvider>
    </AppContextProvider>
  );
}
