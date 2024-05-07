"use client";

import React, { useState } from "react";
import styles from "./styles/cardBook.module.css";
import { IoIosAlert } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";
import Modal from "../modal/Modal";

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
          <div className={styles.rating}>
            <div className={styles.iconStart}>
              <IoStarSharp size={20} style={{ color: "yellow" }} />
            </div>
            <p className={styles.numberRat}>5.0</p>
            <Modal isOpen={isOpen} onClose={handleOpenModel}>
              <h4>Libro no disponible por el momento</h4>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardBook;
