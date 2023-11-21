import { FC } from 'react';
import { FavShow } from '../../interfaces/ShowInterface';
import { Link } from 'react-router-dom';

/**
 * Props for the SHFavoriteShow component.
 */
type SHFavoriteShowProps = {
    shows: FavShow[];
};

/**
 * Component to display favorite shows as links.
 * @param {SHFavoriteShowProps} shows - An array of favorite shows.
 * @returns {JSX.Element} JSX for displaying favorite shows as links.
 */
const SHFavoriteShow: FC<SHFavoriteShowProps> = ({ shows }) => {
    return shows.length === 0 ?
        <></> :
        (
            <div className='mb-4'>
                <div className='p-4 text-center text-greyIsh opacity-40 text-sm sm:text-lg md:text-xl lg:text-3xl'>Favorite shows</div>

                <div className='flex flex-row flex-wrap gap-2 justify-center'>
                    {shows.map((show) =>
                        <Link to={`/show/${show.id}`} key={show.id} style={{ textDecoration: "none", color: "white" }}>
                            <span className='border text-white bg-white bg-opacity-40 rounded-md text-sm sm:text-lg p-1' >{show.name}</span>
                        </Link>)}
                </div>
            </div>
        );
};

export default SHFavoriteShow;
