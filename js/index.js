window.addEventListener("load", function(){


fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/tracks")
.then(function(respuesta){
console.log(respuesta);
return respuesta.json();
})

.then(function(datos){
    let canciones = datos.data;
    console.log(canciones);
    let listaC = document.querySelector(".songs ul");

    for (let i=0; i < canciones.length; i++ ){
        let cancion = canciones[i];
        let title = canciones[i].title;
        let url = canciones[i].artist.picture;
        let cantante= canciones[i].artist.name;
        listaC.innerHTML += `
        <li> 
        <img src="${url}" alt="${title}">
        <div>
             <h4 class="canciones"><a href="detail-track.html"> ${title}</a></h4>
             <a href="detail-artist.html" class="cantante"> ${cantante}</a>
            </div>
        </li>
        `
    }
})
.catch(function(error){
    console.log("El error fue:" + error);
})




































})