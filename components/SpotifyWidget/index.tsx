import styles from "../../styles/SpotifyWidget.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import PlayIcon from "../Icons/PlayIcon";
import PauseIcon from "../Icons/PauseIcon";
import SpotifyIcon from "../Icons/SpotifyIcon";
import {
  UserIcon,
  MusicNoteIcon,
  PhotographIcon,
} from "@heroicons/react/solid";

type SpotifyWidgetProps = {
  track?: SpotifyTrack;
};

type SpotifyTrack = {
  name: string;
  artist: string;
  album: string;
  previewUrl?: string;
  artworkUrl: string;
};

const SpotifyWidget: React.FC<SpotifyWidgetProps> = ({ track }) => {
  const [previewTrack, setPreviewTrack] = useState(null);
  const [previewTrackState, setPreviewTrackState] = useState<boolean>(false);

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
    if (track?.previewUrl) {
      const audio = new Audio(track?.previewUrl);

      audio.volume = 0.2;
      audio.onended = () => {
        setPreviewTrackState(false);
      };
      audio.onpause = () => {
        setPreviewTrackState(false);
      };
      audio.onplay = () => {
        setPreviewTrackState(true);
      };

      setPreviewTrack(audio);
    }
  }, [track?.previewUrl]);

  return track ? (
    <article className={styles.container}>
      <header className={styles.headerContainer}>
        <span className={styles.headerWrapper}>
          <SpotifyIcon height={12} width={12} />
          <p className={styles.title}>Recent vibes</p>
        </span>
      </header>

      <section className={styles.trackInfoContainer}>
        <article
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
          {track?.artworkUrl ? (
            <Image
              src={track?.artworkUrl}
              alt={`${track.name} by ${track.artist} album artwork`}
              height={46}
              width={46}
            />
          ) : (
            <div className={styles.missingArtworkContainer}></div>
          )}
        </article>

        <article className={styles.trackInfoWrapper}>
          {track.name && (
            <p className={styles.trackInfoText}>
              <span className={styles.trackInfoIconWrapper}>
                <MusicNoteIcon height={12} width={12} />
              </span>
              {track.name}
            </p>
          )}
          {track.artist && (
            <p className={styles.trackInfoText}>
              <span className={styles.trackInfoIconWrapper}>
                <UserIcon height={12} width={12} />
              </span>
              {track.artist}
            </p>
          )}
          {track.album && (
            <p className={styles.trackInfoText}>
              <span className={styles.trackInfoIconWrapper}>
                <PhotographIcon height={12} width={12} />
              </span>
              {track.album}
            </p>
          )}
        </article>
      </section>
    </article>
  ) : (
    <div></div>
  );
};

export default SpotifyWidget;
