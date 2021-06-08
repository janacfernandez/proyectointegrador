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

    console.log(window);

    console.log(window.location);

    console.log(window.location.search);

    let string = location.search;
    let stringObject = new URLSearchParams(string);
    let busqueda = stringObject.get("q");
    let secResult = document.querySelector(".ppcal-result .secciones-result");
   
    
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${busqueda}&limit=6`)
    .then(function (response) {
        return response.json();
    })
    .then(function (datos) {
        console.log(datos);
            let resultados = datos.data;
            
            for (let i = 0; i < resultados.length; i++){

                let artista = resultados[i].artist.name;
                let imgA = resultados[i].artista.picture;
                let album = resultados[i].album.title;
                let info = resultados[i].id; 

               secResult.innerHTML += ` <article>
                <figure><img src="${imgA}" alt="${artista}"></figure>
                <div class="textos">
                    <h3> <a href="detail-artist.html" title="ver más"> ${info}</a></h3>
                    <p> Cantante, compositor, productor musical y bailarín estadounidense, nacido el
                        8 de octubre de 1985. Su padre es de Puerto Rico y su madre de Filipinas </p>
                    <p><a href="detail-artist.html" title="ver artista"><i class="fas fa-arrow-right"></i></a>
                    </p>
                </div>
            </article> ` }
            })
            .catch(function (error) {
                console.log(error);
            })


            fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=${busqueda}&limit=6`)
            .then(function (response) {
                return response.json();
            })
            .then(function (datos) {
                console.log(datos);
                    let resultados = datos.data
                    for ( let i = 0; i < resultados.length; i++){
                    }
                })
            .catch(function (error) {
                console.log(error);
            })
        
        
            fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist?q=${busqueda}&limit=6`)
            .then(function (response) {
                return response.json();
            })
            .then(function (datos) {
                console.log(datos);
                    let resultados = datos.data
                    for ( let i = 0; i < resultados.length; i++){
                        let artista = resultados[i].artist.name;
                        let imgA = resultados[i].artista.picture;
                        let album = resultados[i].album.title;
        
                       secResult.innerHTML += ` <article>
                        <figure><img src="${imgA}" alt="${artista}"></figure>
                        <div class="textos">
                            <h3> <a href="detail-artist.html" title="ver más"> ${artista}</a></h3>
                            <p> Cantante, compositor, productor musical y bailarín estadounidense, nacido el
                                8 de octubre de 1985. Su padre es de Puerto Rico y su madre de Filipinas </p>
                            <p><a href="detail-artist.html" title="ver artista"><i class="fas fa-arrow-right"></i></a>
                            </p>
                        </div>
                    </article> `
                    }
                })
            .catch(function (error) {
                console.log(error);
            })
    
       


})