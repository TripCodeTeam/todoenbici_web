"use client";

import React, { useState } from "react";
import styles from "./styles/cardBook.module.css";
import { IoIosAlert } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";
import Modal from "../modal/Modal";
import Image from "next/image";

import qrImage from "@/assets/books port/qr_venta_white.png";
import { TbArrowNarrowRight, TbBrandWhatsapp } from "react-icons/tb";
import { PiArrowUpRightBold } from "react-icons/pi";
import { useRouter } from "next/navigation";

interface Portadas {
  [key: string]: string;
}

function CardBook({
  idBook,
  portadas,
  name,
  description,
}: {
  idBook: string;
  portadas: Portadas;
  name: string;
  description: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("Español");
  const router = useRouter();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value); // Actualiza el estado cuando se selecciona un idioma diferente
  };

  const handleOpenModel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.book}>
        <div className={styles.statusPay}>
          <div className={styles.centerPayStatus}>
            <div className={styles.iconStatus}>
              <IoIosAlert />
            </div>
            <p>No Disponible</p>
          </div>
          <div>
            <select
              className={styles.selectForm}
              value={language}
              onChange={handleLanguageChange}
            >
              <option className={styles.optionSelect} value="Español">
                Español
              </option>
              <option className={styles.optionSelect} value="Ingles">
                Ingles
              </option>
              <option className={styles.optionSelect} value="Portugues">
                Portugues
              </option>
              <option className={styles.optionSelect} value="Italiano">
                Itialiano
              </option>
            </select>
          </div>
        </div>
        <div className={styles.bookImgPort}>
          <img
            className={styles.portBook}
            src={portadas[language]}
            alt="portada"
          />
        </div>
        <h3 className={styles.titleBook}>{name}</h3>
        <p>{description}</p>
        <div className={styles.payment}>
          <div className={styles.actions}>
            <button className={styles.btnPay} onClick={handleOpenModel}>
              Comprar
            </button>
            <button className={styles.btnPreviewBook}>Vista Previa</button>
          </div>
          {/* <div className={styles.rating}>
            <div className={styles.iconStart}>
              <IoStarSharp size={20} style={{ color: "yellow" }} />
            </div>
            <p className={styles.numberRat}>5.0</p>
          </div> */}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={handleOpenModel}>
        <div className={styles.containerQr}>
          <h4 className={styles.titleCoti}>Cotiza tu libro desde Whatsapp</h4>

          <div className={styles.scan}>
            <p>Escanea el codigo QR</p>
            <div className={styles.boxImageQr}>
              <Image
                className={styles.qrImage}
                src={qrImage}
                alt="qr"
                width={200}
                height={200}
              />
            </div>
          </div>

          <div className={styles.noScan}>
            <p>No tienes para escanear?</p>
            <div className={styles.wpBtn}>
              <div
                className={styles.centerWpBtn}
                onClick={() =>
                  router.push("https://wa.me/p/6010415189083238/593989196119")
                }
              >
                <div className={styles.textWp}>
                  <div className={styles.boxIconWp}>
                    <TbBrandWhatsapp className={styles.iconWp} size={25} />
                  </div>
                  <p className={styles.labelBtnWp}>Cotizar libro</p>
                </div>
                <div className={styles.boxIconRedir}>
                  <TbArrowNarrowRight
                    className={styles.iconArrowRedir}
                    size={20}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CardBook;
