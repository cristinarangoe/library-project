import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookList from "../components/Main/BookList";
import Book from "../models/book";
import { useDispatch, useSelector } from "react-redux";
import subjectsLists from "../utils/subjectsList";
import dataTransformation from "../utils/dataTransformationBookSubject";
import { paginationActions } from "../store/pagination";
import { Helmet, HelmetProvider } from "react-helmet-async";
import useFetch from "../utils/useFetch";
import { RootState } from "../store";
import { ApiData } from "../models/apiBookSubject";

function BooksListBySubject() {
  const [books, setBooks] = useState<Book[]>([]);

  const params = useParams();
  const dispatch = useDispatch();

  const offset = useSelector((state: RootState) => state.pagination.offset);
  const limit = useSelector((state: RootState) => state.pagination.limit);

  const dropdownSubjectSelected = subjectsLists.find(
    (sub) => sub.id === params.subject
  );
  const subject = dropdownSubjectSelected ? dropdownSubjectSelected.name : "";

  const { data, isLoading, error } = useFetch<ApiData>(
    `https://openlibrary.org/subjects/${params.subject}.json?limit=${limit}&offset=${offset}`
  );

  const getTranformatedData = async () => {
    if (!data) return;
    const transformedBooks: Book[] = await dataTransformation(data);
    transformedBooks && setBooks(transformedBooks);
    dispatch(
      paginationActions.setTotalPages(+Math.ceil(data.work_count / limit))
    );
  };
  useEffect(() => {
    getTranformatedData();
  }, [data]);

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>Libros de {subject}</title>
        </Helmet>
        <BookList isLoading={isLoading} error={error} books={books} />
      </div>
    </HelmetProvider>
  );
}

export default BooksListBySubject;
