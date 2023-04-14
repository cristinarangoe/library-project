import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SubjectsList.module.scss";
import { PropTypes } from "prop-types";

function SubjectsList(props) {
  const [listOptionClicked, setListOptionClicked] = useState(false);

  const subjectsLists = [
    "sub1",
    "sub2",
    "sub3",
    "sub4",
    "sudgergretregregrtrtb5",
  ];

  //function to change the state to close and open the dropdown
  const changeListDisplayHandler = () => {
    setListOptionClicked((prevState) => !prevState);
    props.mobile && props.setMobileClicked((prevState) => !prevState)
  };
  
  return (
    <ul
      onClick={changeListDisplayHandler}
      className={`${listOptionClicked ? styles["dropdown-menu clicked"] : styles["dropdown-menu"]} ${props.mobile && styles["dropdown-menu-mobile"]}`}
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
  mobile: PropTypes.bool,
}

export default SubjectsList;
