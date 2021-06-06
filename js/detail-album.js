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
    
        console.log(album);
        
        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/albums/${idAlbum}`)
        .then(function (response) {
            return response.json();

        })
        .then(function (datos) {
            
       

            .catch(function (error) {
                console.log(error);
            })
        })

        


//onload    
})