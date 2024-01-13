"use client";

import NavbarStream from "@/components/community/navbarStream";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Typewriter from "typewriter-effect";

import { FcCamcorderPro } from "react-icons/fc";
import SigninFormStream from "../auth/signin/page";
import { useAuth } from "@/components/Stream/context/useSession";
import { useRouter } from "next/navigation";
import CommunityInit from "@/components/community/inicio";

function StreamingPage() {
  const [endTextEntry, setEndTextEntry] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    if (!user) {
      return (
        <>
          <NavbarStream />
          <main className={styles.bannerStreamer}>
            <div className={styles.subMain}>
              <video className={styles.video} autoPlay muted loop>
                <source src="/fondo_stream.mp4" type="video/mp4" />
              </video>
            </div>
            <div className={styles.boxInfoBanner}>
              {endTextEntry ? (
                <SigninFormStream />
              ) : (
                <>
                  <p className={styles.secondTextBanner}>
                    <Typewriter
                      onInit={(typewriter) => {
                        typewriter
                          .typeString(
                            "<span>Acompañame por las carreteras</span>"
                          )
                          .start()
                          .pauseFor(2000)
                          .deleteAll()
                          .callFunction(() => setEndTextEntry(true));
                      }}
                    />
                  </p>
                </>
              )}
            </div>
          </main>
        </>
      );
    }
  } else {
    if (user) {
      return <CommunityInit />;
    }
  }
}

export default StreamingPage;
