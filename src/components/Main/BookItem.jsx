import React from "react";
import styles from "./BookItem.module.scss";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

function BookItem(props) {
  const path = `/books${props.book.id}`;
  return (
    <div className={styles["book-item"]}>
      <div className={styles["book-item-image"]}>
        <Link to={path}>
          <img src={props.book.coverUrl} alt={props.book.title} />
        </Link>
      </div>
      <div className={styles["book-item-content"]}>
        <div>
          <Link to={path}>
            <h2>{props.book.title}</h2>
          </Link>
          <p>{props.book.authors}</p>
        </div>
        <div className={styles["book-item-info-link"]}>
          <Link to={path}>Mas Info</Link>
        </div>
      </div>
    </div>
  );
}

BookItem.propTypes = {
  book: PropTypes.object,
};

export default BookItem;
