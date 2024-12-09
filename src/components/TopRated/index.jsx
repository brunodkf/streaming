import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const TopRated = () => {
    return (
        <div className='maisVotados container m-auto px-2 pt-10'>  {/*LISTA DOS MAIS VOTADOS*/}
            <h2 className='text-white font-inter text-xl font-semibold tracking-wider'>Os Mais Votados!</h2>
            <Swiper modules={[Navigation, A11y, Scrollbar, Pagination]} spaceBetween={20} slidesPerView={2} loop={true} className='mt-4'
                breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 20, },
                    768: { slidesPerView: 3, spaceBetween: 40, },
                    1024: { slidesPerView: 4, spaceBetween: 30, },
                    1280: { slidesPerView: 5, spaceBetween: 30, },
                }}>
                {
                    listFilmesMaisVotados ? listFilmesMaisVotados.map((item, index) => (
                        <SwiperSlide key={item.id} className='rounded-lg overflow-hidden'>
                            <Card midia={item} ordenado={true} index={index} />
                        </SwiperSlide>
                    )) : null
                }
            </Swiper>
        </div>

    )
}
