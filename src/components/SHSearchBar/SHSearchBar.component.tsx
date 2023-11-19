import { useState, FC } from 'react';
//import { debounce } from 'lodash';

type SHSearchBarProps = {
    searchQuery: string,
    setSearchQuery: (query: string) => void,
    onSearch: () => void,
}
const SHSearchBar: FC<SHSearchBarProps> = ({ searchQuery, setSearchQuery, onSearch }) => {
    //const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches] = useState<string[]>(['React', 'JavaScript', 'Node.js', 'CSS', 'HTML']);

    const [filteredRecentSearches, setFilteredRecentSearches] = useState<string[]>([]);
    const [showRecentSearches, setShowRecentSearches] = useState(false);

    const handleInputChange = (e: { target: { value: string; }; }) => {
        setSearchQuery(e.target.value);
        const filteredRecentSearches = recentSearches.filter(recent => recent.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
        if (filteredRecentSearches.length > 0) return setFilteredRecentSearches(filteredRecentSearches);
        return setShowRecentSearches(false);
    };



    const handleFocus = () => {
        const recent = ['React', 'JavaScript', 'Node.js', 'CSS', 'HTML'];
        setFilteredRecentSearches(recent);
        if (searchQuery.length === 0) setShowRecentSearches(true);
    };

    const handleBlur = () => {
        setTimeout(() => setShowRecentSearches(false), 200);
    };

    const handleOptionClick = (option: string) => {
        setSearchQuery(option);
        setShowRecentSearches(false);
    };

    const handleEnterPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            setShowRecentSearches(false);
            onSearch();
        }
    }

    const clearInput = () => {
        setSearchQuery('');
    };

    /* return (
        <div className="searchContainer  sm:p-4 md:p-6 lg:p-8 xl:p-10 flex rounded-[10px] justify-center p-2 bg-greyIsh relative bg-opacity-40">
            <div className='searchBarContainer p-2 sm:p-2 md:p-4 lg:p-6 xl:p-8 flex flex-col justify-between items-center rounded-[8px] gap-[10px] bg-backgroundColor shadow-2xl w-[70%] min-w-[200px] '>
                <div className="flex gap-4 items-center w-[100%] relative">
                    <i className="pi pi-search sm:text-base md:text-lg lg:text-xl xl:text-2xl icon text-white" />
                    <div className='inputWrapper flex flex-col w-full relative'>
                        <input
                            type='text'
                            className='bg-transparent text-blue-500 focus:outline-none w-full'
                            placeholder='Search series here...'
                            value={searchQuery}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onKeyDown={handleEnterPress}

                        />
                        {searchQuery && (
                            <button
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 px-2 text-gray-500 focus:outline-none"
                                onClick={clearInput}
                            >
                                <i className="pi pi-times sm:text-base md:text-lg lg:text-xl xl:text-2xl icon text-white" />

                            </button>
                        )}
                        {showRecentSearches && (
                            <div className="absolute left-0 w-full top-[30px] bg-white bg-opacity-80 rounded-b-md z-[100]">
                                <ul className="rounded shadow-lg mt-1">
                                    {filteredRecentSearches.map((search, index) => (
                                        <li
                                            key={index}
                                            className="p-2 hover:bg-gray-100 cursor-pointer rounded-b-md"
                                            onClick={() => handleOptionClick(search)}
                                        >
                                            {search}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>


                </div>
            </div>
        </div>
    ); */

    return (
        <div className="searchContainer  sm:p-4 md:p-6 lg:p-8 xl:p-10 flex rounded-[10px] justify-center p-2 bg-greyIsh relative bg-opacity-40">
            <div className='searchBarContainer p-2 sm:p-2 md:p-4 lg:p-6 xl:p-8 flex flex-col justify-between items-center rounded-[8px] gap-[10px] bg-backgroundColor shadow-2xl w-[70%] min-w-[200px] '>
                <div className="flex gap-1 items-center w-[100%] relative">

                    <div className='inputWrapper flex flex-col w-full relative'>
                        <input
                            type='text'
                            className='bg-transparent text-blueColor focus:outline-none w-full text-sm sm:text-lg'
                            placeholder='Search series here...'
                            value={searchQuery}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onKeyDown={handleEnterPress}

                        />
                        {searchQuery && (
                            <button
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 px-2 text-gray-500 focus:outline-none"
                                onClick={clearInput}
                            >
                                <i className="pi pi-times sm:text-base md:text-lg lg:text-xl xl:text-2xl icon text-white" />

                            </button>
                        )}
                        {showRecentSearches && (
                            <div className="absolute left-0 w-full top-[30px] bg-white bg-opacity-80 rounded-b-md z-[100]">
                                <ul className="rounded shadow-lg mt-1">
                                    {filteredRecentSearches.map((search, index) => (
                                        <li
                                            key={index}
                                            className="p-2 hover:bg-gray-100 cursor-pointer rounded-b-md"
                                            onClick={() => handleOptionClick(search)}
                                        >
                                            {search}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <button className='flex items-center justify-center p-2 px-3 bg-blueColor rounded-md hover:opacity-80' onClick={onSearch}>
                        <i className="pi pi-search sm:text-base md:text-lg lg:text-xl xl:text-2xl icon text-white " />
                    </button>

                </div>
            </div>
        </div>
    );
};

export default SHSearchBar;
