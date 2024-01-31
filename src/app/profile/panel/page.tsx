"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Cambiado a next/router
import StreamAdmin from "@/components/liveStream/StreamAdmin";
import AssetsStreams from "@/components/liveStream/assetsStreams";
import {
  ColourOption,
  colourOptions,
} from "@/components/selects/colorOptions/data";
import Select from "react-select";
import styles from "./page.module.css";
import PromptComponent from "@/components/Bitacora/Prompt";
import { useGlobalContext } from "@/components/context/ContextDashboard";
import Navbar from "@/components/navBars/NavBar";

function Panel() {
  const { user } = useGlobalContext();
  const router = useRouter();
  const defaultOption =
    colourOptions.find((option) => option.value === "bitacora") || null;

  const [selectedOption, setSelectedOption] = useState<ColourOption | null>(
    defaultOption
  );

  const [shouldRenderContent, setShouldRenderContent] = useState(false);

  const handleChange = (option: ColourOption | null) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    if (user && user.rol === "streamer") {
      setShouldRenderContent(true);
    } else {
      router.push("/"); // Cambiado a router.push
    }
  }, [user, router]);

  // // Nuevo useEffect para manejar la redirección después de renderizar el contenido
  // useEffect(() => {
  //   if (!shouldRenderContent) {
  //     router.push("/");
  //   }
  // }, [shouldRenderContent, router]);

  return shouldRenderContent ? (
    <>
      <Navbar />
      <div className={styles.selectContainer}>
        <p>Crea</p>
        <Select
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isRtl={false}
          isSearchable={false}
          className={styles.basic_single}
          classNamePrefix="select"
          defaultValue={colourOptions[0]}
          name="color"
          options={colourOptions}
          onChange={handleChange}
        />
      </div>
      {selectedOption?.label === "Stream" ? (
        <>
          <StreamAdmin />
          <AssetsStreams />
        </>
      ) : null}
      {selectedOption?.label === "Bitacora" ? (
        <>
          <PromptComponent />
        </>
      ) : null}
    </>
  ) : null;
}

export default Panel;
