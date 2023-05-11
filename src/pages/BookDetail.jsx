import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styles from "./BookDetail.module.scss";
import { useParams } from "react-router-dom";
import Loader from "../components/UI/Loader";
import useFetch from "../utils/useFetch";
import dataTransformation from "../utils/dataTransformationBookDetail";
import HeartIcon from "../components/UI/HeartIcon";
import { useDispatch, useSelector } from "react-redux";
import { favoriteBooksActions } from "../store/favoriteBooks";

function BookDetail() {
  const [book, setBook] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  const params = useParams();

  const dispatch = useDispatch();
  const favoriteBooks = useSelector(
    (state) => state.favoriteBooks.favoriteBooks
  );

  const { data, isLoading, error } = useFetch(
    `https://openlibrary.org/${params.bookApi}/${params.id}.json`
  );

  const getTranformatedData = async () => {
    const transformedBooks = await dataTransformation(data);
    setBook(transformedBooks);
  };

  const settingFavoriteBooks = () => {
    if (localStorage.getItem("favoriteBooks")) {
      const favorites = JSON.parse(localStorage.getItem("favoriteBooks"));
      const isAFavoriteBook = favorites.find(
        (item) => item === "/" + params.bookApi + "/" + params.id
      );
      if (isAFavoriteBook) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  };

  useEffect(() => {
    settingFavoriteBooks();
    getTranformatedData();
  }, [data]);

  const saveFavoriteBookClickHandler = (e) => {
    const isAFavoriteBook = favoriteBooks.find((item) => item === book.id);
    if (isAFavoriteBook) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
    dispatch(favoriteBooksActions.saveFavoriteBooks(e.target.value));
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (!isLoading && !book) {
    return <p>No se ha encontrado información acerca de este libro!</p>;
  }

  return (
    <div className={styles["book-detail"]}>
      <Helmet>
        <title>Libro {book.title}</title>
      </Helmet>
      <div className={styles["book-detail-img"]}>
        {book.coverUrl && <img src={book.coverUrl} alt={book.title} />}
        {!book.coverUrl && (
          <div className={styles["book-detail-image-no-image"]}>
            <div>
              <p>{book.title}</p>
            </div>
          </div>
        )}
      </div>
      <div className={styles["book-detail-content"]}>
        <div className={styles["test"]}>
          <h1>{book.title}</h1>
          <button
            className={`${
              isFavorite
                ? styles["book-detail-content-heart-active"]
                : styles["book-detail-content-heart"]
            }`}
            key={book.id}
            value={book.id}
            onClick={saveFavoriteBookClickHandler}
          >
            <HeartIcon />
          </button>
        </div>
        <h2>{book.authors}</h2>
        {book.description && (
          <div className={styles["book-detail-container-description"]}>
            <h3>Descripción:</h3>
            <p>{book.description}</p>
          </div>
        )}
        <div className={styles["book-detail-container-dates"]}>
          {book.dateCreated && (
            <div>
              <h4>Fecha de creación:</h4>
              <p>{book.dateCreated}</p>
            </div>
          )}
          {book.publishDate && (
            <div>
              <h4>Fecha de publicación:</h4>
              <p>{book.publishDate}</p>
            </div>
          )}
        </div>
        {book.subjects && (
          <div className={styles["book-detail-container-subjects"]}>
            <h4>Categorías:</h4>
            <p>
              {book.subjects[0]}, {book.subjects[1]}, {book.subjects[2]} ...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookDetail;
