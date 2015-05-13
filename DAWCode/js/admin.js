/**
 * Created by Alex on 06/04/2015.
 */

function addEquipo() {

    var msg =
        "<span id=\"nameaux\"><h4>Nombre :</h4></span><textarea maxlength='64' cols='1' id='Name' class='textareaDiv' " +
        "placeholder='Enter name'></textarea><span id='campoaux'><h4>Campo :</h4></span><textarea maxlength='250'" +
        " id='Campo' class='textareaDiv' placeholder='Enter campo'></textarea><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' onchange='readURL(this);'/><img id='blah' src='#' alt='' class='imagePrev'/>";

    bootbox.dialog({
        closeButton: false,
        title: "Nuevo equipo",
        message: msg,
        buttons: {
            ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success",
                callback: function () {
                    addJugadores($("#Name").val());
                    //Añadir jugadores
                }
            },
            cancel: {
                label: '<span class="fa fa-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });
}

function addLiga() {

    var msg =
        "<span id=\"nameaux\"><h4>Nombre :</h4></span><textarea maxlength='64' cols='1' id='Name' class='textareaDiv' " +
        "placeholder='Enter name'></textarea><span id='campoaux'><h4>Temporada :</h4></span><select>" +
        "<option value='13/14'>13/14</option> </select><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' onchange='readURL(this);'/><img id='blah' src='#' alt='' class='imagePrev'/>";

    bootbox.dialog({
        closeButton: false,
        title: "Nuevo Liga",
        message: msg,
        buttons: {
            ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success",
                callback: function () {
                    addEquipos($("#Name").val());
                    //Añadir jugadores
                }
            },
            cancel: {
                label: '<span class="fa fa-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });
}

function addJugador() {
    var msg =
        "<span id=\"nameaux\"><h4>Nombre :</h4></span><textarea id='Name' maxlength='64' class='textareaDiv' " +
        "placeholder=\"Enter name\"></textarea><span id=\"dorsalaux\"><h4>Dorsal :</h4></span>" +
        "<input type='number' id='dorsal' min='1' max='99'><span id=\"fotoaux\"><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' onchange='readURL(this);'/><img id='blah' src='#' alt='' class='imagePrev'/>";

    bootbox.dialog({
        closeButton: false,
        title: "Añadir jugador",
        message: msg,
        buttons: {
            ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success",
                callback: function () {
                    var jug = "<tr><td>" + $("#Name").val() + "</td><td>" + $("#dorsal").val() + "</td><td>" +
                        "<button class='btn btn-danger'><span class='fa fa-remove'' aria-hidden='true'></span></button></td></tr>";
                    $("#tablebody").append(jug);
                }
            },
            cancel: {
                label: '<span class="fa fa-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });
}

function addJugadores(nameEquipo) {

    var msg =
        "<span id=\"nameaux\"><h4>Jugadores :</h4></span><div class='table-responsive' style='max-height: 20em;overflow: auto;'>" +
        "<table class='table table-striped table-bordered'><thead><tr><th>Nombre</th><th>Dorsal</th><th>Borrar</th></tr></thead>" +
        "<tbody id='tablebody'></tbody></table></div> ";

    bootbox.dialog({
        closeButton: false,
        title: "Equipo: " + nameEquipo,
        message: msg,
        buttons: {
            add: {
                label: '<span class="fa fa-plus" aria-hidden="true"></span>',
                className: "btn-primary",
                callback: function () {
                    addJugador();
                    e.preventDefault();
                    return false;
                    //Añadir jugador
                }
            }, ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success"
            },
            cancel: {
                label: '<span class="fa fa-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });
}

function addEquipos(nameLiga) {

    var msg =
        "<span id=\"nameaux\"><h4>Jugadores :</h4></span><div class='table-responsive' style='max-height: 20em;overflow: auto;'>" +
        "<table class='table table-striped table-bordered'><thead><tr><th>Nombre</th><th>Dorsal</th><th>Borrar</th></tr></thead>" +
        "<tbody id='tablebody'></tbody></table></div> ";

    bootbox.dialog({
        closeButton: false,
        title: "Equipo: " + nameLiga,
        message: msg,
        buttons: {
            add: {
                label: '<span class="fa fa-plus" aria-hidden="true"></span>',
                className: "btn-primary",
                callback: function () {
                    addJugador();
                    e.preventDefault();
                    return false;
                    //Añadir jugador
                }
            }, ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success"
            },
            cancel: {
                label: '<span class="fa fa-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });
}

function change(bool) {
    if (bool == true) {
        $("#addbtt").empty();
        $("#addbtt").html('<div class="input-group"><button type="button" class="btn btn-success" title=" Add liga" ' +
        'onclick="addLiga();"><span class="fa fa-plus" aria-hidden="true"></span></button></div>');
        $("#admindiv").empty();
        $("#admindiv").html('<div class="col-md-4"><h3 class="sub-header">Equipos</h3></div><div class="col-md-4">' +
        '<h3 class="sub-header">Datos de la competicion</h3></div><div class="col-md-4"><h3 class="sub-header">Jornada</h3>' +
        '<div class="datepicker datepicker-inline datepicker-days" style="display: block"><table class="table table-condensed"><thead><tr>' +
        '<th colspan="5" class="text-center name">Jornadas</th></tr></thead><tbody id="jornadastable">' +
        '<tr><td class="day">5</td><td class="day">6</td><td class="day">7</td><td class="day">8</td>' +
        '<td class="day">9</td></tr></tbody> </table></div>');
        $(".day").click(function () {
            $('.day').removeClass('active');
            $(this).addClass('active');
            jornada($(this).html());
        });

    } else {
        $("#addbtt").empty();
        $("#addbtt").html('<div class="input-group"><button type="button" class="btn btn-success" title=" Add equipo"' +
        'onclick="addEquipo();"><span class="fa fa-plus" aria-hidden="true"></span></button></div>');
        $("#admindiv").empty();
        $("#admindiv").html('<div class="col-md-4"><h3 class="sub-header">Jugadores</h3></div><div class="col-md-4">' +
        '<h3 class="sub-header">Datos del club</h3></div><div class="col-md-4"></div>');

    }
}

function jornada(jor) {
    var msg =
        "<span id=\"nameaux\"><h4>Partidos :</h4></span><div class='jornada' style='max-height: 20em;overflow: auto;'>" +
        "<table class='table' id='jornadaTable'><thead><tr><th>editar</th><th>Local</th>" +
        "<th>Visitante</th><th>Resultado</th></tr></thead>" +
        "<tbody id='tablebody'><tr><td class='day' onclick='partido(0,1);'><span class='fa fa-pencil-square-o'></span></td>" +
        "<td>eq1</td><td>eq2</td><td id='res1'>1-2</td></tr></tbody></table></div> ";

    bootbox.dialog({
        closeButton: false,
        title: "Jornada: " + jor,
        message: msg,
        className: "jor-width",
        buttons: {
            ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success"
            },
            cancel: {
                label: '<span class="fa fa-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });
}

function partido(id, pos) {
    var msg = "<span id=\"nameaux\"><h4>Nombre :</h4></span><textarea maxlength='64' cols='1' id='Name' class='textareaDiv' " +
        "placeholder='Enter name'></textarea><span id='campoaux'>";
    bootbox.dialog({
        closeButton: false,
        title: "Partido: ",
        className: "part-width",
        message: msg,
        buttons: {
            ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success",
                callback: function () {
                    $("#res" + pos).empty();
                    $("#res" + pos).html("3-4");
                }
            },
            cancel: {
                label: '<span class="fa fa-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });
}