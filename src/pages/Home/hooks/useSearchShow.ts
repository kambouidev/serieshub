import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { searchShow } from '../../../api/SearchShowApi';

/**
 * Custom hook for managing TV show search state.
 * @returns {object} Object containing search results, fetch status, errors, and search function.
 */
export function useSearchQuery() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isFetching: isFetchingSearch, error: errorSearch, refetch } = useQuery({
    queryFn: () => searchShow(searchQuery),
    queryKey: ['searchQuery', [searchQuery]],
    enabled: false,
  });

  const onSearchShow = (newQuery: string) => {
    setSearchQuery(newQuery);
  };

  const searchResult = data?.map((item) => item.show) ?? [];

  useEffect(() => {
    if (searchQuery.length > 0) {
      refetch();
    }
  }, [searchQuery]);

  return { searchResult, isFetchingSearch, errorSearch, onSearchShow };
}
