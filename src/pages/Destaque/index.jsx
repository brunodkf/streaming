import { useLocation } from "react-router-dom";

import { IoMdShare } from "react-icons/io";
import { Elenco } from "../../components/Elenco";

const urlImagens = import.meta.env.VITE_API_IMAGENS;

const Destaque = () => {

    const location = useLocation();
    const { midia } = location.state || {};

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.getFullYear();
    };



    return (
        <>
            <section className='destaque w-full min-h-svh relative bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center 
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

                <div className="w-full relative z-50 flex flex-col items-center  md:flex-row md:items-start md:container">

                    <div className="poster">
                        <img className="max-w-64 rounded-lg shadow-xl m-auto pb-1" src={midia.poster} alt="Poster" />
                        {
                            midia.provedor.BR ? midia.provedor.BR?.flatrate?.filter((item, index) => index === 0).map((item, index) =>
                                <div key={index} className="max-w-64 m-auto rounded-lg p-2 bg-preto-escuro mt-2 flex items-center  gap-2">
                                    <img className="max-w-16 rounded-md" src={`${urlImagens}${item.logo_path}`} alt="" />
                                    <p className="text-white font-gotham">{`Disponivel agora na ${item.provider_name}`}</p>
                                </div>
                            ) : midia.provedor.US?.rest?.filter((item, index) => index === 0).map((item, index) =>
                                <span key={index} className="max-w-64 m-auto rounded-lg p-2 bg-preto-escuro mt-2 flex items-center  gap-2">
                                    <img className="max-w-16 rounded-md" src={`${urlImagens}${item.logo_path}`} alt="" />
                                    <p className="text-white font-gotham">{`Disponivel agora na ${item.provider_name}`}</p>
                                </span>
                            )
                        }
                    </div>

                    <div className="details w-full mt-8 md:mt-0 md:w-3/4">
                        <div className="flex flex-col items-center justify-center md:items-start md:p-4 ">
                            <h1 className="text-white text-2xl text-center tracking-wider">{`${midia.titulo || midia.nome} (${formatDate(midia.estreia)}) `}</h1>
                            <ul className="flex gap-2 flex-wrap items-center justify-center mt-4">
                                {
                                    midia.genero.map((item, index) => (
                                        <li key={index} className="p-1 text-sm rounded-md border opacity-70 md:p-0 md:px-1 text-white">
                                            {item}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className="flex flex-col p-4">
                            <h1 className="text-white text-2xl tracking-wider">Sinopse</h1>
                            <span className="w-full container h-px text-white bg-white mt-2 mb-6 opacity-10"></span>
                            <p className='text-white  pb-3'>
                                {midia.sinopse}
                            </p>
                        </div>

                        <div className="flex flex-col p-4">
                            <h1 className="text-white text-2xl tracking-wider">Elenco Principal</h1>
                            <span className="w-full container h-px text-white bg-white mt-2 mb-6 opacity-10"></span>
                       
                            <Elenco lista={midia.creditos}/>
                        </div>


                    </div>



                </div>

            </section>

            <section id='main__init' className='w-svw h-svh bg-preto-claro md:bg-preto-escuro'>

            </section>
        </>
    )
}

export default Destaque