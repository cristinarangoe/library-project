import { useEffect, useState } from "react";
import styles from "./BookDetail.module.scss";
import { useParams } from "react-router-dom";
import Loader from "../components/UI/Loader";
import BookDetailType from "../models/bookDetail";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../utils/useFetch";
import HeartIcon from "../components/UI/HeartIcon";
import dataTransformation from "../utils/dataTransformationBookDetail";
import { favoriteBooksActions } from "../store/favoriteBooks";
import { RootState } from "../store";
import { ApiBook } from "../models/apiBookDetail";
import { Helmet, HelmetProvider } from "react-helmet-async";

function BookDetail() {
  const [book, setBook] = useState<BookDetailType>({} as BookDetailType);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const params = useParams();
  const dispatch = useDispatch();

  const favoriteBooks = useSelector(
    (state: RootState) => state.favoriteBooks.favoriteBooks
  );

  const { data, isLoading, error } = useFetch<ApiBook>(
    `https://openlibrary.org/${params.bookApi}/${params.id}.json`
  );

  const getTranformatedData = async () => {
    if (data) {
      const transformedBooks: BookDetailType | undefined =
        await dataTransformation(data);
      transformedBooks && setBook(transformedBooks);
    }
  };

  const settingFavoriteBooks = () => {
    const itemsInLocalStorage = localStorage.getItem("favoriteBooks");
    if (itemsInLocalStorage) {
      const favorites = JSON.parse(itemsInLocalStorage);
      const isAFavoriteBook = favorites.find(
        (item: string) => item === "/" + params.bookApi + "/" + params.id
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

  const saveFavoriteBookClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const isAFavoriteBook = favoriteBooks.find((item) => item === book.id);
    if (isAFavoriteBook) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
    dispatch(
      favoriteBooksActions.saveFavoriteBooks(
        (e.target as HTMLButtonElement).value
      )
    );
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (!book) {
    return <p>No se ha encontrado información acerca de este libro!</p>;
  }

  return (
    <HelmetProvider>
      <div className={styles["book-detail"]}>
        <Helmet>
          <title>{`Libro ${book.title}`}</title>
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
          <div className={styles["book-detail-content-upper-side"]}>
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
    </HelmetProvider>
  );
}

export default BookDetail;
