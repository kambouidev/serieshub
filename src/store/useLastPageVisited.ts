import { atom, useAtom } from 'jotai';
import useStorage from '../hooks/useStorage';

const lastPageAtom = atom<number>(0);

export function useLastPageVisited() {
  const [lastPage, setLastPage] = useAtom(lastPageAtom);
  const { getData, storeData } = useStorage();

  const setPage = (page: number) => {
    setLastPage(page);
    storeData([{ itemKey: 'SERIES_HUB_LAST_PAGE', itemValue: `${page}` }]);
  };

  const updateLastPageFromStorage = () => {
    const page = getData('SERIES_HUB_LAST_PAGE');

    if (page) {
      try {
        const parsedPage: string = JSON.parse(page);
        setLastPage(Number(parsedPage));
      } catch (error) {
        console.error('Error al convertir index pagina:', error);
      }
    }
  };

  return { lastPage, setPage, updateLastPageFromStorage };
}
