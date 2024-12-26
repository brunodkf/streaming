import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const Patrocinadores = () => {

    const patrocinadores = [
        '/netflix.webp',
        '/max.webp',
        '/disney.webp',
        '/crunchyroll.webp',
        '/apple.webp',
        '/globo.webp',
        '/paramount.webp',
        '/prime.webp',
        '/telecine.webp'
    ];

    return (
        <div className="plataformas container m-auto py-8 mb-8">  {/*LISTA DAS PLATAFORMAS DE STREAMING*/}
            <Swiper modules={[Autoplay]} spaceBetween={30} slidesPerView={3} loop={true} autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true, }} speed={3000} freeMode={true}
                breakpoints={{
                    640: { slidesPerView: 4, spaceBetween: 30, },
                    768: { slidesPerView: 4, spaceBetween: 40, },
                    1024: { slidesPerView: 7, spaceBetween: 30, },
                    1280: { slidesPerView: 8, spaceBetween: 20, },
                }}>
                {
                    patrocinadores ? patrocinadores.map((logo, index) => (
                        <SwiperSlide key={index} className='bg-preto-transparente px-4 rounded-lg overflow-hidden '>
                            <img src={logo} alt={`Logo ${index}`} className="logo" />
                        </SwiperSlide>
                    )) : null
                }
            </Swiper>
        </div>
    )
}
