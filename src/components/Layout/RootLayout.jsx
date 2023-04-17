import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Header/Navbar";
import styles from "./RootLayout.module.scss";

function RootLayout() {
  return (
    <div className={styles["root"]}>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
