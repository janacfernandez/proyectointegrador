window.addEventListener("load", function () {

    //Obtenemos la query string que vino de la busqueda que hizo el usuario en el formulario de la página index.html
    const string = location.search;
    const stringObject = new URLSearchParams(string);
    const busqueda = stringObject.get("q");

    //Capturamos los links que nos servirán de botones para hacer los distintos filtrados
    const artistas = document.querySelector("#artistas");
    const canciones = document.querySelector("#canciones");
    const albumes = document.querySelector("#albumes");
    const playlists = document.querySelector("#playlists");

    //Capturamos el título que nos permitirá mostrarle al usuario nuevamente lo que se buscó anteriormente
    const titulo = document.querySelector("h1");

    //Definimos las variables a utilizar para la sección donde se mostrarán los resultados del artista buscado, tanto en el filtro "Todo" como en el específico de artista
    const listArtist = document.querySelector(".listArtist");
    const artistResults = document.querySelector(".artistResults");
    const artistArticle = document.querySelector(".artistArticle");
    const artistEspecifico = document.querySelector(".artistEspecifico")

    //Definimos las variables a utilizar para la sección donde se mostrarán los resultados de las canciones buscadas tanto en el filtro "Todo" como en el específico de tracks.
    const listSongs = document.querySelector(".listSongs");
    const songsArticle = document.querySelector(".songsArticle");
    const songResults = document.querySelector(".songResults");
    const cancionEspecifico = document.querySelector(".cancionEspecifico");

    //Definimos las variables a utilizar para la sección donde se mostrarán los resultados de los albumes buscados tanto en el filtro "Todo" como en el específico de albums.
    const listAlbums = document.querySelector(".listAlbums");
    const albumsArticle = document.querySelector(".albumsArticle");
    const albumResults = document.querySelector(".albumResults");
    const albumEspecifico = document.querySelector(".albumEspecifico");

    //Defino las variables a utilizar para la sección donde se mostrarán los resultados de las playlists buscadas tanto en el filtro "Todo" como en el específico de playlists.
    const playlistResults = document.querySelector(".playlistResults")
    const playlistEspecifico = document.querySelector(".playlistEspecifico")
    const listPlaylists = document.querySelector(".listPlaylists")
    const playlistArticle = document.querySelector(".playlistArticle")

    //NOTA: En toda la sección anterior decidimos utilizar const en vez de let para definir las variables (en este caso constantes) ya que son elementos estáticos del HTML los cuales no cambiarán, y para asegurarnos de eso los definimos como constantes.

    titulo.innerText += " " + busqueda;


    //Ahora comienzo con a consumir datos de la API de Deezer, en este primer fetch traeremos los artistas relacionados con la búsqueda
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist?q=${busqueda}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            let resultados = datos.data;

            function detalleArtist(iteraciones, article) {
                for (let i = 0; i < iteraciones; i++) {
                    let imgA = resultados[i].picture_medium;
                    let infoAr = resultados[i].id;
                    let artista = resultados[i].name;
                    article.innerHTML += `<li>
                                <figure><img src="${imgA}" alt="${artista}"></figure>
                                <div class="textos">
                                    <h3> <a href="detail-artist.html?id=${infoAr}" title="ver ${artista}"> ${artista}</a></h3>
                                    <p><a href="detail-artist.html?id=${infoAr}" title="ver ${artista}"><i class="fas fa-arrow-right"></i></a>
                                </div>
                                </li>
                                `;
                }
            }

            //Mediante el uso de un condicional evaluaremos si el array está vacio (longitud = 0 o nula) y esto nos indicará que no hay resultados de búsqueda y podremos comunicarselo al usuario. Si esto no ocurriera (else) se comienzan a colocar los diferentes datos obtenidos en los lugares deseados de nuestro DOM.

            if (!resultados.length) {
                artistResults.innerHTML += `<h3>No hay resultados para el artista buscado</h3>`;
                artistEspecifico.innerHTML += `<h3>No hay resultados para el artista buscado</h3>`;
            } else if (resultados.length < 6) {
                detalleArtist(resultados.length, artistArticle)
                detalleArtist(resultados.length, listArtist)
            } else {
                detalleArtist(6, listArtist)
                detalleArtist(12, artistArticle)
            }
        })
        .catch(function (e) {
            console.log(e)
        })

    //A continuación paso a consumir datos de la API de Deezer, en este fetch traeremos las canciones relacionadas con la búsqueda
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${busqueda}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            let resultados = datos.data;

            function detalleSong(iteraciones, article) {
                for (let i = 0; i < iteraciones; i++) {
                    let cancion = resultados[i].title;
                    let cancionId = resultados[i].id;
                    let albumFoto = resultados[i].album.cover_medium;
                    article.innerHTML += `<li>
                        <figure><img src="${albumFoto}" alt="${cancion}"></figure>
                        <div class="textos">
                            <h3> <a href="detail-track.html?id=${cancionId}" title="ver ${cancion}"> ${cancion}</a></h3>
                            <p><a href="detail-track.html?id=${cancionId}" title="ver ${cancion}"><i class="fas fa-arrow-right"></i></a>
                        </div>
                        </li>
                        `;
                }
            }

            if (!resultados.length) {
                songResults.innerHTML += `<h3>No hay resultados para la canción buscada</h3>`;
                cancionEspecifico.innerHTML += `<h3>No hay resultados para la canción buscada</h3>`;
            } else if (resultados.length < 6) {
                detalleSong(resultados.length, listSongs);
                detalleSong(resultado.length, songsArticle);
            } else {
                detalleSong(6, listSongs);
                detalleSong(12, songsArticle);
            }
        })
        .catch(function (e) {
            console.log(e);
        })

    //Utilizaremos nuevamente el método fetch en este caso para obtener los albumes relacionados con la búsqueda del usuario.
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=${busqueda}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            let resultados = datos.data;

            function detalleAlbum(iteraciones, article) {
                for (let i = 0; i < iteraciones; i++) {
                    let albumFoto = resultados[i].cover_medium;
                    let albumId = resultados[i].id;
                    let album = resultados[i].title;
                    article.innerHTML += `<li>
                    <figure><img src="${albumFoto}" alt="${album}"></figure>
                    <div class="textos">
                        <h3> <a href="detail-album.html?id=${albumId}" title="ver ${album}"> ${album}</a></h3>
                        <p><a href="detail-album.html?id=${albumId}" title="ver ${album}"><i class="fas fa-arrow-right"></i></a>
                    </div>
                    </li>`;
                }
            }

            if (!resultados.length) {
                albumResults.innerHTML += `<h3>No hay resultados para el album buscado</h3>`;
                albumEspecifico.innerHTML += `<h3>No hay resultados para el album buscado</h3>`;
            } else if (resultados.length < 6) {
                detalleAlbum(resultados.length, listAlbums);
                detalleAlbum(resultados.length, albumsArticle);
            } else {
                detalleAlbum(6, listAlbums);
                detalleAlbum(12, albumsArticle);
            }
        })
        .catch(function (e) {
            console.log(e);
        })

    //Utilizaremos nuevamente el método fetch en este caso para obtener las playlists relacionadas con la búsqueda del usuario.
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/playlist?q=${busqueda}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            let resultados = datos.data;

            function detallePlaylist(iteraciones, article) {
                for (let i = 0; i < iteraciones; i++) {
                    let playlistFoto = resultados[i].picture_medium;
                    let playlistId = resultados[i].id;
                    let playlist = resultados[i].title;
                    article.innerHTML += `<li>
            <figure><img src="${playlistFoto}" alt="${playlist}"></figure>
            <div class="textos">
                <h3> <a href="detail-playlist.html?id=${playlistId}" title="ver ${playlist}"> ${playlist}</a></h3>
                <p><a href="detail-album.html?id=${playlistId}" title="ver ${playlist}"><i class="fas fa-arrow-right"></i></a>
            </div>
            </li>`;
                }
            }

            if (!resultados.length) {
                playlistResults.innerHTML += `<h3>No hay resultados para la playlist buscada</h3>`;
                playlistEspecifico.innerHTML += `<h3>No hay resultados para la playlist buscada</h3>`;
            } else if (resultados.length < 6) {
                detallePlaylist(resultados.length, listPlaylists);
                detallePlaylist(resultados.length, playlistArticle);
            } else {
                detallePlaylist(6, listPlaylists);
                detallePlaylist(12, playlistArticle);
            }
        })
        .then(function () {
            let sec = document.querySelector("#cargando");
            sec.classList.toggle("loaderSegundo");
        })
        .catch(function (e) {
            console.log(e);
        })


    //Definimos una variable que capture todos los elementos de la clase filtro
    const filtro = document.querySelectorAll(".filtro")

    //A continuación defino una función que nos servirá para dejar visible unicamente el article que el usario elija asignandoles la clase "inact" (display:none) a todas las secciones excepto a aquella que se introduzca como parámetro de la función. Esto me permite no repetir y optimizar el código.
    function filtrado(seccion) {
        for (let i = 0; i < filtro.length; i++) {
            filtro[i].classList.add("inact")
        }
        seccion.classList.remove("inact");
    }

    //Se le asigna a cada uno de los links que servirán para que el usuario filtre su búsqueda eventos que se desencadenan cuando el usuario clickea sobre ellos.
    artistas.addEventListener("click", function (e) {
        e.preventDefault();
        filtrado(artistEspecifico);
    })

    albumes.addEventListener("click", function (e) {
        e.preventDefault();
        filtrado(albumEspecifico);
    })

    canciones.addEventListener("click", function (e) {
        e.preventDefault();
        filtrado(cancionEspecifico);
    })

    playlists.addEventListener("click", function (e) {
        e.preventDefault();
        filtrado(playlistEspecifico);
    })
})