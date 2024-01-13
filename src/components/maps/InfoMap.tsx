"use client";

import React, { useEffect } from "react";
import { BsGeoFill } from "react-icons/bs";
import { LAST_CORDENATES } from "@/graphql/mutations";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { TbWorldPin } from "react-icons/tb";
import { FaCity } from "react-icons/fa6";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { CiCalendarDate } from "react-icons/ci";

import imgBitacora from "@/assets/bitacora_img_preview.jpg";

import styles from "./infoMap.module.css";
import Image from "next/image";

interface cordenatesProps {
  id: string;
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  state: string;
}

interface Data {
  lastCordenate: cordenatesProps;
}

function InfoMap() {
  const { data } = useSuspenseQuery<Data>(LAST_CORDENATES);

  useEffect(() => {
    data;
  }, [data]);

  const location: cordenatesProps = data.lastCordenate;

  console.log(data);

  return (
    <div className={styles.infoContainer}>
      <h2 className={styles.titleInfo}>Ubicación actual</h2>
      <div className={styles.boxesInfo}>
        <div className={styles.boxProperty}>
          <div className={styles.boxIcon}>
            <TbWorldPin className={styles.icon} size={20} />
          </div>
          <p>{location ? location.country : "No disponible"}</p>
        </div>

        <div className={styles.boxProperty}>
          <div className={styles.boxIcon}>
            <FaCity className={styles.icon} size={20} />
          </div>
          <p>{location ? location.city : "No disponible"}</p>
        </div>

        <div className={styles.boxProperty}>
          <div className={styles.boxIcon}>
            <BsGeoFill className={styles.icon} size={20} />
          </div>
          <p>
            {!location ? "No disponible" : null}
            {location ? location.latitude : null} {location ? " | " : null}{" "}
            {location ? location.longitude : null}
          </p>
        </div>

        <div className={styles.boxProperty}>
          <div className={styles.boxIcon}>
            <HiOutlineStatusOnline className={styles.icon} size={20} />
          </div>
          <p>{location ? location.state : null}</p>
        </div>
      </div>

      <h2 className={styles.titleInfoBitacora}>Bitacora</h2>
      <div className={styles.bitacoraContainer}>
        <div className={styles.cardBitacora}>
          <div className={styles.boxImage}>
            <Image
              className={styles.imgBitacora}
              src={imgBitacora.src}
              width={10}
              height={10}
              alt="botacora"
            />
          </div>
          <div className={styles.boxDetails}>
            <div className={styles.centerBoxDetails}>
              <div className={styles.dateBox}>
                <div className={styles.subDate}>
                  <div className={styles.dateIcon}>
                    <CiCalendarDate />
                  </div>
                  <p>02/01/2024</p>
                </div>

                <div className={styles.subDate}>
                  <div className={styles.dateIcon}>
                    <CiCalendarDate />
                  </div>
                  <p>14:32</p>
                </div>
              </div>
              <p className={styles.bitacoraContent}>
                El dia hoy recorrimos la ciudad de cali junto con oskargo
                vestidos con atuendos de papa noel
              </p>
            </div>
          </div>
        </div>

        <div className={styles.cardBitacora}>
          <div className={styles.boxImage}>
            <Image
              className={styles.imgBitacora}
              width={10}
              height={10}
              src={imgBitacora.src}
              alt="botacora"
            />
          </div>
          <div className={styles.boxDetails}>
            <div className={styles.centerBoxDetails}>
              <div className={styles.dateBox}>
                <div className={styles.subDate}>
                  <div className={styles.dateIcon}>
                    <CiCalendarDate />
                  </div>
                  <p>02/01/2024</p>
                </div>

                <div className={styles.subDate}>
                  <div className={styles.dateIcon}>
                    <CiCalendarDate />
                  </div>
                  <p>14:32</p>
                </div>
              </div>
              <p className={styles.bitacoraContent}>
                El dia hoy recorrimos la ciudad de cali junto con oskargo
                vestidos con atuendos de papa noel
              </p>
            </div>
          </div>
        </div>

        <div className={styles.cardBitacora}>
          <div className={styles.boxImage}>
            <Image
              className={styles.imgBitacora}
              src={imgBitacora.src}
              width={10}
              height={10}
              alt="botacora"
            />
          </div>
          <div className={styles.boxDetails}>
            <div className={styles.centerBoxDetails}>
              <div className={styles.dateBox}>
                <div className={styles.subDate}>
                  <div className={styles.dateIcon}>
                    <CiCalendarDate />
                  </div>
                  <p>02/01/2024</p>
                </div>

                <div className={styles.subDate}>
                  <div className={styles.dateIcon}>
                    <CiCalendarDate />
                  </div>
                  <p>14:32</p>
                </div>
              </div>
              <p className={styles.bitacoraContent}>
                El dia hoy recorrimos la ciudad de cali junto con oskargo
                vestidos con atuendos de papa noel
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoMap;
