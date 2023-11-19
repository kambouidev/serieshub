import { atom, useAtom } from 'jotai';
import { FavShow } from '../interfaces/ShowInterface';
import useStorage from '../hooks/useStorage';

const favoriteShows = atom<FavShow[]>([]);

export function useFavoriteShow() {
  const [favorites, setFavorites] = useAtom(favoriteShows);
  const { getData, storeData } = useStorage();

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

  const isShowInFavorites = (id: number) => {
    return favorites.some((show) => show.id === id);
  };

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
        console.error('Error al convertir los favoritos:', error);
      }
    }
  };

  return { toggleFavoriteShow, isShowInFavorites, updateFavoritesFromStorage, favorites };
}
