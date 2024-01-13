import { useEffect, useState } from "react";
import { Howl } from "howler";
import { Song } from "../../app/music/types";
import styles from "./reproductor.module.css";

import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";

interface MusicPlayerProps {
  songs: Song[];
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ songs }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [sound, setSound] = useState<Howl | null>(null);

  const playSong = (track: string) => {
    const newSound = new Howl({
      src: [track],
      html5: true,
    });

    newSound.play();

    setSound(newSound);
  };

  const stopSong = () => {
    if (sound) {
      sound.stop();
      setSound(null);
    }
  };

  const handlePlayButtonClick = (song: Song) => {
    if (currentSong && currentSong.id === song.id) {
      // Si la misma canción está reproduciéndose, detenerla
      stopSong();
      setCurrentSong(null);
    } else {
      // Si es una nueva canción, reproducirla
      stopSong();
      setCurrentSong(song);
      playSong(song.track);
    }
  };

  useEffect(() => {
    // Detener la reproducción cuando el componente se desmonta
    return () => {
      stopSong();
    };
  }, []);

  return (
    <div className={styles.playerBox}>
      {songs.map((song) => (
        <div className={styles.subPlayerBox} key={song.id}>
          <p>{song.name}</p>
          <div className={styles.boxIcon}>
            {currentSong && currentSong.id === song.id ? (
              <IoPauseCircleOutline
                size={25}
                className={styles.icon}
                onClick={() => handlePlayButtonClick(song)}
              />
            ) : (
              <IoPlayCircleOutline
                size={25}
                className={styles.icon}
                onClick={() => handlePlayButtonClick(song)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MusicPlayer;
