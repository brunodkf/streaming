import axios from 'axios';
import React, { useEffect, useState } from 'react'

const apiKey = import.meta.env.VITE_API_KEY;
const chamadaApi = import.meta.env.VITE_API;
const urlImagens = import.meta.env.VITE_API_IMAGENS;

export const useMediaDetails = (midia) => {

    const [midiaDetalhes, setMediaDetalhes] = useState(null);
    const [midiaTrailers, setMediaTrailers] = useState(null);
    const [midiaTrailersBR, setMediaTrailersBR] = useState(null);
    const [midiaImagens, setMediaImagens] = useState(null);
    const [midiaProvedor, setMediaProvedor] = useState([]); // Objeto de Streaming
    const [midiaSimilares, setMediaSimilares] = useState([])
    const [midiaCreditos, setMediaCreditos] = useState([])

    const [loading, setLoading] = useState(true); // Estado para o carregamento
    const [error, setError] = useState(null); // Para tratar erros, se necessário


    useEffect(() => {
        if (midia) {
            const getInfos = async () => {
                setLoading(true);
                try {
                    const [midiaResposta, trailersResposta, trailersBrResposta, imagensResposta, provedorResposta, similaresResposta, creditosResposta] = await axios.all([
                        axios.get(`${chamadaApi}/${midia.media_type}/${midia.id}?${apiKey}&language=pt-BR`),
                        axios.get(`${chamadaApi}/${midia.media_type}/${midia.id}/videos?${apiKey}`),
                        axios.get(`${chamadaApi}/${midia.media_type}/${midia.id}/videos?language=pt-BR&${apiKey}`),
                        axios.get(`${chamadaApi}/${midia.media_type}/${midia.id}/images?${apiKey}`),
                        axios.get(`${chamadaApi}/${midia.media_type}/${midia?.id}/watch/providers?${apiKey}`),
                        axios.get(`${chamadaApi}/${midia.media_type}/${midia?.id}/recommendations?${apiKey}&language=pt-BR&page=1`),
                        axios.get(`${chamadaApi}/${midia.media_type}/${midia?.id}/credits?${apiKey}&language=pt-BR&page=1`),                    
                    ]);

                    setMediaDetalhes(midiaResposta.data);
                    setMediaTrailers(trailersResposta.data);
                    setMediaTrailersBR(trailersBrResposta.data);
                    setMediaImagens(imagensResposta.data);
                    setMediaProvedor(provedorResposta.data.results);
                    setMediaSimilares(similaresResposta.data.results);
                    setMediaCreditos(creditosResposta.data)

                } catch (error) {
                    console.log('ERRO DE REQUISICAO', error)

                } finally {
                    setLoading(false); // Fim do carregamento
                }
            }

            getInfos();
        }

    }, [midia]);

    const listaLogos = midiaImagens?.logos.filter(item => item.iso_639_1 === 'pt' || item.iso_639_1 === 'en');
    
    const logos = [];
    const randomLogo = Math.floor(Math.random() * logos?.length);
    listaLogos ? listaLogos.map(e => logos.push(e.file_path)) : null;

    // Criando o objeto com todos os dados combinados
    const media = {
        id: midiaDetalhes?.id,
        midia: midia?.media_type,
        background: midia ? `${urlImagens}${midia.backdrop_path}` : null,
        listaBackgrounds: midiaImagens?.backdrops.filter(e => e.iso_639_1 == null) || [],
        poster: midia ? `${urlImagens}${midia.poster_path}` : null,
        logo: listaLogos ? `${urlImagens}${logos[randomLogo]}` : null,
        listaLogos: listaLogos || [],
        genero: midiaDetalhes?.genres?.map((genre) => genre.name) || [],
        nota: midiaDetalhes?.vote_average?.toFixed(1) || 0,
        sinopse: midiaDetalhes?.overview || "Sem sinopse disponível",
        titulo: midia?.title || midia?.name,
        nome: midia?.name,
        estreia: midia?.release_date || midia?.first_air_date,
        trailers: midiaTrailers?.results || [],
        trailersBR: midiaTrailersBR?.results || [],
        provedor: midiaProvedor,
        similares: midiaSimilares,
        creditos: midiaCreditos,
    };

    return {
        media
    }
}
