import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '/logo_white.webp'
import { CgMenu } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";

import { LuUser2 } from "react-icons/lu";
import { Scroll } from '../Scroll';

export const Navbar = () => {

    return (
        <div className="navbar w-full z-50 absolute lg:bg-gradient-to-b from-20% from-preto-transparente ">
            <nav className='navbar__container container m-auto p-4 flex items-center justify-between' id="navbar">
                <Link to='/'>
                    <img className='w-20' src={Logo} alt="Logo" />
                </Link>


                <div className='flex gap-3'>

                    <ul className='hidden md:flex items-center gap-8 text-white tracking-wider mr-10 '>
                        <li className='cursor-pointer'>
                            <Link to='/'>
                                Início
                            </Link>
                        </li>

                        <li className='cursor-pointer'>
                            <Scroll to={'filme'} smooth={true} duration={500}>
                                Filmes
                            </Scroll>
                        </li>

                        <li className='cursor-pointer'>
                            <Scroll to={'serie'} smooth={true} duration={500}>
                                Séries
                            </Scroll>
                        </li>

                        <li className='cursor-pointer'>
                            Animes
                        </li>

                        <li className='hidden lg:block' >
                            Contato
                        </li>
                    </ul>

                    <Link to='/search'>
                        <IoSearch className='hidden md:block text-4xl p-2 rounded-full text-gray-50 mr-10 cursor-pointer' />  {/* SEARCH */}
                    </Link>

                    <IoSettingsOutline className='text-4xl p-2 rounded-full bg-preto-claro  text-gray-50' />
                    <LuUser2 className='text-4xl p-2 rounded-full bg-preto-claro text-gray-50' />
                    <IoMoonSharp className='hidden text-4xl p-2 rounded-full bg-preto-claro text-gray-50' />
                </div>

            </nav>
        </div>
    )
}