import React from 'react'
import { Link } from 'react-scroll'

export const Scroll = ({to, smooth, duration, children}) => {
  return (
    <Link to={to} smooth={smooth} duration={duration} className='block m-auto'>
        {children}
    </Link>
  )
}
