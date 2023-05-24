import React, { useState } from "react";
import styles from "./SearchBar.module.scss";
import SearchIcon from "../UI/SearchIcon";
import { useNavigate } from "react-router-dom";
import { paginationActions } from "../../store/pagination";
import { useDispatch } from "react-redux";
import optionsDropdown from "../../utils/searchBarDropdownOptions";
import DropdownOption from "../../models/searchBarDropdownOption";

function SearchBar() {
  const [inputText, setInputText] = useState("");
  const [searchOption, setSearchOption] = useState("q");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputTextChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputText(event.target.value);
  };

  const searchButtonClickHandler = () => {
    dispatch(paginationActions.setLimit(10));
    dispatch(paginationActions.goToAPage(1));
    navigate(`/books/search/${searchOption}/${inputText}`);
    setInputText("");
    setSearchOption("q");
  };

  const selectedOptionDropdownChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchOption(e.target.value);
  };

  return (
    <div className={styles["nav-searchbar"]}>
      <select
        className={styles["nav-searchbar-dropdown"]}
        name="dropdownSearchBar"
        id="dropdownSearchBar"
        onChange={selectedOptionDropdownChangeHandler}
        value={searchOption}
      >
        {optionsDropdown.map((opt: DropdownOption) => (
          <option key={opt.name} value={opt.id} defaultValue="Todos">
            {opt.name}
          </option>
        ))}
      </select>
      <div className={styles["nav-searchbar-dividor"]} />
      <input
        type="text"
        value={inputText}
        id="searchBarMain"
        name="searchBarMain"
        className={styles["main-nav-searchbar-input"]}
        placeholder="Buscar"
        onChange={inputTextChangeHandler}
      />
      <button
        onClick={searchButtonClickHandler}
        className={styles["nav-searchbar-logo"]}
      >
        <SearchIcon />
      </button>
    </div>
  );
}

export default SearchBar;
