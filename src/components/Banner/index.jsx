import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

import Modal from '../Modal';
import { Scroll } from '../Scroll';
import { StreamingContext } from '../../context/StreamingContext';
import { useMediaDetails } from '../../hooks/useMediaDetails';


const Banner = () => {

    const { listRecomendados } = useContext(StreamingContext)

    // Selecionando uma midia para gerar um banner aleatório
    const [randomBanner, setRandomBanner] = useState(null);

    useEffect(() => {
        if (listRecomendados?.length > 0) {
            const randomIndex = Math.floor(Math.random() * listRecomendados.length);
            setRandomBanner(listRecomendados[randomIndex])
        }
    }, [listRecomendados]);


    const { media } = useMediaDetails(randomBanner);


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
        <section id='banner' className="banner w-full h-svh relative bg-cover bg-no-repeat bg-center flex items-end overflow-clip" style={{ backgroundImage: `url(${media.background})` }}>

            <div className="banner__container lg:container w-full h-3/4 flex flex-col justify-end
             lg:h-full lg:flex-row lg:justify-between lg:items-center lg:px-8 md:justify-center relative mx-auto z-10 
             bg-gradient-to-t from-10% from-preto-claro md:from-preto-escuro lg:bg-none">

                <div className='banner__informacoes lg:w-2/4 lg:m-0 p-3 pb-0 sm:p-8   md:container md:m-auto md:p-0 md:px-4'>
                    <ol className='flex flex-wrap gap-1 pb-2'>
                        {
                            media ? media.genero?.map((item, index) => (
                                <li className='text-white p-2 py-1 rounded-md m-1 text-xs border-solid border-2 border-cinza-transparente' key={index}>{item}</li>
                            )) : null
                        }
                    </ol>

                    <img className='max-w-48 aspect-auto object-cover pb-2 custom-tab:max-w-48 sm:max-w-42 lg:max-w-48 xl:max-w-64' src={media.logo} alt="Logo" />

                    <div className="banner__sinopse lg:container ">
                        {/* <p className='hidden lg:flex text-white pt-3 pb-3'>{midia.sinopse || 'sinopse não disponivel'}</p> */}
                        <p className='hidden lg:flex text-white pt-3 pb-3'>
                            {
                                media?.sinopse?.length >= 240 ? `${media.sinopse.slice(0, 220)} {...}` : `${media.sinopse}`
                            }
                        </p>

                    </div>

                    <span>
                        <p className='text-white mb-1'> ⭐ {media.nota}</p>
                    </span>

                    <h1 className='font-bold text-white'>{media.titulo ? media.titulo : media.nome}</h1>

                    <div className='flex gap-4 text-white pt-3'>

                        <button className='bg-cinza-transparente p-1 px-3 text-lg rounded-md md:text-base md:px-2' >
                            <Link to={'/destaque'} state={{ midia: media }}>
                                Sinopse
                            </Link>
                        </button>

                        <button className='bg-vermelho-escuro p-1 px-3 text-lg rounded-md md:text-base md:px-2'>
                            <FaPlus />
                        </button>

                        <button className='bg-vermelho-escuro p-1 px-3 text-lg rounded-md md:text-base md:px-2'>
                            <Link to={'/destaque'} state={{ midia: media }}>
                                <BiInfoCircle />
                            </Link>
                        </button>
                    </div>
                </div>

                <div className='banner__trailers lg:w-1/4 h-2/4 lg:h-3/4 xl:h-1/2 flex flex-col items-center bg-gradient-to-t from-preto-claro md:bg-none'>
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
                            (media.trailersBR.length > 0 ? media.trailersBR : media.trailers)?.map((item, index) => (
                                <SwiperSlide key={index} onClick={() => abreModal(item.key)} className={`swiper_item w-full h-full lg:max-w-52 lg:max-h-32 lg:m-auto lg:mr-10 xl:max-h-32 aspect-video bg-cover bg-no-repeat bg-center relative rounded-lg overflow-clip after:content-[""] after:absolute after:top-0 after:w-full after:h-full after:block after:bg-preto-coverTrailer cursor-pointer`}
                                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${media?.listaBackgrounds[Math.floor(Math.random() * media?.listaBackgrounds?.length)].file_path})` }}>
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

            <div className="hidden w-full bottom-7 absolute z-50 lg:flex">
                <Scroll to={'main__init'} smooth={true} duration={500}>
                    <MdKeyboardDoubleArrowDown className='text-white mt-10 text-5xl border-2 border-cinza-transparente rounded-full p-2 cursor-pointer md:text-4xl ' />
                </Scroll>
            </div>


            <Modal isOpen={openModal} background={media.background} closeModal={closeModal} trailer={videoModal} />
        </section>
    )
}

export default Banner;