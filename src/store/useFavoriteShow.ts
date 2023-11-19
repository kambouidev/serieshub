import { atom, useAtom } from 'jotai';
import { FavShow } from '../interfaces/ShowInterface';

const favoriteShows = atom<FavShow[]>([]);

export function useFavoriteShow() {
  const [favorites, setFavorites] = useAtom(favoriteShows);

  const toggleFavoriteShow = (show: FavShow) => {
    const showIndex = favorites.findIndex((s) => s.id === show.id);

    if (showIndex === -1) {
      setFavorites([...favorites, show]);
    } else {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(showIndex, 1);
      setFavorites(updatedFavorites);
    }
  };

  const isShowInFavorites = (id: number) => {
    return favorites.some((show) => show.id === id);
  };

  const updateFavoritesFromStorage = (updatedFavorites: FavShow[]) => {
    setFavorites(updatedFavorites);
  };

  return { toggleFavoriteShow, isShowInFavorites, updateFavoritesFromStorage, favorites };
}
