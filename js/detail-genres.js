window.addEventListener("load", function () {

    //Definimos las variables que necesitamos para quedarnos con la querystring (ID del género) alojada en una variable, en este caso en genre.
    let queryString = location.search;
    let queryStringObj = new URLSearchParams(queryString);
    let genre = queryStringObj.get('id');

    //Definimos las variables necesarias para trabajar durante el código
    let nombre = document.querySelector(".genreMain h2");
    let artlist = document.querySelector(".genreMain ul");

    //Con este método fetch consumiremos de la API el nombre del género deseado.
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/${genre}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            let nombreGen = datos.name;
            nombre.innerText = `El género ${nombreGen}`;
        })
        .catch(function (error) {
            console.log(error);
        })

    //Con este método fetch consumiremos de la API los artistas relacionados del genero deseado utilizando uno de los métodos que Deezer nos ofrece.
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/${genre}/artists`)
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            let artistas = datos.data;
            for (i = 0; i < 6; i++) {
                let artistaGen = artistas[i].name;
                let artistaid = artistas[i].id;
                let fotoArt = artistas[i].picture_medium;
                artlist.innerHTML += `<li class="gen-art">
            <img src='${fotoArt}' alt='${artistaGen}'>
            <h4 class="canciones"><a href="detail-artist.html?id=${artistaid}">${artistaGen}</a></h4>
            </li> `;
            }
        })
        .catch(function (error) {
            console.log(error);
        })
})