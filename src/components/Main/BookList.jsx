import React, { useEffect } from "react";
import styles from "./BookList.module.scss";
import BookItem from "./BookItem";
import { PropTypes } from "prop-types";
import DropdownNumberOfBooks from "./DropdownNumberOfBooks";
import Pagination from "./Pagination";
import Loader from "../UI/Loader";
import { useDispatch, useSelector } from "react-redux";
import { favoriteBooksActions } from "../../store/favoriteBooks";

function BookList(props) {
  const dispatch = useDispatch();

  const favoriteBooks = useSelector(
    (state) => state.favoriteBooks.favoriteBooks
  );

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("favoriteBooks"));
    if (items) {
      dispatch(favoriteBooksActions.setFavoriteBooks(items));
    }
  }, []);

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
      <DropdownNumberOfBooks />
      <div className={styles["books-list"]}>
        {props.books.map((book) => {
          const isAFavoriteBook = favoriteBooks.some(
            (item) => item === book.id
          );
          return <BookItem book={book} key={book.id} isFavorite={isAFavoriteBook} />
        })}
      </div>
      <Pagination />
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
};

export default BookList;
