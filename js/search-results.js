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
                } else {
                    icon.innerText = "menu";
                }
                if (this.hasAttribute("href")) {
                    let destino = this.getAttribute("href");
                    window.location = destino;
                }
            }

            let string = location.search;
            let stringObject = new URLSearchParams(string);
            let busqueda = stringObject.get("q");

            let artTodo = document.querySelector(".todo")

            let listSongs = document.querySelector(".listSongs")
            let listAlbums = document.querySelector(".listAlbums")
            let songsArticle = document.querySelector(".songsArticle")
            let albumsArticle = document.querySelector(".albumsArticle")
            let titulo = document.querySelector("h1")
            let songResults = document.querySelector(".songResults")
            let albumResults = document.querySelector(".albumResults")
            let artistResults = document.querySelector(".artistResults")
            let cancionEspecifico = document.querySelector(".cancionEspecifico")
            let albumEspecifico = document.querySelector(".albumEspecifico")
            let artArt = document.querySelector(".artistas");
            let artAlb = document.querySelector(".albumes")
            let artCanc = document.querySelector(".canciones")

            let artistas = document.querySelector("#artistas");
            let canciones = document.querySelector("#canciones");
            let albumes = document.querySelector("#albumes");

                        
                        

            fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${busqueda}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (datos) {
                        console.log(datos);
                        let resultados = datos.data;
                        console.log(resultados)
                        

                        if (!resultados.length){
                            artistResults.innerHTML = `<h2>No hay resultados para el artista buscado</h2>`
                            songResults.innerHTML = `<h2>No hay resultados para la canción buscada</h2>`
                            cancionEspecifico.innerHTML = `<h2>No hay resultados para la canción buscada</h2>`
                            

                        }else{
                        let imgA = resultados[0].artist.picture_medium;
                        let infoAr = resultados[0].artist.id;
                        let artista = resultados[0].artist.name;
                            titulo.innerText += " " + artista;
                        
                            artTodo.innerHTML += `<li>
                            <figure><img src="${imgA}" alt="${artista}"></figure>
                            <div class="textos">
                                <h3> <a href="detail-artist.html?id=${infoAr}" title="ver ${artista}"> ${artista}</a></h3>
                                <p><a href="detail-artist.html?id=${infoAr}" title="ver ${artista}"><i class="fas fa-arrow-right"></i></a>
                            </div>
                            </li>
                            `
                            
                            for (let i=0; i<4; i++){
                            let cancion = resultados[i].title
                            let cancionId = resultados[i].id
                            let albumFoto = resultados[i].album.cover_medium
                            listSongs.innerHTML += `<li>
                            <figure><img src="${albumFoto}" alt="${cancion}"></figure>
                            <div class="textos">
                                <h3> <a href="detail-track.html?id=${cancionId}" title="ver ${cancion}"> ${cancion}</a></h3>
                                <p><a href="detail-track.html?id=${cancionId}" title="ver ${cancion}"><i class="fas fa-arrow-right"></i></a>
                            </div>
                            </li>
                            `

                            }

                            for (let i=0; i<8; i++){
                            let cancion = resultados[i].title
                            let cancionId = resultados[i].id
                            let albumFoto = resultados[i].album.cover_medium
                            let albumId = resultados[i].album.id
                            let album = resultados[i].album.title
                            songsArticle.innerHTML += `<li>
                            <figure><img src="${albumFoto}" alt="${cancion}"></figure>
                            <div class="textos">
                                <h3> <a href="detail-track.html?id=${cancionId}" title="ver ${cancion}"> ${cancion}</a></h3>
                                <p><a href="detail-track.html?id=${cancionId}" title="ver ${cancion}"><i class="fas fa-arrow-right"></i></a>
                            </div>
                            </li>
                            `

                           }
                        }
                    })
                    .catch(function (e) {
                        console.log(e)
                    })
    
                    
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=${busqueda}`)
    .then(function (response) {
        return response.json();
    })
    .then(function(datos){
            let resultados = datos.data
            console.log(datos.data)
            
            if (!resultados.length){
                albumResults.innerHTML = `<h2>No hay resultados para el album buscado</h2>`
                albumEspecifico.innerHTML = `<h2>No hay resultados para el album buscado</h2>`
                

            }else{
            
            for (let i=0; i<4; i++){
            let albumFoto = resultados[i].cover_medium
            let albumId = resultados[i].id
            let album = resultados[i].title    
            

            listAlbums.innerHTML += `<li>
            <figure><img src="${albumFoto}" alt="${album}"></figure>
            <div class="textos">
                <h3> <a href="detail-album.html?id=${albumId}" title="ver ${album}"> ${album}</a></h3>
                <p><a href="detail-album.html?id=${albumId}" title="ver ${album}"><i class="fas fa-arrow-right"></i></a>
            </div>
            </li>`
            }

            for (let i=0; i<8; i++){
            let albumFoto = resultados[i].cover_medium
            let albumId = resultados[i].id
            let album = resultados[i].title
            albumsArticle.innerHTML += `<li>
            <figure><img src="${albumFoto}" alt="${album}"></figure>
            <div class="textos">
                <h3> <a href="detail-album.html?id=${albumId}" title="ver ${album}"> ${album}</a></h3>
                <p><a href="detail-album.html?id=${albumId}" title="ver ${album}"><i class="fas fa-arrow-right"></i></a>
            </div>
            </li>`
            }
        }
    })
    .catch(function(e){
            console.log(e);
        })

                    artistas.addEventListener("click", function(e){
                        e.preventDefault();
                        console.log(artistas);
                        artistResults.classList.remove("inact")
                        songResults.classList.add("inact");
                        albumResults.classList.add("inact");
                        cancionEspecifico.classList.add("inact")
                        albumEspecifico.classList.add("inact")
                    })
                    albumes.addEventListener("click", function(e){
                        e.preventDefault();
                        songResults.classList.add("inact");
                        albumResults.classList.add("inact")
                        artistResults.classList.add("inact")
                        cancionEspecifico.classList.add("inact")
                        albumEspecifico.classList.remove("inact")
                    })
                    canciones.addEventListener("click", function(e){
                        e.preventDefault();
                        songResults.classList.add("inact");
                        albumResults.classList.add("inact")
                        artistResults.classList.add("inact")
                        cancionEspecifico.classList.remove("inact")
                        albumEspecifico.classList.add("inact")
                    })
                    

            })
                    /* todo.addEventListener("click", function (e) {
                         e.preventDefault();
                             fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${busqueda}`)
                                 .then(function (response) {
                                     return response.json();
                                 })
                                 .then(function (datos) {
                                     console.log(datos);
                                     let resultados = datos.data;
                                     for (let i = 0; i < resultados.length; i++) {
                                         let title = resultados[i].title;
                                         let imgA = resultados[i].picture;
                                         let infoAr = resultados[i].id;
                                         let info = resultados[i].id;
                                         let artista = resultados[i].artist.name;
                                         let type = resultados[i].type;

                                         artTodo.innerHTML += `<li>
                                 <figure><img src="${imgA}" alt="${title}"></figure>
                                 <div class="textos">
                                     <h3> <a href="detail-${type}.html?id=${infoAr}" title="ver ${artista}"> ${title}</a></h3>
                                      <p><a href="detail-artist.html?id=${infoAr}" title="ver ${artista}"><i class="fas fa-arrow-right"></i></a>
                                 </div>
                                 </li>`
                                 /*<p>  </p>
                                    
                                     </p>
                                     }
                                     artTodo.classList.add("act")
                                     artTodo.classList.remove("inact")
                                     artArt.classList.add("inact")
                                     artCanc.classList.add("inact")
                                     artAlb.classList.add("inact")
                                     
                                     artAlb.innerHTML = "";
                                     artCanc.innerHTML = "";
                                     artArt.innerHTML = "";
                                 })
                                 .catch(function (error) {
                                     console.log("el error es " + error);
                                 })
                     })

                     artistas.addEventListener("click", function (e) {
                         e.preventDefault();
                             fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist?q=${busqueda}`)
                                 .then(function (response) {
                                     return response.json();
                                 })
                                 .then(function (datos) {
                                     console.log(datos);
                                     let resultados = datos.data;
                                     for (let i = 0; i < resultados.length; i++) {
                                         let title = resultados[i].title;
                                         let imgA = resultados[i].artist.picture;
                                         let infoAr = resultados[i].artist.id;
                                         let info = resultados[i].id;
                                         let artista = resultados[i].artist.name;

                                         artArt.innerHTML += `<li>
                                     <figure><img src="${imgA}" alt="${title}"></figure>
                                     <div class="textos">
                                         <h3> <a href="detail-artist.html?id=${infoAr}" title="ver ${artista}"> ${artista}</a></h3>
                                         <p>  </p>
                                         <p><a href="detail-artist.html?id=${infoAr}" title="ver ${artista}"><i class="fas fa-arrow-right"></i></a>
                                         </p>
                                     </div>
                                     </li>`
                                     }
                                     artArt.classList.add("act")
                                     artArt.classList.remove("inact")
                                     artCanc.classList.add("inact")
                                     artAlb.classList.add("inact")

                                     artTodo.innerHTML = "";
                                     artAlb.innerHTML = "";
                                     artCanc.innerHTML = "";
                                 })
                                 .catch(function (error) {
                                     console.log("el error es " + error);
                                 })
                     })

                     albumes.addEventListener("click", function (e) {
                         e.preventDefault();
                             fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=${busqueda}&limit=12`)
                                 .then(function (response) {
                                     return response.json();
                                 })
                                 .then(function (datos) {
                                     console.log(datos);
                                     let resultados = datos.data
                                     
                                     for (let i = 0; i < resultados.length; i++) {
                                         let artista = resultados[i].artist.name;
                                         let imgA = resultados[i].cover;
                                         let info = resultados[i].id;
                                         console.log(info);
                                         let album = resultados[i].title;
                                         console.log(album);
                                         let infoA = resultados[i].artist.id

                                         artAlb.innerHTML += `<li>
                                     <figure><img src="${imgA}" alt="${album}"></figure>
                                     <div class="textos">
                                         <h3> <a href="detail-album.html?id=${info}" title="ver ${album}"> ${album}</a></h3>
                                         <p> Album de ${artista} </p>
                                         <p><a href="detail-album.html?id=${info}" title="ver ${album}"><i class="fas fa-arrow-right"></i></a>
                                         </p>
                                     </div>
                                     </li>`
                                     }
                                     
                                     artAlb.classList.remove("inact")
                                     artAlb.classList.add("act")
                                     artCanc.classList.add("inact")
                                     artArt.classList.add("inact")

                                     artTodo.innerHTML = "";
                                     artArt.innerHTML = "";
                                     artCanc.innerHTML = "";
                                 })
                                 .catch(function (error) {
                                     console.log(error);
                                 })
                     })

                     canciones.addEventListener("click", function (e) {
                         e.preventDefault();
                             fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q=${busqueda}&limit=12`)
                                 .then(function (response) {
                                     return response.json();
                                 })
                                 .then(function (datos) {
                                     console.log(datos);
                                     let resultados = datos.data


                                     for (let i = 0; i < resultados.length; i++) {
                                         let track = resultados[i].title_short;
                                         let imgA = resultados[i].album.cover;
                                         let info = resultados[i].id;

                                         artCanc.innerHTML += `<li>
                                         <figure><img src="${imgA}" alt="${track}"></figure>
                                         <div class="textos">
                                             <h3> <a href="detail-track.html?id=${info}" title="ver ${track}"> ${track}</a></h3>
                                             <p>  </p>
                                             <p><a href="detail-track.html?id=${info}" title="ver ${track}"><i class="fas fa-arrow-right"></i></a>
                                             </p>
                                         </div>
                                         </li>`
                                     }
                                     artCanc.classList.add("act")
                                     artCanc.classList.remove("inact")
                                     artArt.classList.add("inact")
                                     artAlb.classList.add("inact")
                                     
                                     artTodo.innerHTML = "";
                                     artAlb.innerHTML = ""
                                     artArt.innerHTML = ""
                                 })
                                 .catch(function (error) {
                                     console.log(error);
                                 })
                     })*/
