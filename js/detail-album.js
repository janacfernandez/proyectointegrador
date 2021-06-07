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
        let idAlbum = queryStringObj.get('id');
        let cambioJava = document.querySelector("main")
    
        console.log(idAlbum)

       
        
        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${idAlbum}`)
        .then(function (response) {
            return response.json();

        })
        .then(function (datos) {
            let basico=datos
            console.log(basico);

            let titulo=datos.title;
            console.log(titulo);

            let artista=datos.artist.name
            console.log(artista);

            let foto=datos.cover
            console.log(foto)


let tracklist=basico.tracks.data.title
console.log(tracklist)



 
cambioJava.innerHTML += ` <section class="main-alb">
<article class="alb-info">
      <h2>${titulo}</h2>
      <img src="${foto}" alt="Iluminate">
      <a href="/detail-artist.html">
          <h3>${artista}</h3>
      </a>
      <p>Genero: <a href="detail-genres.html">Pop</a></p>
  </article>
  <article class="tracklist">
      <h3>Tracklist</h3>
      <ol>
          <li>Ruin</li>
          <li>Mercy</li>
          <li>Treat You Better</li>
          <li>Three Empty word</li>
          <li>Don't Be A Fool</li>
          <li>Like This</li>
          <li>No promises</li>
          <li>Lights on</li>
          <li>Honest</li>
          <li>Patience</li>
          <li>Bad Reputation</li>
          <li>Understand</li>
          <li>There's Nothing Holdin' Me Back</li>
      </ol>
  </article>
</section>
`;



        })
            

        .catch(function (error) {
                console.log(error);
        
            })
        

            fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${idAlbum}`)
            .then(function (response) {
                return response.json();
    
            })
            .then(function (datos) {
                console.log(datos)
                
            })
                
    
            .catch(function (error) {
                    console.log(error);
                })          


//onload    
})