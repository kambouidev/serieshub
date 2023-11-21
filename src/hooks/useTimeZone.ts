import moment from 'moment-timezone';
import { useTimeZoneStore } from '../store/useTimeZone';

/**
 * Custom hook to handle time zone related operations.
 * @returns An object containing a dateFormat function.
 */
const useTimeZone = () => {
  const { timeZone } = useTimeZoneStore();

  /**
   * Formats a timestamp according to the specified time zone.
   * @param {string} airstamp - The timestamp to format.
   * @returns {string} The formatted timestamp in 'YYYY/MM/DD HH:mm' format.
   */
  const dateFormat = (airstamp: string): string => {
    return moment(airstamp).tz(timeZone).format('YYYY/MM/DD HH:mm');
  };

  return { dateFormat };
};

export default useTimeZone;
