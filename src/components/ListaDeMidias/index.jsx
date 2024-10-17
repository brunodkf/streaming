import React from 'react'
import Carousel from '../Carousel'

const ListaDeMidias = ({lista, title}) => {
    return (
        <div className=' bg-preto-escuro'>
            <p className='text-white'>{title}</p>
            <Carousel lista={lista} />
        </div>
    )
}

export default ListaDeMidias