import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { searchSeasonByIdWithEmbedEpisodes } from '../../../api/SearchSeason';

/**
 * Hook to fetch season data and episodes information.
 * @returns {Object} - Object containing data, fetching state, error, and function to search for a season.
 */
export function useSeasonEpisodes() {
  const [seasonId, setSeasonId] = useState<number | null>(null);
  const { data, isFetching, error, refetch } = useQuery({
    queryFn: () => searchSeasonByIdWithEmbedEpisodes(seasonId as number),
    queryKey: ['seasonId', [seasonId]],
    enabled: false,
  });

  const onSearchSeason = (id: number) => {
    setSeasonId(id);
  };

  useEffect(() => {
    if (seasonId) {
      refetch();
    }
  }, [refetch, seasonId]);

  return { data, isFetching, error, onSearchSeason };
}
