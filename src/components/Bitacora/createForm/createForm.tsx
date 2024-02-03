import React, { ChangeEvent, useState, FormEvent } from "react";
import styles from "./form.module.css";

import { AiOutlineDelete } from "react-icons/ai";
import Image from "next/image";
import axios from "axios";
import { useGlobalContext } from "@/components/context/ContextDashboard";
import { ScalarPost } from "@/types/User";
import { toast } from "sonner";

const CreateForm: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const { user } = useGlobalContext();
  const [data, setData] = useState<ScalarPost>({
    title: "",
    content: "",
    images: [],
    videos: [],
    location: "",
    userId: "",
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const imageUrls: string[] = [];

      // Iterate through selected images and upload to the server
      for (const image of selectedImages) {
        const formData = new FormData();
        formData.append("file", image);

        const response = await axios.post("/api/imagespost", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Assuming the server response contains the URL of the uploaded image
        const imageUrl = response.data;
        imageUrls.push(imageUrl);

        // Now you can use the 'imageUrls' array to save the URLs in MongoDB or perform any other action
        console.log("Image URLs:", imageUrls);
      }

      const BodyReq = {
        title: data.title,
        content: data.content,
        images: imageUrls,
        video: "",
        location: "",
        userId: user?.id,
      };

      const NewPost = await axios.post("/api/post/create", BodyReq, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      console.log(BodyReq);

      const dataNewPost: ScalarPost = NewPost.data;
      console.log(dataNewPost);

      if (dataNewPost.id) {
        toast.success("Publicacion creada");
      }

      // Add your logic to save the URLs in MongoDB or perform any other action
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <>
      <div className={styles.containerBitacora}>
        <form className={styles.formBox} onSubmit={handleSubmit}>
          <label htmlFor="title">Título</label>
          <input
            type="text"
            name="title"
            placeholder="Título"
            onChange={handleChange}
          />

          <label htmlFor="content">Contenido</label>
          <textarea
            className={styles.textareaInp}
            id="content"
            rows={5}
            cols={50}
            placeholder="Contenido"
            onChange={() => handleChange}
            name="content"
          />

          <label htmlFor="image-upload">Subir imágenes</label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            name="images"
            multiple
            onChange={handleImageUpload}
          />

          <div>
            {selectedImages.map((image, index) => (
              <div className={styles.imageContainer} key={index}>
                <Image
                  src={URL.createObjectURL(image)}
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1);",
                    margin: "10px",
                  }}
                  width={100}
                  height={100}
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
              Crear Publicacion
            </button>
          </div>
        </form>
        <div className={styles.modelsBItacora}></div>
      </div>
    </>
  );
};

export default CreateForm;
