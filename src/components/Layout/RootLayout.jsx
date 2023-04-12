import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Header/Navbar";
import "./RootLayout.scss";

function RootLayout() {
  return (
    <div className="">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
