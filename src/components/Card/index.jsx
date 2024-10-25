import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { isolarMidia } from '../../services/utils';
const apiKey = import.meta.env.VITE_API_KEY;
const chamadaApi = import.meta.env.VITE_API;

export const Card = ({ midia, ordenado, index }) => {

    // Espaço dedicado para novas requisições
    const [infoMidia, setInfoMidia] = useState(null);
    const [infoTrailers, setInfoTrailers] = useState(null);
    const [infoTrailersBR, setInfoTrailersBR] = useState(null);
    const [infoImagens, setInfoImagens] = useState(null);

    useEffect(() => {

        if (midia) {
            const getInfos = async () => {
                try {
                    const [midiaResposta, trailersResposta, trailersBrResposta, imagensResposta] = await Promise.all([
                        axios.get(`${chamadaApi}/${midia.media_type ? midia.media_type : 'movie'}/${midia.id}?${apiKey}`),
                        axios.get(`${chamadaApi}/${midia.media_type ? midia.media_type : 'movie'}/${midia.id}/videos?${apiKey}`),
                        axios.get(`${chamadaApi}/${midia.media_type ? midia.media_type : 'movie'}/${midia.id}/videos?language=pt-BR&${apiKey}`),
                        axios.get(`${chamadaApi}/${midia.media_type ? midia.media_type : 'movie'}/${midia.id}/images?${apiKey}`),
                    ]);

                    setInfoMidia(midiaResposta.data);
                    setInfoTrailers(trailersResposta.data);
                    setInfoTrailersBR(trailersBrResposta.data);
                    setInfoImagens(imagensResposta.data);

                } catch (error) {
                    // console.log(error);
                    { error && <p className="text-red-500">Ocorreu um erro ao carregar os dados: {error}</p> }
                }
            };

            getInfos();
        }
    }, [midia]);

    const midiaIsolada = isolarMidia(midia, infoImagens, infoMidia);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.getFullYear();
    };


    if (ordenado) {
        return (
            <Link to={'/destaque'} state={{ midia: midiaIsolada }}>
                <div className='w-full flex items-center gap-1 px-2 cursor-pointer min-h-20 hover:scale-105 hover:transition-all hover:duration-200 rounded-md overflow-clip text-white '>

                    <p className='text-5xl pr-2 font-gothamBold '>{index + 1}</p>

                    <img className='w-2/5 max-h-40 sm:min-h-32 rounded-xl' src={midiaIsolada.poster} alt="Poster" />

                    <span className='flex flex-col justify-evenly w-3/5 min-h-32 pl-1 '>
                        <p className='sm:hidden text-sm opacity-40'>{`${midiaIsolada?.genero[0]?.name} | ${midiaIsolada?.genero[1]?.name}`}</p>
                        <p className='hidden sm:block text-sm opacity-40'>{`${midiaIsolada?.genero[0]?.name} `}</p>
                        <p className='text-base'>{formatDate(midiaIsolada.estreia)}</p>
                        <p className=' text-sm'>⭐ {midiaIsolada.nota}</p>
                    </span>
                </div>
            </Link>
        )
    } else {
        return (
            <Link to={'/destaque'} state={{ midia: midiaIsolada }}>
                <div className='cursor-pointer hover:scale-105 hover:transition-all hover:duration-200 rounded-md overflow-clip text-white'>
                    <img src={midiaIsolada.poster} alt="Poster" />

                    <span className='w-full flex items-center justify-between px-1 pt-2'>
                        <p className='text-sm opacity-40'>{formatDate(midiaIsolada.estreia)}</p>
                        <p className=' text-sm'> ⭐ {midiaIsolada.nota}</p>
                    </span>
                </div>
            </Link>
        )
    }


}
