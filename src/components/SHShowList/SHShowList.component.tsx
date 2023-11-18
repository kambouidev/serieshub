import { FC } from 'react'
import { IShow } from '../../interfaces/ShowInterface'
import SHShow from '../SHShow/SHShow.component'

type SHShowListProps = {
    shows: IShow[]
}
const SHShowList: FC<SHShowListProps> = ({ shows }) => {
    return (
        <div className='flex flex-wrap justify-center'>
            {shows.map((show) => <SHShow show={show} key={Math.random() * 1000000} />)}
        </div>)
}

export default SHShowList
