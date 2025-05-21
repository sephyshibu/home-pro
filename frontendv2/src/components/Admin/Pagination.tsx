import React from "react";

interface PaginationProps {
  currentPage: number;
  onPageChange: (newPage: number) => void;
  disablePrev?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange, disablePrev }) => (
  <div className="mt-4 flex justify-center space-x-4">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={disablePrev || currentPage === 1}
      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
    >
      Prev
    </button>
    <span className="self-center">Page {currentPage}</span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
    >
      Next
    </button>
  </div>
);

export default Pagination;
