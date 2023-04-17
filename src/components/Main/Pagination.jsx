import React from "react";
import styles from "./Pagination.module.scss";

function Pagination() {
  //need to fix the buttons
  return (
    <div className={styles["pagination"]}>
      <div className={styles["pagination-left"]}>
        <button className={styles["pagination-button"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={styles["pagination-icon"]}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>
      <div className={styles["pagination-pages"]}>
        <button className={styles["pagination-button"]}>1</button>
        <button className={styles["pagination-button"]}>2</button>
        <button className={styles["pagination-button"]}>...</button>
        <button className={styles["pagination-button"]}>12</button>
      </div>
      <div className={styles["pagination-right"]}>
        <button className={styles["pagination-button"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={styles["pagination-icon"]}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
