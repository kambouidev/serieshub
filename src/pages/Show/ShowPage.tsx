import { useParams } from "react-router-dom";
import { useShowSeasons } from "./hooks/useShowSeasons";
import { useEffect } from "react";
import { IShowWithEmbeddedSeasons } from '../../interfaces/SeasonInterface';
import { SHHeader } from "../../components/SHHeader/SHHeader.component";
import { FaStar, FaTrophy } from "react-icons/fa";
import no_image from '../../assets/image_not_found.png';
import SHCard from "../../components/SHCard/SHCard.component";
import SHLoading from "../../components/SHLoading/SHLoading";
import SHError from "../../components/SHError/SHError";

const ShowPage = () => {
    const { data, isFetching, onSearchShow } = useShowSeasons();
    const { id } = useParams();

    const showId = Number(id);

    useEffect(() => {
        if (!isNaN(showId)) onSearchShow(showId)
    }, []);



    if (isNaN(showId)) return <SHError />;

    const renderComponent = (dataComponent: IShowWithEmbeddedSeasons) => {
        const { image, name, premiered, rating, _embedded, genres } = dataComponent;
        const seasonsData = _embedded.seasons.map(({ id, image: imageSeason, name, number, premiereDate, episodeOrder }) => (
            {
                id: id,
                image: imageSeason && imageSeason.original ? imageSeason.original : (image ? image.medium : no_image),
                name: `Season ${number} ${name.length > 0 ? " - " + name : ""}`,
                link: `/seasons/${id}/episodes `,
                premiereDate: `${new Date(premiereDate).getFullYear()}`,
                episodes: episodeOrder
            })
        );

        return (
            <div className="gap-2">
                <div className="flex flex-row justify-center bg-white bg-opacity-10 rounded-lg">
                    <div className="flex flex-row  p-2  max-w-[300px] ">
                        <div className="w-1/2 flex flex-col justify-center items-center">
                            <img src={image.medium || image.original || no_image} alt={name} className="rounded-md" />
                        </div>
                        <div className="w-1/2 flex flex-col justify-center gap-3 text-white items-center">
                            <div className="title font-extrabold text-base mb-2">{name}</div>
                            <div className="rating mb-1 text-xs flex flex-row items-center w-full justify-evenly">
                                {premiered && <span className="flex flex-row">{new Date(premiered).getFullYear()}<FaTrophy className="ml-1 text-amber-500" /></span>}
                                {rating && rating.average && <span className="flex flex-row">{rating.average}<FaStar className="ml-1 text-amber-500" /></span>}
                            </div>
                            <div className="italic text-xs p-1 text-center">{genres.join(', ')}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='p-10 text-center text-greyIsh opacity-40 text-lg sm:text-lg md:text-xl lg:text-3xl '>Seasons</div>
                    {seasonsData.map((season) => <SHCard key={season.id} data={season} />)}

                </div>
            </div>
        )
    }

    return (
        <div className='w-[85%] max-w-[1080px] m-auto '>
            <SHHeader />
            {isFetching && <SHLoading />}
            {data && renderComponent(data)}
        </div >)
}

export default ShowPage;
