window.addEventListener("load", function () {

    let queryString = location.search;
    let queryStringObjt = new URLSearchParams(queryString);
    let pod = queryStringObjt.get("id");
    console.log(pod);
    let podacast = document.querySelector(".pod");
    let podInfo = document.querySelector(".pod .pod-info ");
    let pod2 = document.querySelector(".pod .pod2");


    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/podcast/${pod}`)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (datos) {
            let p = datos;
            console.log(p);
            let podT = datos.title;
            console.log(podT);
            let descr = datos.description;
            let img = datos.picture_big;
            let fans = datos.fans;
            let link = datos.link


            podInfo.innerHTML +=
                `<h2>${podT}</h2>
            <img src="${img}" alt="${podT}">`;

            pod2.innerHTML += `
            <p>${descr}</p>
            <p>Número de Fans: ${fans} </p>
            <h3><a href="${link}" target="_blank">Escuchar en Deezer</a></h3>`;


        })

        .catch(function (error) {
            console.log(error);
        })


})