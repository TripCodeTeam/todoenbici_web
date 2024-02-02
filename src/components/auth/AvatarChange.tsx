import React, { useCallback, useState, ChangeEvent } from "react";
import Avatar from "react-avatar";
import { useDropzone } from "react-dropzone";
import { MdAccountCircle } from "react-icons/md";
import styles from "./avatar.module.css";

const AvatarUpload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" as any,
    multiple: false,
  });

  return (
    <div {...getRootProps()} style={{ cursor: "pointer" }}>
      <input {...getInputProps()} />
      {selectedImage ? (
        <div className={styles.changeImgBox}>
          <div className={styles.centerChangeImgBox}>
            <div className={styles.boxIconAvatar}>
              <Avatar
                src={selectedImage}
                alt="avatar"
                round={true}
                size="100"
              />
            </div>
            <div className={styles.boxBtnChange}>
              <button onClick={() => setSelectedImage(null)}>Cambiar</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.boxNoAvatar}>
          <div className={styles.centerChangeImgBox}>
            <div className={styles.boxIconAvatar}>
              <MdAccountCircle size={50} />
            </div>
            <div className={styles.boxBtnChange}>
              <p>Pon tu mejor foto</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;
