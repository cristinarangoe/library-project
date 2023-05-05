import React, { useState } from "react";
import styles from "./SearchBar.module.scss";
import SearchIcon from "../UI/SearchIcon";
import { useNavigate } from "react-router-dom";

type DropdownOption = {
  id: string;
  name: string;
}

function SearchBar() {
  const [inputText, setInputText] = useState("");
  const [searchOption, setSearchOption] = useState("q");

  const navigate = useNavigate();

  const optionsDropdown = [
    { id: "q", name: "Todos" },
    { id: "author", name: "Autor" },
    { id: "title", name: "Título" },
    { id: "subject", name: "Categoría" },
  ];

  const inputTextChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const searchButtonClickHandler = () => {
    navigate(`/books/search/${searchOption}/${inputText}`);
    setInputText("");
    setSearchOption("q");
  };

  const selectedOptionDropdownChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
        {optionsDropdown.map((opt: DropdownOption) => {
          {
            return opt.name === "Todos" ? (
              <option key={opt.name} value={opt.id} defaultValue={"Todos"}>
                {opt.name}
              </option>
            ) : (
              <option key={opt.name} value={opt.id}>
                {opt.name}
              </option>
            );
          }
        })}
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
