import styles from "../../styles/Widgets/SpotifyWidget.module.css";
import { SpotifyWidgetProps } from "../..";
import { useEffect, useState } from "react";
import Image from "next/image";
import PlayIcon from "../Icons/PlayIcon";
import PauseIcon from "../Icons/PauseIcon";
import SpotifyIcon from "../Icons/SpotifyIcon";
import ExplicitIcon from "../Icons/ExplicitIcon";
import AnimatedEqualizerIcon from "../../public/images/index/animated-equalizer.gif";
import {
  UserIcon,
  MusicNoteIcon,
  PhotographIcon,
} from "@heroicons/react/solid";

const SpotifyWidget: React.FC<SpotifyWidgetProps> = ({
  track,
  explicit,
  error,
}) => {
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

  return track && !error ? (
    <article className={styles.container}>
      <header className={styles.headerContainer}>
        <span className={styles.headerWrapper}>
          {previewTrackState ? (
            <Image
              src={AnimatedEqualizerIcon}
              height={12}
              width={12}
              alt="Audio playing icon that resembles an equalizer"
            />
          ) : (
            <SpotifyIcon height={12} width={12} />
          )}
          <p className={styles.title}>Latest Feels</p>
        </span>
      </header>

      <section className={styles.trackInfoContainer}>
        <article
          className={styles.artworkWrapper}
          onClick={() => handlePreviewTrack()}
        >
          <div className={styles.playPauseContainer}>
            {previewTrackState ? (
              <PauseIcon height={48} width={48} />
            ) : (
              <PlayIcon height={48} width={48} />
            )}
          </div>
          {track.artworkUrl ? (
            <Image
              src={track?.artworkUrl}
              alt={`${track.name} by ${track.artist} album artwork`}
              height={48}
              width={48}
            />
          ) : (
            <div className={styles.missingArtworkContainer}></div>
          )}
        </article>

        <article className={styles.trackInfoWrapper}>
          {track.name && (
            <article className={styles.trackInfo}>
              <span className={styles.trackInfoIconWrapper}>
                <MusicNoteIcon height={12} width={12} />
              </span>
              <p className={styles.trackInfoText}>{track.name}</p>
              {explicit && (
                <span className={styles.trackExplicitIcon}>
                  <ExplicitIcon height={12} width={12} />
                </span>
              )}
            </article>
          )}
          {track.artist && (
            <article className={styles.trackInfo}>
              <span className={styles.trackInfoIconWrapper}>
                <UserIcon height={12} width={12} />
              </span>
              <p className={styles.trackInfoText}>{track.artist}</p>
            </article>
          )}
          {track.album && (
            <article className={styles.trackInfo}>
              <span className={styles.trackInfoIconWrapper}>
                <PhotographIcon height={12} width={12} />
              </span>
              <p className={styles.trackInfoText}>{track.album}</p>
            </article>
          )}
        </article>
      </section>
    </article>
  ) : (
    <div></div>
  );
};

export default SpotifyWidget;
