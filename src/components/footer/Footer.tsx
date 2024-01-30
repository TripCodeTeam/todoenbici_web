import React from "react";
import styles from "./footer.module.css";

import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Footer() {
  const router = useRouter();
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.firstCard}>
          <p>&copy; 2024 TodoEnBici. Todos los derechos reservados</p>
        </div>
        <div className={styles.secondCard}>
          <div className={styles.centerIcons}>
            <FaFacebook
              onClick={() =>
                router.push("https://www.facebook.com/todoenbicicletacolombia")
              }
              size={20}
              className={styles.iconFooterFc}
            />
            <FaInstagram
              onClick={() =>
                router.push("https://www.instagram.com/Todoenbicicleta")
              }
              size={20}
              className={styles.iconFooterIg}
            />
            <FaTiktok
              onClick={() =>
                router.push(
                  "https://www.tiktok.com/@todo.enbicicleta?fbclid=IwAR3-k2G7QUT_ECgyOKXrtgbjl7eVZT8yPutgUgPV8JKchvp8t2p6nYgOCjs"
                )
              }
              size={20}
              className={styles.iconFooterTk}
            />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
