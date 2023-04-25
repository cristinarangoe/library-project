import React from "react";
import styles from "./BookList.module.scss";
import BookItem from "./BookItem";
import { PropTypes } from "prop-types";

function BookList(props) {
  return (
    <div className={styles["books-list"]}>
      {props.books.map((book) => (
        <BookItem book={book} key={book.id} />
      ))}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.array,
};

export default BookList;
