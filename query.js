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