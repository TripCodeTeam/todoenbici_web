"use client";

import React, { FormEvent, useState } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/Stream/context/useSession";
import styles from "./signin.module.css";

import { LOGIN } from "@/graphql/mutations";

import { LuHistory } from "react-icons/lu";
import { AiFillMessage } from "react-icons/ai";
import { PiMusicNotesFill } from "react-icons/pi";
import { IoShareSocialSharp } from "react-icons/io5";
import { useMutation } from "@apollo/client";

function Signin() {
  const { user, setAuthData } = useAuth();
  const [ login ] = useMutation(LOGIN);
  const route = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login({ variables: formData });
      console.log(response);
      if (response.data && response.data.login) {
        setAuthData(response.data.login);
        toast.success("Usuario encontrado");
        setTimeout(() => {
          route.push("/community");
        }, 3000);
      } else {
        toast.error("Error de autenticado");
      }
    } catch (error) {
      toast.error("Failed signin");
    }
  };

  if (user) {
    route.push("/");
  } else {
    return (
      <>
        <Toaster richColors />
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.infoForm}>
            <h4 className={styles.loginMessage}>COMUNIDAD</h4>
            <div className={styles.boxIcons}>
              <div className={styles.centerIcons}>
                <LuHistory className={styles.icon} />
                <AiFillMessage className={styles.icon} />
                <IoShareSocialSharp className={styles.icon} />
                <PiMusicNotesFill className={styles.icon} />
              </div>
            </div>
          </div>
          <input
            className={styles.input}
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={formData.username}
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />

          <div className={styles.btnSubmit}>
            <button type="submit">Ingresar</button>
          </div>
        </form>
      </>
    );
  }
}

export default Signin;
