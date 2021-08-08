import styles from "../../styles/Footer/Footer.module.css";
import { WeatherDataObject } from "../..";
import { useEffect, useState } from "react";
import FooterContentLayout from "../Layouts/FooterContentLayout";
import SpotifyWidget from "../SpotifyWidget";
import WeatherbitWidget from "../WeatherbitWidget";

const Footer: React.FC = (props) => {
  const [weatherData, setWeatherData] = useState<WeatherDataObject[]>(null);
  const [spotifyData, setSpotifyData] = useState(null);
  const [spotifyError, setSpotifyError] = useState(false);
  const [weatherError, setWeatherError] = useState(false);
  const [isExplicit, setIsExplicit] = useState(false);

  // Fetch Weatherbit Data
  useEffect(() => {
    async function fetchWeather() {
      return await fetch("/api/weatherbit/currentForecast").then((res) =>
        res.json()
      );
    }

    fetchWeather()
      .then((res) => {
        if (!res.success) {
          throw new Error('Unable to fetch weather data >.>"');
        }
        return setWeatherData(res.data);
      })
      .catch((e) => {
        setWeatherError(true);
      });
  }, []);

  // Fetch Spotify Data
  useEffect(() => {
    async function fetchRecentlyPlayed() {
      return await fetch("/api/spotify/recentlyPlayedTracks").then((res) =>
        res.json()
      );
    }

    fetchRecentlyPlayed()
      .then((res) => {
        if (!res.success) {
          throw new Error('Unable to fetch Spotify data >.<"');
        }

        const lastPlayedTrack = res?.data[0];

        if (lastPlayedTrack) {
          const name = lastPlayedTrack.track.name;
          const artist = lastPlayedTrack.track.artists[0].name;
          const album = lastPlayedTrack.track.album.name;
          const previewUrl = lastPlayedTrack.track.preview_url || null;
          const artworkUrl = lastPlayedTrack.track.album.images[0].url;

          if (lastPlayedTrack.track.explicit) {
            setIsExplicit(lastPlayedTrack.track.explicit);
          }

          return setSpotifyData({
            name,
            artist,
            album,
            previewUrl,
            artworkUrl,
          });
        } else {
          return setSpotifyData(null);
        }
      })
      .catch((e) => {
        setSpotifyError(true);
      });
  }, []);

  return (
    <footer className={styles.container}>
      <FooterContentLayout>
        <span className={styles.gridContainer}>
          <section className={styles.primaryWidgetContainer}>
            <SpotifyWidget
              track={spotifyData}
              error={spotifyError}
              explicit={isExplicit}
            />
          </section>

          <section className={styles.copyrightContainer}>
            <span>&copy; 2021</span>
          </section>

          <section className={styles.secondaryWidgetContainer}>
            <WeatherbitWidget data={weatherData} error={weatherError} />
          </section>
        </span>

        <section className={styles.mobileCopyrightContainer}>
          <span>&copy; 2021</span>
        </section>
      </FooterContentLayout>
    </footer>
  );
};

export default Footer;
