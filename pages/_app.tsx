import "highlight.js/styles/atom-one-dark.css";
import "nprogress/nprogress.css";
import "../styles/globals.css";
import "../public/fonts/panchang/css/panchang.css";
import "../public/fonts/inter/css/inter.css";
import "../public/fonts/weathericons/weather-icons.min.css";
import "../public/fonts/ibm-plex-mono/css/ibm-plex-mono.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import Head from "next/head";
import MainLayout from "../components/MainLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    const routeChangeStart = () => NProgress.start();
    const routeChangeComplete = () => NProgress.done();

    router.events.on("routeChangeStart", routeChangeStart);
    router.events.on("routeChangeComplete", routeChangeComplete);
    router.events.on("routeChangeError", routeChangeComplete);

    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
      router.events.off("routeChangeComplete", routeChangeComplete);
      router.events.off("routeChangeError", routeChangeComplete);
    };
  });

  return (
    <MainLayout>
      <Head>
        <title>Arnold Rozon &middot; Engineering &amp; Design</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </MainLayout>
  );
}

export default MyApp;
