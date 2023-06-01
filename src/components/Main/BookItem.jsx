import React from "react";
import styles from "./BookItem.module.scss";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import HeartIcon from "../UI/HeartIcon";
import { useDispatch } from "react-redux";
import { favoriteBooksActions } from "../../store/favoriteBooks";
import DefaultImage from "../UI/DefaultImage";

function BookItem(props) {
  const dispatch = useDispatch();

  const path = `/books${props.book.id}`;

  const saveFavoriteBookClickHandler = (e) => {
    dispatch(favoriteBooksActions.saveFavoriteBooks(e.target.value));
    console.log(e.target.value);
  };

  return (
    <div className={styles["book-item"]}>
      <div className={styles["book-item-image"]}>
        <Link to={path}>
          {props.book.coverUrl ? (
            <img src={props.book.coverUrl} alt={props.book.title} />
          ) : (
            <DefaultImage title={props.book.title} />
          )}
        </Link>
        <button
          className={`${
            props.isFavorite
              ? styles["book-item-image-heart-active"]
              : styles["book-item-image-heart"]
          }`}
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
}

BookItem.propTypes = {
  book: PropTypes.object,
  isFavorite: PropTypes.bool,
};

export default BookItem;
