import React, { useEffect, useState } from 'react'
import Iframe from 'react-iframe'

import { FaWindowClose } from "react-icons/fa";

const youtubeEmbed = import.meta.env.VITE_YOU_TUBE;

export default function Modal({ isOpen, trailer, closeModal, what, background }) {

    const [modalBanner,  setModalBanner] = useState('');
    const [modalPlayer, setModalPlayer] = useState('');

    useEffect(()=>{
        if(what === 'banner'){
            setModalBanner('hidden')
        }else if(what === 'player'){
            setModalPlayer('absolute top-0 bg-slate-500 w-svw h-svh')
        }
    }, [what])

    console.log(trailer)

    if (isOpen) {
        return (
            <div className={`modal ${modalBanner}${modalPlayer} absolute top-0 flex flex-col items-center justify-center bg-slate-500 w-svw h-svh z-50 bg-cover bg-no-repeat bg-center`} style={{ backgroundImage: `url(${background})` }}>
                <div className="modal__content bg-vermelho-hover w-full h-1/3 flex flex-col items-center justify-center">
                    <div className="modal__nav w-full flex items-center justify-between px-4">
                        <h2>Assista ao trailer:</h2>
                        <FaWindowClose onClick={closeModal} />
                    </div>

                    <Iframe
                        src={`${youtubeEmbed}${trailer}`}
                        className="modal__video px-4 mt-4"
                        allow="autoplay; encrypted-media"
                        display="block"
                        position="relative"
                        autoplay
                    />
                </div>
            </div>
        )
    }

    return null
}