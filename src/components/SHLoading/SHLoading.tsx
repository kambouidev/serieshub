import { FC } from 'react'

const SHLoading: FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-blueColor" >
            <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}>            </i>
        </div>)
}

export default SHLoading
