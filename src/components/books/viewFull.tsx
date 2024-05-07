import React from "react";
import styles from "./styles/viewfull.module.css";
import CardBook from "./cardBook";

const firstPortada =
  "https://res.cloudinary.com/df2gu30lb/image/upload/v1711247912/lmx7y9ssztaogwo1l3rb.jpg";

function ViewFullBooks() {
  return (
    <>
      <div className={styles.supraBox}>
        <CardBook
          idBook={"1"}
          portada={firstPortada}
          name="Guia practica para ciclo viajeros"
          description="Supervivencia en bicicleta"
        />
      </div>
    </>
  );
}

export default ViewFullBooks;
