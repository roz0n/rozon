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

      <article>
        <span>&copy; 2021</span>
      </article>

      <article>
        <span>xxx</span>
      </article>
    </footer>
  );
};

export default Footer;
