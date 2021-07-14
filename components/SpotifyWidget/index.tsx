import styles from "../../styles/SpotifyWidget.module.css";
import Image from "next/image";
import SpotifyLogo from "../../public/images/index/spotify-logo.svg";
import PlayIcon from "../Icons/PlayIcon";
import PauseIcon from "../Icons/PauseIcon";
import { useEffect, useState } from "react";

type SpotifyWidgetProps = {
  track: SpotifyTrack;
};

type SpotifyTrack = {
  name: string;
  artist: string;
  album: string;
  previewUrl?: string;
  artworkUrl: string;
};

const SpotifyWidget: React.FC<SpotifyWidgetProps> = ({ track }) => {
  if (!track) return null;

  const [previewTrack, setPreviewTrack] = useState(null);
  const [previewTrackState, setPreviewTrackState] = useState<boolean>(false);
  const { name, artist, album, previewUrl, artworkUrl } = track;

  function handlePreviewTrack() {
    if (!previewTrackState) {
      previewTrack.play();
      setPreviewTrackState(true);
    } else {
      previewTrack.pause();
      setPreviewTrackState(false);
    }
  }

  useEffect(() => {
    if (previewUrl) {
      const audio = new Audio(previewUrl);
      audio.volume = 0.5;
      setPreviewTrack(audio);
    }
  }, []);

  return (
    <article className={styles.musicContainer}>
      <section className={styles.headerContainer}>
        <Image src={SpotifyLogo} alt="The Spotify logo" />
        <p className={styles.musicHeader}>Recent vibes</p>
      </section>

      <section className={styles.trackInfoContainer}>
        <span
          className={styles.artworkWrapper}
          onClick={() => handlePreviewTrack()}
        >
          <div className={styles.playPauseContainer}>
            {previewTrackState ? (
              <PauseIcon height={46} width={46} />
            ) : (
              <PlayIcon height={46} width={46} />
            )}
          </div>
          <Image
            src={artworkUrl}
            alt={`${name} by ${artist} album artwork`}
            height={46}
            width={46}
          />
        </span>

        <span className={styles.musicTrackContainer}>
          <p className={styles.musicTrackTitle}>{name}</p>
          <p className={styles.musicTrackTitle}>{artist}</p>
          <p className={styles.musicTrackTitle}>{album}</p>
        </span>
      </section>
    </article>
  );
};

export default SpotifyWidget;
