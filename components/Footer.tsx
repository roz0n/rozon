import styles from "../styles/Footer.module.css";
import Image from "next/image";
import SpotifyLogo from "../public/images/index/spotify-logo.svg";

const Footer: React.FC = (props) => {
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
        <span>
          43° &nbsp;
        </span>
        <span>
          in&nbsp;
        </span>
        <span>
          Chicago, IL
        </span>
      </article>
    </footer>
  );
};

export default Footer;
