import { atom, useAtom } from 'jotai';

const lastQueriesAtom = atom<string[]>([]);

export function useLastQueries() {
  const [lastQueries, setLastQueries] = useAtom(lastQueriesAtom);

  const addQuery = (newQuery: string) => {
    if (!lastQueries.includes(newQuery)) {
      const updatedQueries = [newQuery, ...lastQueries];
      const limitedQueries = updatedQueries.slice(0, 5);
      setLastQueries(limitedQueries);
    }
  };

  const setLastQueriesFromStorage = (queries: string[]) => {
    const uniqueQueries = Array.from(new Set(queries)).slice(0, 5);
    setLastQueries(uniqueQueries);
  };

  return { lastQueries, addQuery, setLastQueriesFromStorage };
}
