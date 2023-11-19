import React, { useState, useEffect } from 'react';
import { SHHeader } from '../../components/SHHeader/SHHeader.component';
import SHSearchBar from '../../components/SHSearchBar/SHSearchBar.component';
import useShowList from './hooks/useShowList';
import SHShowList from '../../components/SHShowList/SHShowList.component';
import { useSearchQuery } from './hooks/useSearchShow';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchResult, setShowSearchResult] = useState(false);
    const { changePage, data, isFetching } = useShowList();
    const { onSearchShow, isFetchingSearch, searchResult } = useSearchQuery();
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        if (window.scrollY > window.innerHeight) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleSearchQuery = (query: string) => {
        setSearchQuery(query);
        if (query.length === 0) setShowSearchResult(false);
    }

    const search = () => {
        if (searchQuery.trim().length > 0) {
            onSearchShow(searchQuery.trim());
            setShowSearchResult(true);
        }
    }

    return (
        <div className='w-[85%] m-auto'>
            <SHHeader />
            <SHSearchBar searchQuery={searchQuery} setSearchQuery={handleSearchQuery} onSearch={search} />

            <div className='justify-center'>
                <div className='p-10 text-center text-greyIsh opacity-40 text-lg sm:text-lg md:text-xl lg:text-3xl'>{showSearchResult ? "Search result" : "Series"}</div>
                {!showSearchResult ?
                    <SHShowList onChangePage={changePage} isLoading={isFetching} shows={data} showPagination={true} /> :
                    <SHShowList onChangePage={changePage} isLoading={isFetchingSearch} shows={searchResult} showPagination={false} />}
            </div>

            {showButton && (
                <button
                    className='fixed opacity-80 bottom-3 right-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    onClick={scrollToTop}
                >
                    <i className="pi pi-angle-up sm:text-base md:text-lg lg:text-xl xl:text-2xl icon text-white " />
                </button>
            )}
        </div>
    );
};

export default Home;
