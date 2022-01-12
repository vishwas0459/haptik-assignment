import PropTypes from "prop-types";
import React from "react";
export default function Pagination({
  onPageChange,
  count,
  pageSize,
  currentPage,
}) {
  const pageCount = Math.ceil(count / pageSize);
  if (pageCount <= 1) return null;

  return (
    <ul className="pagination" data-testid="pagination">
      <li>
        <button
          data-testid="prev-btn"
          disabled={currentPage === 1}
          className="page__item"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>
      </li>
      <li>
        <button
          data-testid="next-btn"
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
