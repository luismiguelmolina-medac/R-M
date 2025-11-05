var page = 1;
var cargando = false;
$(document).ready(function () {
    let lista = $(".item-list");

    cargarPersonajes(lista, page);


    lista.scroll(function () {
        let pos = lista.scrollTop();
        let altura = lista.height();
        let alturaTotal = lista[0].scrollHeight;

        let distanciaRestante = alturaTotal - (pos + altura);

        if (distanciaRestante < 400 && !cargando) {
            cargarPersonajes(lista);
        }
    });

    let delayTimer;
    $(".left-column input").keyup(function (event) {
        clearTimeout(delayTimer);
        if (event.key === "Enter") {
            $("#buscar").hide();
            return;
        }
        delayTimer = setTimeout(() => {
            cargarBusqueda($(this).val());
        }, 1000);
    });
});

function cargarPersonajes(lista) {

    cargando = true;
    $.get("https://rickandmortyapi.com/api/character?page=" + page).then(response => {
        if (page > response.info.pages) {
            return;
        }
        response.results.forEach(character => {
            let item = `<div class="item">
                            <img src="${character.image}" alt="Item 1">
                            <span>${character.name}</span>
                        </div>`
            lista.append(item);
        });
        if (page <= response.info.pages) {
            page++;
        }
        cargando = false;
    }).catch(error => {
        console.log(error);
    });
}

function cargarBusqueda(texto) {
    $.get("https://rickandmortyapi.com/api/character?name=" + texto).then(response => {
        let buscar = $("#buscar");
        buscar.empty();
        let i = 0;
        response.results.forEach(character => {
            if (i >= 5) return;
            let item = `<p onclick="setBuscar('${character.name}')">${character.name}</p>`;
            $("#buscar").append(item);
            i++;
        });
        buscar.show();
    }).catch(error => {
        console.log(error);
    });
}

function setBuscar(texto) {
    $("#buscar").hide();
    $(".left-column input").val(texto);
}

function motrarGaleria() {
    let scrollTop = $(".item-list").scrollTop();
    let primerVisible = null;

    $(".item-list").children(".item").each(function () {
        let elem = $(this);
        let offset = elem.position().top; // posición relativa dentro del contenedor

        if (offset + elem.outerHeight() > 0) { // parte visible
            primerVisible = elem;
            return false; // detener el each (ya lo encontramos)
        }
    });

    $(".gallery  > div").empty();
    for (let i = 0; i < 9; i++) {
        let elem = primerVisible.nextAll(".item").eq(i);
        if (elem.length === 0) break;

        $(".gallery > div").append('<div class="col-4"><img src="' + elem.find("img").attr("src") + '" alt="Character Image"></div>');
        ;
    }
}