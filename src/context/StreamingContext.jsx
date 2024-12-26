import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const StreamingContext = createContext();
StreamingContext.displayName = "Streaming"


export const StreamingProvider = ({ children }) => {

    const apiKey = import.meta.env.VITE_API_KEY;
    const chamadaApi = import.meta.env.VITE_API;

    const [listPopular, setListPopular] = useState([]);
    const [listTrendingTv, setListTrendingTv] = useState([]);
    const [listRecomendados, setListRecomendados] = useState([]);
    const [listFilmesMaisVotados, setListFilmeMaisVotados] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getLists = async () => {

            const cachedPopular = localStorage.getItem("listPopular");
            const cachedTrendingTv = localStorage.getItem("listTrendingTv");
            const cachedRecomendados = localStorage.getItem("listRecomendados");
            const cachedFilmesMaisVotados = localStorage.getItem("listFilmesMaisVotados");
            
            if (cachedPopular && cachedTrendingTv && cachedRecomendados && cachedFilmesMaisVotados) {  //recuperando dados do localStorage
                setListPopular(JSON.parse(cachedPopular));
                setListTrendingTv(JSON.parse(cachedTrendingTv));
                setListRecomendados(JSON.parse(cachedRecomendados));
                setListFilmeMaisVotados(JSON.parse(cachedFilmesMaisVotados));
                setIsLoading(false);
                return;
            }

            setIsLoading(true);

            try {
                const [popularResposta, seriesResposta, recomendadoResposta, filmesMaisVotadosResposta] = await axios.all([
                    axios.get(`${chamadaApi}/trending/movie/week?${apiKey}&language=pt-BR&page=1`),
                    axios.get(`${chamadaApi}/trending/tv/week?language=pt-BR&${apiKey}`),
                    axios.get(`${chamadaApi}/trending/all/week?language=pt-BR&${apiKey}`),
                    axios.get(`${chamadaApi}/movie/top_rated?language=pt-BR&${apiKey}`), 
                ])

                setListPopular(popularResposta.data.results);
                setListTrendingTv(seriesResposta.data.results);
                setListRecomendados(recomendadoResposta.data.results);
                setListFilmeMaisVotados(filmesMaisVotadosResposta.data.results);


                localStorage.setItem("listPopular", JSON.stringify(popularResposta.data.results));  //armazenando dados no LocalStorage
                localStorage.setItem("listTrendingTv", JSON.stringify(seriesResposta.data.results));
                localStorage.setItem("listRecomendados", JSON.stringify(recomendadoResposta.data.results));
                localStorage.setItem("listFilmesMaisVotados", JSON.stringify(filmesMaisVotadosResposta.data.results));
    

            } catch (error) {
                console.error("Erro ao buscar dados:", error); 

            } finally {
              setIsLoading(false); // Para de carregar
            }
        };

        getLists()
        
    }, [apiKey, chamadaApi]);

    return (
        <StreamingContext.Provider value={{listPopular, listRecomendados, listTrendingTv, listFilmesMaisVotados}}>
            {children}
        </StreamingContext.Provider>
    )
}
