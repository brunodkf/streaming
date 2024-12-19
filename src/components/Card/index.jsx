import React from 'react'
import { Link } from 'react-router-dom';
import { useMediaDetails } from '../../hooks/useMediaDetails';

export const Card = ({ midia }) => {

    const { media } = useMediaDetails(midia);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.getFullYear();
    };

    return (
        <Link to={'/destaque'} state={{ midia: media }}>
            <div className='max-w-40 md:max-w-none cursor-pointer hover:duration-200  text-white'>
                <img src={media.poster} alt="Poster" className='rounded-md hover:scale-105 hover:transition-all' />

                <span className='w-full flex items-center justify-between px-1 pt-2'>
                    <p className='text-sm opacity-40'>{formatDate(media.estreia)}</p>
                    <p className=' text-sm'> ⭐ {media.nota}</p>
                </span>
            </div>
        </Link>
    )


}
