import React from "react";
import styles from "./DropdownNumberOfBooks.module.scss";

const DropdownNumberOfBooks: React.FC<{
  setLimit: (num: number) => void;
  limit: number;
}> = (props) => {
  const maxBooksNumber = [5, 10, 15, 20];

  const selectedOptionChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
};

export default DropdownNumberOfBooks;
