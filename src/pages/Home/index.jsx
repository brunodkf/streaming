import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Banner from '../../components/Banner';
import ListaDeMidias from '../../components/ListaDeMidias';
import { Card } from '../../components/Card';

const apiKey = import.meta.env.VITE_API_KEY;
const chamadaApi = import.meta.env.VITE_API;

const Home = () => {

    const [listPopular, setListPopular] = useState([]); //FILMES EM ALTA
    const [trendingTv, setTrendingTv] = useState([]) // SERIES EM ALTA
    const [listRecomendados, setListRecomendados] = useState([]); //EM ALTA

    const [listFilmesMaisVotados, setListFilmesMaisVotados] = useState([]); //EM ALTA


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const getLists = async () => {
            try {
                const [popularResposta, seriesResposta, recomendadoResposta, filmesMaisVotadosResposta] = await axios.all([
                    axios.get(`${chamadaApi}/trending/movie/week?${apiKey}&language=pt-BR&page=1`),
                    axios.get(`${chamadaApi}/trending/tv/week?language=pt-BR&${apiKey}`),
                    axios.get(`${chamadaApi}/trending/all/week?language=pt-BR&${apiKey}`),


                    axios.get(`${chamadaApi}/movie/top_rated?language=pt-BR&${apiKey}`), //Filmes mais votados

                ])

                setListPopular(popularResposta.data);
                setTrendingTv(seriesResposta.data);
                setListRecomendados(recomendadoResposta.data);

                setListFilmesMaisVotados(filmesMaisVotadosResposta.data);

            } catch (err) {
                setError(err.message); // Salva o erro no estado

            } finally {
                setLoading(false); // Para de carregar
            }
        };

        getLists()
    }, []);


    const listaPopulares = listPopular?.results || [];  //Filmes em Alta
    const listaTrendingTv = trendingTv?.results || []; // Séries em Alta
    const listaRecomendados = listRecomendados?.results || []; //Em alta no geral

    const listaFilmesMaisVotados = listFilmesMaisVotados?.results || []; //Filmes mais votados


    // Selecionando uma midia para gerar um banner aleatório

    const [randomBanner, setRandomBanner] = useState(null);

    useEffect(() => {
        if (listaRecomendados?.length > 0) {
            const randomIndex = Math.floor(Math.random() * listaRecomendados.length);
            setRandomBanner(listaRecomendados[randomIndex])
        }
    }, [listaRecomendados]);

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
        <>

            <Banner lista={listaRecomendados} />

            <section id='main__init' className='w-svw  bg-preto-claro md:bg-preto-escuro'>

                <div className="container m-auto py-8">
                    <Swiper modules={[Autoplay]} spaceBetween={30} slidesPerView={7} loop={true} autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true, }} speed={3000} freeMode={true}>
                        {
                            patrocinadores ? patrocinadores.map((logo, index) => (
                                <SwiperSlide key={index} className='bg-preto-transparente px-4 rounded-lg overflow-hidden '>
                                    <img src={logo} alt={`Logo ${index}`} className="logo" />
                                </SwiperSlide>
                            )) : null
                        }
                    </Swiper>
                </div>

                <ListaDeMidias title={"Os Mais Populares!"} lista={listaRecomendados} />  {/*EM ALTA*/}


                <div className='container m-auto px-2 py-10'>
                    <h2 className='text-white font-inter text-xl font-semibold tracking-wider'>Os Mais Votados!</h2>
                    <Swiper modules={[Navigation, A11y, Scrollbar, Pagination]} spaceBetween={30} slidesPerView={4} loop={true} className='mt-4' >
                        {
                            listaFilmesMaisVotados ? listaFilmesMaisVotados.map((item, index) => (
                                <SwiperSlide key={item.id} className='rounded-lg overflow-hidden'>
                                    <Card midia={item} ordenado={true} index={index}/>
                                </SwiperSlide>
                            )) : null
                        }
                    </Swiper>
                </div>

                <ListaDeMidias title={"Séries"} lista={listaTrendingTv} />

                <ListaDeMidias title={"Filmes"} lista={listaPopulares} />




            </section>

        </>
    )
}

export default Home