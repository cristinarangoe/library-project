import React from "react";
import { Link } from "react-router-dom";
import styles from "./SubjectsList.module.scss";
import { PropTypes } from "prop-types";

function SubjectsList(props) {
  const subjectsLists = [
    { name: "Fantasia", id: "fantasy" },
    { name: "Cocina", id: "cooking" },
    { name: "Romance", id: "romance" },
    { name: "Amor", id: "love" },
    { name: "Ciencia ficción", id: "science_fiction" },
    { name: "Literatura juvenil", id: "juvenile_literature" },
    { name: "Gatos", id: "cats" },
    { name: "Programación", id: "programming" },
    { name: "Suspenso", id: "thriller" },
    { name: "Emprendimiento", id: "entrepreneurship" },
    { name: "Humor", id: "humor" },
    { name: "Literatura", id: "literature" },
    { name: "Administración", id: "management" },
    { name: "Ciencia ficción juvenil", id: "young_adult_fiction" },
    { name: "Magia", id: "magic" },
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
      {subjectsLists.map(sub => (
        <li key={sub.id} className={styles["main-nav-ppal-dropdown-option"]}>
          <Link to={`/books/subject/${sub.id}`}>{sub.name}</Link>
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
