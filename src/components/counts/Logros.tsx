import React from "react";
import styles from "../../app/page.module.css";

import { MdDirectionsBike } from "react-icons/md";
import { FaRoad, FaHandsHelping } from "react-icons/fa";
import ContadorAnimado from "../Bitacora/contador_animado/page";

function LogrosComponent() {
  return (
    <>
      <main className={styles.biografic}>
        <section className={styles.informationBox}>
          <div className={styles.infoCard}>
            <div className={styles.centerInfoCard}>
              <div className={styles.infoIcon}>
                <MdDirectionsBike className={styles.iconRoad} size={70} />
              </div>
              <ContadorAnimado numeroFinal={10000} />
              <p className={styles.textInfoCard}>km recorridos</p>
            </div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.centerInfoCard}>
              <div className={styles.infoIcon}>
                <FaRoad className={styles.iconCity} size={70} />
              </div>
              <ContadorAnimado numeroFinal={8000000} />
              <p className={styles.textInfoCard}>pedaleadas</p>
            </div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.centerInfoCard}>
              <div className={styles.infoIcon}>
                <FaHandsHelping className={styles.iconHelping} size={70} />
              </div>
              <ContadorAnimado numeroFinal={67} />
              <p className={styles.textInfoCard}>puntos de apoyo</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default LogrosComponent;
