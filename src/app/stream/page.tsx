"use client"

import ComingSoon from "@/components/comingSoon/ComingSoon";
import { useGlobalContext } from "@/components/context/ContextDashboard";
import Navbar from "@/components/navBars/NavBar";
import React from "react";

function StreamPage() {
  const { user } = useGlobalContext();
  return (
    <>
      <Navbar isUser={user?.rol == "streamer" ? true : false} />
      <ComingSoon />
    </>
  );
}

export default StreamPage;
