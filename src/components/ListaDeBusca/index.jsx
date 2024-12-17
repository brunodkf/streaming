import React from 'react'
import Carousel from '../Carousel'
import { Card } from '../Card'

const ListaDeBusca = ({ lista, query }) => {

    return (
        <div className='container m-auto px-2 py-6 pt-20'>
            {/* <h2 className='text-white font-inter text-xl font-semibold tracking-wider mb-2'>{title}</h2> */}
            <h2 className="text-white text-2xl tracking-wider">
                Resultados para: <span className="query-text font-bold">{query}</span>
            </h2>
            <span className="decoration w-full block container h-px text-white bg-white mt-2 mb-2 opacity-10"></span>

            <div className="grid justify-items-center grid-cols-2 md:grid-cols-4 gap-4 mt-8 z-50">
            {/* <div className="flex items-center justify-center flex-wrap gap-8 "> */}
                {lista.length > 0 ? (
                    lista.map((item) => (
                        <div key={item.id} className="max-w-40 flex items-center justify-center bg-red-900">
                            <Card midia={item} />
                        </div>
                    ))
                ) : (
                    null
                )}
            </div>
        </div>
    )
}

export default ListaDeBusca