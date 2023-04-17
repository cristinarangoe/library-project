import React from "react";
import styles from "./BookItem.module.scss";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

function BookItem(props) {
  return (
    <div className={styles["book-item"]}>
      <div className={styles["book-item-image"]}>
        <Link to={`/books/${props.id}`}>
          <img src={props.img} alt={props.title} />
        </Link>
      </div>
      <div className={styles["book-item-content"]}>
        <div>
          <Link to={`/books/${props.id}`}>
            <h2>{props.title}</h2>
          </Link>
          <p>{props.author}</p>
        </div>
        <Button />
      </div>
    </div>
  );
}

export default BookItem;
