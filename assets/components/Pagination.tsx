import React from "react";

interface Props {
  itemsPerPage: number;
  itemsLength: number;
  currentPage: number;
  onPageChanged: (value: number) => void;
}

const Pagination: React.SFC<Props> = ({
  itemsPerPage,
  itemsLength,
  currentPage,
  onPageChanged
}) => {
  const pages: Array<number> = [];
  const totalPagesCount: number = Math.ceil(itemsLength / itemsPerPage);
  for (let i: number = 1; i <= totalPagesCount; i++) {
    pages.push(i);
  }

  return (
    (pages.length > 1 && (
      <div className="pagination pagination--centered">
        <ul>
          {currentPage > 1 && (
            <li className="pagination__item">
              <button
                className="pagination__button"
                onClick={() => onPageChanged(currentPage - 1)}
              >
                &laquo;
              </button>
            </li>
          )}
          {pages.map((page: number) => (
            <li
              key={page}
              className={`pagination__item ${
                page === currentPage ? "pagination__item--active" : ""
                }`}
            >
              <button
                className="pagination__button"
                onClick={() => onPageChanged(page)}
              >
                {page}
              </button>
            </li>
          ))}
          {currentPage < pages.length && (
            <li className="pagination__item">
              <button
                className="pagination__button"
                onClick={() => onPageChanged(currentPage + 1)}
              >
                &raquo;
              </button>
            </li>
          )}
        </ul>
      </div>
    )) || <></>
  );
};

export default Pagination;
