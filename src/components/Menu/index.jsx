import React from 'react'
import { Link } from 'react-router-dom';
import { RiHomeLine } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";
import { RiUser3Line } from "react-icons/ri";
import { RiMessageLine } from "react-icons/ri";

const Menu = () => {
    return (
        <div className="menu w-svw z-10 bottom-0 absolute bg-slate-700">
            <nav className='menu__container container m-auto p-4  flex items-center justify-between' id="menu">
                <ul className='w-full flex items-center justify-between'>
                    <li>
                        <Link to='/'>
                            <RiHomeLine className='text-white text-3xl' />
                        </Link>
                    </li>
                    <li>
                        <Link to='/search'>
                            <RiSearchLine className='text-white text-3xl' />
                        </Link>
                    </li>
                    <li>
                        <Link to='/'>
                            <RiMessageLine className='text-white text-3xl' />
                        </Link>
                    </li>
                    <li>
                        <Link to='/'>
                            <RiUser3Line className='text-white text-3xl' />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Menu