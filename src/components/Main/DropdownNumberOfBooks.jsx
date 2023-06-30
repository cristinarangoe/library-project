import React from "react";
import styles from "./DropdownNumberOfBooks.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { paginationActions } from "../../store/pagination";

function DropdownNumberOfBooks() {
  const dispatch = useDispatch();

  const limit = useSelector((state) => state.pagination.limit);

  const maxBooksNumber = [5, 10, 15, 20];

  const selectedOptionChangeHandler = (e) => {
    dispatch(paginationActions.setLimit(+e.target.value));
  };

  return (
    <div className={styles["dropdown-max-dropdown"]}>
      <select
        name="maxBooks"
        id="maxBooks"
        className={styles["max-dropdown"]}
        onChange={selectedOptionChangeHandler}
        value={limit}
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

export default DropdownNumberOfBooks;
