window.addEventListener("load", function () {
   

    let queryString = location.search;
    let queryStringObj = new URLSearchParams(queryString);
    let idAlbum = queryStringObj.get('id');
    let cambioJava = document.querySelector("main .alb-info ")
    let tracklistSec = document.querySelector("main .tracklist ol")

    console.log(idAlbum)



    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${idAlbum}`)
        .then(function (response) {
            return response.json();

        })
        .then(function (datos) {
            console.log(datos);
            let titulo = datos.title;
            let artista = datos.artist.name
            let artistaId = datos.artist.id
            let foto = datos.cover_medium
            let tracklist = datos.tracks.data
            let genero = datos.genres.data[0].name
            let generoId = datos.genres.data[0].id
            //let tracklist = basico.tracks.data.title
            cambioJava.innerHTML += 
            `<h2>${titulo}</h2>
            <img src="${foto}" alt="Iluminate">
            <a href="detail-artist.html?id=${artistaId}"><h3>${artista}</h3></a>
            <p>Genero: <a href="detail-genres.html?id=${generoId}">${genero}</a></p>`;
            for(let i=0; i<tracklist.length; i++){
                let track = tracklist[i].title
                let trackId = tracklist[i].id
                tracklistSec.innerHTML += `<li><a href="detail-track.html?id=${trackId}">${track}</a></li>`
                console.log (track)
            }
        })
        .catch(function (error) {
            console.log(error);

        })


   /* fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${idAlbum}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            console.log(datos)
        })
        .catch(function (error) {
            console.log(error);
        })*/
})