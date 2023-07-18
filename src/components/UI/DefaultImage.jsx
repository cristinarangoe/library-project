import React from "react";
import styles from "./DefaultImage.module.scss";


function DefaultImage(props) {
  return (
    <div className={styles["default-image"]}>
      <div className={styles["default-image-inner-border"]}>
        <p>{props.title}</p>
      </div>
    </div>
  );
}

export default DefaultImage;
