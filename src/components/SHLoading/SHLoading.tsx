import { FC } from 'react';

/**
 * Component for displaying a loading spinner.
 * @returns {JSX.Element} JSX for the loading component.
 */
const SHLoading: FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-blueColor">
            <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
        </div>
    );
};

export default SHLoading;
