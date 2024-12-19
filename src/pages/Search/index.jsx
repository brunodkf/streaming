import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ListaDeBusca from "../../components/ListaDeBusca";

import { IoSearch } from "react-icons/io5";
import bgSearch from '/teatro.jpg'

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {

    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";

    const [resultados, setResultados] = useState([]);


    const getSearchResultados = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();

            setResultados(data.results || []);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };
    useEffect(() => {
        if (query) { // Evita busca com query vazia
            console.log("Query:", query);
            const searchWithQueryURL = `${searchUrl}?${apiKey}&query=${query}`;
            getSearchResultados(searchWithQueryURL);
        }
    }, [query]);

    const encontrados = resultados.filter((e) => (e.media_type === "tv" || e.media_type === "movie") && e.poster_path != null )
    console.log(encontrados)

    return (
        <section className='search w-full min-h-svh flex flex-col items-center justify-center 
        bg-cover bg-center bg-no-repeat mod-overlay'
            style={{ backgroundImage: `url(${bgSearch})` }}>

            <div className="w-full min-h-screen container">
                <form className="relative w-4/5 max-w-4xl h-10 m-auto mt-40 z-50 flex rounded-lg overflow-hidden" method="get">
                    <input className="w-4/5 pl-4" type="text" placeholder="Será que eu posso ajudar?" name="query" defaultValue={query || ""} />
                    <button className="w-1/5 flex items-center justify-center bg-cinza-escuro" type="submit">
                        <IoSearch className="text-2xl text-white" />
                    </button>
                </form>


                <div className="relative z-50">
                    
                    <ListaDeBusca lista={encontrados} query={query}/>

                </div>
            </div>

        </section>
    )
}

export default Search