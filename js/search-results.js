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

    let string = location.search;
    let stringObject = new URLSearchParams(string)
    let busqueda = stringObject.get('search')
    console.log(busqueda)

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${busqueda}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (datos) {
        console.log(datos);
            /*let resultados = datos.data
            for (i=0; i<resultados.length; i++){
            }*/
        })
    .catch(function (error) {
        console.log(error);
    })

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=${busqueda}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (datos) {
        console.log(datos);
            /*let resultados = datos.data
            for (i=0; i<resultados.length; i++){
            }*/
        })
    .catch(function (error) {
        console.log(error);
    })


    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist?q=${busqueda}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (datos) {
        console.log(datos);
            /*let resultados = datos.data
            for (i=0; i<resultados.length; i++){
            }*/
        })
    .catch(function (error) {
        console.log(error);
    })


})