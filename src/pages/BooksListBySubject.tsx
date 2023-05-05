import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookList from "../components/Main/BookList";
import styles from "./BookListPage.module.scss";
import DropdownNumberOfBooks from "../components/Main/DropdownNumberOfBooks";
import Pagination from "../components/Main/Pagination";
import Loader from "../components/UI/Loader";
import Book from "../models/book";

type Author = {
  key: string;
  name: string;
}

type ApiBook = {
  key: string;
  cover_edition_key?: string;
  title: string;
  authors: Author[];
}

function BooksListBySubject() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [lowerPageRange, setLowerPageRange] = useState(1);

  const params = useParams();

  const fetchBooksHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://openlibrary.org/subjects/${params.subject}.json?limit=${limit}&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error("Algo salió mal!");
      }

      const data = await response.json();

      const transformedBooks: Book[] = data.works.map((book: ApiBook) => {
        return {
          id: book.key,
          coverUrl: book.cover_edition_key && `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`,
          title: book.title,
          authors: book.authors.map((author: Author) => author.name).join(", "),
        };
      });

      setBooks(transformedBooks);
      setTotalPages(5)
    } catch (error) {
      if(error instanceof Error) setError(error.message);
    }
    setIsLoading(false);
  }, [params, limit, offset]);

  useEffect(() => {
    fetchBooksHandler();
  }, [fetchBooksHandler]);

  if (isLoading) {
    return <Loader/>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (books.length === 0) {
    return <p>No se encontró ningún libro en esta categoría.</p>;
  }
  return (
    <div className={styles["book-list-ppal"]}>
      <DropdownNumberOfBooks setLimit={setLimit} limit={limit} />
      <BookList books={books} />
      <Pagination
        limit={limit}
        offset={offset}
        setOffset={setOffset}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        lowerPageRange={lowerPageRange}
        setLowerPageRange={setLowerPageRange}
      />
    </div>
  );
}

export default BooksListBySubject;
