import React, { useEffect, useState } from "react";
import styles from "./BookDetail.module.scss";
import { useParams } from "react-router-dom";
import Loader from "../components/UI/Loader";
import useFetch from "../utils/useFetch";
import dataTransformation from "../utils/dataTransformationBookDetail";

function BookDetail() {
  const [book, setBook] = useState({});
  const params = useParams();
  const { data, isLoading, error } = useFetch(
    `https://openlibrary.org/${params.bookApi}/${params.id}.json`
  );

  const getTranformatedData = async () => {
    const transformedBooks = await dataTransformation(data);
    setBook(transformedBooks);
  }

  useEffect(() => {
    getTranformatedData();
  }, [data])

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
    <div className={styles["book-detail"]}>
      <div className={styles["book-detail-img"]}>
        <img src={book.coverUrl} alt={book.title} />
      </div>
      <div className={styles["book-detail-content"]}>
        <h1>{book.title}</h1>
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
