import React from "react";
import styles from "./video.module.css";
import { useRouter } from "next/navigation";
import { TbPointFilled } from "react-icons/tb";
import { FaYoutube } from "react-icons/fa";

const VideoComponent: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.videoContainer}>
      <div className={styles.infoBannerStreamers}>
        <video
          muted
          className={styles.video}
          autoPlay
          src="/video001.webm"
          playsInline
          loop
        />
      </div>
      <div className={styles.infoBannerStreamers}>
        <div>
          <h3 className={styles.info}>
            ¿Te gustaría conocer el mundo desde una perspectiva diferente?
          </h3>
          <div className={styles.boxOptiones}>
            <div className={styles.centerOptions}>
              <div className={styles.btnStream}>
                <div className={styles.imageIcon}>
                  <TbPointFilled className={styles.iconCirqelRed} />
                </div>
                <p>Streamings</p>
              </div>

              <div className={styles.btnYoutube}>
                <div className={styles.imageIcon}>
                  <FaYoutube className={styles.iconYoutube} />
                </div>
                <p>Mis Videos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
