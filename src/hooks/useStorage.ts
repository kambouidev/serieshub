interface StorageData {
  itemKey: string;
  itemValue: string;
}

const useStorage = () => {
  const storeData = async (items: StorageData[]): Promise<void> => {
    try {
      items.map((item) => localStorage.setItem(item.itemKey, JSON.stringify(item.itemValue)));
    } catch (e) {
      console.error('Failed in storeData', e);
    }
  };

  const getData = (itemKey: string): string | null => {
    try {
      const value = localStorage.getItem(itemKey);
      return value != null ? value : null;
    } catch (e) {
      console.error('Failed in getData', e);
      return null;
    }
  };

  const deleteStoreData = (itemKey: string[]): void => {
    try {
      itemKey.map((item) => localStorage.removeItem(item));
    } catch (e) {
      console.error('Failed in deleteStoreData', e);
    }
  };

  return { storeData, getData, deleteStoreData };
};

export default useStorage;
