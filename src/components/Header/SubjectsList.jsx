import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SubjectsList.module.scss";
import { PropTypes } from "prop-types";

function SubjectsList(props) {
  const subjectsLists = [
    "sub1",
    "sub2",
    "sub3",
    "sub4",
    "sudgergretregregrtrtb5",
  ];

  const changeListDisplayHandler = () => {
    props.setDropdownClicked((prevState) => !prevState);
    props.isMobile && props.setMobileClicked((prevState) => !prevState);
  };

  return (
    <ul
      onClick={changeListDisplayHandler}
      className={`${styles["dropdown-menu"]} ${
        props.isMobile && styles["dropdown-menu-mobile"]
      }`}
    >
      {subjectsLists.map((sub, index) => (
        <li key={index} className={styles["main-nav-ppal-dropdown-option"]}>
          <Link to={`/books/subject/${sub}`}>{sub}</Link>
        </li>
      ))}
    </ul>
  );
}

SubjectsList.propTypes = {
  setMobileClicked: PropTypes.func,
  isMobile: PropTypes.bool,
  setDropdownClicked: PropTypes.func,
};

export default SubjectsList;
