$(document).ready(function () {
    const contenedor = $(".lista-predict");

    function recargaDatos() {
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

                    console.log(lista_predicts);


                    contenedor.append(preeee);
                    //console.log(preeee);
                });


            },
            error: function () {
                alert('Error al cargar las predicciones.');
            }
        });
    }

    recargaDatos();
    function modal() {

        // Delegar evento click en las cartas
        $(".lista-predict").on("click", ".carta", function () {
            const id = $(this).data("id");

            const imagen = $(this).data("imagen");
            const lugar = $(this).data("lugar");
            const fecha = $(this).data("fecha");
            const hora = $(this).data("hora");
            const descripcion = $(this).data("descripcion");
            const temperatura = $(this).data("temperatura");
            const humedad = $(this).data("humedad");
            const viento = $(this).data("viento");
            const precipitacion = $(this).data("precipitacion");

            // Rellenar modal
            $(".modal-imagen").attr("src", imagen).attr("alt", descripcion);
            $(".modal-lugar").text(lugar);
            $(".modal-fecha").text(fecha);
            $(".modal-hora").text(hora);
            $(".modal-descripcion").text(descripcion);
            $(".modal-temperatura").text(temperatura);
            $(".modal-humedad").text(humedad);
            $(".modal-viento").text(viento);
            $(".modal-precipitacion").text(precipitacion);
            $(".modalCarta").fadeIn();
            console.log(hora, fecha);

            console.log("id en el modadl:" + id);
            //guardar el id en el boton de borrar.
            $(".borrar").data("id", id);

            $(".borrar").click(function (e) {
                e.preventDefault();

                const id = $(this).data("id");
                console.log("id a borrar:" + id);

                $.ajax({
                    url: "https://crud-api-neon.vercel.app/api/borrar",
                    method: "DELETE",
                    contentType: "application/json",
                    data: JSON.stringify({ id: id }),
                    success: function (respuesta) {
                        console.log("Carta borrada correctamente:", respuesta);
                        $(".modalCarta").fadeOut();
                        recargaDatos();
                    },
                    error: function (err) {
                        console.error("Error al enviar los datos:", err);
                    }
                });
            });

            // editar 

            $(".editar").data("id", id);
            $(".editar").data("fecha", fecha);
            $(".editar").data("hora", hora);
            $(".editar").data("lugar", lugar);
            $(".editar").data("temperatura", temperatura);
            $(".editar").data("humedad", humedad);
            $(".editar").data("viento", viento);
            $(".editar").data("imagen", imagen);
            $(".editar").data("precipitacion", precipitacion);
            $(".editar").data("descripcion", descripcion);

            $(".editar").click(function (e) {
                e.preventDefault();

                const card = $(this);

                // Sacamos los datos de la carta
                const id = $(this).data("id");
                const lugar = $(this).data("lugar");
                const temperatura = $(this).data("temperatura");
                const hora = $(this).data("hora");
                const humedad = $(this).data("humedad");
                const viento = $(this).data("viento");
                const imagen = $(this).data("imagen");
                const precipitacion = $(this).data("precipitacion");
                const descripcion = $(this).data("descripcion");
                const fecha = $(this).data("fecha");
                console.log(fecha, hora, lugar);

                // Abrimos el modal de edición
                $(".modalEditar").fadeIn();

                let fechaFormateada = fecha ? fecha.split(" ")[0] : "";
                if (hora) {
                    let [h, m] = hora.split(":");
                    if (h.length === 1) h = "0" + h; // agregar cero delante si es hora de un dígito
                    horaFormateada = h + ":" + m;
                }

                // Rellenamos los campos del formulario
                $("#editarFecha").val(fechaFormateada);
                $("#editarhora").val(horaFormateada);
                $("#Editarlugar").val(lugar);
                $("#Editartemperatura").val(temperatura);
                $("#Editardescripcion").val(descripcion);
                $("#Editarhumedad").val(humedad);
                $("#Editarviento").val(viento);
                $("#Editarprecipitacion").val(precipitacion);
                $("#Editaropcion").val(imagen);

                $.ajax({
                    url: `https://crud-api-neon.vercel.app/api/actualizar/${id}`,
                    method: "PUT", 
                    contentType: "application/json",
                    data: JSON.stringify({
                        fecha: fecha,
                        hora: hora,
                        lugar: lugar,
                        temperatura: temperatura,
                        descripcion: descripcion,
                        humedad: humedad,
                        viento_kmh: viento,
                        imagen: opcion,
                        prob_precipitacion: precipitacion
                    }),
                    success: function (respuesta) {
                        console.log("Datos actualizados correctamente:", respuesta);
                        $(".modalCrear").fadeOut(); // Cierra el modal
                        recargaDatos(); // Recarga la información en la página
                    },
                    error: function (err) {
                        console.error("Error al actualizar los datos:", err);
                        alert("No se pudo actualizar la información. Intenta nuevamente.");
                    }
                });




            });
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
        $(".modalEditar").click(function (e) {
            if ($(e.target).is(".modalEditar")) {
                $(".modalEditar").fadeOut();
            }
        });


    }
    modal();




    function modal2() {

        // Delegar evento click en las cartas
        $(".añadir").on("click", function (e) {
            e.preventDefault();
            $(".modalCrear").fadeIn();

            $(".modalCrear form")[0].reset();

        });
        // Cerrar modal si clic fuera del contenido
        $(".modalCrear").click(function (e) {
            if ($(e.target).is(".modalCrear")) {
                $(".modalCrear").fadeOut();
            }
        });

    }
    modal2();

    function enviarFormu() {
        $(".enviarDatos").click(function (e) {
            e.preventDefault(); // Evita que se recargue la página

            // Obtenemos los valores uno a uno
            let fecha = $("#fecha").val();
            let hora = $("#hora").val();
            let lugar = $("#lugar").val();
            let temperatura = $("#temperatura").val();
            let descripcion = $("#descripcion").val();
            let humedad = $("#humedad").val();
            let viento = $("#viento").val();
            let opcion = $("#opcion").val();
            let prob_precipitacion = $("#precipitacion").val();

            $.ajax({
                url: "https://crud-api-neon.vercel.app/api/crear",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    fecha: fecha,
                    hora: hora,
                    lugar: lugar,
                    temperatura: temperatura,
                    descripcion: descripcion,
                    humedad: humedad,
                    viento_kmh: viento,
                    imagen: opcion,
                    prob_precipitacion: prob_precipitacion
                }),
                success: function (respuesta) {
                    console.log("Datos enviados correctamente:", respuesta);
                    $(".modalCrear").fadeOut();
                    recargaDatos();
                },
                error: function (err) {
                    console.error("Error al enviar los datos:", err);
                }
            });
        });
    }
    enviarFormu();

});
