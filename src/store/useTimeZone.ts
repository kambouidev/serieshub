import { atom, useAtom } from 'jotai';

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const userTimeZoneAtom = atom<string>(userTimeZone || 'UTC');

export function useTimeZoneStore() {
  const [timeZone, setTimeZone] = useAtom(userTimeZoneAtom);
  return { timeZone, setTimeZone };
}
