/**
 * Created by Alex on 06/04/2015.
 */

function addEquipo() {

    var msg =
        "<span id=\"nameaux\"><h4>Nombre :</h4></span><textarea id='Name' style=\"min-height:60px;max-width:100%;min-width:100%;\" placeholder=\"Enter name\"></textarea>";

    bootbox.dialog({
        closeButton: false,
        title: "Nuevo equipo",
        message: msg,
        buttons: {
            ok: {
                label: '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>',
                className: "btn-success",
                callback: function () {
                }
            },
            cancel: {
                label: '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });
}

function addLiga() {
    var msg =
        "<span id=\"nameaux\"><h4>Nombre :</h4></span><textarea id='Name' style=\"min-height:60px;max-width:100%;min-width:100%;\" " +
        "placeholder=\"Enter name\"></textarea>";

    bootbox.dialog({
        closeButton: false,
        title: "Nueva Liga",
        message: msg,
        buttons: {
            ok: {
                label: '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>',
                className: "btn-success",
                callback: function () {
                }
            },
            cancel: {
                label: '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });
}