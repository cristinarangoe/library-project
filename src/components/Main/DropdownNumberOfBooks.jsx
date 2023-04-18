import React from "react";
import styles from "./DropdownNumberOfBooks.module.scss";

function DropdownNumberOfBooks() {
  const maxBooksNumber = [5, 10, 15, 20];
  return (
    <div className={styles["dropdown-max-dropdown"]}>
      <select name="maxBooks" id="maxBooks" className={styles["max-dropdown"]}>
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
