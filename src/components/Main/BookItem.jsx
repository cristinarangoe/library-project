import React from "react";
import styles from "./BookItem.module.scss";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

function BookItem(props) {
  return (
    <div className={styles["book-item"]}>
      <div className={styles["book-item-image"]}>
        <Link to={`/books/${props.book.id}`}>
          <img src={props.book.img} alt={props.book.title} />
        </Link>
      </div>
      <div className={styles["book-item-content"]}>
        <div>
          <Link to={`/books/${props.book.id}`}>
            <h2>{props.book.title}</h2>
          </Link>
          <p>{props.book.author}</p>
        </div>
        <div className={styles["book-item-info-link"]}>
          <Link to={`/books/${props.book.id}`}>Mas Info</Link>
        </div>
      </div>
    </div>
  );
}

BookItem.propTypes = {
  book: PropTypes.object,
};

export default BookItem;
