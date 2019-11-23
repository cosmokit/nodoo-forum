import React, { SFC, PropsWithChildren, FunctionComponentElement } from "react";

export interface Props {
  itemsPerPage: number;
  itemsLength: number;
  currentPage: number;
  onPageChanged: any;
}

const Pagination: SFC<Props> = ({
  itemsPerPage,
  itemsLength,
  currentPage,
  onPageChanged
}: PropsWithChildren<Props>): FunctionComponentElement<Props> => {
  const handleChange = (page: number) => {
    onPageChanged(page);
  };

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
                onClick={() => handleChange(currentPage - 1)}
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
                onClick={() => handleChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
          {currentPage < pages.length && (
            <li className="pagination__item">
              <button
                className="pagination__button"
                onClick={() => handleChange(currentPage + 1)}
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

export const getPaginatedData = (
  items: any,
  itemsPerPage: number,
  currentPage: number
): Array<Object> => {
  const start: number = currentPage * itemsPerPage - itemsPerPage;
  return items.slice(start, start + itemsPerPage);
};

export default Pagination;
