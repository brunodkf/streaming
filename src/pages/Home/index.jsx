import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Banner from '../../components/Banner';

const apiKey = import.meta.env.VITE_API_KEY;
const chamadaApi = import.meta.env.VITE_API;

const Home = () => {

    const [listPopular, setListPopular] = useState([]);
    const [trendingTv, setTrendingTv] = useState([])
    const [listRecomendados, setListRecomendados] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const getLists = async () => {
            try {
                const [popularResposta, seriesResposta, recomendadoResposta] = await axios.all([
                    axios.get(`${chamadaApi}/movie/popular?${apiKey}&language=pt-BR&page=1`),
                    axios.get(`${chamadaApi}/trending/tv/week?language=pt-BR&${apiKey}`),
                    axios.get(`${chamadaApi}/trending/all/week?language=pt-BR&${apiKey}`)
                ])

                setListPopular(popularResposta.data);
                setTrendingTv(seriesResposta.data);
                setListRecomendados(recomendadoResposta.data)

            } catch (err) {
                setError(err.message); // Salva o erro no estado

            } finally {
                setLoading(false); // Para de carregar
            }
        };

        getLists()
    }, []);


    const listaPopulares = listPopular?.results || [];
    const listaTrendingTv = trendingTv?.results || [];
    const listaRecomendados = listRecomendados?.results || [];

    // Selecionando uma midia para gerar um banner aleatório

    const [randomBanner, setRandomBanner] = useState(null);

    useEffect(() => {
        if (listaRecomendados?.length > 0) {
            const randomIndex = Math.floor(Math.random() * listaRecomendados.length);
            setRandomBanner(listaRecomendados[randomIndex])
        }
    }, [listaRecomendados]);


    // Espaço dedicado para novas requisições

    const [infoMidia, setInfoMidia] = useState(null);
    const [infoTrailers, setInfoTrailers] = useState(null);
    const [infoTrailersBR, setInfoTrailersBR] = useState(null);
    const [infoImagens, setInfoImagens] = useState(null);

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

                    setInfoMidia(midiaResposta.data);
                    setInfoTrailers(trailersResposta.data);
                    setInfoTrailersBR(trailersBrResposta.data);
                    setInfoImagens(imagensResposta.data);

                } catch (error) {
                    console.log(error);
                    { error && <p className="text-red-500">Ocorreu um erro ao carregar os dados: {error}</p> }
                }
            };

            getInfos();
        }
    }, [randomBanner]);

    return (
        <>

            <Banner lista={listaRecomendados}/>

            <section id='carrousel__init' className='w-svw h-svh bg-preto-escuro'>

            </section>
        </>
    )
}

export default Home