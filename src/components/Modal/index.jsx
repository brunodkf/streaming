import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';

import { FaWindowClose } from "react-icons/fa";

const youtubeEmbed = import.meta.env.VITE_YOU_TUBE;

export default function Modal({ isOpen, trailer, closeModal, background }) {

    if (isOpen) {
        return (
            <div className={`modal  w-svw h-svh absolute top-0 flex flex-col items-center justify-center  z-50 bg-cover bg-no-repeat bg-center before:content-[''] before:absolute before:w-svw before:h-svh before:bg-preto-before`} style={{ backgroundImage: `url(${background})` }}>
                <div className="modal__content w-full h-2/3 flex flex-col items-center justify-center z-50">
                    <div className="modal__nav w-full flex items-center justify-between px-4 pb-4  text-white">
                        <h2 className='text-xl'>Assista ao trailer:</h2>
                        <FaWindowClose className='text-3xl' onClick={closeModal} />
                    </div>

                    <ReactPlayer
                        url={`${youtubeEmbed}${trailer}`}
                        className="react-player"
                        playing={false} // define se o vídeo inicia automaticamente
                        controls={true} // exibe os controles do vídeo
                        width="100%"
                        height="100%"
                    />

                </div>
            </div>
        )
    }

    return null
}