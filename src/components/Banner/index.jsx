import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { FaPlus } from "react-icons/fa6";
import { BiInfoCircle } from "react-icons/bi";
import { BsPlayCircleFill } from "react-icons/bs";
import { isolarMidia } from '../../services/utils';

const apiKey = import.meta.env.VITE_API_KEY;
const chamadaApi = import.meta.env.VITE_API;

const apiVideos = import.meta.env.VITE_API_VIDEOS;

const Banner = ({ lista }) => {

    // Selecionando uma midia para gerar um banner aleatório
    const [randomBanner, setRandomBanner] = useState(null);

    useEffect(() => {
        if (lista?.length > 0) {
            const randomIndex = Math.floor(Math.random() * lista.length);
            setRandomBanner(lista[randomIndex])
        }
    }, [lista]);

    const [bannerMidia, setBannerMidia] = useState(null);
    const [bannerTrailers, setBannerTrailers] = useState(null);
    const [bannerTrailersBR, setBannerTrailersBR] = useState(null);
    const [bannerImagens, setBannerImagens] = useState(null);

    useEffect(() => {
        if (randomBanner) {
            const getInfos = async () => {
                try {
                    const [midiaResposta, trailersResposta, trailersBrResposta, imagensResposta] = await axios.all([
                        axios.get(`${chamadaApi}/${randomBanner.media_type}/${randomBanner.id}?${apiKey}`),
                        axios.get(`${chamadaApi}/${randomBanner.media_type}/${randomBanner.id}/videos?${apiKey}`),
                        axios.get(`${chamadaApi}/${randomBanner.media_type}/${randomBanner.id}/videos?language=pt-BR&${apiKey}`),
                        axios.get(`${chamadaApi}/${randomBanner.media_type}/${randomBanner.id}/images?${apiKey}`),
                    ]);

                    setBannerMidia(midiaResposta.data);
                    setBannerTrailers(trailersResposta.data);
                    setBannerTrailersBR(trailersBrResposta.data);
                    setBannerImagens(imagensResposta.data);

                } catch (error) {
                    console.log(error);
                    { error && <p className="text-red-500">Ocorreu um erro ao carregar os dados: {error}</p> }
                }
            };

            getInfos();
        }
    }, [randomBanner]);


    const midia = randomBanner ? isolarMidia(randomBanner, bannerImagens, bannerMidia) : {};

    return (
        <section className="banner w-svw h-svh bg-cover bg-no-repeat bg-center flex items-end before:content-[''] before:absolute before:w-svw before:h-svh before:bg-preto-before lg:items-center lg:justify-center " style={{ backgroundImage: `url(${midia.background})` }}>
            <div className="banner__container lg:container flex flex-col justify-end w-full h-3/4 z-10 relative mx-auto bg-gradient-to-t from-10% from-preto-claro ">
                <div className='banner__informacoes container p-3 pb-0'>
                    <ol className='flex flex-wrap gap-1 pb-2'>
                        {
                            midia ? midia.genero?.map((item, index) => (
                                <li className='text-white p-2 py-1 rounded-md m-1 text-xs border-solid border-2 border-cinza-transparente' key={index}>{item.name}</li>
                            )) : null
                        }
                    </ol>

                    {/* <img className='w-1/3' src={midia.poster} alt="" /> */}


                    <img className='max-w-48 aspect-auto pb-2' src={midia.logo} alt="" />

                    <span>
                        <p className='text-white'> ⭐ {midia.nota}</p>
                    </span>

                    <h1 className='font-bold text-white'>{midia.titulo ? midia.titulo : midia.nome}</h1>

                    {/* <p className='text-white pt-3 pb-3'>{midia.sinopse || 'sinopse não disponivel'}</p> */}

                    <div className='flex gap-4 text-white pt-3'>
                        <button className='bg-cinza-transparente p-1 px-3 text-lg rounded-md' >
                            Sinopse
                        </button>
                        <button className='bg-vermelho-escuro p-1 px-3 text-lg rounded-md'>
                            <FaPlus />
                        </button>
                        <button className='bg-vermelho-escuro p-1 px-3 text-lg rounded-md'>
                            <BiInfoCircle />
                        </button>
                    </div>
                </div>
                <div className='banner__trailers h-2/4 flex items-center bg-gradient-to-t from-preto-claro '>
                    <Swiper
                        className='w-full h-1/3 -mt-16 '
                        modules={[Navigation, A11y]}
                        spaceBetween={30}
                        slidesPerView={2}
                        centeredSlides={true}
                        onSlideChange={() => console.log('slide change')}
                    >

                        {
                            bannerTrailers && bannerTrailers.results?.map((item, index) => (
                                <SwiperSlide key={index} >
                                    <SwiperSlide onClick={e => console.log(item.key)} className={`swiper_item w-full h-full aspect-video bg-cover bg-no-repeat bg-center relative rounded-lg overflow-clip after:content-[""] after:absolute after:top-0 after:w-full after:h-full after:block after:bg-preto-transparente `} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${bannerImagens?.backdrops[Math.floor(Math.random() * bannerImagens?.backdrops?.length)].file_path})` }} >
                                        <span className='w-full h-full flex items-center justify-center bg-preto-transparente'>
                                            <BsPlayCircleFill className='text-vermelho-claro bg-white text-4xl rounded-3xl' />
                                        </span>
                                    </SwiperSlide>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default Banner;