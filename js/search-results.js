window.addEventListener("load", function () {

    console.log(window);

    console.log(window.location);

    console.log(window.location.search);

    let string = location.search;
    let stringObject = new URLSearchParams(string);
    let busqueda = stringObject.get("q");
    let secResult = document.querySelector(".ppcal-result .secciones-result");



   
    
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${busqueda}&limit=1`)
    .then(function (response) {
        return response.json();
    })
    .then(function (datos) {
        console.log(datos);
            let resultados = datos.data;
            
            for (let i = 0; i < resultados.length; i++){
                let title = resultados[i].title;
                let imgA = resultados[i].artist.picture;
                let infoAr = resultados[i].artist.id;
                let info = resultados[i].id;
                let artista = resultados[i].artist.name;

               secResult.innerHTML += ` <article>
                <figure><img src="${imgA}" alt="${title}"></figure>
                <div class="textos">
                    <h3> <a href="detail-artist.html?id=${infoAr}" title="ver ${artista}"> ${artista}</a></h3>
                    <p>  </p>
                    <p><a href="detail-artist.html?id=${infoAr}" title="ver ${artista}"><i class="fas fa-arrow-right"></i></a>
                    </p>
                </div>
            </article> ` }
            })
            .catch(function (error) {
                console.log("el error es " + error);
            })


           fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=${busqueda}&limit=3`)
            .then(function (response) {
                return response.json();
            })
            .then(function (datos) {
                console.log(datos);
                    let resultados = datos.data
                    for ( let i = 0; i < resultados.length; i++){
                        let artista = resultados[i].artist.name;
                        let imgA = resultados[i].cover;
                        let info = resultados[i].id; 
                        console.log(info);
                        let album = resultados[i].title;
                        console.log(album);
                        let infoA = resultados[i].artist.id

                    secResult.innerHTML += ` <article>
                    <figure><img src="${imgA}" alt="${album}"></figure>
                    <div class="textos">
                        <h3> <a href="detail-album.html?id=${info}" title="ver ${album}"> ${album}</a></h3>
                        <p> Album de ${artista} </p>
                        <p><a href="detail-album.html?id=${info}" title="ver ${album}"><i class="fas fa-arrow-right"></i></a>
                        </p>
                    </div>
                </article> `
                    }

                })
            .catch(function (error) {
                console.log(error);
            }) 
        

            fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q=${busqueda}&limit=5`)
            .then(function (response) {
                return response.json();
            })
            .then(function (datos) {
                console.log(datos);
                    let resultados = datos.data
                    for ( let i = 0; i < resultados.length; i++){
                        let track = resultados[i].title_short;
                        let imgA = resultados[i].album.cover;
                        let info = resultados[i].id; 

                       secResult.innerHTML += ` <article>
                        <figure><img src="${imgA}" alt="${track}"></figure>
                        <div class="textos">
                            <h3> <a href="detail-track.html?id=${info}" title="ver ${track}"> ${track}</a></h3>
                            <p>  </p>
                            <p><a href="detail-track.html?id=${info}" title="ver ${track}"><i class="fas fa-arrow-right"></i></a>
                            </p>
                        </div>
                    </article> `
                    }
                })
            .catch(function (error) {
                console.log(error);
            }) 
    
       


})