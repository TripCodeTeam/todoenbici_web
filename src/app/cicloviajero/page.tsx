import Navbar from "@/components/navBars/NavBar";
import React from "react";
import styles from "./page.module.css";
import ComingSoon from "@/components/comingSoon/ComingSoon";
import { useGlobalContext } from "@/components/context/ContextDashboard";

function Cicloviajero() {
  const { user } = useGlobalContext();
  return (
    <>
      <Navbar isUser={user?.rol == "streamer" ? true : false} />
      <ComingSoon />
    </>
  );
}

export default Cicloviajero;
