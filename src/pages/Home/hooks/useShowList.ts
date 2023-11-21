import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getShows } from '../../../api/ShowListApi';

/**
 * Custom hook for managing TV show list state.
 * @returns {object} Object containing show list data, fetch status, errors, and page change function.
 */
const useShowList = () => {
  const [page, setPage] = useState(0);
  const { data, isFetching, error } = useQuery({
    queryKey: ['page', page],
    queryFn: () => getShows(page),
  });

  const changePage = (newPage: number) => setPage(newPage);

  return { data, isFetching, error, changePage };
};

export default useShowList;
