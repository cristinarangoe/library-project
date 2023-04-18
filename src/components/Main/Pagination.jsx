import React from "react";
import styles from "./Pagination.module.scss";
import ChevronIconDown from "../UI/ChevronIconDown";

function Pagination() {
  return (
    <div className={styles["pagination"]}>
      <div className={styles["pagination-arrow"]}>
        <button className={styles["pagination-button-icon-left"]}>
          <ChevronIconDown />
        </button>
      </div>
      <div className={styles["pagination-pages"]}>
        <button className={styles["pagination-button-number"]}>1</button>
        <button className={styles["pagination-button-number"]}>2</button>
        <p className={styles["pagination-button-number"]}>...</p>
        <button className={styles["pagination-button-number"]}>12</button>
      </div>
      <div className={styles["pagination-arrow"]}>
        <button className={styles["pagination-button-icon-right"]}>
          <ChevronIconDown />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
