import moment from 'moment-timezone';
import { useTimeZoneStore } from '../../store/useTimeZone';
import { Dropdown } from 'primereact/dropdown';
import { TbCalendarTime } from 'react-icons/tb';

/**
 * Component for selecting a time zone.
 * @returns {JSX.Element} JSX for the time zone selector.
 */

const TimeZoneSelector = () => {
    const timeZoneList = moment.tz.names();
    const { timeZone, setTimeZone } = useTimeZoneStore();

    return (
        <div className='max-w-[300px] py-2 flex flex-col gap-2 text-white'>
            <div>Time zone selector: </div>
            <div className=" flex justify-content-center items-center gap-2">
                <TbCalendarTime className="ml-1 text-3xl text-white" />
                <Dropdown
                    panelStyle={{ opacity: 0.4 }}
                    value={timeZone} onChange={(e) => setTimeZone(e.value)}
                    options={timeZoneList}
                    className="w-full text-xs" />
            </div>

        </div>
    )
};

export default TimeZoneSelector;
