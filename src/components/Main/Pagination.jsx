import React from "react";
import styles from "./Pagination.module.scss";
import ChevronIconDown from "../UI/ChevronIconDown";
import { PropTypes } from "prop-types";

function Pagination(props) {
  const nextPageClickHandler = () => {
    if (props.currentPage === props.totalPages) return;
    props.setOffset(props.offset + props.limit);
    props.setCurrentPage((prevState) => prevState + 1);
    if (props.currentPage === +props.totalPages) {
      props.setLowerPageRange(+props.totalPages - 5);
      props.setHigherPageRange(+props.totalPages - 1);
      return;
    }
    if (
      +props.totalPages - 5 <= props.currentPage &&
      +props.currentPage < +props.totalPages
    ) {
      props.setLowerPageRange(+props.totalPages - 5);
      props.setHigherPageRange(+props.totalPages - 1);
      return;
    }
    props.setLowerPageRange(props.lowerPageRange + 1);
    props.setHigherPageRange(props.lowerPageRange + 1);
  };

  const previousPageClickHandler = () => {
    if (props.currentPage === 1) return;

    props.setOffset(props.offset - props.limit);
    props.setCurrentPage((prevState) => prevState - 1);

    if (
      +props.totalPages - 5 < +props.currentPage &&
      +props.currentPage <= +props.totalPages
    ) {
      props.setLowerPageRange(+props.totalPages - 5);
      props.setHigherPageRange(+props.totalPages - 1);
      return;
    }

    props.setLowerPageRange(props.lowerPageRange - 1);
    props.setHigherPageRange(props.lowerPageRange - 1);
  };

  const goToAPageClickHandler = (e) => {
    props.setOffset(props.limit * (e.target.value - 1));
    props.setCurrentPage(+e.target.value);
    if (props.higherPageRange === props.totalPages) return;

    if (+e.target.value === +props.totalPages) {
      props.setLowerPageRange(+props.totalPages - 5);
      props.setHigherPageRange(+props.totalPages - 1);
      return;
    }
    if (
      +props.totalPages - 5 <= +e.target.value &&
      +e.target.value < +props.totalPages
    ) {
      props.setLowerPageRange(+props.totalPages - 5);
      props.setHigherPageRange(+props.totalPages - 1);
      return;
    }
    props.setLowerPageRange(+e.target.value);
    props.setHigherPageRange(+e.target.value + 5);
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
}

Pagination.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number,
  setOffset: PropTypes.func,
  setCurrentPage: PropTypes.func,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  lowerPageRange: PropTypes.number,
  setLowerPageRange: PropTypes.func,
  higherPageRange: PropTypes.number,
  setHigherPageRange: PropTypes.func,
};
export default Pagination;
