import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { searchShowByIdWithEmbedSeasons } from '../../../api/SearchShowApi';

/**
 * Hook to fetch show data and seasons information.
 * @returns {Object} - Object containing data, fetching state, error, and function to search for a show.
 */
export function useShowSeasons() {
  const [showId, setShowId] = useState<number | null>(null);
  const { data, isFetching, error, refetch } = useQuery({
    queryFn: () => searchShowByIdWithEmbedSeasons(showId as number),
    queryKey: ['showId', [showId]],
    enabled: false,
  });

  const onSearchShow = (id: number) => {
    setShowId(id);
  };

  useEffect(() => {
    if (showId) {
      refetch();
    }
  }, [refetch, showId]);

  return { data, isFetching, error, onSearchShow };
}
