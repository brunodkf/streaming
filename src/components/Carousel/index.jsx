import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Card } from '../Card';

const Carousel = ({ lista, ordenado }) => {

    return (
        <>
            <Swiper
                className='lg:py-5'
                modules={[Navigation, A11y, Scrollbar, Pagination]}
                spaceBetween={20}
                slidesPerView={2}
                centeredSlides={false}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 7,
                        spaceBetween: 30,
                    },
                }}
            >

                {lista.length === 0 && <p>Carregando...</p>}

                {
                    lista?.length > 0 && lista.map((item) =>
                        <SwiperSlide key={item.id}>
                            <Card midia={item} ordenado={ordenado}/>
                        </SwiperSlide>
                    )
                }

            </Swiper>
        </>
    )
}

export default Carousel