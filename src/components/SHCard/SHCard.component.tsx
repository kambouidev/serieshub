import { FC } from 'react'
import { FaTrophy } from 'react-icons/fa';
import { Link } from 'react-router-dom';

/**
 * @typedef {Object} SHCardInfo - Information for SHCard component.
 * @property {number} id - Unique identifier.
 * @property {string} image - URL of the image.
 * @property {string} name - Name/title of the card.
 * @property {string} [link] - Optional link for redirection.
 * @property {string} [premiereDate] - Premiere date of the content.
 * @property {number} [episodes] - Number of episodes.
 */
type SHCardInfo = {
    id: number;
    image: string;
    name: string;
    link?: string;
    premiereDate?: string;
    episodes?: number;
}

/**
 * @typedef {Object} SHCardProps - Props for SHCard component.
 * @property {SHCardInfo} data - Data to be displayed on the card.
 */
type SHCardProps = {
    data: SHCardInfo
}

/**
 * Represents a card component displaying show information.
 * @param {SHCardProps} props - The properties for the SHCard component.
 * @returns {JSX.Element} - The JSX for the SHCard component.
 */

const SHCard: FC<SHCardProps> = ({ data }) => {
    const { id,
        image,
        name,
        premiereDate,
        link,
        episodes
    } = data
    return (
        <div className="flex flex-row gap-2 mb-2 bg-white bg-opacity-10 rounded-lg" key={id}>
            <div className="w-[150px] flex flex-col justify-center items-center">
                {<img src={image} alt={name} className="rounded-md" />}
            </div>
            <div className="w-full flex flex-row flex-wrap justify-evenly text-white items-center">
                <div className="justify-center items-center">
                    <div className="font-extrabold text-base sm:text-xl lg:text-3xl mb-2 text-center">{name}</div>
                    <div className="rating mb-1 text-xs sm:text-base lg:text-2xl flex flex-row items-center w-full justify-center">
                        {premiereDate && <span className="flex flex-row">{premiereDate}<FaTrophy className="ml-1 text-amber-500" /></span>}
                    </div>
                </div>
                {link && <div className="text-xs sm:text-lg mx-3">
                    <Link to={`${link} `} >
                        <button className="bg-blueColor p-2 rounded-lg">
                            Watch {episodes} episodes
                        </button>
                    </Link>
                </div>}
            </div>
        </div>
    )
}

export default SHCard
