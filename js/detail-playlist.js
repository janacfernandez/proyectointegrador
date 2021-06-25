window.addEventListener("load", function () {
    //Definimos las variables necesarias para guardar en una variable el query string el cual en este caso nos indica el id de la playlist seleccionada.
    let queryString = location.search;
    let queryStringObjt = new URLSearchParams(queryString);
    let playP = queryStringObjt.get("id");

    //Definimos todas las variables necesarias que alojan nodos del DOM para poder modificarlos durante el código.
    let playerP = document.querySelector(".track iframe");
    let playlist = document.querySelector(".track h1 ");
    let h2 = document.querySelector(".play-info h2");
    let desc = document.querySelector(".play-info p");

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/${playP}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            let playT = datos.title;
            let info = datos.creator.name;
            let descr = datos.description;
            playlist.innerText += `${playT}`
            playerP.src = `https://widget.deezer.com/widget/dark/playlist/${playP}`;
            h2.innerText += `${descr}`;
            desc.innerText += `${info}`;
        })
        .catch(function (error) {
            console.log(error);
        })
})