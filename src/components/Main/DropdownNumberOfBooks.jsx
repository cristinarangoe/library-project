import React from "react";
import styles from "./DropdownNumberOfBooks.module.scss";
import { PropTypes } from "prop-types";

function DropdownNumberOfBooks(props) {
  const maxBooksNumber = [5, 10, 15, 20];

  const selectedOptionChangeHandler = (e) => {
    props.setLimit(+e.target.value);
  };

  return (
    <div className={styles["dropdown-max-dropdown"]}>
      <select
        name="maxBooks"
        id="maxBooks"
        className={styles["max-dropdown"]}
        onChange={selectedOptionChangeHandler}
        value={props.limit}
      >
        {maxBooksNumber.map((num, index) => (
          <option
            key={index}
            value={num}
            className={styles["max-dropdown-option"]}
          >
            {num}
          </option>
        ))}
      </select>
    </div>
  );
}

DropdownNumberOfBooks.propTypes = {
  setLimit: PropTypes.func,
  limit: PropTypes.number,
};

export default DropdownNumberOfBooks;
