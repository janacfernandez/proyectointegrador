window.addEventListener("load", function () {

    let queryString = location.search;
    let queryStringObj = new URLSearchParams(queryString);  
    let genre = queryStringObj.get('id');
    let nombre = document.querySelector(".genreMain h2")
    
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/${genre}`)
        .then(function (response) {
        return response.json();
        })
        .then(function (datos) {
        console.log(datos);
        let nombreGen = datos.name;
        console.log(nombreGen)
        nombre.innerText = `El género ${nombreGen}`;
        })
        .catch(function (error) {
        console.log(error)
        })
        console.log(genre)

    let artlist = document.querySelector(".genreMain ul")
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/${genre}/artists`)
        .then(function (response) {
        return response.json();
        })
        .then(function (datos) {
        console.log(datos);
        let artistas = datos.data
        let artistaGen = artistas.name;
        console.log(artistaGen)
            for(i = 0; i < 6; i++ ){
            let artistaGen = artistas[i].name;
            let artistaid = artistas[i].id
            let fotoArt = artistas[i].picture_medium;
            console.log(artistaGen)
            artlist.innerHTML += `<li class="gen-art">
            <img src='${fotoArt}' alt='${artistaGen}'>
            <h4 class="canciones"><a href="detail-artist.html?id=${artistaid}">${artistaGen}</a></h4>
            </li> `;
            }
        })
        .catch(function (error) {
        console.log(error)
        })
})
