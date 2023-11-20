import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { searchShowByIdWithEmbedSeasons } from '../../../api/SearchShowApi';

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
