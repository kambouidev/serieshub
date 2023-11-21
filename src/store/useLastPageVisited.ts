import { atom, useAtom } from 'jotai';
import useStorage from '../hooks/useStorage';

/** Atom to manage the last visited page state. */
const lastPageAtom = atom<number>(0);

/**
 * Custom hook to manage the last visited page.
 * @returns {{
 *   lastPage: number,
 *   setPage: (page: number) => void,
 *   updateLastPageFromStorage: () => void
 * }}
 */
export function useLastPageVisited() {
  const [lastPage, setLastPage] = useAtom(lastPageAtom);
  const { getData, storeData } = useStorage();

  /**
   * Sets the last visited page.
   * @param {number} page - The page number to set as the last visited page.
   */
  const setPage = (page: number) => {
    setLastPage(page);
    storeData([{ itemKey: 'SERIES_HUB_LAST_PAGE', itemValue: `${page}` }]);
  };

  /**
   * Updates the last visited page from storage.
   */
  const updateLastPageFromStorage = () => {
    const page = getData('SERIES_HUB_LAST_PAGE');

    if (page) {
      try {
        const parsedPage: string = JSON.parse(page);
        setLastPage(Number(parsedPage));
      } catch (error) {
        console.error('Error converting page index:', error);
      }
    }
  };

  return { lastPage, setPage, updateLastPageFromStorage };
}
