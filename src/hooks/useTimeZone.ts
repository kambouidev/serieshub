import moment from 'moment-timezone';
import { useTimeZoneStore } from '../store/useTimeZone';

const useTimeZone = () => {
  const { timeZone } = useTimeZoneStore();

  const dateFormat = (airstamp: string) => {
    return moment(airstamp).tz(timeZone).format('YYYY/MM/DD HH:mm');
  };

  return { dateFormat };
};

export default useTimeZone;
