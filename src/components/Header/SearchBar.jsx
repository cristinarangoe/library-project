import React, { useState } from "react";
import styles from "./SearchBar.module.scss";
import SearchIcon from "../UI/SearchIcon";

function SearchBar() {
  const [inputText, setInputText] = useState("");
  const inputTextChangeHandler = (event) => {
    setInputText(event.target.value);
  };
  return (
    <div className={styles["nav-searchbar"]}>
      <input
        type="text"
        value={inputText}
        id="searchBarMain"
        name="searchBarMain"
        className={styles["main-nav-searchbar-input"]}
        placeholder="Buscar"
        onChange={inputTextChangeHandler}
      />
      <button className={styles["nav-searchbar-logo"]}>
        <SearchIcon />
      </button>
    </div>
  );
}

export default SearchBar;
