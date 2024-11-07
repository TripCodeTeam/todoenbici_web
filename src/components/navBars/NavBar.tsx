"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { useMediaQuery } from "react-responsive";
import Avatar from "react-avatar";

import iconLogo from "@/assets/logo_page.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { IoMdCloseCircle, IoIosMusicalNotes } from "react-icons/io";
import { FaMap, FaBicycle, FaBed } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import { toast } from "sonner";

function Navbar() {
  const router = useRouter();
  const responsive = useMediaQuery({ query: "(min-width: 900px)" });
  const [openDropDown, setOpenDropDown] = useState(false);

  const handlerDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.imageLogo}>
            <Image className={styles.iconLogo} src={iconLogo} alt="iconLogo" />
          </div>
          <div onClick={() => router.push("/")} className={styles.logoTitle}>
            Todo en bicicleta
          </div>
        </div>
        {responsive ? (
          <div className={styles.account}>
            <div className={styles.subAccount}>
              <div onClick={() => toast.warning("muy pronto")} className={styles.login}>
                Streaming
              </div>
            </div>
            <div className={styles.subAccount}>
              <Link href={"/music"} className={styles.login}>
                Musica
              </Link>
            </div>
            <div className={styles.subAccount}>
              <Link href={"/ruta"} className={styles.login}>
                Ruta
              </Link>
            </div>

            <div className={styles.subAccount}>
              <Link href={"/cicloviajero"} className={styles.login}>
                Cicloviajero
              </Link>
            </div>

            <div className={styles.subAccount}>
              <div onClick={() => toast.warning("Muy Pronto ...")} className={styles.login}>
                Libros
              </div>
            </div>
          </div>
        ) : (
          <div
            className={openDropDown ? styles.menuIconClose : styles.menuIcon}
          >
            {openDropDown ? null : (
              <AiOutlineMenu
                size={20}
                onClick={handlerDropDown}
              />
            )}
            {openDropDown ? (
              <ul
                className={styles.dropdown}
              >
                <div className={styles.boxBtnClose}>
                  <IoMdCloseCircle
                    size={25}
                    onClick={handlerDropDown}
                    className={styles.iconCloseDrop}
                  />
                </div>
                <li
                  className={styles.dropdown_list}
                  onClick={() => router.push("/")}
                >
                  <div className={styles.dropdown_link}>
                    <AiFillHome />
                    <span className={styles.dropdown_span}>Inicio</span>
                  </div>
                </li>

                <li
                  className={styles.dropdown_list}
                  onClick={() => router.push("/music")}
                >
                  <div className={styles.dropdown_link}>
                    <IoIosMusicalNotes />
                    <span className={styles.dropdown_span}>Musica</span>
                  </div>
                </li>

                <li
                  className={styles.dropdown_list}
                  onClick={() => router.push("/ruta")}
                >
                  <div className={styles.dropdown_link}>
                    <FaMap />
                    <span className={styles.dropdown_span}>Ruta</span>
                  </div>
                </li>

                <li
                  className={styles.dropdown_list}
                  onClick={() => toast.warning("muy pronto")}
                >
                  <div className={styles.dropdown_link}>
                    <FaBicycle />
                    <span className={styles.dropdown_span}>Streaming</span>
                  </div>
                </li>

                <li
                  className={styles.dropdown_list}
                  onClick={() => router.push("/cicloviajero")}
                >
                  <div className={styles.dropdown_link}>
                    <FaBed />
                    <span className={styles.dropdown_span}>
                      Casa del cicloviajero
                    </span>
                  </div>
                </li>

                <li
                  className={styles.dropdown_list}
                  onClick={() => toast.warning("Muy Pronto ...")}
                >
                  <div className={styles.dropdown_link}>
                    <PiUsersThreeFill />
                    <span className={styles.dropdown_span}>Libros</span>
                  </div>
                </li>
              </ul>
            ) : null}
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
