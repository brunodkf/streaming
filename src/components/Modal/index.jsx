import React, { useEffect, useState } from 'react'
import Iframe from 'react-iframe'

import { FaWindowClose } from "react-icons/fa";

const youtubeEmbed = import.meta.env.VITE_YOU_TUBE;

export default function Modal({ isOpen, trailer, closeModal, what }) {

    const [modalBanner,  setModalBanner] = useState('');
    const [modalPlayer, setModalPlayer] = useState('');

    useEffect(()=>{
        if(what === 'banner'){
            setModalBanner('hidden')
        }else if(what === 'player'){
            setModalPlayer('absolute top-0 bg-slate-500 w-svw h-svh')
        }
    }, [what])



    if (isOpen) {
        return (
            <div className={`modal ${modalBanner}${modalPlayer} absolute top-0 bg-slate-500 w-svw h-svh z-50`}>
                <div className="modal__content">
                    <div className="modal__nav">
                        <h2>Assista ao trailer:</h2>
                        <FaWindowClose onClick={closeModal} />
                    </div>

                    <Iframe
                        src={`${youtubeEmbed}${trailer}?autoplay=1`}
                        className="modal__video"
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