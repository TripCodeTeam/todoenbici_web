import React from "react";
import styles from "./done.module.css";
import { IoRocketSharp } from "react-icons/io5";
import Image from "next/image";

import { PiShootingStarFill } from "react-icons/pi";
import Avatar from "react-avatar";

function TopDonate() {
  return (
    <>
      <div className={styles.headerTopDonate}>
        <div className={styles.boxTopIcon}>
          <IoRocketSharp className={styles.topIcon} size={20} />
        </div>
        <h2>Donadores del mes</h2>
      </div>
      <div className={styles.donateUser}>
        <div className={styles.infoUser}>
          <div className={styles.boxImageUser}>
            <Avatar
              src={"https://github.com/foultrip.png"}
              alt="user"
              round={true}
              size="30"
            />
          </div>
          <p className={styles.nameUser}>David Vasquez</p>
        </div>
        <div className={styles.starsBox}>
          <div className={styles.boxIconStar} >
            <PiShootingStarFill style={{color: "yellow"}} size={20} />
          </div>
          <p className={styles.starCantity}>13k</p>
        </div>
      </div>
    </>
  );
}

export default TopDonate;
