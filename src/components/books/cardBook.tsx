"use client";

import React, { useState } from "react";
import styles from "./styles/cardBook.module.css";
import { IoIosAlert } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";
import Modal from "../modal/Modal";

function CardBook({
  idBook,
  portada,
  name,
  description,
}: {
  idBook: string;
  portada: string;
  name: string;
  description: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
            <p>No comprado</p>
          </div>
        </div>
        <div className={styles.bookImgPort}>
          <img className={styles.portBook} src={portada} alt="portada" />
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
              <h4>Paga con el metodo que mas te paresca</h4>
              
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardBook;
