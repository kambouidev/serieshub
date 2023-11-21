interface StorageData {
  itemKey: string;
  itemValue: string;
}

/**
 * Custom hook for interacting with local storage.
 * @returns An object containing methods to store, retrieve, and delete data from local storage.
 */
const useStorage = () => {
  /**
   * Store items in local storage.
   * @param {StorageData[]} items - An array of objects containing itemKey and itemValue to be stored.
   * @returns {Promise<void>} A Promise that resolves when items are successfully stored.
   */
  const storeData = async (items: StorageData[]): Promise<void> => {
    try {
      items.forEach((item) => localStorage.setItem(item.itemKey, JSON.stringify(item.itemValue)));
    } catch (e) {
      console.error('Failed in storeData', e);
    }
  };

  /**
   * Get data from local storage based on the provided item key.
   * @param {string} itemKey - The key used to retrieve data from local storage.
   * @returns {string | null} The value associated with the itemKey, or null if not found or an error occurs.
   */
  const getData = (itemKey: string): string | null => {
    try {
      const value = localStorage.getItem(itemKey);
      return value !== null ? value : null;
    } catch (e) {
      console.error('Failed in getData', e);
      return null;
    }
  };

  /**
   * Delete stored data from local storage based on provided item keys.
   * @param {string[]} itemKeys - An array of item keys to be deleted from local storage.
   * @returns {void}
   */
  const deleteStoreData = (itemKeys: string[]): void => {
    try {
      itemKeys.forEach((item) => localStorage.removeItem(item));
    } catch (e) {
      console.error('Failed in deleteStoreData', e);
    }
  };

  return { storeData, getData, deleteStoreData };
};

export default useStorage;
