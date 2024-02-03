// Modal.tsx
import React, { FC, MouseEvent, ReactNode } from "react";
import styles from "./modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: (event: MouseEvent<HTMLElement>) => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button className={styles.modal_close_button} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
