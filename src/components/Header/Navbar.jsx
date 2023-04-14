import React, { useState } from "react";
import viteLogo from "/vite.svg";
import styles from "./Navbar.module.scss";
import SearchBar from "./SearchBar";
import SubjectsList from "./SubjectsList";
import XMarkIcon from "../UI/XMarkIcon";
import BarsIcon from "../UI/BarsIcon";
import ChevronIconDown from "../UI/ChevronIconDown";

function Navbar() {
  const [mobileMenuClicked, setMobileMenuClicked] = useState(false);
  const [dropdownClicked, setDropdownClicked] = useState(false);

  const changeMobileMenuClickHandler = () => {
    setMobileMenuClicked((prevState) => !prevState);
  };

  const closeDropdownHandler = () => {
    setDropdownClicked(false);
  };

  const openDropdownHandler = () => {
    setDropdownClicked(true);
  };

  return (
    <header className="">
      <nav
        className={`${
          mobileMenuClicked ? styles["nav-active"] : styles["nav"]
        }`}
      >
        <div className={styles["nav-ppal"]}>
          <button
            onClick={changeMobileMenuClickHandler}
            className={styles["nav-ppal-mobile-button"]}
          >
            {mobileMenuClicked ? <XMarkIcon /> : <BarsIcon />}
          </button>
          <img src={viteLogo} className="" alt="Vite logo" />
          <div
            onMouseLeave={closeDropdownHandler}
            onMouseEnter={openDropdownHandler}
            className={styles["nav-ppal-dropdown"]}
          >
            <div className={styles["nav-ppal-dropdown-subject"]}>
              <div>Categoria</div>
              <ChevronIconDown />
            </div>
            {dropdownClicked && <SubjectsList mobile={false} />}
          </div>
        </div>
        <div className={styles["nav-searchbar"]}>
          {" "}
          <SearchBar />
        </div>
        {mobileMenuClicked && (
          <div className={styles["side-nav-mobile"]}>
            <SubjectsList
              mobile={true}
              setMobileClicked={setMobileMenuClicked}
            />
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
