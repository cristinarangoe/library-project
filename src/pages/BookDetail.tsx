import { useCallback, useEffect, useState } from "react";
import styles from "./BookDetail.module.scss";
import { useParams } from "react-router-dom";
import Loader from "../components/UI/Loader";
import BookDetailType from "../models/bookDetail";

type Key = {
  key: string;
}
type Author= {
  author: Key;
  type: Key;
}

function BookDetail() {
  const [book, setBook] = useState<BookDetailType>({} as BookDetailType);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const params = useParams();

  const fetchBookHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://openlibrary.org/${params.bookApi}/${params.id}.json`
      );

      if (!response.ok) {
        throw new Error("Algo salió mal!");
      }

      const data = await response.json();

      const authors = await Promise.all(
        data.authors.map(async (aut: Author) => {
          const response = await fetch(
            `https://openlibrary.org${aut.author.key}.json`
          );
          const author = await response.json();
          return await author.name;
        })
      );

      const date = new Date(data.created.value);

      const transformedBook: BookDetailType = {
        id: data.key,
        coverUrl:
          data.covers &&
          `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`,
        description:
          data.description && data.description.value
            ? data.description.value
            : data.description,
        authors: authors ? authors.join(", ") : "",
        title: data.title,
        subjects: data.subjects,
        dateCreated: `${date.getDate().toString()}/${date
          .getMonth()
          .toString()}/${date.getFullYear().toString()}`,
        publishDate: data.first_publish_date,
      };

      setBook(transformedBook);
    } catch (error) {
      if(error instanceof Error) setError(error.message);
    }
    setIsLoading(false);
  }, [params]);

  useEffect(() => {
    fetchBookHandler();
  }, [fetchBookHandler]);

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
        {book.authors ? <h2>{book.authors}</h2> : <h2>Anónimo</h2>}
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
