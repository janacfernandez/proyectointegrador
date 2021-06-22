window.addEventListener("load", function () {

    let string = location.search;
    let stringObject = new URLSearchParams(string);
    let busqueda = stringObject.get("q");
    let artTodo = document.querySelector(".todo")
    let listSongs = document.querySelector(".listSongs")
    let listAlbums = document.querySelector(".listAlbums")
    let songsArticle = document.querySelector(".songsArticle")
    let albumsArticle = document.querySelector(".albumsArticle")
    let titulo = document.querySelector("h1")
    let songResults = document.querySelector(".songResults")
    let albumResults = document.querySelector(".albumResults")
    let artistResults = document.querySelector(".artistResults")
    let cancionEspecifico = document.querySelector(".cancionEspecifico")
    let albumEspecifico = document.querySelector(".albumEspecifico")
    let artistas = document.querySelector("#artistas");
    let canciones = document.querySelector("#canciones");
    let albumes = document.querySelector("#albumes");

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${busqueda}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            console.log(datos);
            let resultados = datos.data;
            console.log(resultados)

            if (!resultados.length) {
                artistResults.innerHTML = `<h2>No hay resultados para el artista buscado</h2>`
                songResults.innerHTML = `<h2>No hay resultados para la canción buscada</h2>`
                cancionEspecifico.innerHTML = `<h2>No hay resultados para la canción buscada</h2>`
            }else {
                let imgA = resultados[0].artist.picture_medium;
                let infoAr = resultados[0].artist.id;
                let artista = resultados[0].artist.name;
                titulo.innerText += " " + artista;
                artTodo.innerHTML += `<li>
                            <figure><img src="${imgA}" alt="${artista}"></figure>
                            <div class="textos">
                                <h3> <a href="detail-artist.html?id=${infoAr}" title="ver ${artista}"> ${artista}</a></h3>
                                <p><a href="detail-artist.html?id=${infoAr}" title="ver ${artista}"><i class="fas fa-arrow-right"></i></a>
                            </div>
                            </li>
                            `

                for (let i = 0; i < 6; i++) {
                    let cancion = resultados[i].title
                    let cancionId = resultados[i].id
                    let albumFoto = resultados[i].album.cover_medium
                    listSongs.innerHTML += `<li>
                            <figure><img src="${albumFoto}" alt="${cancion}"></figure>
                            <div class="textos">
                                <h3> <a href="detail-track.html?id=${cancionId}" title="ver ${cancion}"> ${cancion}</a></h3>
                                <p><a href="detail-track.html?id=${cancionId}" title="ver ${cancion}"><i class="fas fa-arrow-right"></i></a>
                            </div>
                            </li>
                            `

                }

                for (let i = 0; i < 12; i++) {
                    let cancion = resultados[i].title
                    let cancionId = resultados[i].id
                    let albumFoto = resultados[i].album.cover_medium
                    let albumId = resultados[i].album.id
                    let album = resultados[i].album.title
                    songsArticle.innerHTML += `<li>
                            <figure><img src="${albumFoto}" alt="${cancion}"></figure>
                            <div class="textos">
                                <h3> <a href="detail-track.html?id=${cancionId}" title="ver ${cancion}"> ${cancion}</a></h3>
                                <p><a href="detail-track.html?id=${cancionId}" title="ver ${cancion}"><i class="fas fa-arrow-right"></i></a>
                            </div>
                            </li>
                            `
                }
            }
        })
        .catch(function (e) {
            console.log(e)
        })

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=${busqueda}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            let resultados = datos.data
            console.log(datos.data)

            if (!resultados.length) {
                albumResults.innerHTML = `<h2>No hay resultados para el album buscado</h2>`
                albumEspecifico.innerHTML = `<h2>No hay resultados para el album buscado</h2>`
            }else {
                for (let i = 0; i < 6; i++) {
                    let albumFoto = resultados[i].cover_medium
                    let albumId = resultados[i].id
                    let album = resultados[i].title
                    listAlbums.innerHTML += `<li>
            <figure><img src="${albumFoto}" alt="${album}"></figure>
            <div class="textos">
                <h3> <a href="detail-album.html?id=${albumId}" title="ver ${album}"> ${album}</a></h3>
                <p><a href="detail-album.html?id=${albumId}" title="ver ${album}"><i class="fas fa-arrow-right"></i></a>
            </div>
            </li>`
                }

                for (let i = 0; i < 12; i++) {
                    let albumFoto = resultados[i].cover_medium
                    let albumId = resultados[i].id
                    let album = resultados[i].title
                    albumsArticle.innerHTML += `<li>
            <figure><img src="${albumFoto}" alt="${album}"></figure>
            <div class="textos">
                <h3> <a href="detail-album.html?id=${albumId}" title="ver ${album}"> ${album}</a></h3>
                <p><a href="detail-album.html?id=${albumId}" title="ver ${album}"><i class="fas fa-arrow-right"></i></a>
            </div>
            </li>`
                }
            }
        })
        .catch(function (e) {
            console.log(e);
        })

    artistas.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(artistas);
        artistResults.classList.remove("inact")
        songResults.classList.add("inact");
        albumResults.classList.add("inact");
        cancionEspecifico.classList.add("inact")
        albumEspecifico.classList.add("inact")
    })
    albumes.addEventListener("click", function (e) {
        e.preventDefault();
        songResults.classList.add("inact");
        albumResults.classList.add("inact")
        artistResults.classList.add("inact")
        cancionEspecifico.classList.add("inact")
        albumEspecifico.classList.remove("inact")
    })
    canciones.addEventListener("click", function (e) {
        e.preventDefault();
        songResults.classList.add("inact");
        albumResults.classList.add("inact")
        artistResults.classList.add("inact")
        cancionEspecifico.classList.remove("inact")
        albumEspecifico.classList.add("inact")
    })
})