window.addEventListener("load", function () {
    let sec = document.querySelector("#desapear");
    sec.classList.toggle("loaderSegundo");

    //A continuación definiremos el código necesario para hacer nuestro "Stiky menu", es decir nuestro menu que tenga position fixed cuando el usuario hace scroll, pero que cuando se está en la parte superior de la página vuelva a su posición por defecto
    let navegacion = document.querySelector("header")

    window.addEventListener("scroll", function(){
        if(window.pageYOffset != 0){
        navegacion.classList.add("fixed");
    }else{
        navegacion.classList.remove("fixed");
    }   
    })

//validacion de buscador
    let form = document.querySelector("form");
    let buscar = document.querySelector(".buscar");
    let validador = document.querySelector(".validador");

    form.addEventListener("submit", function(e){
        e.preventDefault();
        if(buscar.value.length === 0){
            validador.innerText = "Ingresa algo para buscar"
        }else if(buscar.value.length < 3){
            validador.innerText = "Debes ingresar al menos tres caracteres"
        }else{
            this.submit();
        }
    })

    buscar.addEventListener("input", function(){
        validador.innerText = ""
    })


    let list = document.querySelector(".artists ul");
    
    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/artists')
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            console.log(datos);
            let artistas = datos.data;
            for (let i = 0; i < 6; i++) {
                let artist = artistas[i].name;
                let imagen = artistas[i].picture_big;
                console.log(artist);
                let art = artistas[i].id;
                list.innerHTML += `<li class="artist">
                <a href="detail-artist.html?id=${art}"><img src="${imagen}" alt="${artist}"></a>
                <h4>${artist}</h4>
                </li>`;
            }

        })
        .catch(function (error) {
            console.log(error);
        })

    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/tracks")
        .then(function (respuesta) {
            console.log(respuesta);
            return respuesta.json();
        })

        .then(function (datos) {
            let canciones = datos.data;
            console.log(canciones);
            let listaC = document.querySelector(".songs ul");

            for (let i = 0; i < 6; i++) {
                let canc = datos.data[i].id;
                let title = canciones[i].title;
                let url = canciones[i].artist.picture_big;
                let cantante = canciones[i].artist.name;
                let cantId = canciones[i].artist.id;
                listaC.innerHTML += `
            <li> 
            <img src="${url}" alt="${title}">
            <div>
                <h4 class="canciones"><a href="detail-track.html?id=${canc}"> ${title}</a></h4>
                <a href="detail-artist.html?id=${cantId}" class="cantante"> ${cantante}</a>
                </div>
            </li>
            `
            }
        })
        .catch(function (error) {
            console.log("El error fue:" + error);
        })

        fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/albums')
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            console.log(datos);
            let albumes = datos.data;

            let listA= document.querySelector(".albums .liAlbum")

            for (let i = 0; i < 6; i++) {
                let album = albumes[i].title;
                let imagen = albumes[i].cover_medium;
                let artista= albumes[i].artist.name;
                let artistaId = albumes[i].artist.id;
                let albumId = albumes[i].id;

                listA.innerHTML += `<li>
                <h4>${album}</h4>
                <a href="detail-album.html?id=${albumId}"><img src="${imagen}" alt="${album}"></a>
                <a href="detail-artist.html?id=${artistaId}">
                    <p>${artista}</p>
                </a>
            </li>`;
            }

        })
        .catch(function (error) {
            console.log("error: "+error);
        }) 

        let listaP = document.querySelector(".playInd ul");
    
    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/playlists')
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            console.log(datos);
            let playlist = datos.data
            for (let i = 0; i < 6; i++) {
                let nombre = playlist[i].title;
                let imagen = playlist[i].picture_big;
                let canPlay = playlist[i].id;

                listaP.innerHTML += `<li class="artist">
                <a href="detail-playlist.html?id=${canPlay}"><img src="${imagen}" alt="${nombre}"></a>
                <h4>${nombre}</h4>
                </li>`;
            }

        })
        .catch(function (error) {
            console.log(error);
        })


       let lPod = document.querySelector(".podcast ul ")
        fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/podcasts')
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            console.log(datos);
            let podcasts = datos.data;
            console.log(podcasts);

            for (let i = 0; i < 6; i++) {
                let podcast = podcasts[i].title;
                let imagen = podcasts[i].picture_big;
                let desc= podcasts[i].description;
                let podcastId = podcasts[i].id;

                lPod.innerHTML += `<li>
                <h4>${podcast}</h4>
                <a href="detail-podcast.html?id=${podcastId}"><img src="${imagen}" alt="${podcast}"></a>
                </a>
            </li>`; 
            }

        })
        .catch(function (error) {
            console.log("error: "+error);
        }) 





    })