import { FC } from 'react'
import { TbCalendarTime } from "react-icons/tb";

type SHEpisodeCardInfo = {
    id: number;
    image: string;
    name: string;
    airstamp: string;
    summary: string;
    number: number;
}

type SHEpisodeCardProps = {
    data: SHEpisodeCardInfo
}
const SHEpisodeCard: FC<SHEpisodeCardProps> = ({ data }) => {
    const { image, name, number, airstamp, summary } = data
    return (
        <div className='flex flex-col p-1 gap-2 mb-2 bg-white bg-opacity-10 rounded-lg'>
            <div className="flex flex-row " >
                <div className="w-[150px] flex flex-col justify-center items-center">
                    {<img src={image} alt={name} className="rounded-md" />}
                </div>
                <div className="w-full text-white">
                    <div className="font-extrabold text-base sm:text-xl lg:text-3xl mb-1 text-center p-1">{name}</div>
                    <div className="gap-1 mb-1 text-xs sm:text-base lg:text-2xl flex flex-col items-center w-full ">
                        {number && <span className="flex flex-row items-center">{`Episode ${number}`}</span>}
                        {airstamp && <span className="flex flex-row items-center">{airstamp}<TbCalendarTime className="ml-1 " /></span>}
                    </div>
                </div>
            </div>
            {summary && <div className="text-xs text-white items-center ">
                {summary}
            </div>}
        </div>

    )
}

export default SHEpisodeCard
