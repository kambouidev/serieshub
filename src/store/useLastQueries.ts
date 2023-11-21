import { atom, useAtom } from 'jotai';
import useStorage from '../hooks/useStorage';

/** Atom to manage the last queries state. */
const lastQueriesAtom = atom<string[]>([]);

/**
 * Custom hook to manage the last queries.
 * @returns {{
 *   lastQueries: string[],
 *   addQuery: (newQuery: string) => void,
 *   updateLastQueriesFromStorage: () => void
 * }}
 */
export function useLastQueries() {
  const [lastQueries, setLastQueries] = useAtom(lastQueriesAtom);
  const { getData, storeData } = useStorage();

  /**
   * Adds a new query to the last queries list.
   * Limits the list to 5 unique queries.
   * @param {string} newQuery - The new query to add.
   */
  const addQuery = (newQuery: string) => {
    if (!lastQueries.includes(newQuery)) {
      const updatedQueries = [newQuery, ...lastQueries];
      const limitedQueries = updatedQueries.slice(0, 5);
      setLastQueries(limitedQueries);

      const storeQueries = limitedQueries.join('[;]');
      storeData([{ itemKey: 'SERIES_HUB_LAST_QUERIES', itemValue: storeQueries }]);
    }
  };

  /**
   * Updates the last queries from storage.
   */
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
        console.error('Error converting queries:', error);
      }
    }
  };

  return { lastQueries, addQuery, updateLastQueriesFromStorage };
}
