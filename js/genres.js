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

    let list = document.querySelector(".genres")
    
    for (let i=2; i < 8; i++){
        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/${i}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (datos) {
                console.log(datos);
                let nombreGenero = datos.name;
                let imagenGenero = datos.picture_medium;
                console.log(nombreGenero);
                console.log(imagenGenero)
                list.innerHTML += `<a href="detail-genres.html">
                    <li class="sec-art-ppal" id="${nombreGenero}">
                        <h2>${nombreGenero}</h2>
                    </li>
                </a>`;
                let seccion = document.querySelector(".genres a li")
                seccion.style.backgroundImage += `url('${imagenGenero}')`;
            })

            .catch(function (error) {
                console.log(error)
            })
        }

    })