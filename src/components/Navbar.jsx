import React, { useState } from "react";
import viteLogo from "/vite.svg";
import "./Navbar.scss";
import { Link } from "react-router-dom";

function Navbar() {
  const [inputText, setInputText] = useState("");
  const subjectsLists = [
    "sub1",
    "sub2",
    "sub3",
    "sub4",
    "sudgergretregregrtrtb5",
  ];

  const searchBarChangeHandler = (event) => {
    console.log(event.target.value);
    setInputText(event.target.value);
  };

  return (
    <header className="">
      <nav className="nav main-nav">
        <div className="nav-ppal main-nav-ppal">
          <img src={viteLogo} className="" alt="Vite logo" />
          <select
            name="subjects"
            id="subjects"
            className="main-nav-ppal-dropdown"
          >
            {subjectsLists.map((sub, index) => (
              <option
                key={index}
                value={`${sub}`}
                className="main-nav-ppal-dropdown-option"
              >
                <Link to={`/books/subject/${sub}`}>{sub}</Link>
              </option>
            ))}
          </select>
        </div>
        <div className="nav-searchbar main-nav-searchbar">
          <input
            type="text"
            value={inputText}
            id="searchBarMain"
            name="searchBarMain"
            className="main-nav-searchbar-input"
            placeholder="Buscar"
            onChange={searchBarChangeHandler}
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
      </nav>
      <nav className="nav mobile-nav">
        <div className="nav-ppal mobile-nav-ppal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="mobile-nav-img"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <img src={viteLogo} className="mobile-nav-img" alt="Vite logo" />
        </div>
        <div className="nav-searchbar mobile-nav-searchbar">
          <input
            type="text"
            value={inputText}
            id="searchBarMobile"
            name="searchBarMobile"
            className="mobile-nav-searchbar-input"
            placeholder="Buscar"
            onChange={searchBarChangeHandler}
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
      </nav>
    </header>
  );
}

export default Navbar;
