import ComingSoon from "@/components/comingSoon/ComingSoon";
import Navbar from "@/components/navBars/NavBar";
import React from "react";

function Book() {
  return (
    <>
      <Navbar isUser={false} />
      <ComingSoon />
    </>
  );
}

export default Book;
