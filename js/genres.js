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
    let genI = 132
    let genIi = 116
    let genIii = 122
    let genIv = 152
    let genV = 106
    let genVi = 144
    
    function genero (genre){
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/${genre}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (datos) {
                console.log(datos);
                let nombreGenero = datos.name;
                let imagenGenero = datos.picture;
                let gen = datos.id
                console.log(gen);
                list.innerHTML += `<a href="detail-genres.html?id=${gen}">
                    <li class="sec-art-ppal" id="${genre}">
                        <h2>${nombreGenero}</h2>
                    </li>
                </a>`;
                let seccion = document.querySelector(`.genres li`)
                console.log(seccion)
                seccion.style.backgroundImage += `url('${imagenGenero}')`;
            })

        }

        genero(genI)
        genero(genIi)
        genero(genIii)
        genero(genIv)
        genero(genV)
        genero(genVi)
    })