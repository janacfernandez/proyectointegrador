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
            let fotoArt = artistas[i].picture_medium;
            console.log(artistaGen)
            artlist.innerHTML += `<li class="gen-art">
            <img src='${fotoArt}' alt='${artistaGen}'>
            <h4 class="canciones"><a href="detail-artist.html?id=">${artistaGen}</a></h4>
            </li> `;
            }
        })
        .catch(function (error) {
        console.log(error)
        })
})
