import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMediaDetails } from '../../hooks/useMediaDetails';
import { StreamingContext } from '../../context/StreamingContext';

export const MidBanner = () => {

    const { listTrendingTv } = useContext(StreamingContext)

    const [midiaSelecionada, setMidiaSelecionada] = useState(null)

    useEffect(() => {
        const midiaSeparada = Math.floor(Math.random() * listTrendingTv?.length);
        setMidiaSelecionada(listTrendingTv[midiaSeparada])
    }, [listTrendingTv])


    const { media } = useMediaDetails(midiaSelecionada);

    return (
        <div className='midBanner w-full min-h-60 relative flex items-center justify-center  my-10 
    bg-center bg-no-repeat bg-cover before:content-[""] before:absolute before:block before:w-full before:h-full
    before:bg-gradient-to-b before:from-preto-claro md:before:from-preto-escuro after:content-[""] after:absolute after:block after:w-full after:h-full
    after:bg-gradient-to-t after:from-preto-claro md:after:from-preto-escuro
    ' style={{ backgroundImage: `url(${media?.background})` }}>  {/*CHAMADA*/}

            <div className="container text-white m-auto py-10 z-10 flex flex-col items-center justify-evenly md:flex-row gap-10  ">
                <div className="font-inter text-center md:w-1/2">
                    <p className='mb-2 uppercase text-sm tracking-widest'>Separamos algo pra você</p>
                    <h2 className="font-bold text-2xl  uppercase">Sua próxima série, você encontra aqui !</h2>
                </div>

                <div className="flex flex-col items-center justify-center md:w-1/2  md:flex-row-reverse md:justify-end">
                    <div className="block md:hidden lg:block lg:px-4">
                        <p className='text-xl pb-2 uppercase tracking-wide text-center font-bold'> {media?.nome}</p>

                        <span className='hidden lg:block w-full h-px bg-blue-50'></span>

                        <p className='mt-4 px-3 hidden lg:block'>
                            {
                                media?.sinopse?.length >= 240 ? `${media?.sinopse.slice(0, 180)} {...}` : `${media?.sinopse}`
                            }
                        </p>
                    </div>

                    <figure>
                        <img className='max-w-60 rounded-xl' src={media?.poster} alt="Poster Série do Banner Central do Site" />

                        <figcaption className='flex justify-between gap-4 mt-3'>
                            <button className='bg-cinza-transparente p-2 rounded-lg w-1/2'>
                                <Link to={'/destaque'} state={{ midia: media }}>
                                    Detalhes
                                </Link>
                            </button>
                            <button className='bg-vermelho-escuro p-2 rounded-lg w-1/2'>
                                Trailer
                            </button>
                        </figcaption>
                    </figure>

                    <p className='mt-4 text-center px-3 md:hidden'>
                        {
                            media?.sinopse?.length >= 240 ? `${media?.sinopse.slice(0, 180)} {...}` : `${media?.sinopse}`
                        }
                    </p>
                </div>
            </div>
        </div>

    )
}
