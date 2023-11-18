import { FC, useEffect, useState } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { Link } from "react-router-dom"
import { IShow } from "../../interfaces/ShowInterface"
import { FaHeart, FaStar, FaTrophy } from "react-icons/fa";

type SHShowProps = {
    show: IShow
}

const SHShow: FC<SHShowProps> = ({ show }) => {
    const { name, genres, image, rating, premiered } = show;
    const [isLoading, setIsLoading] = useState(true)
    const [favorite, setFavorite] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, [])

    const cardStyle = "inline-block relative transition-transform rounded-xl overflow-hidden m-1 border border-gray-600 cursor-pointer h-60 w-[160px] z-0 hover:transform hover:scale-125 hover:z-10 hover:shadow-xl "

    const heartStyle = favorite ? 'text-red-500 opacity-1' : 'transparent';
    const handleButtonClick = () => {
        setFavorite(!favorite)
    };
    return <>
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
                    <div className="absolute top-1 right-1">
                        <button className="bg-white opacity-60 hover:opacity-100 z-50 p-2 rounded-md" onClick={handleButtonClick}>
                            <FaHeart className={`text-base ${heartStyle}`} />
                        </button>
                    </div>

                    <Link to={`/show/5`} style={{ textDecoration: "none", color: "white" }}>
                        <div >

                            {image && image.original && <img className="h-60" src={image.original} />}
                            <div className="infoShow absolute p-4 h-1/2 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black to-transparent w-[100%]">
                                <div className="title font-extrabold text-base mb-2">{name}</div>
                                <div className="rating mb-1 text-xs font- flex flex-row justify-between items-center">
                                    <span className="flex flex-row">{new Date(premiered).getFullYear()}<FaTrophy className="ml-1 text-amber-500" /></span>
                                    <span className="flex flex-row">{rating.average}<FaStar className="ml-1 text-amber-500" /></span>
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
