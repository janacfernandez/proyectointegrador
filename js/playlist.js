window.addEventListener("load", function () {
   

    console.log(window);

    console.log(window.location);

    console.log(window.location.search);


    let playlist = document.querySelector(".sec-play-sec .playlist");

    let recuperoStorage = localStorage.getItem("favorito");

    console.log(recuperoStorage);

    let canRecuperadas = JSON.parse(recuperoStorage);


    for (let i = 0; i < canRecuperadas.length; i++) {
        const cancion = canRecuperadas[i];


        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${cancion}`)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (datos) {
                let tracks = datos.album.title;
                let nombreArt2 = datos.artist.name;
                let artId = datos.artist.id;
                let cancion = datos.title;
                let imgCan = datos.album.cover_big;
                let albumId = datos.album.id;
                let link = datos.preview;
                let dur = datos.duration;
                let trackID = datos.id

                playlist.innerHTML += `   <li class="play-can">
            <img src="${imgCan}" alt="${cancion}">
            <div class="text">
                <h4 class="canciones"><a href="detail-track.html?id=${trackID}">${cancion}</a></h4>
                <a href="detail-artist.html?id=${artId}" class="artista"> ${nombreArt2}</a>
            </div>
            <p class="favorito"> <a href="" class="fav"><i class="far fa-heart"></i></a></p></li>`;
           
        
        })

                .catch(function (error) {
                    console.log("el error fue" + error);
                })
            }



})