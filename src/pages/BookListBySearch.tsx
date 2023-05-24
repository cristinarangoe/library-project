import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookList from "../components/Main/BookList";
import Book from "../models/book";
import { useDispatch, useSelector } from "react-redux";
import optionsDropdown from "../utils/searchBarDropdownOptions";
import { paginationActions } from "../store/pagination";
import dataTransformation from "../utils/dataTransformationBookSearch";
import useFetch from "../utils/useFetch";
import { RootState } from "../store";
import DropdownOption from "../models/searchBarDropdownOption";
import { ApiData } from "../models/apiBookSearch";
import { Helmet, HelmetProvider } from "react-helmet-async";

function BookListBySearch() {
  const [books, setBooks] = useState<Book[]>([]);

  const params = useParams();
  const dispatch = useDispatch();

  const offset = useSelector((state: RootState) => state.pagination.offset);
  const limit = useSelector((state: RootState) => state.pagination.limit);

  const dropdownOptionSelected = optionsDropdown.find(
    (opt: DropdownOption) => opt.id === params.searchType
  );
  const typeOfSearch = dropdownOptionSelected
    ? dropdownOptionSelected.name
    : "";

  const convertedParams = params.searchField
    ? params.searchField.replace(/\s/g, "+")
    : "";

  const { data, isLoading, error } = useFetch<ApiData>(
    `https://openlibrary.org/search.json?${params.searchType}=${convertedParams}&limit=${limit}&offset=${offset}`
  );

  const getTranformatedData = async () => {
    if (!data) return;
    const transformedBooks: Book[] = await dataTransformation(data);
    transformedBooks && setBooks(transformedBooks);
    dispatch(paginationActions.setTotalPages(Math.ceil(data.numFound / limit)));
  };

  useEffect(() => {
    getTranformatedData();
  }, [data]);

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>
            {typeOfSearch} de {convertedParams}
          </title>
        </Helmet>
        <BookList isLoading={isLoading} error={error} books={books} />
      </div>
    </HelmetProvider>
  );
}

export default BookListBySearch;
