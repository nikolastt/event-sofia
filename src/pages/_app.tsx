import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>Geaan Eventos</title>
        <meta name="theme-color" content="#70963F" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#70963F" />
        <meta name="msapplication-navbutton-color" content="#70963F" />
        <link rel="icon" type="image/png" href="./images/iconBar.png" />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
