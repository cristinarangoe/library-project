import React from "react";
import { Link } from "react-router-dom";
import styles from "./SubjectsList.module.scss";
import { PropTypes } from "prop-types";
import { useDispatch } from "react-redux";
import { paginationActions } from "../../store/pagination";
import subjectsLists from "../../utils/subjectsList";

function SubjectsList(props) {
  const dispatch = useDispatch();

  const changeListDisplayHandler = () => {
    props.setDropdownClicked((prevState) => !prevState);
    props.isMobile && props.setMobileClicked((prevState) => !prevState);
    dispatch(paginationActions.setLimit(10));
    dispatch(paginationActions.goToAPage(1));
  };

  return (
    <ul
      onClick={changeListDisplayHandler}
      className={`${styles["dropdown-menu"]} ${
        props.isMobile && styles["dropdown-menu-mobile"]
      }`}
    >
      {subjectsLists.map((sub) => (
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
