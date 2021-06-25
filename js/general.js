window.addEventListener("load", function () {
    /*Definiremos las variables con las cuales trabajremos en el menú*/
    const button = document.querySelector("header button");
    const icon = document.querySelector("header button span");
    const menuNav = document.querySelector("header nav ul");
    const items = document.querySelectorAll("header nav a");

    //Cuando se clickee en el botón contenido en la variale button se ejecutará la función Menu
    button.addEventListener('click', Menu);

    //Para cada uno de los links (for each) se utilizará una función flecha (arrow function) la cual toma como parámetro 'a' y le ponemos un EventListener que se desate cuando hacemos click en cada uno y que posteriormente se ejecute la función Menu.
    items.forEach(a => a.addEventListener('click', Menu));

    //Definimos la función Menu.
    function Menu(e) {
        e.preventDefault();
        menuNav.classList.toggle("visible");
        //Si el menu se encuentra cerrado cambiaremos al ícono de la x cuando se clickee.
        if (icon.innerText == "menu") {
            icon.innerText = "close";
        }
        //Si lo anterior no ocurre quiere decir que el menú esta abierto por lo que cuando el usuario clickee el botón de menu el mismo deberá mostrar el ícono de hamburguesa.
        else {
            icon.innerText = "menu";
        }
        //Finalmente si lo que el usuario clickea tiene un atributo href, es decir es un link, guardamos la ruta en la variable redireccion y redirigimos al usuario a dicha página.
        if (this.hasAttribute("href")) {
            let redireccion = this.getAttribute("href");
            window.location = redireccion;
        }
    }

    //A continuación haremos la validacion del buscador. Capturaremos todas las variables necesarias para poder realizarlo.
    let form = document.querySelector("form");
    let buscar = document.querySelector(".buscar");
    let validador = document.querySelector(".validador");

    //A la variable form (la cual capturo el formulario de busqueda de nuestro html)le agregamos un EventListener con el desencadenante 'submit' es decir que hara las acciones que le indiquemos cuando el usuario haga click en el botón submit.
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        //Este condicional evaluara la longitud de lo que el usuario ingresa. Si es igual a 0 se cumple la primer condición.
        if (buscar.value.length === 0) {
            validador.innerText = "Ingresa algo para buscar"
        }
        //En esta segunda condición evaluamos si la respuesta es menor a 3 caracteres.
        else if (buscar.value.length < 3) {
            validador.innerText = "Debes ingresar al menos tres caracteres"
        }
        //Finalmente si nada de eso ocurre quiere decir que la búsqueda cumple con la validación y podemos con el método submit() redirigir al usuario a la página de search-results, la cual es la 'action' del formulario.
        else {
            this.submit();
        }
    })

    //Esta parte de código nos permite ocultar la leyenda que le mostramos al usuario si esta incumpliendo alguna de nuestras condiciones, cuando el mismo modifica el cmapo de busqueda a través de un evento sobre el campo específico del tipo 'input'
    buscar.addEventListener("input", function () {
        validador.innerText = ""
    })

})