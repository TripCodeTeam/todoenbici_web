"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MuxPlayer from "@mux/mux-player-react";
import styles from "./page.module.css";
import axios from "axios";
import { StreamData } from "@/types/User";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navBars/NavBar";
import PostCards from "@/components/community/posts/PostCards";
import { FiPlus } from "react-icons/fi";
import { useGlobalContext } from "@/components/context/ContextDashboard";

const CommunityInit: React.FC = () => {
  const { user } = useGlobalContext();
  const router = useRouter();
  const [latestTempPlaybackId, setLatestTempPlaybackId] =
    useState<StreamData | null>(null);
  const playerRef = useRef(null);
  const [shouldRenderContent, setShouldRenderContent] = useState(false);

  useEffect(() => {
    const fetchLatestTempPlaybackId = async () => {
      try {
        const response = await axios.get("/api/tempPlaybackId/get");
        setLatestTempPlaybackId(response.data);
      } catch (error) {
        console.error("Error fetching latest TempPlaybackId:", error);
      }
    };

    fetchLatestTempPlaybackId();
  }, []);

  // useEffect(() => {
  //   // Verifica si el usuario está autenticado y se cargó el TempPlaybackId
  //   if (user && user.rol == "streamer" || user?.rol == "viewer") {
  //     setShouldRenderContent(true);
  //   } else {
  //     // Si no hay un usuario autenticado o no se cargó el TempPlaybackId, redirige a la página principal ("/")
  //     router.push("/auth");
  //   }
  // }, [user, router]);

  useEffect(() => {
    // Verifica si el usuario está autenticado y se cargó el TempPlaybackId
    if (user && user.rol == "developer") {
      setShouldRenderContent(true);
    } else {
      // Si no hay un usuario autenticado o no se cargó el TempPlaybackId, redirige a la página principal ("/")
      router.push("/auth");
    }
  }, [user, router]);

  return shouldRenderContent ? (
    <>
      <Navbar />
      <div className={styles.createBoxPosts}>
        <h3>Comparte tu viaje en Bici con la comunidad</h3>
        <div className={styles.btnCreatePost}>
          <button className={styles.btnCreate}>
            <div className={styles.bixIconCreate}>
              <FiPlus size={20} />
            </div>
            <p>Crear</p>
          </button>
        </div>
      </div>
      <section className={styles.layout}>
        <div className={styles.sidebar}>
          <div className={styles.LiveBox}>
            <MuxPlayer
              ref={playerRef}
              streamType="live"
              playbackId={latestTempPlaybackId?.playbackId || undefined}
              primaryColor="#FFFFFF"
              secondaryColor="#000000"
            />
          </div>
        </div>
        <PostCards />
      </section>
      <Footer />
    </>
  ) : null;
};

export default CommunityInit;
