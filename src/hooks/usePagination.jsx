import { useState, useEffect, useRef } from "react";
import { apiGet } from "../utils/api";

function usePagination(endpoint, setContents, queryParams, startPage = 0, entriesPerPage = 9) {
  const [page, setPage] = useState(startPage);
  const mountedRef = useRef(false);
  const [maxPage, setMaxPage] = useState(startPage);
  const [pageResetted, setPageResetted] = useState(false);

  useEffect(() => {
    if(mountedRef.current) {
      setPage(0);
      setPageResetted(p => !p);
    } else {
      mountedRef.current = true;
    }
  }, [entriesPerPage, queryParams]);

  /* eslint-disable */
  useEffect(() => {
    apiGet(endpoint, { ...queryParams, pageIndex: page, pageSize: entriesPerPage })
      .then(items => {
        if(items.errors) {
          setContents([]);
        } else {
          setMaxPage(items.metadata.pageCount === 0 ? 0 : items.metadata.pageCount - 1);
          setContents(items.contents);
        }
      });
  }, [page, pageResetted]);
  /* eslint-enable */

  const next = () => {
    setPage(Math.min(maxPage, page + 1));
  };

  const prev = () => {
    setPage(Math.max(0, page - 1));
  };

  return [next, prev, page, maxPage, setPageResetted];
}

export default usePagination;
