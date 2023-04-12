import React from "react";
import "./SearchBar.scss";

function SearchBar(props) {
  return (
    <div className="nav-searchbar">
      <input
        type="text"
        value={props.inputText}
        id="searchBarMain"
        name="searchBarMain"
        className="main-nav-searchbar-input"
        placeholder="Buscar"
        onChange={props.searchBarChangeHandler}
      />
      <button className="nav-searchbar-logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="nav-searchbar-logo-svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  );
}

export default SearchBar;
