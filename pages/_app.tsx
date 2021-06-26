import "../styles/globals.css";
import "../public/fonts/panchang/css/panchang.css";
import "../public/fonts/inter/css/inter.css";
import "../public/fonts/weathericons/weather-icons.min.css";
import Head from "next/head";
import MainLayout from "../components/MainLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
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
