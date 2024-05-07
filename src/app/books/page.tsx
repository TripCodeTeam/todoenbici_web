import ViewFullBooks from "@/components/books/viewFull";
import ComingSoon from "@/components/comingSoon/ComingSoon";
import Navbar from "@/components/navBars/NavBar";
import React from "react";

function Book() {
  return (
    <>
      <Navbar isUser={false} />
      <ViewFullBooks />
    </>
  );
}

export default Book;
