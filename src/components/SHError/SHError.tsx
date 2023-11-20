import { Link } from 'react-router-dom';
import { SHHeader } from '../SHHeader/SHHeader.component';

const SHError = () => {
    return (
        <div className='w-[85%] max-w-[1080px] m-auto h-96'>
            <SHHeader />
            <div className="flex flex-col items-center justify-center h-full text-white">
                <h1 className="text-4xl font-bold">Error</h1>
                <p className="text-lg">Opp! Something went wrong.</p>
                <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md text-center">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default SHError;
