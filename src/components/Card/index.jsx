import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { isolarMidia } from '../../services/utils';
const apiKey = import.meta.env.VITE_API_KEY;
const chamadaApi = import.meta.env.VITE_API;

export const Card = ({midia}) => {

  // Espaço dedicado para novas requisições
  const [infoMidia, setInfoMidia] = useState(null);
  const [infoTrailers, setInfoTrailers] = useState(null);
  const [infoTrailersBR, setInfoTrailersBR] = useState(null);
  const [infoImagens, setInfoImagens] = useState(null);

  useEffect(() => {
      if (midia) {
          const getInfos = async () => {
              try {
                  const [midiaResposta, trailersResposta, trailersBrResposta, imagensResposta] = await axios.all([
                      axios.get(`${chamadaApi}/${midia.media_type}/${midia.id}?${apiKey}`),
                      axios.get(`${chamadaApi}/${midia.media_type}/${midia.id}/videos?${apiKey}`),
                      axios.get(`${chamadaApi}/${midia.media_type}/${midia.id}/videos?language=pt-BR&${apiKey}`),
                      axios.get(`${chamadaApi}/${midia.media_type}/${midia.id}/images?${apiKey}`),
                  ]);

                  setInfoMidia(midiaResposta.data);
                  setInfoTrailers(trailersResposta.data);
                  setInfoTrailersBR(trailersBrResposta.data);
                  setInfoImagens(imagensResposta.data);

              } catch (error) {
                  console.log(error);
                  { error && <p className="text-red-500">Ocorreu um erro ao carregar os dados: {error}</p> }
              }
          };

          getInfos();
      }
  }, [midia]);

  const midiaIsolada = isolarMidia(midia, infoImagens, infoMidia);

  console.log(midiaIsolada)

  return (
    <div className='cursor-pointer'>
        <img src={midiaIsolada.poster} alt="" />
    </div>
  )
}
