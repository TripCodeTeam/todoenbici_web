import React from "react";
import styles from "./sponsor.module.css";
import Image from "next/image";

import img00 from "@/assets/tripcode_logo.png";
import img01 from "@/assets/oscargo_logo.png";
import img02 from "@/assets/juliaca_logo.png";
import img03 from "@/assets/tripcode_logo.png";
import img04 from "@/assets/oscargo_logo.png";
import img05 from "@/assets/juliaca_logo.png";
import img06 from "@/assets/tripcode_logo.png";
import img07 from "@/assets/oscargo_logo.png";
import img08 from "@/assets/juliaca_logo.png";

function AutoSliderSponsor() {
  return (
    <>
      <div>
        <div className={styles.slider}>
          <div className={styles.slide_track}>
            <div className={styles.slide}>
              <Image className={styles.img} src={img00} alt="img00" />
            </div>
            <div className={styles.slide}>
              <Image className={styles.img} src={img01} alt="img01" />
            </div>
            <div className={styles.slide}>
              <Image className={styles.img} src={img02} alt="img02" />
            </div>
            <div className={styles.slide}>
              <Image className={styles.img} src={img03} alt="img03" />
            </div>
            <div className={styles.slide}>
              <Image className={styles.img} src={img04} alt="img04" />
            </div>
            <div className={styles.slide}>
              <Image className={styles.img} src={img05} alt="img05" />
            </div>
            <div className={styles.slide}>
              <Image className={styles.img} src={img06} alt="img06" />
            </div>
            <div className={styles.slide}>
              <Image className={styles.img} src={img07} alt="img07" />
            </div>
            <div className={styles.slide}>
              <Image className={styles.img} src={img08} alt="img08" />
            </div>

            {/* Copy */}
            <div className={styles.slide}>
              <Image className={styles.img} src={img00} alt="img00" />
            </div>
            <div className={styles.slide}>
              <Image className={styles.img} src={img01} alt="img01" />
            </div>
            <div className={styles.slide}>
              <Image className={styles.img} src={img02} alt="img02" />
            </div>
            <div className={styles.slide}>
              <Image className={styles.img} src={img03} alt="img03" />
            </div>
            <div className={styles.slide}>
              <Image className={styles.img} src={img04} alt="img04" />
            </div>
            <div className={styles.slide}>
              <Image className={styles.img} src={img05} alt="img05" />
            </div>
            <div className={styles.slide}>
              <Image className={styles.img} src={img06} alt="img06" />
            </div>
            <div className={styles.slide}>
              <Image className={styles.img} src={img07} alt="img07" />
            </div>
            <div className={styles.slide}>
              <Image className={styles.img} src={img08} alt="img08" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AutoSliderSponsor;
