import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '/logo_white.webp'
import { CgMenu } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { RiSearchLine } from "react-icons/ri";
import { MdSunny } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";

export const Navbar = () => {

    return (
        <div className="navbar w-svw z-50 absolute lg:bg-gradient-to-b from-20% from-preto-transparente ">
            <nav className='navbar__container container m-auto p-4 flex items-center justify-between' id="navbar">
                <img className='w-20' src={Logo} alt="Logo" />

                <div className='flex gap-3'>

                    <ul className='hidden lg:flex items-center gap-8 text-white tracking-wider mr-10 '>
                        <li>
                            <Link to='/'>
                                Início
                            </Link>
                        </li>
                        <li>Filmes</li>
                        <li>Séries</li>
                        <li>Animes</li>
                        <li>Contato</li>
                    </ul>

                    <Link to='/search'>
                        <RiSearchLine className='hidden lg:block text-4xl p-2 rounded-full text-gray-50 mr-10 cursor-pointer' />  {/* SEARCH */}
                    </Link>



                    <IoSettingsOutline className='text-4xl p-2 rounded-full bg-preto-claro md:bg-cinza-transparente text-gray-50' />
                    <MdSunny className='text-4xl p-2 rounded-full bg-preto-claro md:bg-cinza-transparente text-gray-50' />
                    <IoMoonSharp className='hidden text-4xl p-2 rounded-full bg-preto-claro text-gray-50' />
                </div>

                <CgMenu className='hidden w-10 h-10 text-gray-50' />

                {/* <ul className='hidden'>
                    <li>
                        <Link to='/'>
                            Início
                        </Link>
                    </li>
                    <li>
                        <Link to='/movie'>
                            Movie
                        </Link>
                    </li>
                </ul> */}
            </nav>
        </div>
    )
}