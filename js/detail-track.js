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
    let trackPlay = document.querySelector(".detail-track");

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${canc}`)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (datos) {
            let tracks = datos.album.title;
            let nombreArt2 = datos.artist.name;
            let cancion = datos.title;
            let imgCan = datos.album.cover_big;
            let link = datos.preview;
            let dur = datos.duration;

            trackPlay.innerHTML += `<div class="head">
        <a href="#" class="exit"> <i class="fas fa-angle-down"></i></a>
        <a href="detail-album.html" class="album">${tracks}</a>
    </div>
    <img class="i-port" src="${imgCan}" alt="imagendeportada">
    <section class="play-ppal">
        <div class="data">
            <p> ${cancion} </p>
            <a href="detail-artist.html"> ${nombreArt2}</a>
        </div>
        <div class="but-fun">
            <p class="like"><a href="#"><i class="far fa-thumbs-up"></i></a></p>
            <p class="favorito"> <a href="#" class="fav" ><i class="far fa-heart"></i></i></a></p>
        </div>
        <div class="barra">
            <p class="rep">0:00</p>
            <p class="duracion">0:00</p>
        </div>
        <div class="funciones">
            <a href="#" class="min"> <i class="fas fa-random"></i></a>
            <a href="#" class="min"> <i class="fas fa-step-backward"></i></a>
            <a href="#" class="max"> <i class="fas fa-play-circle"></i></a>
            <a href="#" class="min"> <i class="fas fa-step-forward"></i></a>
            <a href="#" class="min"> <i class="fas fa-sync-alt"></i></a>
        </div>
        <div class="barra-sec">
            <h2>Player secundario </h2>
            <audio src="${link}" controls loop></audio>
        </div>
        <div class="dispositivos">
            <a href="playlist.html" class="playlist">Mi Playlist</a>
            <a href="playlist.html"><i class="fas fa-indent"></i> </a>
        </div>`

        })

        .catch(function (error) {
            console.log(error);
        })

    let canFav = [];

    let recuperoStorage = localStorage.getItem("favorito");

    if (recuperoStorage != null) {
        canFav = JSON.parse(recuperoStorage);
    }
    if (canFav.includes(canc)) {
        document.querySelector(".but-fun .fav").innerHTML = ` quitar de favoritos <i class="material-icons"> favorite </i>`

    }

    let fav = document.querySelector(".but-fun .fav");

    fav.addEventListener("click", function (e) {
        e.preventDefault();

        if (canFav.includes(canc)) {
            let sacarId = canFav.indexOf(canc);
            canFav.splice(sacarId, 1);

            document.querySelector(".but-fun .fav").innerHTML = `Agregar a Favoritos <i class= "material-icons"> favorite-border </i>`

            console.log(canFav);
        } else {

            canFav.push(canc);

            document.querySelector(".but-fun .fav").innerHTML = `Quitar de Favoritos <i class= "material-icons"> favorite </i>`

            let canFavStorage = JSON.stringify(canFav);


            localStorage.setItem("favoritos", canFavStorage);

            console.log(localStorage)


        }



    })



})