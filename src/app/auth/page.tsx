"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";

import logoTripCode from "@/assets/logo_page.png";
import Signin from "@/components/auth/signin/page";
import Signup from "@/components/auth/signup/page";
import Navbar from "@/components/navBars/NavBar";
import { useGlobalContext } from "@/components/context/ContextDashboard";

function OneContent() {
  const [selectLogin, setSelectLogin] = useState("signin");
  const { user } = useGlobalContext();
  return (
    <>
      <Navbar isUser={user?.rol == "streamer" ? true : false} />
      <main className={styles.main}>
        <div className={styles.centerDiv}>
          <div className={styles.headerLogin}>
            <div className={styles.boxImageLogo}>
              <Image
                className={styles.logoIcon}
                src={logoTripCode}
                alt="logo"
              />
            </div>
            <p>Accede a nuestros servicios</p>
          </div>
          <div className={styles.optionAccess}>
            <div className={styles.btnsCenter}>
              <p
                className={
                  selectLogin == "signin"
                    ? styles.btnInitSelected
                    : styles.btnInit
                }
                onClick={() => setSelectLogin("signin")}
              >
                Iniciar Sesion
              </p>
              <p
                className={
                  selectLogin == "signup"
                    ? styles.btnregisterSelected
                    : styles.btnregister
                }
                onClick={() => setSelectLogin("signup")}
              >
                Crear Cuenta
              </p>
            </div>
          </div>
          {selectLogin == "signin" ? <Signin /> : null}
          {selectLogin == "signup" ? <Signup /> : null}
        </div>
      </main>
    </>
  );
}

export default OneContent;
