import React from 'react'
import Carousel from '../Carousel'

const ListaDeMidias = ({ lista, title }) => {
    return (
        <div className='container m-auto px-2 py-6'>
            <h2 className='text-white font-inter text-xl font-semibold tracking-wider'>{title}</h2>
            <Carousel lista={lista} />
        </div>
    )
}

export default ListaDeMidias