$(document).ready(function () {
    const contenedor = $(".lista-predict");
    contenedor.empty();

    $.ajax({
        url: 'https://crud-api-neon.vercel.app/api/predicciones',
        method: 'GET',
        success: function (lista_predicts) {
            lista_predicts.forEach(predict => {
                const preeee = `
                <section class="carta" data-id="${predict._id}"
                    data-lugar="${predict.lugar}"
                    data-fecha="${predict.fecha}"
                    data-hora="${predict.hora}"
                    data-descripcion="${predict.descripcion}"
                    data-precipitacion="${predict.prob_precipitacion}"
                    data-imagen="${predict.imagen}"
                    data-temperatura="${predict.temperatura}"
                    data-humedad="${predict.humedad}"
                    data-viento="${predict.viento_kmh}">
                    <section class="imgClima">
                        <img src="${predict.imagen}" alt="${predict.descripcion}" class="imagen" />
                    </section>
                    <section class="derec">                
                        <p class="temperatura">${predict.temperatura}°C</p>
                        <p class="humedad">${predict.humedad}% Humedad</p>
                        <p class="viento"> ${predict.viento_kmh} km/h Viento</p>

                    </section>
                </section>`;



                contenedor.append(preeee);
                console.log(preeee);
            });


        },
        error: function () {
            alert('Error al cargar las predicciones.');
        }
    });

    function modal() {

        // Delegar evento click en las cartas
        $(".lista-predict").on("click", ".carta", function () {
            const id = $(this).data("id");

            const imagen = $(this).data("imagen");
            const lugar = $(this).data("lugar");
            const fechaHora = `${$(this).data("fecha")} - ${$(this).data("hora")}`;
            const descripcion = $(this).data("descripcion");
            const temperatura = $(this).data("temperatura");
            const humedad = $(this).data("humedad");
            const viento = $(this).data("viento");
            const precipitacion = $(this).data("precipitacion");

            // Rellenar modal
            $(".modal-imagen").attr("src", imagen).attr("alt", descripcion);
            $(".modal-lugar").text(lugar);
            $(".modal-fecha-hora").text(fechaHora);
            $(".modal-descripcion").text(descripcion);
            $(".modal-temperatura").text(temperatura);
            $(".modal-humedad").text(humedad);
            $(".modal-viento").text(viento);
            $(".modal-precipitacion").text(precipitacion);
            $(".modalCarta").fadeIn();
        });

        // Cerrar modal
        $(".modalCarta .cerrar").click(function () {
            $(".modalCarta").fadeOut();
        });

        // Cerrar modal si clic fuera del contenido
        $(".modalCarta").click(function (e) {
            if ($(e.target).is(".modalCarta")) {
                $(".modalCarta").fadeOut();
            }
        });


    }
    modal();




    function modal2() {

        // Delegar evento click en las cartas
        $(".añadir").on("click", ".carta", function () {
            e.preventDefault();


            const imagen = $(this).data("imagen");
            const lugar = $(this).data("lugar");
            const fechaHora = `${$(this).data("fecha")} - ${$(this).data("hora")}`;
            const descripcion = $(this).data("descripcion");
            const temperatura = $(this).data("temperatura");
            const humedad = $(this).data("humedad");
            const viento = $(this).data("viento");
            const precipitacion = $(this).data("precipitacion");

            
        });

        

        // Cerrar modal si clic fuera del contenido
        $(".modalCrear").click(function (e) {
            if ($(e.target).is(".modalCrear")) {
                $(".modalCrear").fadeOut();
            }
        });


    }
    modal2();
});
