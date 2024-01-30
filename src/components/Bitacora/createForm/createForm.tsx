import React, { ChangeEvent, useState } from "react";
import styles from "./form.module.css";

import { AiOutlineDelete } from "react-icons/ai";

const CreateForm: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImages((prevImages) => [
        ...prevImages,
        ...Array.from(event.target.files ? event.target.files : []),
      ]);
    }
  };

  const handleImageDelete = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  return (
    <>
      <div className={styles.containerBitacora}>
        <form className={styles.formBox}>
          <label htmlFor="title">Título</label>
          <input type="text" id="title" placeholder="Título" />

          <label htmlFor="content">Contenido</label>
          <textarea
            className={styles.textareaInp}
            id="content"
            rows={5}
            cols={50}
            placeholder="Contenido"
          />

          <label htmlFor="image-upload">Subir imágenes</label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />

          <div>
            {selectedImages.map((image, index) => (
              <div className={styles.imageContainer} key={index}>
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1);",
                    margin: "10px",
                  }}
                />
                <button
                  className={styles.deleteButton}
                  onClick={() => handleImageDelete(index)}
                >
                  {/* Botón de eliminación */}
                  <AiOutlineDelete className={styles.IconDelete} size={15} />
                </button>
              </div>
            ))}
          </div>

          <div className={styles.boxBtnForm}>
            <button className={styles.btnSubmit} type="submit">
              Crear
            </button>
          </div>
        </form>
        <div className={styles.modelsBItacora}></div>
      </div>
    </>
  );
};

export default CreateForm;
