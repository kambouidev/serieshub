import { atom, useAtom } from 'jotai';
import useStorage from '../hooks/useStorage';

const lastQueriesAtom = atom<string[]>([]);

export function useLastQueries() {
  const [lastQueries, setLastQueries] = useAtom(lastQueriesAtom);
  const { getData, storeData } = useStorage();

  const addQuery = (newQuery: string) => {
    if (!lastQueries.includes(newQuery)) {
      const updatedQueries = [newQuery, ...lastQueries];
      const limitedQueries = updatedQueries.slice(0, 5);
      setLastQueries(limitedQueries);

      const storeQueries = limitedQueries.join('[;]');
      storeData([{ itemKey: 'SERIES_HUB_LAST_QUERIES', itemValue: storeQueries }]);
    }
  };

  const updateLastQueriesFromStorage = () => {
    const queries = getData('SERIES_HUB_LAST_QUERIES');

    if (queries) {
      try {
        const queriesFromStorage: string[] = [];
        const parsedQueries: string = JSON.parse(queries);
        parsedQueries.split('[;]').map((query) => {
          queriesFromStorage.push(query);
        });

        setLastQueries(queriesFromStorage);
      } catch (error) {
        console.error('Error al convertir las queries:', error);
      }
    }
  };

  return { lastQueries, addQuery, updateLastQueriesFromStorage };
}
