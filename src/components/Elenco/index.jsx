import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const urlImagens = import.meta.env.VITE_API_IMAGENS;

export const Elenco = ({ lista }) => {


    const casting = lista?.cast
    console.log(casting)

    return (
        <>
            <Swiper
                className='w-full'
                modules={[Navigation, A11y, Scrollbar, Pagination]}
                spaceBetween={20}
                slidesPerView={2}
                centeredSlides={false}
            >

                {casting.length === 0 && <p>Carregando...</p>}

                {
                    casting?.length > 0 && casting.map((item) =>
                        <SwiperSlide key={item.id} className='max-w-32'>
                            <div className='w-full'>
                                <img className='w-full h-42 object-cover' src={`${urlImagens}${item.profile_path}`} alt="Acting Image" />
                                <p className='text-sm text-white w-fit font-bold'>{item.name}</p>
                                <p className='text-sm text-white w-fit'>{item.character}</p>
                            </div>
                        </SwiperSlide>
                    )
                }

            </Swiper>
        </>
    )
}
