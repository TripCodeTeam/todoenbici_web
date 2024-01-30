"use client";

import NavbarStream from "@/components/community/navbarStream";
import StreamAdmin from "@/components/liveStream/StreamAdmin";
import AssetsStreams from "@/components/liveStream/assetsStreams";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  ColourOption,
  colourOptions,
} from "@/components/selects/colorOptions/data";
import Select from "react-select";

import styles from "./page.module.css";
import PromptComponent from "@/components/Bitacora/Prompt";
import { useGlobalContext } from "@/components/context/ContextDashboard";

const Checkbox = ({ children, ...props }: JSX.IntrinsicElements["input"]) => (
  <label style={{ marginRight: "1em" }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

function Panel() {
  const { user } = useGlobalContext();
  const router = useRouter();
  const defaultOption =
    colourOptions.find((option) => option.value === "bitacora") || null;
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<ColourOption | null>(
    defaultOption
  );

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  // Esta función se llama cuando el usuario selecciona una opción
  const handleChange = (option: ColourOption | null) => {
    setSelectedOption(option);
  };

  if (!loading) {
    if (user ? user.rol == "streamer" : null) {
      return (
        <>
          <NavbarStream />

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

          {selectedOption?.label == "Stream" ? (
            <>
              <StreamAdmin />
              <AssetsStreams />
            </>
          ) : null}

          {selectedOption?.label == "Bitacora" ? (
            <>
              <PromptComponent />
            </>
          ) : null}
        </>
      );
    } else {
      router.push("/stream");
    }
  }
}

export default Panel;
