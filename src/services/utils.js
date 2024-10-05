const urlImagens = import.meta.env.VITE_API_IMAGENS;

export const isolarMidia = (midia, infoImagens, infoMidia) => {

    const generos = [];
    infoMidia ? infoMidia.genres?.map(e => generos.push(e)) : null;


    const logos = [];
    const randomLogo = Math.floor(Math.random() * logos?.length);
    infoImagens ? infoImagens.logos?.filter(e => e.iso_639_1 == "pt" || e.iso_639_1 == "en").map(e => logos.push(e.file_path)) : null;


    const listaBackgrounds = infoImagens?.backdrops?.filter(e => e.iso_639_1 == null);

    return {
        id: midia.id,
        midia: midia.media_type,
        background: `${urlImagens}${midia.backdrop_path}`,
        listaBackgrounds: listaBackgrounds,
        poster: `${urlImagens}${midia.poster_path}`,
        logo: `${urlImagens}${logos[randomLogo]}`,
        genero: generos,
        nota: infoMidia?.vote_average.toFixed(1),
        sinopse: midia.overview,
        titulo: midia.title,
        nome: midia.name,
        estreia: midia.release_date
    }
}