import { Link, useParams } from "react-router-dom";
import { useShowSeasons } from "./hooks/useShowSeasons";
import { useEffect } from "react";
import { IShowWithEmbeddedSeasons } from "../../interfaces/SeasonInterface";
import { SHHeader } from "../../components/SHHeader/SHHeader.component";
import { FaStar, FaTrophy } from "react-icons/fa";
import no_image from '../../assets/image_not_found.png';
const ShowPage = () => {
    const { data, isFetching, onSearchShow } = useShowSeasons();
    const { id } = useParams();

    console.log('TENEMOS ID', id)
    const showId = Number(id);

    useEffect(() => {
        if (!isNaN(showId)) onSearchShow(showId)
    }, []);



    if (isNaN(showId)) return <><div>ERROR</div></>;
    if (!data) return <><div>cargando</div></>;

    const { image, name, premiered, rating, _embedded, genres } = data as IShowWithEmbeddedSeasons;
    const seasonsData = _embedded.seasons;
    console.log(seasonsData)
    return (
        <div className='w-[85%] m-auto '>
            <SHHeader />
            {isFetching && <div>Loading data</div>}
            {data &&
                <div className="gap-2">

                    <div className="flex flex-row justify-center bg-white bg-opacity-10 rounded-lg">
                        <div className="flex flex-row  p-2  max-w-[300px] ">
                            <div className="w-1/2 flex flex-col justify-center items-center">
                                <img src={image.medium || image.original || no_image} alt={name} className="rounded-md" />
                            </div>
                            <div className="w-1/2 flex flex-col justify-center gap-3 text-white items-center">
                                <div className="title font-extrabold text-base mb-2">{name}</div>
                                <div className="rating mb-1 text-xs flex flex-row items-center w-full justify-around">
                                    {premiered && <span className="flex flex-row">{new Date(premiered).getFullYear()}<FaTrophy className="ml-1 text-amber-500" /></span>}
                                    {rating && rating.average && <span className="flex flex-row">{rating.average}<FaStar className="ml-1 text-amber-500" /></span>}
                                </div>
                                <div className="italic text-xs p-1 text-center">{genres.join(', ')}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='p-10 text-center text-greyIsh opacity-40 text-lg sm:text-lg md:text-xl lg:text-3xl '>Seasons</div>
                        {seasonsData.map((season) => (
                            <div className="flex flex-row gap-2 mb-2 bg-white bg-opacity-10 rounded-lg" key={season.id}>
                                <div className="w-[150px] flex flex-col justify-center items-center">
                                    {<img src={season.image ? season.image.original || season.image.medium : no_image} alt={name} className="rounded-md" />}
                                </div>
                                <div className="w-full flex flex-row justify-center gap-1 text-white items-center">
                                    <div className="w-1/2 justify-center items-center">
                                        <div className="font-extrabold text-base mb-2 text-center">{`Season ${season.number}`}{season.name.length > 0 && ' - ' + season.name}</div>
                                        <div className="rating mb-1 text-xs flex flex-row items-center w-full justify-center">
                                            {season.premiereDate && <span className="flex flex-row">{new Date(season.premiereDate).getFullYear()}<FaTrophy className="ml-1 text-amber-500" /></span>}
                                        </div>
                                    </div>
                                    <div className="w-1/2 p-2 text-sm text-center">
                                        <Link to={`/seasons/${season.id}/episodes `} style={{ textDecoration: "none", color: "white" }}>
                                            <button className="bg-blueColor p-2 rounded-lg">
                                                Episodies {season.episodeOrder}

                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            }
        </div>)
}

export default ShowPage;
