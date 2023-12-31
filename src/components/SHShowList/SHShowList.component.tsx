import { FC, useState, useEffect } from 'react';
import { IShow } from '../../interfaces/ShowInterface';
import SHShow from '../SHShow/SHShow.component';
import { Paginator } from 'primereact/paginator';
import { Tailwind } from './PaginatorTailwind';

/**
 * Props for the SHShowList component.
 */
type SHShowListProps = {
    shows: IShow[] | undefined;
    isLoading: boolean;
    onChangePage: (page: number) => void;
    showPagination: boolean;
    toggleFavoriteShow: (show: IShow) => void;
    isFavoriteShow: (id: number) => boolean;
    lastPage?: number;
};

/**
 * Component to display a list of TV shows with pagination support.
 * @param {SHShowListProps} shows - The array of TV shows to display.
 * @param {SHShowListProps} isLoading - Boolean indicating whether the shows are still loading.
 * @param {SHShowListProps} onChangePage - Function to handle page change.
 * @param {SHShowListProps} showPagination - Boolean indicating whether to display pagination.
 * @param {SHShowListProps} toggleFavoriteShow - Function to toggle favorite status of a show.
 * @param {SHShowListProps} isFavoriteShow - Function to check if a show is marked as a favorite.
 * @param {SHShowListProps} lastPage - Optional number representing the last page.
 * @returns {JSX.Element} JSX for displaying the list of TV shows.
 */

const SHShowList: FC<SHShowListProps> = ({ shows, isLoading, onChangePage, showPagination, isFavoriteShow, toggleFavoriteShow, lastPage }) => {
    const arrayNumeros: number[] = Array.from({ length: 250 }, (_, index) => index);
    const [first, setFirst] = useState(0);
    const [pageLinkSize, setPageLinkSize] = useState(0);
    const breakpoints = [360, 460, 560, 660, 760];
    const pageSizes = [1, 2, 3, 3, 4, 5];

    const onPageChange = (event: { first: number; page: number }) => {
        setFirst(event.first);
        onChangePage(event.page);
    };

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            let newSize = pageSizes[pageSizes.length - 1]; // Tamaño por defecto

            for (let i = 0; i < breakpoints.length; i++) {
                if (windowWidth < breakpoints[i]) {
                    newSize = pageSizes[i];
                    break;
                }
            }

            setPageLinkSize(newSize);
        };
        handleResize();
        if (lastPage) {
            setFirst((lastPage + 1) * 10)

        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (lastPage) onPageChange({ first: lastPage * 10, page: lastPage });
    }, [lastPage])



    return (
        <div>
            {showPagination && <Paginator
                pageLinkSize={pageLinkSize} // Utiliza el estado para pageLinkSize
                className='mb-6'
                first={first}
                rows={10}
                totalRecords={290}
                onPageChange={onPageChange}
                pt={Tailwind.paginator}
            />}

            <div className='flex flex-wrap justify-center'>
                {isLoading ? (
                    arrayNumeros.map((number) => <SHShow show={undefined} key={number} isFavoriteShow={isFavoriteShow} toggleFavoriteShow={toggleFavoriteShow} />)
                ) : (shows && shows.length > 0 ? shows.map((show) => <SHShow show={show} key={show.id} isFavoriteShow={isFavoriteShow} toggleFavoriteShow={toggleFavoriteShow} />) : <div className='text-lg text-white'>Series not found</div>)}
            </div>
        </div>
    );
};

export default SHShowList;
