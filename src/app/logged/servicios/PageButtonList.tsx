"use client";
import React from "react";

interface PageButtonListProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PageButtonList: React.FC<PageButtonListProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex gap-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded border ${
            page === currentPage
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-800 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default PageButtonList;
