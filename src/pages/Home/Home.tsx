import React from 'react'
import { SHHeader } from '../../components/SHHeader/SHHeader.component'
import SHSearchBar from '../../components/SHSearchBar/SHSearchBar.component'
import useShowList from './hooks/useShowList'
import SHShow from '../../components/SHShow/SHShow.component'
import SHShowList from '../../components/SHShowList/SHShowList.component'

const Home = () => {
    console.log('EWWWA')
    const { changePage, data, isFetching, error } = useShowList()

    console.log(data && data.map(show => show.name))
    return (
        <div className='w-[85%] m-auto '>
            <SHHeader />
            <SHSearchBar />

            <div className='justify-center py-12 border border-blueColor '>
                <div>SHOWS</div>
                {isFetching &&
                    <div>
                        OBTENIENDO SHOWS
                    </div>
                }
                {data && !isFetching && <SHShowList shows={data} />}
            </div>
        </div>)
}

export default Home
