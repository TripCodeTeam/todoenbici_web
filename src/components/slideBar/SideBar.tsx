"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

import { GrSpotify } from "react-icons/gr";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { BsTools } from "react-icons/bs";
import { SiBookstack } from "react-icons/si";
import { FaBloggerB } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";

import logoBici from "@/assets/logo_page.png";
import Image from "next/image";
import { useSidebarContext } from "../context/ContextDashboard";

function SideBar() {
  const { stateSidebar, setStateSidebar } = useSidebarContext();
  return (
    <>
      <div className={styles.sidebar}>
        <ul>
          <li className={styles.logo}>
            <Link className={styles.link} href="/">
              <span className={styles.icon}>
                <Image className={styles.logoSide} src={logoBici} alt="logo" />
              </span>
              <span className={styles.text}>Todo en Bici</span>
            </Link>
          </li>
          <li
            className={
              stateSidebar == "blog" ? styles.btnOptActive : styles.btnOption
            }
          >
            <Link
              className={styles.link}
              href="#"
              onClick={() => setStateSidebar("blog")}
            >
              <span className={styles.icon}>
                <FaBloggerB className={styles.iconBlog} />
              </span>
              <span className={styles.text}>Blog</span>
            </Link>
          </li>
          <li
            className={
              stateSidebar == "artistas" ? styles.btnOptActive : styles.btnOption
            }
          >
            <Link
              className={styles.link}
              href="#"
              onClick={() => setStateSidebar("artistas")}
            >
              <span className={styles.icon}>
                <PiMicrophoneStageFill className={styles.iconStars} />
              </span>
              <span className={styles.text}>Artistas</span>
            </Link>
          </li>
          <li
            className={
              stateSidebar == "spotify" ? styles.btnOptActive : styles.btnOption
            }
          >
            <Link
              className={styles.link}
              href="#"
              onClick={() => setStateSidebar("spotify")}
            >
              <span className={styles.icon}>
                <GrSpotify className={styles.iconSpotify} />
              </span>
              <span className={styles.text}>Nuestro Spotify</span>
            </Link>
          </li>
          <li
            className={
              stateSidebar == "ebooks" ? styles.btnOptActive : styles.btnOption
            }
          >
            <Link
              className={styles.link}
              href="#"
              onClick={() => setStateSidebar("ebooks")}
            >
              <span className={styles.icon}>
                <SiBookstack className={styles.iconEbooks} />
              </span>
              <span className={styles.text}>Ebooks</span>
            </Link>
          </li>
          <li
            className={
              stateSidebar == "tools" ? styles.btnOptActive : styles.btnOption
            }
          >
            <Link
              className={styles.link}
              href="#"
              onClick={() => setStateSidebar("tools")}
            >
              <span className={styles.icon}>
                <BsTools className={styles.iconTools} />
              </span>
              <span className={styles.text}>Equipamiento</span>
            </Link>
          </li>
          <li
            className={
              stateSidebar == "fotos" ? styles.btnOptActive : styles.btnOption
            }
          >
            <Link
              className={styles.link}
              href="#"
              onClick={() => setStateSidebar("fotos")}
            >
              <span className={styles.icon}>
                <FaImage className={styles.iconImages} />
              </span>
              <span className={styles.text}>Fotos</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
