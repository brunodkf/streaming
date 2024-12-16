import { useLocation } from "react-router-dom";

import { IoMdShare } from "react-icons/io";
import { Elenco } from "../../components/Elenco";

import { BsPlayCircleFill } from "react-icons/bs";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Modal from "../../components/Modal";
import { useState } from "react";
import Footer from "../../components/Footer";
import ListaDeMidias from "../../components/ListaDeMidias";

const urlImagens = import.meta.env.VITE_API_IMAGENS;

const Destaque = () => {

    const location = useLocation();
    const { midia } = location.state || {};

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.getFullYear();
    };


    console.log(midia)

    const [openModal, setOpenModal] = useState(false);  //controla o estado do modal
    const [videoModal, setVideoModal] = useState(null);

    function abreModal(e) {
        setOpenModal(true)
        setVideoModal(e);
    }
    function closeModal() {
        setOpenModal(false);
    }

    return (
        <>
            <section className='destaque w-full min-h-svh relative overflow-clip bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center 
            ' style={{ backgroundImage: `url(${midia.background})` }}>

                <div className="absolute w-full h-80 bg-gradient-to-t from-10% from-preto-claro md:from-preto-escuro bottom-0 z-20 "></div>

                <div className="w-full container z-50 flex flex-col items-center justify-between gap-2 font-inter px-2 mt-32 md:flex-row ">
                    <h1 className="text-white text-2xl text-center tracking-wider">{`${midia.titulo || midia.nome} (${formatDate(midia.estreia)}) `}</h1>
                    <span className="flex gap-4">
                        <p className="bg-cinza-transparente p-1  text-base font-bold rounded-md md:text-base md:px-2 text-white">{`IMDB ${midia.nota}`}</p>

                        <p className="border border-solid border-cinza-claro p-1 px-2 text-base font-bold  rounded-md md:text-base md:px-2 text-white flex items-center gap-1">
                            <IoMdShare />
                            SHARE
                        </p>

                    </span>
                </div>

                <span className="w-full container h-px text-white bg-white mt-2 mb-6"></span>

                <div className="w-full relative z-50 flex flex-col items-center  md:flex-row md:items-start md:container">

                    <div className="poster">
                        <img className="max-w-64 rounded-lg shadow-xl m-auto pb-1" src={midia.poster} alt="Poster" />
                        {
                            midia.provedor.BR ? midia.provedor.BR?.flatrate?.filter((item, index) => index === 0).map((item, index) =>
                                <div key={index} className="max-w-64 m-auto rounded-lg p-2 bg-preto-escuro mt-2 flex items-center  gap-2">
                                    <img className="max-w-16 rounded-md" src={`${urlImagens}${item.logo_path}`} alt="" />
                                    <p className="text-white font-gotham">{`Disponivel agora na ${item.provider_name}`}</p>
                                </div>
                            ) : midia.provedor.US?.rest?.filter((item, index) => index === 0).map((item, index) =>
                                <span key={index} className="max-w-64 m-auto rounded-lg p-2 bg-preto-escuro mt-2 flex items-center  gap-2">
                                    <img className="max-w-16 rounded-md" src={`${urlImagens}${item.logo_path}`} alt="" />
                                    <p className="text-white font-gotham">{`Disponivel agora na ${item.provider_name}`}</p>
                                </span>
                            )
                        }
                    </div>

                    <div className="details w-full mt-8 md:mt-0 md:w-3/4">
                        <div className="flex flex-col items-center justify-center md:items-start md:p-4 ">
                            <h1 className="text-white text-2xl text-center tracking-wider">{`${midia.titulo || midia.nome} (${formatDate(midia.estreia)}) `}</h1>
                            <ul className="flex gap-2 flex-wrap items-center justify-center mt-4">
                                {
                                    midia.genero.map((item, index) => (
                                        <li key={index} className="p-1 text-sm rounded-md border opacity-70 md:p-0 md:px-1 text-white">
                                            {item}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className="flex flex-col p-4">
                            <h1 className="text-white text-2xl tracking-wider">Sinopse</h1>
                            <span className="w-full container h-px text-white bg-white mt-2 mb-6 opacity-10"></span>
                            <p className='text-white  pb-3'>
                                {midia.sinopse}
                            </p>
                        </div>

                        <div className="flex flex-col p-4">
                            <h1 className="text-white text-2xl tracking-wider">Elenco Principal</h1>
                            <span className="w-full container h-px text-white bg-white mt-2 mb-6 opacity-10"></span>

                            <Elenco lista={midia.creditos} />
                        </div>


                    </div>



                </div>

            </section>

            <section id='main__init' className='w-full h-auto relative bg-preto-claro md:bg-preto-escuro'>

                <div className="container m-auto flex flex-col p-4">
                    <h1 className="text-white text-2xl tracking-wider">Confira os trailers</h1>
                    <span className="w-full container h-px text-white bg-white mt-2 mb-6 opacity-10"></span>

                    <Swiper
                        className='swiperDestaque w-full'
                        modules={[Navigation, A11y, Scrollbar, Pagination]}
                        pagination={{ clickable: true }}
                        // spaceBetween={20}
                        // slidesPerView={1}
                        centeredSlides={false}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 30,
                            },
                        }}
                    >

                        {
                            (midia.trailersBR.length > 0 ? midia.trailersBR : midia.trailers)?.map((item, index) => (
                                <SwiperSlide key={index} onClick={() => abreModal(item.key)} className={`swiper_item w-full h-full lg:max-w-52 lg:max-h-32 lg:m-auto lg:mr-10 
                                    xl:max-h-32 aspect-video bg-cover bg-no-repeat bg-center relative rounded-lg overflow-clip
                                     after:content-[""] after:absolute after:top-0 after:w-full after:h-full after:block after:bg-preto-coverTrailer cursor-pointer`}

                                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${midia?.listaBackgrounds[Math.floor(Math.random() * midia?.listaBackgrounds?.length)].file_path})` }}>

                                    <span className='w-full h-full flex items-center justify-center bg-preto-transparente'>
                                        <BsPlayCircleFill className='text-vermelho-claro bg-white text-4xl rounded-3xl' />
                                    </span>

                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>

                <div className="container m-auto flex flex-col p-4">
                    <ListaDeMidias title={"Você também pode gostar!"} lista={midia.similares} />
                </div>



                <Modal isOpen={openModal} background={midia.background} closeModal={closeModal} trailer={videoModal} />
            </section>

            <Footer/>
        </>
    )
}

export default Destaque