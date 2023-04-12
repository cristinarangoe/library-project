import React, { useState } from "react";
import viteLogo from "/vite.svg";
import "./Navbar.scss";
import SearchBar from "./SearchBar";
import SubjectsList from "./SubjectsList";

function Navbar() {
  //state for the text that the user enters on the search bar
  const [inputText, setInputText] = useState("");
  //state for when the user clicks the hamburger icon - open/close the side menu
  const [mobileClicked, setMobileClicked] = useState(false);
  //state to know if the web needs to open the dropdown or close it - when the mouse leaves or enters the dropdown
  const [dropdownClicked, setDropdownClicked] = useState(false);

  //function to get what the user is typing on the search bar
  const searchBarChangeHandler = (event) => {
    setInputText(event.target.value);
  };

  //function to change the state of the hamburger - in mobile - to open and close the hamburger menu
  const changeMobileClickHandler = () => {
    setMobileClicked((prevState) => !prevState);
  };

  //function to when the user leaves the mouse over the dropdown - close the dropdown
  const closeDropdownHandler = () => {
    setDropdownClicked(false);
  };

  //function to when the user puts the mouse over the dropdown - open the dropdown
  const openDropdownHandler = () => {
    setDropdownClicked(true);
  };

  return (
    <header className="">
      <nav className={mobileClicked ? "nav-active" : "nav"}>
        <div className="nav-ppal">
          <button
            onClick={changeMobileClickHandler}
            className="nav-ppal-mobile-button"
          >
            {mobileClicked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="nav-ppal-mobile-button-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="nav-ppal-mobile-button-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
          <img src={viteLogo} className="" alt="Vite logo" />
          <div
            onMouseLeave={closeDropdownHandler}
            onMouseEnter={openDropdownHandler}
            className="nav-ppal-dropdown"
          >
            <div className="nav-ppal-dropdown-subject">
              <div className="">Categoria</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            {dropdownClicked && <SubjectsList mobile={false} />}
          </div>
        </div>
        <SearchBar
          inputText={inputText}
          searchBarChangeHandler={searchBarChangeHandler}
        />
        {mobileClicked && (
          <div className="side-nav-mobile">
            <SubjectsList mobile={true} setMobileClicked={setMobileClicked} />
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
