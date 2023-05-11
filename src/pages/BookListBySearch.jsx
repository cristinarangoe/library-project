import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import BookList from "../components/Main/BookList";
import dataTransformation from "../utils/dataTranformationBookSearch";
import useFetch from "../utils/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { paginationActions } from "../store/pagination";
import optionsDropdown from "../utils/searchBarDropdownOptions";

function BookListBySearch() {
  const [books, setBooks] = useState([]);

  const params = useParams();
  const dispatch = useDispatch();

  const offset = useSelector((state) => state.pagination.offset);
  const limit = useSelector((state) => state.pagination.limit);

  const typeOfSearch = optionsDropdown.find(opt => opt.id === params.searchType).name;

  const convertedParams = params.searchField.replace(/\s/g, "+");
  const { data, isLoading, error } = useFetch(
    `https://openlibrary.org/search.json?${params.searchType}=${convertedParams}&limit=${limit}&offset=${offset}`
  );

  const getTranformatedData = async () => {
    if (!data) return;
    const transformedBooks = await dataTransformation(data);
    setBooks(transformedBooks);
    dispatch(paginationActions.setTotalPages(Math.ceil(data.numFound / limit)));
  };

  useEffect(() => {
    getTranformatedData();
  }, [data]);

  return (
    <div>
      <Helmet>
        <title>{typeOfSearch} de {convertedParams}</title>
      </Helmet>
      <BookList isLoading={isLoading} error={error} books={books} />
    </div>
  );
}

export default BookListBySearch;
