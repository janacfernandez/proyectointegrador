// carga el documento antes de empezar los scripts
window.addEventListener("load", function () {
    //alojado todo el querystring
    let queryString = location.search;
    let queryStringObjt = new URLSearchParams(queryString);
    let canc = queryStringObjt.get("id"); //permite obtener el valor del querystring
    let trackPlay = document.querySelector(".detail-track .head");
    let trackDetail = document.querySelector(".detail-track .play-ppal .data");
    let barraSec = document.querySelector(".detail-track .play-ppal .barra-sec ");
    let imgPort = document.querySelector(".detail-track .img");
    let player = document.querySelector(".detail-track iframe");

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

            trackPlay.innerHTML += `<div class="head">
        <a href="" class="exit"> <i class="fas fa-angle-down"></i></a>
        <a href="detail-album.html?id=${albumId}" class="album">${tracks}</a>
        </div> `;
            imgPort.innerHTML += `<img class="i-port" src="${imgCan}" alt="imagendeportada">`;
            trackDetail.innerHTML += `<p> ${cancion} </p>
         <a href="detail-artist.html?id=${artId}"> ${nombreArt2}</a> `;
            barraSec.innerHTML += `<audio src="${link}" controls loop></audio> `;
            player.src = `https://widget.deezer.com/widget/dark/track/${canc}`;
        })
        .catch(function (error) {
            console.log(error);
        })



    //webstorage herramienta para almacenar información en el navegador del usuario , es decir, del lado del cliente//
    // declaro un array vacio, para almacenar las canciones
    let canFav = [];

    //Recupero datos del storage
    let recuperoStorage = localStorage.getItem("favorito");
    console.log(recuperoStorage);
    // utilizo un condicional para saber si hay algo guardado en "favoritos"
    if (recuperoStorage != null) {
        //transformamos la informacion recibida como string en array para que la podamos trabajar
        canFav = JSON.parse(recuperoStorage);

        // si el id de la cancion actual esta en la lista (canc es la variable declarada que contiene el id)
        if (canFav.includes(canc)) {
            let boton = document.querySelector(".but-fun .fav");
            boton.innerHTML = ` Quitar de Playlist <i class="fas fa-heart"></i>`;
        }
    }
    //agregar-sacar cancion actual de playlist

    //link "agregar a playlist"
    let fav = document.querySelector(".but-fun .fav"); //capturamos el elemento de html

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


        } else { //si no esta en la lista

            //chequeamos 
            console.log(canc);
            //se agrega la cancion actual
            canFav.push(canc);

            // si ya fue agregrado, cambiamos el texto del link
            document.querySelector(".but-fun .fav").innerHTML = ` <i class="fas fa-heart"></i> Quitar de Playlist`
        }
        // guardamos el array actualizado como string
        let canFavStorage = JSON.stringify(canFav);
        console.log(canFavStorage);

        // guardamos el string en el LocalStorage
        localStorage.setItem("favorito", canFavStorage);

        //revisamos
        console.log(localStorage);

        ///fin///

    })
})