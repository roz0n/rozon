import styles from "../../styles/Footer.module.css";
import { WeatherDataObject } from "../..";
import { useEffect, useState } from "react";
import convertWeatherbitIcon from "../../utils/convertWeatherbitIcon";
import Image from "next/image";
import SpotifyLogo from "../../public/images/index/spotify-logo.svg";

async function getWeatherData() {
  try {
    return await fetch("/api/weather").then((res) => res.json());
  } catch (error) {
    // console.log("Error fetching weather data");
  }
}

async function getSpotifyData() {
  try {
    return await fetch("/api/spotify").then((res) => res.json());
  } catch (error) {
    // console.log("Error fetching weather data");
  }
}

const Footer: React.FC = (props) => {
  const [weatherData, setWeatherData] = useState<WeatherDataObject[]>(null);
  const [spotifyData, setSpotifyData] = useState(null);

  // TODO: Catch errors
  useEffect(() => {
    async function fetchWeather() {
      return await getWeatherData();
    }
    fetchWeather().then((res) => {
      console.log("WEATHER DATA", res.data);
      return setWeatherData(res.data);
    });
  }, []);

  useEffect(() => {
    console.log("Called");
    async function fetchRecentlyPlayed() {
      return await getSpotifyData();
    }
    fetchRecentlyPlayed().then((res) => {
      console.log("SPOTIFY DATA", res);
      return setSpotifyData(res);
    });
  }, []);

  useEffect(() => {
    console.log("Spotify data", spotifyData);
  }, [spotifyData]);

  return (
    <footer className={styles.container}>
      <article className={styles.musicContainer}>
        <p className={styles.musicHeader}>Recent vibes</p>
        <span className={styles.musicTrackContainer}>
          <Image src={SpotifyLogo} alt="The Spotify logo" />
          <p className={styles.musicTrackTitle}>
            Planes - Agorazein, C. Tangana
          </p>
        </span>
      </article>
      <article className={styles.copyrightContainer}>
        <span>&copy; 2021</span>
      </article>
      <article className={styles.weatherContainer}>
        {weatherData?.length > 0 && (
          <>
            <div className={styles.weatherTempWrapper}>
              <i
                className={`wi ${convertWeatherbitIcon(
                  weatherData[0].weather.code
                )}`}
              />
              <p>&nbsp;{Math.round(+weatherData[0].temp)}&deg;</p>
            </div>
            <div className={styles.weatherCityWrapper}>
              <p>
                in {weatherData[0].city_name}, {weatherData[0].state_code}
              </p>
            </div>
          </>
        )}
      </article>
    </footer>
  );
};

export default Footer;
