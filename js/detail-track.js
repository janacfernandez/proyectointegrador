window.addEventListener("load", function () {
    /*Definiremos las variables con las cuales trabajremos en el menú*/
    const button = document.querySelector("header button");
    const icon = document.querySelector("header button span");
    const menuNav = document.querySelector("header nav ul");
    const items = document.querySelectorAll("header nav a");

    button.addEventListener('click', paraMenu);

    items.forEach(a => a.addEventListener('click', paraMenu));

    function paraMenu(e) {
        e.preventDefault();
        menuNav.classList.toggle("visible");
        if (icon.innerText == "menu") {
            icon.innerText = "close";
        }
        else {
            icon.innerText = "menu";
        }
        if (this.hasAttribute("href")) {
            let destino = this.getAttribute("href");
            window.location = destino;
        }
    }

    let queryString = location.search;
    let queryStringObjt = new URLSearchParams(queryString);
    let canc = queryStringObjt.get("id");
    let trackPlay = document.querySelector(".detail-track .head");
    let trackDetail = document.querySelector(".detail-track .play-ppal .data");
    let barraSec = document.querySelector(".detail-track .play-ppal .barra-sec ");
    let imgPort = document.querySelector(".detail-track .img");

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${canc}`)
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

            trackPlay.innerHTML += `<div class="head">
        <a href="#" class="exit"> <i class="fas fa-angle-down"></i></a>
        <a href="detail-album.html" class="album">${tracks}</a>
    </div> `
            imgPort.innerHTML += `<img class="i-port" src="${imgCan}" alt="imagendeportada">`


            trackDetail.innerHTML += `<p> ${cancion} </p>
         <a href="detail-artist.html"> ${nombreArt2}</a> `

            barraSec.innerHTML += `<audio src="${link}" controls loop></audio> `

        })

        .catch(function (error) {
            console.log(error);
        })


    // declaro un array vacio, para almacenar las canciones
    let canFav = [];

    //recupero datos del storage
    let recuperoStorage = localStorage.getItem("favorito");
    console.log(recuperoStorage);
    // utilizo un condicional para saber si hay algo guardado en "favoritos"
    if (recuperoStorage != null) {
        //transformamos la informacion recibida como string en array para que la podamos trabajar
        canFav = JSON.parse(recuperoStorage);

        // si el id de la cancion actual esta en la lista
        if (canFav.includes(canc)) {
            document.querySelector(".but-fun .fav").innerHTML = ` Quitar de Playlist <i class="fas fa-heart"></i>`
        }
    }
    //agregar-sacar cancion actual de playlist

    //link "agregar a playlist"
    let fav = document.querySelector(".but-fun .fav");

    //al clickear en el link
    fav.addEventListener("click", function (e) {
        //evitamos el comportamiento por default
        e.preventDefault();

        //si la cancion se encuentra en la lista
        if (canFav.includes(canc)) {
            //lo localizamos en el array
            let sacarId = canFav.indexOf(canc);
            // lo sacamos de allí
            canFav.splice(sacarId, 1);

            // si ya lo sacamos, cambiamos el texto del link
            document.querySelector(".but-fun .fav").innerHTML = ` <i class="far fa-heart"></i> Agregar a Playlist`

            //chequeamos 
            console.log(canFav);
        } else { //si no esta en la lista

            //se agrega la cancion actual
            canFav.push(canc);

            // si ya fue agregrado, cambiamos el texto del link
            document.querySelector(".but-fun .fav").innerHTML = ` <i class="fas fa-heart"></i> Quitar de Playlist`

            // guardamos el array actualizado como string
            let canFavStorage = JSON.stringify(canFav);
            console.log(canFavStorage);

            // guardamos el string en el LocalStorage
            localStorage.setItem("favorito", canFavStorage);

            //revisamos
            console.log(localStorage);

            ///fin///
        }
    })


    



})