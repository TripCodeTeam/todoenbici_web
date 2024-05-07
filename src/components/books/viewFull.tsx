import React from "react";
import styles from "./styles/viewfull.module.css";
import CardBook from "./cardBook";

const portadaOriginal = "";

const portadaEnglish = "";

const portadaPortugues = "";

const portadaItaliano = "";

const portadas = {
  Español:
    "https://res.cloudinary.com/df2gu30lb/image/upload/v1711247912/lmx7y9ssztaogwo1l3rb.jpg",
  Ingles:
    "https://res.cloudinary.com/df2gu30lb/image/upload/v1715060911/lpfrvzcmf1wprzisdxkx.jpg",
  Portugues:
    "https://res.cloudinary.com/df2gu30lb/image/upload/v1715060917/r8jekd8rmsfneccnxedo.jpg",
  Italiano:
    "https://res.cloudinary.com/df2gu30lb/image/upload/v1715060924/pohiyy9myxxyvpoeiwta.jpg",
};

function ViewFullBooks() {
  return (
    <>
      <div className={styles.supraBox}>
        <CardBook
          idBook={"1"}
          portadas={portadas}
          name="Guia practica para ciclo viajeros"
          description="Supervivencia en bicicleta"
        />
      </div>
    </>
  );
}

export default ViewFullBooks;
