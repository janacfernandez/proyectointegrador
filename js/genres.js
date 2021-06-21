window.addEventListener("load", function () {

    let list = document.querySelector(".genres")
    let generos = [132, 116, 122, 152, 106, 144]
    
    for(let i=0; i <generos.length; i++){
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
                   /* let seccion = document.querySelector(`.genres li`)
                    console.log(seccion)
                    seccion.style.backgroundImage += `url('${imagenGenero}')`;*/
                })
            }
    })