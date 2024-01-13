import React, { useEffect, useRef, useState } from "react";
import NavbarStream from "./navbarStream";
import MuxPlayer from "@mux/mux-player-react";
import styles from "./community.module.css";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import portada from "@/assets/portadaLive.jpg";

import { HiOutlineSignalSlash } from "react-icons/hi2";

const query = gql`
  query LatestTempPlaybackId {
    latestTempPlaybackId {
      id
      playbackId
      createAt
    }
  }
`;

function CommunityInit() {
  const { data } = useQuery(query);
  const playerRef = useRef<HTMLVideoElement>(null);
  const [isLive, setIsLive] = useState(false);

  return (
    <>
      <NavbarStream />
      <div className={styles.boxLive}>
        <MuxPlayer
          ref={playerRef}
          className={styles.boxLiveStream}
          streamType="live"
          playbackId={
            data?.latestTempPlaybackId?.playbackId
              ? data?.latestTempPlaybackId.playbackId
              : null
          }
          primaryColor="#FFFFFF"
          secondaryColor="#000000"
          poster={isLive ? undefined : portada.src}
        />
        <p>
          {isLive ? null : (
            <>
              <div className={styles.warninNoLive}>
                <div className={styles.centerWarning}>
                  <div className={styles.boxIconSignal}>
                    <HiOutlineSignalSlash className={styles.iconSignal} size={25}/>
                  </div>
                  <p className={styles.textWarn}>TodoEnBici esta Fuera de linea</p>
                </div>
              </div>
            </>
          )}
        </p>
      </div>
    </>
  );
}

export default CommunityInit;
