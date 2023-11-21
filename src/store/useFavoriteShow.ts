import { atom, useAtom } from 'jotai';
import { FavShow } from '../interfaces/ShowInterface';
import useStorage from '../hooks/useStorage';

/** Atom to manage favorite shows state. */
const favoriteShows = atom<FavShow[]>([]);

/**
 * Custom hook to manage favorite shows.
 * @returns {{
 *   toggleFavoriteShow: (show: FavShow) => void,
 *   isShowInFavorites: (id: number) => boolean,
 *   updateFavoritesFromStorage: () => void,
 *   favorites: FavShow[]
 * }}
 */
export function useFavoriteShow() {
  const [favorites, setFavorites] = useAtom(favoriteShows);
  const { getData, storeData } = useStorage();

  /**
   * Toggles a show as a favorite.
   * @param {FavShow} show - The show to toggle as a favorite.
   */
  const toggleFavoriteShow = (show: FavShow) => {
    const showIndex = favorites.findIndex((s) => s.id === show.id);
    let updatedFavorites: FavShow[];

    if (showIndex === -1) {
      updatedFavorites = [...favorites, show];
    } else {
      updatedFavorites = [...favorites];
      updatedFavorites.splice(showIndex, 1);
    }

    setFavorites(updatedFavorites);
    const storeFavs = updatedFavorites.map((show) => `${show.id}[=]${show.name}`).join(';');
    storeData([{ itemKey: 'SERIES_HUB_FAVORITES', itemValue: storeFavs }]);
  };

  /**
   * Checks if a show is in the list of favorites.
   * @param {number} id - The ID of the show to check.
   * @returns {boolean} - Indicates if the show is in favorites.
   */
  const isShowInFavorites = (id: number) => {
    return favorites.some((show) => show.id === id);
  };

  /**
   * Updates the list of favorites from storage.
   */
  const updateFavoritesFromStorage = () => {
    const favorites = getData('SERIES_HUB_FAVORITES');

    if (favorites) {
      try {
        const favoritesFromStorage: FavShow[] = [];
        const parsedFavorites: string = JSON.parse(favorites);
        parsedFavorites.split(';').map((item) => {
          const show = item.split('[=]');
          favoritesFromStorage.push({ id: Number(show[0]), name: show[1] });
        });

        setFavorites(favoritesFromStorage);
      } catch (error) {
        console.error('Error converting favorites:', error);
      }
    }
  };

  return { toggleFavoriteShow, isShowInFavorites, updateFavoritesFromStorage, favorites };
}
