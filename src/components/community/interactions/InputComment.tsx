import React from "react";
import styles from "./input.module.css";
import { BiSend } from "react-icons/bi";

function InputComment() {
  return (
    <>
      <form action="" className={styles.formBox}>
        <textarea
          placeholder="Agrega un comentario ..."
          name="comment"
          className={styles.textArea}
        />
        <div className={styles.boxPublicComment}>
          <BiSend size={20} />
        </div>
      </form>
    </>
  );
}

export default InputComment;
