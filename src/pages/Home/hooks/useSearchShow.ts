import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { searchShow } from '../../../api/SearchShowApi';

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
    if (searchQuery !== '') {
      refetch();
    }
  }, [searchQuery, refetch]);

  useEffect(() => {
    console.error('Error en búsqueda de show: ', errorSearch);
  }, [errorSearch]);

  return { searchResult, isFetchingSearch, errorSearch, onSearchShow };
}
