window.addEventListener("load", function () {

    //Definimos las variables que necesitamos para quedarnos con la querystring (ID del artista) alojada en una variable, en este caso en artist.
    let queryString = location.search;
    let queryStringObj = new URLSearchParams(queryString);
    let artist = queryStringObj.get('id');

    //Capturamos todos los elementos del DOM (nodos) que utilizaremos en esta página y los almacenamos en variables.
    let nombre = document.querySelector(".sec-art-ppal h1");
    let foto = document.querySelector(".sec-art-ppal");
    let albumlist = document.querySelector(".top-albums ol");
    let tracklist = document.querySelector(".top-songs ol");

    //Con este método fetch consumiremos de la API los datos del artista cuyo ID esta almacenado en la variable artist.
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artist}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            let nombreArt = datos.name;
            let fotoArt = datos.picture_xl;
            nombre.innerText += nombreArt;
            foto.style.backgroundImage = `url('${fotoArt}')`;
        })
        .catch(function (error) {
            console.log(error);
        })

    //Con este método fetch consumiremos de la API los mejores tracks relacionados al artista en cuestión, cuyo ID esta almacenado en la variable artist.
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artist}/top`)
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            let tracks = datos.data;
            for (let i = 0; i < tracks.length; i++) {
                let track = tracks[i].title;
                let trackId = tracks[i].id;
                let preview = tracks[i].preview;
                tracklist.innerHTML += `<li><a href="detail-track.html?id=${trackId}">${track}</a><audio src='${preview}' preload="none" controls></audio></li>`;
            }
        })
        .catch(function (error) {
            console.log(error);
        })

    //Con este método fetch consumiremos de la API los mejores albumes relacionados al artista en cuestión, cuyo ID esta almacenado en la variable artist.
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artist}/albums`)
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            let albums = datos.data
            for (let i = 0; i < 5; i++) {
                let album = albums[i].title;
                let imagenAlbum = albums[i].cover_small;
                let albumId = albums[i].id;
                albumlist.innerHTML += `<li><a href="detail-album.html?id=${albumId}">${album}</a><img src='${imagenAlbum}'></li>`;
            }
        })
        .catch(function (error) {
            console.log(error);
        })

})