'use client';

import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from './Button';
import { getPageNumbers } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevious = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = getPageNumbers(totalPages, currentPage);

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 mt-10 sm:mt-12 mb-6 px-4">
      {/* Previous Button */}
      <Button
        onClick={handlePrevious}
        disabled={isFirstPage}
        variant="primary"
        className="px-4 sm:px-5 bg-linear-to-l"
        aria-label="Previous page"
      >
        <ChevronLeft size={36} />
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-2">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-2 text-gray-500 text-sm sm:text-base font-bold"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <Button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              variant={isActive ? 'page' : 'secondary'}
              className={`px-4 sm:px-5 ${isActive ? 'scale-110' : ''}`}
              aria-label={`Page ${pageNum}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </Button>
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        onClick={handleNext}
        disabled={isLastPage}
        variant="primary"
        className="px-4 sm:px-5"
        aria-label="Next page"
      >
        <ChevronRight size={36} />
      </Button>
    </div>
  );
}
