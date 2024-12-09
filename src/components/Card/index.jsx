import React from 'react'
import { Link } from 'react-router-dom';
import { useMediaDetails } from '../../hooks/useMediaDetails';

export const Card = ({ midia, ordenado, index }) => {

    const { media } = useMediaDetails(midia);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.getFullYear();
    };


    if (ordenado) {
        return (
            <Link to={'/destaque'} state={{ midia: media }}>
                <div className='w-full flex items-center gap-1 px-2 cursor-pointer min-h-20 hover:scale-105 hover:transition-all hover:duration-200 rounded-md overflow-clip text-white '>

                    <p className='text-5xl pr-2 font-gothamBold '>{index + 1}</p>

                    <img className='w-2/5 max-h-40 sm:min-h-32 rounded-xl' src={media.poster} alt="Poster" />

                    <span className='flex flex-col justify-evenly w-3/5 min-h-32 pl-1 '>
                        <p className='sm:hidden text-sm opacity-40'>{`${media?.genero[0]?.name} | ${media?.genero[1]?.name}`}</p>
                        <p className='hidden sm:block text-sm opacity-40'>{`${media?.genero[0]?.name} `}</p>
                        <p className='text-base'>{formatDate(media.estreia)}</p>
                        <p className=' text-sm'>⭐ {media.nota}</p>
                    </span>
                </div>
            </Link>
        )
    } else {
        return (
            <Link to={'/destaque'} state={{ midia: media }}>
                <div className='max-w-40 md:max-w-none cursor-pointer hover:scale-105 hover:transition-all hover:duration-200 rounded-md overflow-clip text-white'>
                    <img src={media.poster} alt="Poster" />

                    <span className='w-full flex items-center justify-between px-1 pt-2'>
                        <p className='text-sm opacity-40'>{formatDate(media.estreia)}</p>
                        <p className=' text-sm'> ⭐ {media.nota}</p>
                    </span>
                </div>
            </Link>
        )
    }


}
