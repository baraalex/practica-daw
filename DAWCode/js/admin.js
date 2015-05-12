/**
 * Created by Alex on 06/04/2015.
 */

function addEquipo() {

    var msg =
        "<span id=\"nameaux\"><h4>Nombre :</h4></span><textarea maxlength='64' cols='1' id='Name' class='name' " +
        "placeholder='Enter name'></textarea><span id='campoaux'><h4>Campo :</h4></span><textarea maxlength='250'" +
        " id='Campo' class='name' placeholder='Enter campo'></textarea><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' onchange='readURL(this);'/><img id='blah' src='#' alt='your image' class='imagePrev'/>";

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
        "<span id=\"nameaux\"><h4>Nombre :</h4></span><textarea maxlength='64' cols='1' id='Name' class='name' " +
        "placeholder='Enter name'></textarea><span id='campoaux'><h4>Temporada :</h4></span><select>" +
        "<option value='13/14'>13/14</option> </select><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' onchange='readURL(this);'/><img id='blah' src='#' alt='your image' class='imagePrev'/>";

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
        "<span id=\"nameaux\"><h4>Nombre :</h4></span><textarea id='Name' maxlength='64' class='name' " +
        "placeholder=\"Enter name\"></textarea><span id=\"dorsalaux\"><h4>Dorsal :</h4></span>" +
        "<input type='number' id='dorsal' min='1' max='99'><span id=\"fotoaux\"><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' onchange='readURL(this);'/><img id='blah' src='#' alt='your image' class='imagePrev'/>";

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

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
