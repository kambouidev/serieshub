import { FC, useEffect, useRef, useState } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { Link } from "react-router-dom"
import { IShow } from "../../interfaces/ShowInterface"
import { FaHeart, FaStar, FaTrophy } from "react-icons/fa";
import notFound from '../../assets/image_not_found.png';
import { Toast } from "primereact/toast";

/**
 * Props for the SHShow component.
 */
type SHShowProps = {
    show: IShow | undefined,
    toggleFavoriteShow: (show: IShow) => void,
    isFavoriteShow: (id: number) => boolean,
}

/**
 * Component to display information about a TV show.
 * @param {SHShowProps} show - Information about the show.
 * @param {SHShowProps} toggleFavoriteShow - Function to toggle favorite status of the show.
 * @param {SHShowProps} isFavoriteShow - Function to check if the show is marked as a favorite.
 * @returns {JSX.Element} JSX for the TV show component.
 */

const SHShow: FC<SHShowProps> = ({ show, toggleFavoriteShow, isFavoriteShow }) => {
    const [isLoading, setIsLoading] = useState(true);
    const toast = useRef(null);

    const cardStyle = "inline-block relative transition-transform rounded-xl overflow-hidden m-1 border border-gray-600 cursor-pointer h-48 w-[125px] sm:w-[160px] sm:h-60 z-0 hover:transform hover:scale-125 hover:z-10 hover:shadow-xl "

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2500)
    }, [])

    if (show === undefined) return <div className={cardStyle}>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
        </SkeletonTheme>
    </div>;
    const { name, genres, image, rating, premiered, id } = show;
    const heartStyle = isFavoriteShow(show.id) ? 'text-red-500 opacity-1' : 'transparent';
    const toastStyle = "max-w-[300px] text-sm sm:text-base sm:max-w-[400px]";

    const handleButtonClick = (show: IShow) => {
        toggleFavoriteShow(show)
        toast.current?.show({ severity: 'success', summary: isFavoriteShow(show.id) ? 'Removed from Favorites' : 'Added to Favorites', life: 1000 });
    };

    return <>
        <Toast ref={toast} position="top-right" className={toastStyle} />
        {
            isLoading
                ?
                <div className={cardStyle}>
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <Skeleton height={300} duration={2} />
                    </SkeletonTheme>
                </div>
                :
                <div className={cardStyle}>
                    <div className="absolute top-1 right-1 z-50">
                        <button className="bg-white opacity-60 hover:opacity-100  p-2 rounded-md" onClick={() => handleButtonClick(show)}>
                            <FaHeart className={`text-base ${heartStyle}`} />
                        </button>
                    </div>

                    <Link to={`/show/${id}`} style={{ textDecoration: "none", color: "white" }}>
                        <div >

                            {image && <img src={image.original || image.medium || notFound} />}
                            <div className="infoShow absolute p-4 h-[100%] bottom-0 flex flex-col justify-end bg-gradient-to-t from-black to-transparent w-[100%]">
                                <div className="title font-extrabold text-base mb-2">{name}</div>
                                <div className="rating mb-1 text-xs font- flex flex-row justify-between items-center">
                                    {premiered && <span className="flex flex-row">{new Date(premiered).getFullYear()}<FaTrophy className="ml-1 text-amber-500" /></span>}
                                    {rating && rating.average && <span className="flex flex-row">{rating.average}<FaStar className="ml-1 text-amber-500" /></span>}
                                </div>
                                <div className="italic text-xs mb-1">{genres.join(', ')}</div>


                            </div>
                        </div>
                    </Link>

                </div>

        }
    </>
}

export default SHShow
