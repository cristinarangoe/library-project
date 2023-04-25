import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookList from "../components/Main/BookList";
import styles from "./BookListPage.module.scss";
import DropdownNumberOfBooks from "../components/Main/DropdownNumberOfBooks";
import Pagination from "../components/Main/Pagination";
import Loader from "../components/UI/Loader";

function BookListBySearch() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [lowerPageRange, setLowerPageRange] = useState(1);
  const [higherPageRange, setHigherPageRange] = useState(0);

  const params = useParams();

  const fetchBooksHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const convertedParams = params.searchField.replace(/\s/g, "+");

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?${params.searchType}=${convertedParams}&limit=${limit}&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error("Algo salió mal!");
      }

      const data = await response.json();

      const transformedBooks = data.docs.map((book) => {
        return {
          id: book.key,
          coverUrl:
            book.cover_edition_key &&
            `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`,
          title: book.title,
          authors: book.author_name.join(", "),
        };
      });
      setBooks(transformedBooks);
      setTotalPages(Math.ceil(data.numFound / limit));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [params, limit, offset]);

  useEffect(() => {
    fetchBooksHandler();
    setHigherPageRange(totalPages >= 5 ? 5 : totalPages);
  }, [fetchBooksHandler, totalPages]);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (books.length === 0) {
    return (
      <p>No se encontró ningún libro en esta búsqueda: {params.searchField}</p>
    );
  }
  return (
    <div className={styles["book-list-ppal"]}>
      <h1>Búsqueda de: {params.searchField}</h1>
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
        higherPageRange={higherPageRange}
        setHigherPageRange={setHigherPageRange}
      />
    </div>
  );
}

export default BookListBySearch;
