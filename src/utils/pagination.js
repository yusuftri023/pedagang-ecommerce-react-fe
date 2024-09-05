import { useMemo } from "react";

export const usePaginatedPage = (total_page, currentPage) =>
  useMemo(() => {
    const array = Array.from({ length: total_page }, (_, i) => i + 1);
    const currentPageArray = array.filter((page) => {
      if (page === 1) {
        return true;
      } else if (currentPage === 1 && page - 2 === 1) {
        return true;
      } else if (page === array[array.length - 1]) {
        return true;
      } else if (currentPage + 1 === page) {
        return true;
      } else if (currentPage - 1 === page) {
        return true;
      } else if (currentPage === page) {
        return true;
      } else {
        return false;
      }
    });
    let renderedPages = [];
    for (let i = 0; i <= currentPageArray[currentPageArray.length - 1]; i++) {
      if (currentPageArray.includes(i)) {
        renderedPages.push(i);
      } else if (renderedPages[renderedPages.length - 1] + 1 === i) {
        renderedPages.push("...");
      }
    }
    return renderedPages;
  }, [total_page, currentPage]);
