"use client";

import MuxPlayer from "@mux/mux-player-react";
import React, { useEffect, useState } from "react";
import styles from "./stream.module.css";
import axios from "axios";
import NavbarStream from "../community/navbarStream";
import {
  CREATE_TEMP_PLAYBACK_ID,
  DELETE_TEMP_PLAYBACK_ID,
} from "@/graphql/mutations";
import { useMutation } from "@apollo/client";

import { IoCopyOutline } from "react-icons/io5";

interface datesStream {
  live_stream_id: string;
  stream_key: string;
  playbackId: string;
}

function StreamAdmin() {
  const [streamData, setStreamData] = useState<datesStream | null>(null);
  const [createTempPlaybackId] = useMutation(CREATE_TEMP_PLAYBACK_ID);
  const [deleteTempPlaybackId] = useMutation(DELETE_TEMP_PLAYBACK_ID);

  useEffect(() => {
    const savedStreamData = localStorage.getItem("streamData");
    if (savedStreamData) {
      setStreamData(JSON.parse(savedStreamData));
    }
  }, []);

  async function FetchNewPlayBackId() {
    if (streamData) {
      alert(
        "Ya existe un stream. Por favor, elimina el stream actual antes de crear uno nuevo."
      );
      return;
    }

    const response = await axios.post("/api/stream");
    const data = response.data;
    setStreamData(data);

    try {
      await createTempPlaybackId({
        variables: { playbackId: data.playbackId },
      });
    } catch (error) {
      console.log("Error al guardar el playbackId temporalmente:", error);
    }

    localStorage.setItem("streamData", JSON.stringify(data));
  }

  async function deleteStream() {
    // Recupera los datos del stream del localStorage
    const storedDataString = localStorage.getItem("streamData");
    let storedData = null;

    if (storedDataString !== null) {
      storedData = JSON.parse(storedDataString);
    }

    if (storedData) {
      setStreamData(null);
      try {
        // Usa el playbackId del stream almacenado para eliminar el TempPlaybackId
        await deleteTempPlaybackId({
          variables: { playbackId: storedData.playbackId },
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
      <NavbarStream />
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
                <button onClick={FetchNewPlayBackId}>Crear Stream</button>
              )}
            </div>
            {streamData ? (
              <>
                <div className={styles.opcCopyDetails}>
                  <p className={styles.titleInfo}>Live Stream ID</p>
                  <p className={styles.infoText}>{streamData.live_stream_id}</p>
                  {/* <div className={styles.boxIconCopy}>
                    <IoCopyOutline />
                  </div> */}
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
