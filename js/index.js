window.addEventListener("load", function () {
    const button = document.querySelector("header button");
    // ícono del boton
    const icon = document.querySelector("header button span");
    // menu propiamente dicho
    const menuNav = document.querySelector("header nav ul");
    // cada vínculo
    const items = document.querySelectorAll("header nav a");

    button.addEventListener('click', paraMenu);
    
    items.forEach( a => {
      // cuando se cliquea en un vínculo
      a.addEventListener('click', paraMenu);
      // se ejecuta la función "paraMenu"
    });


    /*
    las acciones para el menu
    */

    function paraMenu(e) {
        e.preventDefault();
        menuNav.classList.toggle("visible");
        // si se ve icono menu
        if ( icon.innerText == "menu" ) {
            icon.innerText = "close";
        }
        else {
            icon.innerText = "menu";
        }

        // si quien es cliqueado es un vínculo
        if ( this.hasAttribute("href") ) {
            // guarda la ruta del vínculo
            let adondeVoy = this.getAttribute("href");
            window.location = adondeVoy;
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