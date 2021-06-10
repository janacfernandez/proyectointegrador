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
        }
        else {
            icon.innerText = "menu";
        }
        if (this.hasAttribute("href")) {
            let destino = this.getAttribute("href");
            window.location = destino;
        }
    }

    console.log(window);

    console.log(window.location);

    console.log(window.location.search);


    let playlist = document.querySelector(".sec-play-sec .playlist");

    let recuperoStorage = localStorage.getItem("favorito");

    console.log(recuperoStorage);

    let canRecuperadas = JSON.parse(recuperoStorage);

    for (let i = 0; i < canRecuperadas.length; i++) {
        const cancion = canRecuperadas[i];


        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${cancion}`)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (datos) {
                let tracks = datos.album.title;
                let  trackID = datos.id;
                let nombreArt2 = datos.artist.name;
                let artId = datos.artist.id;
                let cancion = datos.title;
                let imgCan = datos.album.cover_big;
                let link = datos.preview;

                playlist.innerHTML += `   <li class="play-can">
            <img src="${imgCan}" alt="${cancion}">
            <div class="text">
                <h4 class="canciones"><a href="detail-track.html?id=${trackID}">${cancion}</a></h4>
                <a href="detail-artist.html?id=${artId}" class="artista"> ${nombreArt2}</a>
                </div>
             <audio src="${link}" controls loop></audio> 
            <p class="favorito"> <a href="#"><i class="far fa-heart"></i></a></p>
           
        </li>`

            })
                    .catch(function (error) {
                        console.log("el error fue" + error);
                    })

                }


    

    

})