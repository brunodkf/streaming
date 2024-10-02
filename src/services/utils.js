
export const isolarMidia = (midia, infoImagens, infoMidia) => {

    const generos = [];
    const logos = [];
    const randomLogo = Math.floor(Math.random() * logos?.length);

    infoImagens ? infoImagens.logos?.filter(e => e.iso_639_1 == "pt" || e.iso_639_1 == "en").map(e => logos.push(e.file_path)) : null;

    infoMidia ? infoMidia.genres?.map(e => generos.push(e)) : null;

    return {
        id: midia.id,
        midia: midia.media_type,
        background: `https://image.tmdb.org/t/p/original${midia.backdrop_path}`,
        poster: `https://image.tmdb.org/t/p/original${midia.poster_path}`,
        logo: `https://image.tmdb.org/t/p/original${logos[randomLogo]}`,
        genero: generos,
        nota: infoMidia?.vote_average.toFixed(1),
        sinopse: midia.overview,
        titulo: midia.title,
        nome: midia.name,
        estreia: midia.release_date
    }
}