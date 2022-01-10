import PropTypes from "prop-types";
import React from "react";
export default function Pagination({
  onPageChange,
  count,
  pageSize,
  currentPage,
}) {
  const pageCount = Math.ceil(count / pageSize);
  if (pageCount === 1) return null;

  return (
    <ul className="pagination">
      <li>
        <button
          disabled={currentPage === 1}
          className="page__item"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>
      </li>
      <li>
        <button
          disabled={currentPage === pageCount}
          className="page__item"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </li>
    </ul>
  );
}

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};
