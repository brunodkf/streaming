import { useContext } from 'react';

import Banner from '../../components/Banner';
import ListaDeMidias from '../../components/ListaDeMidias';
import Footer from '../../components/Footer';
import { StreamingContext } from '../../context/StreamingContext';
import { Patrocinadores } from '../../components/Patrocinadores';
import { MidBanner } from '../../components/MidBanner';

const Home = () => {

    const { listPopular, listRecomendados, listTrendingTv, listFilmesMaisVotados } = useContext(StreamingContext);

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

            <Banner />

            <section id='main__init' className='w-full bg-preto-claro md:bg-preto-escuro pb-8'>

                <Patrocinadores />

                <ListaDeMidias title={"Os Mais Populares!"} lista={listRecomendados} />  {/*EM ALTA*/}

                <MidBanner/>

                <ListaDeMidias id={'filme'} title={"Filmes"} lista={listPopular} />  {/*FILMES EM ALTA*/}

                <ListaDeMidias id={'serie'} title={"Séries"} lista={listTrendingTv} />  {/*SERIES EM ALTA*/}

            </section>


            <Footer />

        </>
    )
}

export default Home