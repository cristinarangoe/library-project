import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import BookList from "../components/Main/BookList";
import useFetch from "../utils/useFetch";
import dataTransformation from "../utils/dataTransformationBookSubject";
import { useDispatch, useSelector } from "react-redux";
import { paginationActions } from "../store/pagination";
import subjectsLists from "../utils/subjectsList";

function BooksListBySubject() {
  const [books, setBooks] = useState([]);

  const params = useParams();
  const dispatch = useDispatch();

  const offset = useSelector((state) => state.pagination.offset);
  const limit = useSelector((state) => state.pagination.limit);

  const subject = subjectsLists.find(sub => sub.id === params.subject).name;

  const { data, isLoading, error } = useFetch(
    `https://openlibrary.org/subjects/${params.subject}.json?limit=${limit}&offset=${offset}`
  );

  const getTranformatedData = async () => {
    if (!data) return;
    const transformedBooks = await dataTransformation(data);
    setBooks(transformedBooks);
    dispatch(
      paginationActions.setTotalPages(+Math.ceil(data.work_count / limit))
    );
  };
  useEffect(() => {
    getTranformatedData();
  }, [data]);

  return (
    <div>
      <Helmet>
        <title>Libros de {subject}</title>
      </Helmet>
      <BookList isLoading={isLoading} error={error} books={books} />
    </div>
  );
}

export default BooksListBySubject;
