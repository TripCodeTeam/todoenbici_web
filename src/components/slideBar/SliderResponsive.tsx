import React, { useState } from "react";
import styles from "./page.module.css";
import Slider from "react-slick";

import { GrSpotify } from "react-icons/gr";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { BsTools } from "react-icons/bs";
import { SiBookstack } from "react-icons/si";
import { FaBloggerB } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { useSidebarContext } from "../context/ContextDashboard";
import { useSwipeable } from "react-swipeable";

function SliderResponsive() {
  const { stateSidebar, setStateSidebar } = useSidebarContext();
  const [selectedButton, setSelectedButton] = useState("");

  const touchBar = useSwipeable({
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
  return (
    <>
      <div className={styles.scrollContainer} {...touchBar}>
        <div className={styles.ContainerResponsive}>
          <div
            className={styles.subContResponsive}
            onClick={() => {
              setStateSidebar("blog"), setSelectedButton("blog");
            }}
          >
            <div className={styles.boxOptionResponsivve}>
              <FaBloggerB
                className={`${styles.iconResponsive} ${
                  stateSidebar == "blog" ? styles.selectedButtonBlog : ""
                }`}
              />
            </div>
            <p className={styles.textBtnResponsive}>Blog</p>
          </div>

          <div
            className={styles.subContResponsive}
            onClick={() => {
              setStateSidebar("artistas"), setSelectedButton("artistas");
            }}
          >
            <div className={styles.boxOptionResponsivve}>
              <PiMicrophoneStageFill
                className={`${styles.iconResponsive} ${
                  stateSidebar == "artistas" ? styles.selectedButtonArts : ""
                }`}
              />
            </div>
            <p className={styles.textBtnResponsive}>Artistas</p>
          </div>

          <div
            className={styles.subContResponsive}
            onClick={() => {
              setStateSidebar("spotify"), setSelectedButton("spotify");
            }}
          >
            <div className={styles.boxOptionResponsivve}>
              <GrSpotify
                className={`${styles.iconResponsive} ${
                  stateSidebar == "spotify" ? styles.selectedButtonSpotif : ""
                }`}
              />
            </div>
            <p className={styles.textBtnResponsive}>Nuestro Spotify</p>
          </div>

          <div
            className={styles.subContResponsive}
            onClick={() => {
              setStateSidebar("ebooks"), setSelectedButton("ebooks");
            }}
          >
            <div className={styles.boxOptionResponsivve}>
              <SiBookstack
                className={`${styles.iconResponsive} ${
                  stateSidebar == "ebooks" ? styles.selectedButtonEbook : ""
                }`}
              />
            </div>
            <p className={styles.textBtnResponsive}>Ebooks</p>
          </div>

          <div
            className={styles.subContResponsive}
            onClick={() => setStateSidebar("tools")}
          >
            <div className={styles.boxOptionResponsivve}>
              <BsTools
                className={`${styles.iconResponsive} ${
                  stateSidebar == "tools" ? styles.selectedButtonTools : ""
                }`}
              />
            </div>
            <p className={styles.textBtnResponsive}>Equipamiento</p>
          </div>

          <div
            className={styles.subContResponsive}
            onClick={() => setStateSidebar("fotos")}
          >
            <div className={styles.boxOptionResponsivve}>
              <FaImage
                className={`${styles.iconResponsive} ${
                  stateSidebar == "fotos" ? styles.selectedButtonFotos : ""
                }`}
              />
            </div>
            <p className={styles.textBtnResponsive}>Fotos</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SliderResponsive;
