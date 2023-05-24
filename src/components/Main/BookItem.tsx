import React from "react";
import styles from "./BookItem.module.scss";
import { Link } from "react-router-dom";
import Book from "../../models/book";
import { useDispatch } from "react-redux";
import { favoriteBooksActions } from "../../store/favoriteBooks";
import HeartIcon from "../UI/HeartIcon";

const BookItem: React.FC<{ book: Book; isFavorite: boolean }> = (props) => {
  const dispatch = useDispatch();

  const path = `/books${props.book.id}`;

  const saveFavoriteBookClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch(
      favoriteBooksActions.saveFavoriteBooks(
        (e.target as HTMLButtonElement).value
      )
    );
  };
  return (
    <div className={styles["book-item"]}>
      <div className={styles["book-item-image"]}>
        <Link to={path}>
          {props.book.coverUrl && (
            <img src={props.book.coverUrl} alt={props.book.title} />
          )}
          {!props.book.coverUrl && (
            <div className={styles["book-item-image-no-image"]}>
              <div className={styles["book-item-image-no-image-container"]}>
                <p>{props.book.title}</p>
              </div>
            </div>
          )}
        </Link>
        <button
          className={`${
            props.isFavorite
              ? styles["book-item-image-heart-active"]
              : styles["book-item-image-heart"]
          }`}
          key={props.book.id}
          value={props.book.id}
          onClick={saveFavoriteBookClickHandler}
        >
          <HeartIcon />
        </button>
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
};

export default BookItem;
