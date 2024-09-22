import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const apiKey = import.meta.env.VITE_API_KEY;
const chamadaApi = import.meta.env.VITE_API;
const apiVideos = import.meta.env.VITE_API_VIDEOS;

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

    // console.log(infoImagens)


    const isolarMidia = (mid) => {

        const generos = [];
        const logos = [];
        const randomLogo = Math.floor(Math.random() * logos?.length);

        infoMidia ? infoMidia.genres?.map(e => generos.push(e)) : null;

        if (infoImagens) {
            infoImagens.logos.map((e) => {
                e.iso_639_1 == "pt" || e.iso_639_1 == "en" ? logos.push(e.file_path) : null;
            })
        }

        return {
            id: mid.id,
            midia: mid.media_type,
            background: `https://image.tmdb.org/t/p/original${mid.backdrop_path}`,
            poster: `https://image.tmdb.org/t/p/original${mid.poster_path}`,
            logo: `https://image.tmdb.org/t/p/original${logos[randomLogo]}`,
            genero: generos,
            sinopse: mid.overview,
            titulo: mid.title,
            nome: mid.name,
            estreia: mid.release_date
        }
    }

    const banner = randomBanner ? isolarMidia(randomBanner) : {};

    console.log(banner)

    return (
        <>
            <section className="banner w-svw h-svh bg-cover bg-no-repeat bg-center flex items-end before:content-[''] before:absolute before:w-svw before:h-svh before:bg-preto-before lg:items-center lg:justify-center " style={{ backgroundImage: `url(${banner.background})` }}>
                <div className="banner__container lg:container flex flex-col justify-between w-full h-3/4 z-10 relative p-3 mx-auto bg-gradient-to-t from-10% from-preto-claro ">
                    <div className='banner__informacoes container'>
                        <ol className='flex flex-wrap gap-1 pb-2'>
                            {
                                banner ? banner.genero?.map((item, index) => (
                                    <li className='text-white p-2 py-1 rounded-md m-1 bg-cinza-transparente' key={index}>{item.name}</li>
                                )) : null
                            }
                        </ol>
                        {/* <img className='w-1/3' src={banner.poster} alt="" /> */}

                        {/* <p className='text-white'>{banner.sinopse || 'sinopse não disponivel'}</p> */}
                        <img className='max-w-64 aspect-auto pb-2' src={banner.logo} alt="" />
                        <h1 className='font-bold text-white'>{banner.titulo ? banner.titulo : banner.nome}</h1>

                        <div>
                            <button>
                                Assistir mais tarde
                            </button>
                            <button>
                                Detalhes
                            </button>
                        </div>
                    </div>
                    <div className='banner__trailers h-2/4 bg-slate-800'>

                    </div>
                </div>
            </section>


            <section className='w-svw h-svh bg-slate-900'>

            </section>
        </>
    )
}

export default Home