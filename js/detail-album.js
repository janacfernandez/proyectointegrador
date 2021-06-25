window.addEventListener("load", function () {
    let queryString = location.search;
    let queryStringObj = new URLSearchParams(queryString);
    let idAlbum = queryStringObj.get('id');
    let cambioJava = document.querySelector("main .alb-info ");
    let tracklistSec = document.querySelector("main .tracklist ol");

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${idAlbum}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            let titulo = datos.title;
            let artista = datos.artist.name;
            let artistaId = datos.artist.id;
            let foto = datos.cover_medium;
            let fecha = datos.release_date;
            let año = fecha.substring(0, 4);
            let tracklist = datos.tracks.data;
            let genero = datos.genres.data[0].name;
            let generoId = datos.genres.data[0].id;
            let array = datos.genres.data;
            if (array === []) {
                cambioJava.innerHTML +=
                `<h2>${titulo}</h2><h2>${año}</h2>
            <img src="${foto}" alt="Iluminate">
            <a href="detail-artist.html?id=${artistaId}"><h3>${artista}</h3></a>
            <p> No se encuentra Genero</p>`;
            for (let i = 0; i < tracklist.length; i++) {
                let track = tracklist[i].title;
                let trackId = tracklist[i].id;
                tracklistSec.innerHTML += `<li><a href="detail-track.html?id=${trackId}">${track}</a></li>`;
            }
        }

            else {
                cambioJava.innerHTML +=
                `<h2>${titulo}</h2><h2>${año}</h2>
            <img src="${foto}" alt="Iluminate">
            <a href="detail-artist.html?id=${artistaId}"><h3>${artista}</h3></a>
            <p>Genero: <a href="detail-genres.html?id=${generoId}">${genero}</a></p>`;
            for (let i = 0; i < tracklist.length; i++) {
                let track = tracklist[i].title;
                let trackId = tracklist[i].id;
                tracklistSec.innerHTML += `<li><a href="detail-track.html?id=${trackId}">${track}</a></li>`;
            }
            } 
        })
        .catch(function (error) {
            console.log(error);
        })
})