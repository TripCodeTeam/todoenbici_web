import MuxPlayer from "@mux/mux-player-react";
import React, { useEffect, useState } from "react";
import styles from "./stream.module.css";
import axios from "axios";
import NavbarStream from "../community/navbarStream";
import { IoCopyOutline } from "react-icons/io5";
import { StreamData } from "@/types/User";

function StreamAdmin() {
  const [streamData, setStreamData] = useState<StreamData | null>(null);

  useEffect(() => {
    const savedStreamData = localStorage.getItem("streamData");
    if (savedStreamData) {
      setStreamData(JSON.parse(savedStreamData));
    }
  }, []);

  async function fetchNewPlayBackId() {
    if (streamData) {
      alert(
        "Ya existe un stream. Por favor, elimina el stream actual antes de crear uno nuevo."
      );
      return;
    }

    try {
      const response = await axios.post("/api/stream");
      const data = response.data;
      setStreamData(data);

      // Guardar el nuevo stream en el localStorage
      localStorage.setItem("streamData", JSON.stringify(data));

      // Llamada al endpoint para crear el TempPlaybackId
      await axios.post("/api/templayback/create", {
        playbackId: data.playbackId,
      });
    } catch (error) {
      console.log("Error al obtener un nuevo playbackId:", error);
    }
  }

  async function deleteStream() {
    const storedDataString = localStorage.getItem("streamData");
    let storedData = null;

    if (storedDataString !== null) {
      storedData = JSON.parse(storedDataString);
    }

    if (storedData) {
      setStreamData(null);

      try {
        // Llamada al endpoint para eliminar el TempPlaybackId
        await axios.delete("/api/templayback/remove", {
          data: { playbackId: storedData.playbackId },
        });
      } catch (error) {
        console.log("Error al eliminar el playbackId temporal:", error);
      }

      localStorage.removeItem("streamData");
    } else {
      console.log("No se encontró ningún stream en el localStorage.");
    }
  }

  const RTMP_URL = "rtmps://global-live.mux.com:443/app";
  const stream_key = streamData?.stream_key;

  return (
    <>
      <div className={styles.prevStream}>
        {streamData && (
          <MuxPlayer
            className={styles.boxLiveStream}
            streamType="live"
            playbackId={streamData.playbackId}
            primaryColor="#FFFFFF"
            secondaryColor="#000000"
          />
        )}
        <div className={styles.infoLiveStream}>
          <div className={styles.cenetrInfoLiveStream}>
            <div className={styles.btnOpcLive}>
              {streamData?.live_stream_id ? (
                <button onClick={deleteStream}>Eliminar Stream</button>
              ) : (
                <button onClick={fetchNewPlayBackId}>Crear Stream</button>
              )}
            </div>
            {streamData ? (
              <>
                <div className={styles.opcCopyDetails}>
                  <p className={styles.titleInfo}>Live Stream ID</p>
                  <p className={styles.infoText}>{streamData.live_stream_id}</p>
                </div>
                <div className={styles.opcCopyDetails}>
                  <p className={styles.titleInfo}>Stream Key</p>
                  <p className={styles.infoText}>{streamData.stream_key}</p>
                  <div className={styles.boxIconCopy}>
                    <IoCopyOutline />
                  </div>
                </div>
                <div className={styles.opcCopyDetails}>
                  <p className={styles.titleInfo}>RTMP</p>
                  <p className={styles.infoText}>{RTMP_URL}</p>
                  <div className={styles.boxIconCopy}>
                    <IoCopyOutline />
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default StreamAdmin;
