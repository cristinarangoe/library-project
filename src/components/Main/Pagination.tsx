import React from "react";
import styles from "./Pagination.module.scss";
import ChevronIconDown from "../UI/ChevronIconDown";

interface PaginationProps{
  limit: number;
  offset: number;
  setOffset: (num: number) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  lowerPageRange: number;
  setLowerPageRange: (num: number) => void;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const nextPageClickHandler = () => {
    if (props.currentPage === props.totalPages) return;
    props.setOffset(props.offset + props.limit);
    props.setCurrentPage((prevState: number) => +prevState + 1);
    if (+props.totalPages <= 5) return;
    if (props.currentPage === +props.totalPages) {
      props.setLowerPageRange(+props.totalPages - 5);
      return;
    }
    if (
      +props.totalPages - 5 <= props.currentPage &&
      +props.currentPage < +props.totalPages
    ) {
      props.setLowerPageRange(+props.totalPages - 5);
      return;
    }
    props.setLowerPageRange(props.lowerPageRange + 1);
  };

  const previousPageClickHandler = () => {
    if (props.currentPage === 1) return;

    props.setOffset(props.offset - props.limit);
    props.setCurrentPage((prevState: number) => prevState - 1);

    if (+props.totalPages <= 5) return;

    if (
      +props.totalPages - 5 < +props.currentPage &&
      +props.currentPage <= +props.totalPages
    ) {
      props.setLowerPageRange(+props.totalPages - 5);
      return;
    }
    props.setLowerPageRange(props.lowerPageRange - 1);
  };

  const goToAPageClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const buttonValue: number = +(e.target as HTMLButtonElement).value;

    props.setOffset(props.limit * (buttonValue - 1));
    props.setCurrentPage(buttonValue);

    if (+props.totalPages <= 5) return;

    if (buttonValue === +props.totalPages) {
      props.setLowerPageRange(+props.totalPages - 5);
      return;
    }
    if (
      +props.totalPages - 5 <= buttonValue &&
      buttonValue < +props.totalPages
    ) {
      props.setLowerPageRange(+props.totalPages - 5);
      return;
    }
    props.setLowerPageRange(buttonValue);
  };
  return (
    <div className={styles["pagination"]}>
      <div className={styles["pagination-arrow"]}>
        <button
          className={styles["pagination-button-icon-left"]}
          onClick={previousPageClickHandler}
        >
          <ChevronIconDown />
        </button>
      </div>
      <div className={styles["pagination-pages"]}>
        {props.currentPage > 2 && props.totalPages > 5 && (
          <button
            className={styles["pagination-button-number"]}
            value={1}
            onClick={goToAPageClickHandler}
          >
            1
          </button>
        )}
        {props.currentPage > 2 && props.totalPages > 5 && (
          <p className={styles["pagination-button-number"]}>...</p>
        )}
        {[...new Array(props.totalPages > 5 ? 5 : props.totalPages)].map(
          (num, i) => {
            return (
              <button
                key={props.lowerPageRange + i}
                className={
                  props.currentPage === +props.lowerPageRange + i
                    ? styles["pagination-button-number-active"]
                    : styles["pagination-button-number"]
                }
                value={+props.lowerPageRange + i}
                onClick={goToAPageClickHandler}
              >
                {+props.lowerPageRange + i}
              </button>
            );
          }
        )}
        {props.totalPages > 5 && (
          <p className={styles["pagination-button-number"]}>...</p>
        )}
        {props.totalPages > 5 && (
          <button
            className={
              props.currentPage === props.totalPages
                ? styles["pagination-button-number-active"]
                : styles["pagination-button-number"]
            }
            value={props.totalPages}
            onClick={goToAPageClickHandler}
          >
            {props.totalPages}
          </button>
        )}
      </div>
      <div className={styles["pagination-arrow"]}>
        <button
          className={styles["pagination-button-icon-right"]}
          onClick={nextPageClickHandler}
        >
          <ChevronIconDown />
        </button>
      </div>
    </div>
  );
};
export default Pagination;
