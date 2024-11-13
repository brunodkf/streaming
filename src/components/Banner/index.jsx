import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { isolarMidia } from '../../services/utils';

import Modal from '../Modal';
import { Scroll } from '../Scroll';

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
                    { error && <p className="text-red-500">Ocorreu um erro ao carregar os dados: {error}</p> }
                }
            };

            getInfos();
        }
    }, [randomBanner]);


    const midia = randomBanner ? isolarMidia(randomBanner, bannerImagens, bannerMidia) : {};

    const [openModal, setOpenModal] = useState(false);  //controla o estado do modal
    const [videoModal, setVideoModal] = useState(null);
    function abreModal(e) {
        setOpenModal(true)
        setVideoModal(e);
    }
    function closeModal() {
        setOpenModal(false);
    }


    // Como não encontrei na documentação do SwiperJS, uma forma nativa de ativar a páginação , decidi implementar dessa forma

    const [isPaginationEnabled, setIsPaginationEnabled] = useState(false);

    // Verifica a largura da tela e atualiza o estado
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsPaginationEnabled(true);
            } else {
                setIsPaginationEnabled(false);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <section id='banner' className="banner w-svw h-svh relative bg-cover bg-no-repeat bg-center flex items-end overflow-clip" style={{ backgroundImage: `url(${midia.background})` }}>
         
            <div className="banner__container lg:container w-full h-3/4 flex flex-col justify-end
             lg:h-full lg:flex-row lg:justify-normal lg:items-center lg:px-8 md:justify-center relative mx-auto z-10 
             bg-gradient-to-t from-10% from-preto-claro md:from-preto-escuro lg:bg-none">
                
                <div className='banner__informacoes lg:w-2/4 lg:m-0 p-3 pb-0 sm:p-8   md:container md:m-auto md:p-0 md:px-4'>
                    <ol className='flex flex-wrap gap-1 pb-2'>
                        {
                            midia ? midia.genero?.map((item, index) => (
                                <li className='text-white p-2 py-1 rounded-md m-1 text-xs border-solid border-2 border-cinza-transparente' key={index}>{item.name}</li>
                            )) : null
                        }
                    </ol>

                    {/* <img className='w-1/3' src={midia.poster} alt="" /> */}

                    <img className='max-w-48 aspect-auto object-cover pb-2 custom-tab:max-w-48 sm:max-w-42 lg:max-w-48 xl:max-w-64' src={midia.logo} alt="Logo" />

                    <div className="banner__sinopse lg:container ">
                        {/* <p className='hidden lg:flex text-white pt-3 pb-3'>{midia.sinopse || 'sinopse não disponivel'}</p> */}
                        <p className='hidden lg:flex text-white pt-3 pb-3'>
                            {
                                midia?.sinopse?.length >= 240 ? `${midia.sinopse.slice(0, 220)} {...}` : `${midia.sinopse}`
                            }
                        </p>

                    </div>

                    <span>
                        <p className='text-white mb-1'> ⭐ {midia.nota}</p>
                    </span>

                    <h1 className='font-bold text-white'>{midia.titulo ? midia.titulo : midia.nome}</h1>

                    <div className='flex gap-4 text-white pt-3'>

                        <button className='bg-cinza-transparente p-1 px-3 text-lg rounded-md md:text-base md:px-2' >
                            <Link to={'/destaque'} state={{ midia: midia }}>
                                Sinopse
                            </Link>
                        </button>

                        <button className='bg-vermelho-escuro p-1 px-3 text-lg rounded-md md:text-base md:px-2'>
                            <FaPlus />
                        </button>

                        <button className='bg-vermelho-escuro p-1 px-3 text-lg rounded-md md:text-base md:px-2'>
                            <Link to={'/destaque'} state={{ midia: midia }}>
                                <BiInfoCircle />
                            </Link>
                        </button>
                    </div>
                </div>

                <div className='banner__trailers xl:h-1/2 lg:w-2/4 h-2/4 lg:h-3/4 flex flex-col items-center bg-gradient-to-t from-preto-claro md:bg-none'>
                    <Swiper
                        className='w-full h-1/3 mt-10 sm:mt-10 lg:h-full xl:mt-1 2xl:mt-10'
                        modules={[Navigation, A11y, Scrollbar, Pagination]}
                        pagination={isPaginationEnabled ? { clickable: true } : false}
                        spaceBetween={30}
                        slidesPerView={2}
                        centeredSlides={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                                direction: 'horizontal',
                                centeredSlides: true,

                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                                direction: 'horizontal',
                                centeredSlides: true,

                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 50,
                                direction: 'vertical',
                                centeredSlides: false,
                                pagination: {
                                    clickable: true,
                                },
                            },
                            1280: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                                direction: 'vertical',
                                centeredSlides: false,
                                pagination: {
                                    clickable: true,
                                },
                            },
                        }}
                    >

                        {
                            (bannerTrailersBR?.results?.length > 0 ? bannerTrailersBR.results : bannerTrailers?.results)?.map((item, index) => (

                                <SwiperSlide key={index} onClick={() => abreModal(item.key)} className={`swiper_item w-full h-full lg:max-w-52 lg:max-h-32 lg:m-auto lg:mr-10 xl:max-h-32 aspect-video bg-cover bg-no-repeat bg-center relative rounded-lg overflow-clip after:content-[""] after:absolute after:top-0 after:w-full after:h-full after:block after:bg-preto-coverTrailer cursor-pointer`} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${midia?.listaBackgrounds[Math.floor(Math.random() * midia?.listaBackgrounds?.length)].file_path})` }}>
                                    <span className='w-full h-full flex items-center justify-center bg-preto-transparente'>
                                        <BsPlayCircleFill className='text-vermelho-claro bg-white text-4xl rounded-3xl' />
                                    </span>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>

                    <div className="lg:hidden">
                        <Scroll to={'main__init'} smooth={true} duration={500}>
                            <MdKeyboardDoubleArrowDown className='text-white mt-10 text-5xl border-2 border-cinza-transparente rounded-full p-2 cursor-pointer  md:text-4xl ' />
                        </Scroll>
                    </div>


                </div>
            </div>

            <div className="hidden w-full bottom-6 absolute z-50 lg:flex">
                <Scroll to={'main__init'} smooth={true} duration={500}>
                    <MdKeyboardDoubleArrowDown className='text-white mt-10 text-5xl border-2 border-cinza-transparente rounded-full p-2 cursor-pointer md:text-4xl ' />
                </Scroll>
            </div>


            <Modal isOpen={openModal} background={midia.background} closeModal={closeModal} trailer={videoModal} />
        </section>
    )
}

export default Banner;