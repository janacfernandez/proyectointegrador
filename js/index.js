window.addEventListener("load", function () {
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
                let artist = datos.data[i].name;
                let imagen = datos.data[i].picture_big;
                console.log(artist);
                list.innerHTML += `<li class="artist">
                <a href="detail-artist.html"><img src="${imagen}" alt="${artist}"></a>
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
                let cancion = canciones[i];
                let title = canciones[i].title;
                let url = canciones[i].artist.picture;
                let cantante = canciones[i].artist.name;
                listaC.innerHTML += `
            <li> 
            <img src="${url}" alt="${title}">
            <div>
                <h4 class="canciones"><a href="detail-track.html"> ${title}</a></h4>
                <a href="detail-artist.html" class="cantante"> ${cantante}</a>
                </div>
            </li>
            `
            }
        })
        .catch(function (error) {
            console.log("El error fue:" + error);
        })





})