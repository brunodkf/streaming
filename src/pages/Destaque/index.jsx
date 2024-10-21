import { useLocation } from "react-router-dom";
import { BsPlayCircleFill } from "react-icons/bs";

const Destaque = () => {

    const location = useLocation();
    const { midia } = location.state || {};

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.getFullYear();
    };

    // console.log(midia)

    return (
        <>
            <section className='destaque w-svw h-svh bg-center bg-cover bg-no-repeat flex flex-col items-center justify-end' style={{ backgroundImage: `url(${midia.background})` }}>


                <div className="w-full container z-50 flex items-center justify-between font-inter">
                    <h1 className="text-white text-2xl tracking-wider">{midia.titulo || midia.nome}</h1>
                    <span className="flex gap-4">
                        <p className="bg-cinza-transparente p-1 px-3 text-lg rounded-md md:text-base md:px-2 text-white">{`IMDB ${midia.nota}`}</p>
                        <p className="bg-cinza-transparente p-1 px-3 text-lg rounded-md md:text-base md:px-2 text-white">{`IMDB ${midia.nota}`}</p>
                    </span>
                </div>

                <span className="w-full container h-px text-white bg-white mt-2 mb-6"></span>

                <div className="w-full container relative z-50 flex bg-slate-950">
                    <div className="">
                        <img className="max-w-64 rounded-lg" src={midia.poster} alt="Poster" />
                        <button className="text-white">salvar</button>
                    </div>


                    <div className="">
                        {formatDate(midia.estreia) ?
                            <h2 className="text-white text-xl font-gotham tracking-wider">{`${midia.titulo || midia.nome} (${formatDate(midia.estreia)}) `}</h2> :
                            <h2 className="text-white text-xl font-gotham tracking-wider">{`${midia.titulo || midia.nome}  `}</h2>
                        }
                    </div>
                </div>
            </section>
            <section id='main__init' className='w-svw h-svh bg-preto-claro md:bg-preto-escuro'></section>
        </>
    )
}

export default Destaque