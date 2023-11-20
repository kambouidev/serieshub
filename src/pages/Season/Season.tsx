import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { SHHeader } from "../../components/SHHeader/SHHeader.component";
import { FaTrophy } from "react-icons/fa";
import no_image from '../../assets/image_not_found.png';
import SHLoading from "../../components/SHLoading/SHLoading";
import { useSeasonEpisodes } from "./hooks/useSeason";
import { ISeasonWithEmbeddedEpisodes } from "../../interfaces/EpisodeInterface";
import SHEpisodeCard from "../../components/SHEpisodeCard/SHEpisodeCard";
import SHError from "../../components/SHError/SHError";

const SeasonPage = () => {
    const { data, isFetching, onSearchSeason } = useSeasonEpisodes();
    const { id } = useParams();

    const seasonId = Number(id);

    useEffect(() => {
        if (!isNaN(seasonId)) onSearchSeason(seasonId)
    }, []);

    if (isNaN(seasonId)) return <SHError />;

    const renderComponent = (dataComponent: ISeasonWithEmbeddedEpisodes) => {
        const { image, name, episodeOrder, number, premiereDate, _embedded } = dataComponent;
        const episodesData = _embedded.episodes.map(({ id, image: imageEpisode, name, number, airstamp, summary }) => (
            {
                id,
                image: imageEpisode && imageEpisode.original ? imageEpisode.original : (image ? image.medium : no_image),
                name,
                airstamp,
                number,
                summary: summary ? summary.replace(/<[^>]+>/g, '') : ''
            })
        );

        return (
            <div className="gap-2">
                <div className="flex flex-row justify-center bg-white bg-opacity-10 rounded-lg">
                    <div className="flex flex-row  p-2  max-w-[300px] ">
                        <div className="w-1/2 flex flex-col justify-center items-center">
                            <img src={image ? image.medium || image.original : no_image} alt={name} className="rounded-md" />
                        </div>
                        <div className="w-1/2 flex flex-col justify-center gap-3 text-white items-center">
                            <div className="title font-extrabold text-base mb-2">{`Season ${number} ${name.length > 0 ? " - " + name : ""}`}</div>
                            <div className="rating mb-1 text-xs flex flex-row items-center w-full justify-evenly">
                                {premiereDate && <span className="flex flex-row">{new Date(premiereDate).getFullYear()}<FaTrophy className="ml-1 text-amber-500" /></span>}
                            </div>
                            <div className="italic text-xs p-1 text-center">{`${episodeOrder} Episodes`}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='p-10 text-center text-greyIsh opacity-40 text-lg sm:text-lg md:text-xl lg:text-3xl '>Episodes</div>
                    {episodesData.map((episode) => <SHEpisodeCard key={episode.id} data={episode} />)}

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

export default SeasonPage;
