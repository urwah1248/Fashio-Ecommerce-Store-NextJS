import Layout from "../components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { TitleProvider } from "@/context/titleContext";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store, persistor } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react"

export default function App({
  Component, pageProps: { session, ...pageProps }, }: AppProps) {
  const router = useRouter();

  if (
    router.pathname === "/shop/checkout" ||
    router.pathname === "/admin/login" ||
    router.pathname === "/admin/dashboard" ||
    router.pathname === "/admin/products" ||
    router.pathname === "/admin/product/add"
  )
    return (
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ChakraProvider>
              <TitleProvider>
                <Component {...pageProps} />
              </TitleProvider>
            </ChakraProvider>
          </PersistGate>
        </Provider>
      </SessionProvider>
    );

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider>
            <TitleProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </TitleProvider>
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
