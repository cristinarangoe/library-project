import React from "react";
import styles from "./BookList.module.scss";
import BookItem from "./BookItem";
import Book from "../../models/book";

const BookList: React.FC<{books:Book[]}> = (props) => {
  return (
    <div className={styles["books-list"]}>
      {props.books.map((book: Book) => (
        <BookItem book={book} key={book.id} />
      ))}
    </div>
  );
}

export default BookList;
