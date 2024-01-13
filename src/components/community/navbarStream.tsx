"use client";

import React from "react";
import { useAuth } from "../Stream/context/useSession";
import Link from "next/link";
import styles from "./styles/navbar.module.css";
import { useRouter } from "next/navigation";

function NavbarStream() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("userData");
    window.location.reload();
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.subPartNav}>
        <p>
          Comunidad
        </p>
      </div>
      <div className={styles.subPartNavOpt}>
        <div
          className={styles.btnNav}
          onClick={() => router.push("/stream/view")}
        >
          historial
        </div>

        {/* {user?.stream[0].rol == "streamer" ? (
          <div
            className={styles.btnNav}
            onClick={() => router.push("/stream/panel")}
          >
            Panel
          </div>
        ) : null} */}

        {!user ? (
          <div
            className={styles.btnNav}
            onClick={() => router.push("/auth/signin")}
          >
            cuenta
          </div>
        ) : null}

        <div className={styles.btnNav}>
          <p>{user?.username}</p>
        </div>
        {user ?           <div
            className={styles.btnNav}
            onClick={handleLogout}
          >
            Salir
          </div> : null}
      </div>
    </nav>
  );
}

export default NavbarStream;
