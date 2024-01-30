"use client";

import axios from "axios";
import React, { useState, FormEvent } from "react";
import { Toaster, toast } from "sonner";
import styles from "./prompt.module.css";

import IAIcon from "@/assets/openIA_icon.png";
import Image from "next/image";
import CreateForm from "./createForm/createForm";

function PromptComponent() {
  const [prompt, setPrompt] = useState("");
  const [resultPrompt, setResultPrompt] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/generate",
        JSON.stringify({ prompt })
      );
      const data = await response.data;

      if (data) {
        setResultPrompt(data);
      } else {
        throw new Error("OpeIA no dio resultado");
      }

      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error al conectarse a OpenIA");
        console.log(error);
      }
    }
  };

  return (
    <>
      <Toaster richColors />
      <h2 className={styles.titleGenerate}>
        Genera una idea para tu bitacora con la ayuda de Chat GPT
      </h2>
      <form className={styles.formPrompt} onSubmit={handleSubmit}>
        <div className={styles.BasePrompt}>
          <div className={styles.boxIconGPT}>
            <Image className={styles.iconIA} src={IAIcon} alt="ia" />
          </div>
          <input type="text" onChange={(e) => setPrompt(e.target.value)} />
        </div>
        <button>Generate</button>
      </form>

      <CreateForm />
      {resultPrompt}
    </>
  );
}

export default PromptComponent;
