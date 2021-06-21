window.addEventListener("load", function () {


    let queryString = location.search;
    let queryStringObj = new URLSearchParams(queryString);  
    let artist = queryStringObj.get('id');
    console.log(artist)
    let nombre = document.querySelector(".sec-art-ppal h1")
    let foto = document.querySelector(".sec-art-ppal")
    
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artist}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (datos) {
        let nombreArt = datos.name;
        let fotoArt = datos.picture_xl
        nombre.innerText += nombreArt
        console.log(fotoArt)
        foto.style.backgroundImage = `url('${fotoArt}')`
        })
    .catch(function (error) {
        console.log(error);
    })

    let tracklist = document.querySelector(".top-songs ol");

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artist}/top`)
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (datos) {
        let tracks = datos.data
        for (let i=0; i < tracks.length; i++){
            let track = tracks[i].title
            let trackId = tracks[i].id
            let duration = tracks[i].duration
            let preview = tracks[i].preview
            console.log(track)
            tracklist.innerHTML += `<li><a href="detail-track.html?id=${trackId}">${track}</a><audio src='${preview}' preload="none" controls></audio></li>`
        }
    })

    .catch(function (error) {
        console.log(error);
    })

    let albumlist = document.querySelector(".top-albums ol")
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artist}/albums`)
    .then(function (response) {
        return response.json();
    })
    .then(function (datos) {
        let albums = datos.data
        for (let i=0; i < 5; i++){
            let album = albums[i].title
            let imagenAlbum = albums[i].cover_small
            let albumId = albums[i].id
            console.log(album)
            albumlist.innerHTML += `<li><a href="detail-album.html?id=${albumId}">${album}</a><img src='${imagenAlbum}'></li>`
        }
    })

    .catch(function (error) {
        console.log(error);
    })

})