import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '/logo_white.webp'
import { CgMenu } from "react-icons/cg";

export const Navbar = () => {

    return (
        <div className="navbar w-svw z-10 absolute ">
            <nav className='navbar__container container m-auto p-4  flex items-center justify-between' id="navbar">
                <img className='w-20' src={Logo} alt="Logo" />

                <CgMenu className='w-10 h-10 text-gray-50'/>

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