import { useEffect, useState } from 'react';
import axios from 'axios';

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

    useEffect(()=>{
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
                }
            };

            getInfos();
        }
    }, [randomBanner]);

    // console.log(infoImagens)


    const isolarMidia = (mid) => {

        const generos = [];
        const logos = [];
        const randomLogo = Math.floor(Math.random() * logos?.length)

        infoMidia ? infoMidia.genres.map(e => generos.push(e)) : null;

        if(infoImagens){
            infoImagens.logos.map((e)=>{
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

    const banner = randomBanner ?  isolarMidia(randomBanner) : {};

    // console.log(banner.logo)

    return (
        <>
            <section className="banner w-screen h-screen bg-cover bg-no-repeat bg-center flex items-center justify-center before:content-[''] before:absolute before:w-screen before:h-screen before:bg-preto-before " style={{ backgroundImage: `url(${banner.background})` }}>
                <div className="banner__container container z-10 relative ">
                    {/* <img className='w-1/3' src={banner.poster} alt="" /> */}
                    {/* <h1 className='font-bold text-white'>{banner.titulo ? banner.titulo : banner.nome}</h1> */}
                    <img src={banner.logo} alt="" />
                    <p className='text-white'>{banner.sinopse}</p>
                </div>
            </section>
        </>
    )
}

export default Home