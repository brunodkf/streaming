import React from 'react'
import LogoBranco from '/logo_white.webp';
import { Link } from 'react-router-dom';
import { Scroll } from '../Scroll';

import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
    return (
        <section id='footer' className='footer w-screen h-screen md:h-auto bg-preto-claro md:bg-preto-escuro border-t-2 border-t-cinza-escuro'>
            <div className="container h-4/5 md:h-auto m-auto">
                <img className='w-20 m-auto mt-12' src={LogoBranco} alt="Logo Movie" />

                <ul className=' w-full h-2/4 md:max-w-96 md:h-auto flex flex-col md:flex-row justify-between mt-10 md:m-auto md:mt-10 py-4 text-center uppercase text-white tracking-wider mr-10 '>
                    <li>
                        <Scroll to='/'>
                            Início
                        </Scroll>
                    </li>
                    <li>
                        <Scroll to='/'>
                            Filmes
                        </Scroll>
                    </li>
                    <li>
                        <Scroll to='/'>
                            Séries
                        </Scroll>
                    </li>
                    <li>
                        Animes
                    </li>
                    <li className='' >
                        Contato
                    </li>
                </ul>

                <ul className='socials w-2/3 md:max-w-48 m-auto flex items-center justify-between text-white text-3xl mt-14'>
                    <li>
                        <Link to='/'>
                            <FaInstagram />
                        </Link>
                    </li>
                    <li>
                        <Link to='/'>
                            <FaLinkedin />
                        </Link>
                    </li>
                    <li>
                        <Link to='/'>
                            <FaGithub />
                        </Link>
                    </li>
                    <li>
                        <Link to='/'>
                            <FaWhatsapp />
                        </Link>
                    </li>
                </ul>


                <p className='mt-20 text-center text-white md:pb-20'>© Copyright 2024 Todos os direitos reservados | Developed by <a href="">@brunodkf</a></p>

                
            </div>
        </section>
    )
}

export default Footer