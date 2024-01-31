"use client"

import React from "react";
import styles from "./style.module.css";
import { TbPointFilled } from "react-icons/tb";
import { useRouter } from "next/navigation";

function ComingSoon() {
  const router = useRouter();
  return (
    <>
      <h1 className={styles.Menssage}>Coming Soon</h1>
      <div className={styles.boxProgress}>
        <div className={styles.centerBoxProgress}>
          <div className={styles.BoxIcon}>
            <TbPointFilled className={styles.icon} size={20} />
          </div>
          <p className={styles.infoDev}>
            Development in progress by  
            <span
              className={styles.tripcode}
              onClick={() => router.push("https://tripcode.vercel.app/")}
            >
              TripCode
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default ComingSoon;
