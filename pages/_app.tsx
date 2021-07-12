// Styles
import "highlight.js/styles/atom-one-dark.css";
import "nprogress/nprogress.css";
import "../styles/globals.css";
// Fonts
import "../public/fonts/panchang/css/panchang.css";
import "../public/fonts/inter/css/inter.css";
import "../public/fonts/weathericons/weather-icons.min.css";
import "../public/fonts/ibm-plex-mono/css/ibm-plex-mono.css";
// Deps
import { useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import Head from "next/head";
// Components
import MainLayout from "../components/MainLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Handle progress bar
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

  // Handle display mode toggle
  const LIGHT = "light";
  const DARK = "dark";

  function toggleDisplayMode() {
    const currentDisplaySetting =
      document.documentElement.getAttribute("data-theme");

    if (currentDisplaySetting === LIGHT) {
      document.documentElement.setAttribute("data-theme", DARK);
      localStorage.setItem("theme", DARK);
    } else {
      document.documentElement.setAttribute("data-theme", LIGHT);
      localStorage.setItem("theme", LIGHT);
    }
  }

  // Handle loading display mode
  function loadDisplayMode() {
    const currentDisplaySetting = localStorage.getItem("theme");

    if (currentDisplaySetting) {
      document.documentElement.setAttribute(
        "data-theme",
        currentDisplaySetting
      );
    } else {
      localStorage.setItem("theme", DARK);
    }
  }

  useEffect(() => {
    loadDisplayMode();
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>Arnold Rozon &middot; Engineering &amp; Design</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header handleDisplayModeToggle={toggleDisplayMode} />
      <Component {...pageProps} />
      <Footer />
    </MainLayout>
  );
}

export default MyApp;
