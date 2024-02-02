"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsGeoFill } from "react-icons/bs";
import { TbWorldPin } from "react-icons/tb";
import { FaCity } from "react-icons/fa6";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { GiPathDistance } from "react-icons/gi";
import Image from "next/image";
import imgBitacora from "@/assets/bitacora_img_preview.jpg";

import { ImSpinner3 } from "react-icons/im";

import styles from "./infoMap.module.css";
import { CiCalendarDate } from "react-icons/ci";
import haversine from "../handlers/Haversine";
import { useGlobalContext } from "../context/ContextDashboard";

interface cordenatesProps {
  id: string;
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  state: string;
}

function InfoMap() {
  const [location, setLocation] = useState<cordenatesProps | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const { user } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/coordinates", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        // console.log(response);
        setLocation(response.data);

        const fixedPoint = { lat: 3.440215257060241, lng: -76.54566298899921 };

        const distance = haversine(
          fixedPoint.lat,
          fixedPoint.lng,
          response.data.latitude,
          response.data.longitude
        );

        setDistance(distance);
      } catch (error) {
        console.error("Error al obtener las coordenadas:", error);
      }
    };

    fetchData();
  }, [user?.token]);

  return (
    <div className={styles.infoContainer}>
      <div className={styles.boxCurrentLocation}>
        <h2 className={styles.titleInfo}>Ubicación actual</h2>
        <div className={styles.boxSpinner}>
          <ImSpinner3 className={styles.iconSpinner} />
        </div>
      </div>
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
            {location ? location.latitude : null} {location ? " | " : null}
            {location ? location.longitude : null}
          </p>
        </div>

        <div className={styles.boxProperty}>
          <div className={styles.boxIcon}>
            <HiOutlineStatusOnline className={styles.icon} size={20} />
          </div>
          <p>{location ? location.state : null}</p>
        </div>

        <div className={styles.boxProperty}>
          <div className={styles.boxIcon}>
            <GiPathDistance className={styles.icon} size={20} />
          </div>
          <p>
            {distance
              ? `Distancia: ${distance.toFixed(2)} km`
              : "No disponible"}
          </p>
        </div>
      </div>

      <h2 className={styles.titleInfoBitacora}>Bitácora</h2>
      <div className={styles.bitacoraContainer}>
        <p>Sin Bitacoras por el momento!</p>
        {/* <div className={styles.cardBitacora}>
          <div className={styles.boxImage}>
            <Image
              className={styles.imgBitacora}
              src={imgBitacora}
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
        </div> */}
      </div>
    </div>
  );
}

export default InfoMap;
