import React from 'react'
import Carousel from '../Carousel'

const ListaDeMidias = ({ lista, title, ordenado }) => {

    return (
        <div className='container m-auto px-2 py-6'>
            <h2 className='text-white font-inter text-xl font-semibold tracking-wider mb-4'>{title}</h2>
            <Carousel lista={lista} ordenado={ordenado} />
        </div>
    )
}

export default ListaDeMidias