import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";

import { BsPlayCircleFill } from "react-icons/bs";
import { IoMdShare } from "react-icons/io";
import { FaSpaceShuttle } from "react-icons/fa";

const apiKey = import.meta.env.VITE_API_KEY;
const chamadaApi = import.meta.env.VITE_API;

const Destaque = () => {

    const location = useLocation();
    const { midia } = location.state || {};

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.getFullYear();
    };

    console.log(midia)

    const [listProvider, setListProvider] = useState([]); //Objeto de Streaming

    useEffect(() => {
        const getLists = async () => {
            try {
                const providerResposta = await axios.get(`${chamadaApi}/${midia?.midia}/${midia?.id}/watch/providers?${apiKey}`);

                setListProvider(providerResposta.data);

            } catch (err) {
                console.log('ERRRRROU')
            }
        };

        getLists()
    }, [midia]);

    const listaStreaming = listProvider?.results || [];
    const listaBR = listaStreaming?.BR;
    // https://image.tmdb.org/t/p/original/${listaStreaming?.flatrate[0]?.logo_path}

    return (
        <>
            <section className='destaque w-svw min-h-svh relative bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center 
            ' style={{ backgroundImage: `url(${midia.background})` }}>

                <div className="absolute w-full h-80 bg-gradient-to-t from-10% from-preto-claro md:from-preto-escuro bottom-0 z-20 "></div>

                <div className="w-full container z-50 flex flex-col items-center justify-between gap-2 font-inter px-2 mt-32 md:flex-row ">
                    <h1 className="text-white text-2xl text-center tracking-wider">{`${midia.titulo || midia.nome} (${formatDate(midia.estreia)}) `}</h1>
                    <span className="flex gap-4">
                        <p className="bg-cinza-transparente p-1  text-base font-bold rounded-md md:text-base md:px-2 text-white">{`IMDB ${midia.nota}`}</p>

                        <p className="border border-solid border-cinza-claro p-1 px-2 text-base font-bold  rounded-md md:text-base md:px-2 text-white flex items-center gap-1">
                            <IoMdShare />
                            SHARE
                        </p>

                    </span>
                </div>

                <span className="w-full container h-px text-white bg-white mt-2 mb-6"></span>

                <div className="w-full relative z-50 flex flex-col items-center  md:flex-row md:container ">
                    <div className="poster">
                        <img className="max-w-64 rounded-lg shadow-xl m-auto" src={midia.poster} alt="Poster" />

                        {
                            listaBR ? listaBR?.flatrate?.filter((item, index) => index === 0).map((item, index) =>
                                <div key={index} className="w-3/4 m-auto rounded-lg p-2 bg-preto-escuro mt-2 flex items-center  gap-2">
                                    <img className="max-w-16 rounded-md" src={`https://image.tmdb.org/t/p/original/${item.logo_path}`} alt="" />
                                    <p className="text-white font-gotham">{`Disponivel agora na ${item.provider_name}`}</p>
                                </div>
                            ) : listaBR?.rest?.filter((item, index) => index === 0).map((item, index) =>
                                <span key={index} className="w-3/4 m-auto rounded-lg p-2 bg-preto-escuro mt-2 flex items-center  gap-2">
                                    <img className="max-w-16 rounded-md" src={`https://image.tmdb.org/t/p/original/${item.logo_path}`} alt="" />
                                    <p className="text-white font-gotham">{`Disponivel agora na ${item.provider_name}`}</p>
                                </span>
                            )
                        }
                    </div>

                    <div className="details w-full mt-8">
                        <div className="flex items-center justify-center gap-6">
                            <h1 className="text-white text-2xl text-center tracking-wider">{`${midia.titulo || midia.nome} (${formatDate(midia.estreia)}) `}</h1>
                            <p className="p-1 text-base rounded-md border md:text-base md:px-2 text-white">{`IMDB ${midia.nota}`}</p>
                        </div>

                        <ul className="flex gap-2 flex-wrap items-center justify-center mt-4">
                            {
                                midia.genero.map((item, index) =>(
                                    <li key={index} className="p-1 text-sm rounded-md border opacity-70 md:text-base md:px-2 text-white">
                                        {item.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>


                    <div className="poster">
                        <img className="max-w-64 rounded-lg shadow-xl m-auto" src={midia.poster} alt="Poster" />

                        {
                            listaBR ? listaBR?.flatrate?.filter((item, index) => index === 0).map((item, index) =>
                                <div key={index} className="w-3/4 m-auto rounded-lg p-2 bg-preto-escuro mt-2 flex items-center  gap-2">
                                    <img className="max-w-16 rounded-md" src={`https://image.tmdb.org/t/p/original/${item.logo_path}`} alt="" />
                                    <p className="text-white font-gotham">{`Disponivel agora na ${item.provider_name}`}</p>
                                </div>
                            ) : listaBR?.rest?.filter((item, index) => index === 0).map((item, index) =>
                                <span key={index} className="w-3/4 m-auto rounded-lg p-2 bg-preto-escuro mt-2 flex items-center  gap-2">
                                    <img className="max-w-16 rounded-md" src={`https://image.tmdb.org/t/p/original/${item.logo_path}`} alt="" />
                                    <p className="text-white font-gotham">{`Disponivel agora na ${item.provider_name}`}</p>
                                </span>
                            )
                        }
                    </div>
                </div>

            </section>

            <section id='main__init' className='w-svw h-svh bg-preto-claro md:bg-preto-escuro'>

            </section>
        </>
    )
}

export default Destaque