import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

function DefaultLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* This renders child routes */}
      </main>
    </>
  );
}

export default DefaultLayout;