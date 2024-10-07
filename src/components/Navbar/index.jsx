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
        <div className="navbar w-svw z-10 absolute ">
            <nav className='navbar__container container m-auto p-4 flex items-center justify-between' id="navbar">
                <img className='w-20' src={Logo} alt="Logo" />

                <div className="hidden md:flex w-2/4 border-cinza-transparente border-2 rounded-xl overflow-hidden">
                    <input type="search" className='w-full bg-transparent  rounded-r-none' />
                    <button className='bg-cinza-transparente px-3'>
                        <RiSearchLine className='text-white text-xl' />
                    </button>
                </div>

                <div className='flex gap-3'>
                    <IoSettingsOutline className='text-4xl p-2 rounded-full bg-preto-claro text-gray-50' />
                    <MdSunny className='text-4xl p-2 rounded-full bg-preto-claro text-gray-50' />
                    <IoMoonSharp className='hidden text-4xl p-2 rounded-full bg-preto-claro text-gray-50' />
                </div>

                <CgMenu className='hidden w-10 h-10 text-gray-50' />

                {/* <ul className='hidden'>
                    <li>
                        <Link to='/'>
                            Home
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