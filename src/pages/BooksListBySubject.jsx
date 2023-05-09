import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookList from "../components/Main/BookList";
import useFetch from "../utils/useFetch";
import dataTransformation from "../utils/dataTransformationBookSubject";

function BooksListBySubject() {
  const [books, setBooks] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [lowerPageRange, setLowerPageRange] = useState(1);

  const params = useParams();
  const { data, isLoading, error } = useFetch(
    `https://openlibrary.org/subjects/${params.subject}.json?limit=${limit}&offset=${offset}`
  );

  const getTranformatedData = async () => {
    if (!data) return;
    const transformedBooks = await dataTransformation(data);
    setBooks(transformedBooks);
    setTotalPages(Math.ceil(data.work_count / limit));
  };
  useEffect(() => {
    getTranformatedData();
  }, [data]);

  return (
    <BookList
      isLoading={isLoading}
      error={error}
      books={books}
      limit={limit}
      setLimit={setLimit}
      offset={offset}
      setOffset={setOffset}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      totalPages={totalPages}
      lowerPageRange={lowerPageRange}
      setLowerPageRange={setLowerPageRange}
    />
  );
}

export default BooksListBySubject;
