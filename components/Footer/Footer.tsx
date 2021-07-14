import styles from "../../styles/Footer.module.css";
import { WeatherDataObject } from "../..";
import { useEffect, useState } from "react";
import convertWeatherbitIcon from "../../utils/convertWeatherbitIcon";
import SpotifyWidget from "../SpotifyWidget";
import WeatherbitWidget from "../WeatherbitWidget";

async function getWeatherData() {
  try {
    return await fetch("/api/weatherbit/currentForecast").then((res) =>
      res.json()
    );
  } catch (error) {
    // console.log("Error fetching weather data");
  }
}

async function getSpotifyData() {
  try {
    return await fetch("/api/spotify/recentlyPlayedTracks").then((res) =>
      res.json()
    );
  } catch (error) {
    // console.log("Error fetching weather data");
  }
}

const Footer: React.FC = (props) => {
  const [weatherData, setWeatherData] = useState<WeatherDataObject[]>(null);
  const [spotifyData, setSpotifyData] = useState(null);

  // TODO: Catch errors on both these requests

  // Fetch Weatherbit Data
  useEffect(() => {
    async function fetchWeather() {
      return await getWeatherData();
    }
    fetchWeather().then((res) => {
      console.log("WEATHER DATA", res);
      return setWeatherData(res.data);
    });
  }, []);

  // Fetch Spotify Data
  useEffect(() => {
    async function fetchRecentlyPlayed() {
      return await getSpotifyData();
    }

    fetchRecentlyPlayed().then((res) => {
      const lastPlayedTrack = res?.items[0] || null;

      if (lastPlayedTrack) {
        const name = lastPlayedTrack.track.name;
        const artist = lastPlayedTrack.track.artists[0].name;
        const album = lastPlayedTrack.track.album.name;
        const previewUrl = lastPlayedTrack.track.preview_url || null;
        const artworkUrl = lastPlayedTrack.track.album.images[0].url;

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
    });
  }, []);

  return (
    <footer className={styles.container}>
      <SpotifyWidget track={spotifyData} />
      <article className={styles.copyrightContainer}>
        <span>&copy; 2021</span>
      </article>
      <WeatherbitWidget data={weatherData} />
    </footer>
  );
};

export default Footer;
