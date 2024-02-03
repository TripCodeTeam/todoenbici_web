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
import Footer from "@/components/footer/Footer";
import RouteTrafic from "@/components/Bitacora/modifyRoute/routetrafic";

function Panel() {
  const { user } = useGlobalContext();
  const router = useRouter();
  const defaultOption =
    colourOptions.find((option) => option.value === "bitacora") || null;
  const [selectedOption, setSelectedOption] = useState<ColourOption | null>(
    defaultOption
  );
  const [shouldRenderContent, setShouldRenderContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (option: ColourOption | null) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    if (user) {
      if (user.rol === "streamer" && user.token) {
        setShouldRenderContent(true);
      } else {
        router.push("/");
      }
      setIsLoading(false);
    }
  }, [user, router]);

  if (isLoading) return null;

  if (!isLoading) {
    return shouldRenderContent ? (
      <>
        <Navbar isUser={user?.rol == "streamer" ? true : false} />
        <div className={styles.selectContainer}>
          <p>Crea</p>
          <Select
            isDisabled={false}
            isLoading={false}
            isClearable={false}
            isRtl={false}
            isSearchable={false}
            className="basic_single"
            classNamePrefix="select"
            defaultValue={colourOptions[0]}
            name="color"
            options={colourOptions}
            onChange={handleChange}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "grey" : "white",
                background: "grey",
                color: "white",
              }),
              option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                return {
                  ...styles,
                  backgroundColor: isFocused ? "grey" : "darkgrey",
                };
              },
            }}
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
        {selectedOption?.label === "Mapa" ? (
          <>
            <RouteTrafic />
          </>
        ) : null}
        <Footer />
      </>
    ) : null;
  }
}

export default Panel;
