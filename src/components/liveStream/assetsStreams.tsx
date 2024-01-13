import axios from "axios";
import React, { useEffect, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import styles from "./stream.module.css";
import {
  convertUnixToDate,
  timeSince,
  convertDuration,
} from "./handlers/convertidores";

interface Asset {
  asset_id: string;
  playbackId: string | null;
  duration: string;
  fecha: string;
}

function AssetsStreams() {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    const fetchAssets = async () => {
      const response = await axios.post("/api/stream/assets");
      const data = response.data;
      setAssets(data);
    };

    fetchAssets();
  }, []);

  return (
    <>
      <h2 className={styles.historyTitle}>Historial de tus Live's</h2>
      <div className={styles.historyAssets}>
        {assets.map((asset) => (
          <div className={styles.cardAssets} key={asset.asset_id}>
            <MuxPlayer
              className={styles.videoContenedor}
              stream-type="on-demand"
              playback-id={asset.playbackId}
              metadata-video-title="Test VOD"
              metadata-viewer-user-id="user-id-007"
            />
            <div key={asset.asset_id} className={styles.detailsTexts}>
              <p>Asset ID: {asset.asset_id}</p>
              <p>Playback ID: {asset.playbackId}</p>
              <p>Duracion: {convertDuration(asset.duration)}</p>
              <p>Hace {timeSince(new Date(convertUnixToDate(asset.fecha)))}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AssetsStreams;
