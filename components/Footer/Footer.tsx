import styles from "../../styles/Footer.module.css";
import { WeatherDataObject } from "../..";
import { useEffect, useState } from "react";
import convertWeatherbitIcon from "../../utils/convertWeatherbitIcon";
import SpotifyWidget from "../SpotifyWidget";

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

  // TODO: Catch errors
  useEffect(() => {
    async function fetchWeather() {
      return await getWeatherData();
    }
    fetchWeather().then((res) => {
      console.log("WEATHER DATA", res);
      return setWeatherData(res);
    });
  }, []);

  useEffect(() => {
    console.log("Called");
    async function fetchRecentlyPlayed() {
      return await getSpotifyData();
    }
    fetchRecentlyPlayed().then((res) => {
      console.log("SPOTIFY DATA", res);
      console.log("Recently played", res);
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

  useEffect(() => {
    console.log("Spotify data", spotifyData);
  }, [spotifyData]);

  return (
    <footer className={styles.container}>
      {/* <article className={styles.musicContainer}>
        <p className={styles.musicHeader}>Recent vibes</p>
        <span className={styles.musicTrackContainer}>
          <Image src={SpotifyLogo} alt="The Spotify logo" />
          <p className={styles.musicTrackTitle}>
            Planes - Agorazein, C. Tangana
          </p>
        </span>
      </article> */}
      <span>
        <SpotifyWidget track={spotifyData} />
      </span>

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
