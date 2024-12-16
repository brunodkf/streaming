import React from 'react'
import Carousel from '../Carousel'

const ListaDeMidias = ({ lista, title, ordenado }) => {

    return (
        <div className='container m-auto px-2 py-6'>
            {/* <h2 className='text-white font-inter text-xl font-semibold tracking-wider mb-2'>{title}</h2> */}
            <h2 className="text-white text-2xl tracking-wider">{title}</h2>
            <span className="decoration w-full block container h-px text-white bg-white mt-2 mb-2 opacity-10"></span>

            <Carousel lista={lista} ordenado={ordenado} />
        </div>
    )
}

export default ListaDeMidias