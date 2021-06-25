window.addEventListener("load", function () {

    let list = document.querySelector(".genres")
    //Guardaremos en un array los ids de los géneros que querramos que nuestra web ofrezca, ya que para esto la API de Deezer no nos ofrecia un chart (o generos en tendencia) como si lo hacia por ejemplo con artistas.
    let generos = [132, 116, 122, 152, 106, 144]

    //Utilizamos un bucle for para recorrer el array que definimos anteriormente y para que por cada género haga las acciones que queríamos (especificadas en el .then())
    for (let i = 0; i < generos.length; i++) {
        let genre = generos[i];
        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/${genre}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (datos) {
                let nombreGenero = datos.name;
                let imagenGenero = datos.picture_medium;
                list.innerHTML += `<a href="detail-genres.html?id=${genre}">
                        <li style="background-image: url('${imagenGenero}')" class="sec-art-ppal">
                            <h2>${nombreGenero}</h2>
                        </li>
                    </a>`;
            })
            .catch(function (e) {
                console.log(e);
            })
    }
})