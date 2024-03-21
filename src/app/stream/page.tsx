"use client";

import { useGlobalContext } from "@/components/context/ContextDashboard";
import Navbar from "@/components/navBars/NavBar";
import { ScalarStreamComments, StreamData } from "@/types/User";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import CommentsContainer from "@/components/liveStream/liveBox/Comments";
import Image from "next/image";

import bannerStreamOffline from "@/assets/bannerStream.jpg";
import { IoIosClose, IoMdEye } from "react-icons/io";
import TopDonate from "@/components/liveStream/doneTop/TopDonate";
import { useWebSocket } from "next-ws/client";
import UserComment from "@/components/liveStream/liveBox/userComments/UserComment";
import { useMediaQuery } from "react-responsive";

function StreamPage() {
  const { user } = useGlobalContext();
  const isCell = useMediaQuery({
    query: "(min-width: 700px)",
  });
  const ws = useWebSocket();
  const playerRef = useRef(null);
  const [latestTempPlaybackId, setLatestTempPlaybackId] =
    useState<StreamData | null>(null);
  const [Comments, setComments] = useState<ScalarStreamComments[]>([]);

  const onMessage = useCallback((event: MessageEvent<Blob>) => {
    event.data.text().then((commentString) => {
      const commentObj = JSON.parse(commentString);
      setComments((prevComments) => [...prevComments, commentObj]);
    });
  }, []);

  useEffect(() => {
    ws?.addEventListener("message", onMessage);
    return () => ws?.removeEventListener("message", onMessage);
  }, [onMessage, ws]);

  useEffect(() => {
    const fetchLatestTempPlaybackId = async () => {
      try {
        const response = await axios.get("/api/templayback/get");
        setLatestTempPlaybackId(response.data);
      } catch (error) {
        console.error("Error fetching latest TempPlaybackId:", error);
      }
    };

    fetchLatestTempPlaybackId();
  }, []);

  useEffect(() => {
    const getComments = async () => {
      const response = await axios.post("/api/stream/comments", {
        streamId: latestTempPlaybackId?.playbackId,
      });
      setComments(response.data);
    };

    getComments();
  }, [latestTempPlaybackId?.playbackId]);

  return (
    <>
      <Navbar isUser={user?.rol == "streamer" ? true : false} />
      <div className={styles.SupraBox}>
        <div className={styles.box}>
          {latestTempPlaybackId == null ? (
            <>
              <div className={styles.boxImageOffline}>
                <Image
                  className={styles.imgBannerOffline}
                  src={bannerStreamOffline}
                  alt="banner"
                />
              </div>
            </>
          ) : (
            <MuxPlayer
              className={styles.boxLive}
              ref={playerRef}
              streamType="live"
              playbackId={latestTempPlaybackId?.playbackId || undefined}
              primaryColor="#FFFFFF"
              secondaryColor="#000000"
            />
          )}
          <div className={styles.box}>
            <div className={styles.warnOffline}>
              <div className={styles.centerWarnOffline}>
                <div className={styles.offlineIcon}>
                  {latestTempPlaybackId == null ? (
                    <IoIosClose style={{ color: "red" }} size={30} />
                  ) : (
                    <h2>Desde el desierto pedaleando de noche</h2>
                  )}
                </div>
                <p>{latestTempPlaybackId == null ? "Sin conexion" : null}</p>
              </div>
              <div className={styles.views}>
                <div className={styles.centerViews}>
                  <p className={styles.numberViews}>0</p>
                  <div className={styles.BoxIconEye}>
                    <IoMdEye size={20} />
                  </div>
                </div>
              </div>
            </div>
            {isCell && <TopDonate />}
          </div>
        </div>

        <div className={styles.boxComments}>
          <p className={styles.titleCommentBlock}>Chat en vivo</p>
          <div className={styles.blockComments}>
            {Comments.map((comment) => (
              <div key={comment.id} className={styles.blockComment}>
                <UserComment userId={comment.userId} time={comment.createdAt} />
                <p>{comment.comment}</p>
              </div>
            ))}
          </div>
          <CommentsContainer
            inLive={latestTempPlaybackId == null ? true : false}
            streamId={latestTempPlaybackId?.playbackId as string}
            userId={user?.id as string}
          />
        </div>

        <div className={styles.boardPositions}>{!isCell && <TopDonate />}</div>
      </div>
    </>
  );
}

export default StreamPage;
