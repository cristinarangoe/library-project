import React from "react";
import styles from "./BookList.module.scss";
import BookItem from "./BookItem";
import { PropTypes } from "prop-types";
import DropdownNumberOfBooks from "./DropdownNumberOfBooks";
import Pagination from "./Pagination";
import Loader from "../UI/Loader";

function BookList(props) {
  if (props.isLoading) {
    return <Loader />;
  }
  if (props.error) {
    return <p>{error}</p>;
  }
  if (props.books.length === 0) {
    return <p>No se encontró ningún libro en esta búsqueda</p>;
  }
  return (
    <div className={styles["book-list-ppal"]}>
      <DropdownNumberOfBooks setLimit={props.setLimit} limit={props.limit} />
      <div className={styles["books-list"]}>
        {props.books.map((book) => (
          <BookItem book={book} key={book.id} />
        ))}
      </div>
      <Pagination
        limit={props.limit}
        offset={props.offset}
        setOffset={props.setOffset}
        setCurrentPage={props.setCurrentPage}
        currentPage={props.currentPage}
        totalPages={props.totalPages}
        lowerPageRange={props.lowerPageRange}
        setLowerPageRange={props.setLowerPageRange}
      />
    </div>
  );
}

BookList.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      coverUrl: PropTypes.string,
      title: PropTypes.string,
      authors: PropTypes.string,
    })
  ),
  limit: PropTypes.number,
  setLimit: PropTypes.func,
  offset: PropTypes.number,
  setOffset: PropTypes.func,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  totalPages: PropTypes.number,
  lowerPageRange: PropTypes.number,
  setLowerPageRange: PropTypes.func,
};

export default BookList;
