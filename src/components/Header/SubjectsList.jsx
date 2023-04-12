import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SubjectsList.scss";

function Dropdown(props) {
  //state for checking if when the dropdown is open, I clicked an option in order to close the dropdown
  const [optionClicked, setOptionClicked] = useState(false);

  //this is temporary info
  const subjectsLists = [
    "sub1",
    "sub2",
    "sub3",
    "sub4",
    "sudgergretregregrtrtb5",
  ];

  //function to change the state to close and open the dropdown
  const optionClickedHandler = () => {
    setOptionClicked((prevState) => !prevState);
    props.setMobileClicked((prevState) => !prevState)
  };
  
  return (
    <ul
      onClick={optionClickedHandler}
      className={`${optionClicked ? "dropdown-menu clicked" : "dropdown-menu"} ${props.mobile && "dropdown-menu-mobile"}`}
    >
      {subjectsLists.map((sub, index) => (
        <li key={index} className="main-nav-ppal-dropdown-option">
          <Link to={`/books/subject/${sub}`}>{sub}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Dropdown;
