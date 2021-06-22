window.addEventListener("load", function () {

     let queryString = location.search;
    let queryStringObjt = new URLSearchParams(queryString);
    let playP = queryStringObjt.get("id");
    console.log(playP);
    let playlist2 = document.querySelector(".track");
    let playerP = document.querySelector(".track iframe");
    let playlist= document.querySelector(".track h1 ");
    let h2 = document.querySelector(".play-info h2");
    let desc = document.querySelector(".play-info p");

 
    
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/${playP}`)
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (datos) {
        let p = datos;
        console.log(p);
        let playT = datos.title;
        console.log(playT);
        let info = datos.creator.name;
        let descr = datos.description; 

       playlist.innerText += `${playT}`
       playerP.src = `https://widget.deezer.com/widget/dark/playlist/${playP}`;
       h2.innerText += `${descr}`;
       desc.innerText += `${info}`;
      

      



    })
    
    .catch(function (error) {
        console.log(error);
    })


})