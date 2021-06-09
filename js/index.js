window.addEventListener("load", function () {
    let sec = document.querySelector("#desapear");
    sec.classList.toggle("loaderSegundo")


    /*Definiremos las variables con las cuales trabajremos en el menú*/
    const button = document.querySelector("header button");
    const icon = document.querySelector("header button span");
    const menuNav = document.querySelector("header nav ul");
    const items = document.querySelectorAll("header nav a");

    button.addEventListener('click', paraMenu);
    
    items.forEach( a => a.addEventListener('click', paraMenu));

    function paraMenu(e) {
        e.preventDefault();
        menuNav.classList.toggle("visible");
        if ( icon.innerText == "menu" ) {
            icon.innerText = "close";
        }
        else {
            icon.innerText = "menu";
        }
        if ( this.hasAttribute("href") ) {
            let destino = this.getAttribute("href");
            window.location = destino;
        }
    }

    let list = document.querySelector(".artists ul");
    
    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/artists')
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            console.log(datos);
            let artistas = datos.data
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
            console.log(error)
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
                let url = canciones[i].artist.picture;
                let cantante = canciones[i].artist.name;
                let cantId = canciones[i].artist.id;
                listaC.innerHTML += `
            <li> 
            <img src="${url}" alt="${title}">
            <div>
                <h4 class="canciones"><a href="detail-track.html"> ${title}</a></h4>
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
            let albumes = datos.data

            let listA= document.querySelector(".albums .liAlbum")

            for (let i = 0; i < 6; i++) {
                let album = albumes[i].title
                let imagen = albumes[i].cover_medium;
                let artista= albumes[i].artist.name;
                let albumId = albumes[i].id;

                listA.innerHTML += `<li>
                <h4>${album}</h4>
                <a href="detail-album.html?id=${albumId}"><img src="${imagen}" alt="${album}"></a>
                <a href="detail-artist.html?id=${albumId}">
                    <p>${artista}</p>
                </a>
            </li>`;
            }

        })
        .catch(function (error) {
            console.log("error: "+error)
        }) 
    })