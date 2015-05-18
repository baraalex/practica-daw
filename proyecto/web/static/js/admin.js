/**
 * Created by Alex on 06/04/2015.
 */

function addEquipo() {

    var msg =
        "<span id=\"nameaux\"><h4>Nombre :</h4></span><textarea maxlength='64' cols='1' id='Name' class='textareaDiv' " +
        "placeholder='Enter name'></textarea><span id='campoaux'><h4>Campo :</h4></span><textarea maxlength='250'" +
        " id='Campo' class='textareaDiv' placeholder='Enter campo'></textarea><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable' onchange='readURL(this);'/><img id='preview' src='#' alt='' class='imagePrev'/>";

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
                    //A�adir jugadores
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
        "placeholder='Enter name'></textarea><div class='row row-right'><div class='col-md-6'> <span id='campoaux'><h4>Temporada :</h4></span><select>" +
        "<option value='13/14'>13/14</option> </select></div><div class='col-md-6'><span id=\"neq\"><h4>Numero equipos :</h4></span>" +
        "<input type='number' id='dorsal' min='2' max='100' step='2' value='20'></div></div><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable' onchange='readURL(this);'/><img id='preview' src='#' alt='' class='imagePrev'/>";

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
                    //A�adir jugadores
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
        "<input type='number' id='dorsal' min='1' max='99' value='1'><span id=\"fotoaux\"><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable' onchange='readURL(this);'/><img id='preview' src='#' alt='' class='imagePrev'/>";

    bootbox.dialog({
        closeButton: false,
        title: "A�adir jugador",
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
                    //A�adir jugador
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
        "<span id=\"nameaux\"><h4>Equipos :</h4></span><div class='table-responsive' style='max-height: 20em;overflow: auto;'>" +
        "<table class='table table-striped table-bordered'><thead><tr><th>Nombre</th><th>Borrar</th></tr></thead>" +
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
                    //A�adir jugador
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
        $("#admindiv").html('<div class="col-md-4"><h3 class="sub-header">Tabla</h3> <div class="table-responsive">' +
            '<table id="tabla" class="table table-striped table-bordered dataTable sortable-theme-bootstrap" data-sortable>' +
            '<thead><tr><th>Pos</th><th>Nombre</th><th>Puntos</th></tr></thead><tbody><tr><td>1</td><td>' +
            '<a href="equipoej.html">Lorem</a></td><td>10</td></tr><tr><td>2</td><td><a href="">Lorem 2</a></td>' +
            '<td>120</td></tr><tr><td>3</td><td><a href="">Lorem 3</a></td><td>1560</td></tr></tbody></table></div></div><div class="col-md-4">' +
            '<h3 class="sub-header">Datos de la competicion<div class="input-group" style="float: right;">' +
            '<button type="button" class="btn btn-primary" onclick="modifyComp();" title="Add equipo">' +
            '<span class="fa fa-pencil" aria-hidden="true"></span></button></div></h3><div class="row row-right">' +
            '<div class="col-md-8">a</div><div class="col-md-4"><div class="media-right">' +
            '<a href="Imgs/Escudos/Ej1.png" target="_blank"><img data-holder-rendered="true" ' +
            'src="Imgs/Escudos/Ej1.png" class="media-object imagePrev" data-src="holder.js/64x64" lt="64x64">' +
            '</a></div></div></div></div><div class="col-md-4"><h3 class="sub-header">Jornada</h3>' +
            '<div class="jornadapicker" style="display: block"><table class="table table-condensed"><thead><tr>' +
            '<th colspan="5" class="text-center name">Jornadas</th></tr></thead><tbody id="jornadastable">' +
            '<tr><td class="day old">5</td><td class="day">6</td><td class="day">7</td><td class="day">8</td>' +
            '<td class="day">9</td></tr></tbody> </table></div>');
            Sortable.init();
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
        $("#admindiv").html('<div class="col-md-6"><h3 class="sub-header">Jugadores<div class="input-group" ' +
            'style="float: right;"><button type="button" class="btn btn-primary" onclick="addJugador();" ' +
            'title="Add equipo"><span class="fa fa-plus" aria-hidden="true"></span></button></div></h3>' +
            '<div class="table-responsive"><table class="table table-striped table-bordered dataTable sortable-theme-bootstrap" data-sortable>' +
            '<thead><tr><th>Nombre</th><th>Dorsal</th><th>Posicion</th></tr></thead>' +
            '<tbody><tr><td>Jugador</td><td>15</td><td>MC</td></tr></tbody></table></div></div><div class="col-md-6">' +
            '<h3 class="sub-header">Datos del club        <div class="input-group" style="float: right;">' +
            '<button type="button" class="btn btn-primary" onclick="modifyEq();" title="Add equipo">' +
            '<span    class="fa fa-pencil" aria-hidden="true"></span></button></div></h3><div class="row row-right">' +
            '<div class="col-md-8">a</div><div class="col-md-4"><div class="media-right">' +
            '<a href="Imgs/Escudos/Ej1.png" target="_blank"><img data-holder-rendered="true" ' +
            'src="Imgs/Escudos/Ej1.png" class="media-object imagePrev" data-src="holder.js/64x64"' +
            ' alt="64x64"></a></div></div></div></div>');
        Sortable.init();
    }
}

function jornada(jor) {
    var msg =
        "<span id=\"nameaux\"><h4>Partidos :</h4></span><div class='jornada'>" +
        "<table class='table table-striped table-bordered dataTable sortable-theme-bootstrap'' id='jornadaTable'><thead><tr><th>editar</th><th>Local</th>" +
        "<th>Visitante</th><th>Resultado</th></tr></thead>" +
        "<tbody id='tablebody'><tr><td class='butt' onclick='partido(0,1);'><span class='fa fa-pencil-square-o'></span></td>" +
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
    var msg = "<div  id ='alert' style='display:none;'' class='alert alert-warning alert-dismissible' role='alert'>"+
    "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"+
  "<strong>Error!</strong>goles negativos</div>"    +
        "<div class='row row-right'><div class='col-md-6'> <span id='campoaux'><h4>Local :</h4></span>" +
        "<li>Goles: <span id='golLocalTotal' class='badge gol'>0</li><li>Estadisticas:" +
        "<div class='jornada'><table><thead><tr><th>Nombre</th><th>Dorsal</th><th>Posicion</th><th>Amarillas</th><th>Rojas</th><th>Goles</th><th>Goles PP</th></tr></thead>" +
        "<tbody><tr><td>Jugador</td><td>15</td><td>MC</td><td><input type='number' min='0' max='2' value='0' style='width: 5em;'></td><td>" +
        "<input type='checkbox'></td><td><input name='golLocal' type='number' min='0' max='100' value='0' style='width: 5em;' onchange='calcGol();'required=''></td>" +
        "<td><input name='golLocalpp' type='number' min='0' max='100' value='0' style='width: 5em;' onchange='calcGol();'required=''></td></tr></tbody></table></div></li>" +
        "</div><div class='col-md-6'><span id=\"neq\"><h4>Visitante :</h4></span>" +
        "<li>Goles: <span id='golVisitanteTotal' class='badge gol'>0</span></li><li>Estadisticas:" +
        "<div class='jornada'><table><thead><tr><th>Nombre</th><th>Dorsal</th><th>Posicion</th><th>Amarillas</th><th>Rojas</th><th>Goles</th><th>Goles PP</th></tr></thead>" +
        "<tbody><tr><td>Jugador</td><td>15</td><td>MC</td><td><input type='number' min='0' max='2' value='0' style='width: 5em;'></td><td>" +
        "<input type='checkbox'></td><td><input name='golVisitante' type='number' min='0' max='100' value='0' style='width: 5em;' onchange='calcGol();' required=''></td>" +
        "<td><input type='number' name='golVisitantepp' min='0' max='100' value='0' style='width: 5em;' onchange='calcGol();'required=''></td></tr></tbody></table></div></li></div></div>";
    bootbox.dialog({
        closeButton: false,
        title: "Partido: ",
        className: "part-width",
        message: msg,
        buttons: {
            ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success",
                callback: function (e) {
                var local = document.getElementsByName("golLocal");
                var localpp = document.getElementsByName("golLocalpp");
                var visitante = document.getElementsByName("golVisitante");
                var visitantepp = document.getElementsByName("golVisitantepp");
                var loc = 0;
                var vis = 0;

                for(i=0;i<local.length;i++){
                    if(parseInt(local[i].value)<0){
                        $("#alert").css({"display":"block"});
                        e.preventDefault();
                        return false;
                    }
                }

                for(i=0;i<visitantepp.length;i++){
                    if(parseInt(visitantepp[i].value)<0){
                        $("#alert").css({"display":"block"});
                        e.preventDefault();
                        return false;
                    }
                }

                for(i=0;i<visitante.length;i++){
                    if(parseInt(visitante[i].value)<0){
                        $("#alert").css({"display":"block"});
                        e.preventDefault();
                        return false;
                    }
                }

                for(i=0;i<localpp.length;i++){
                    if(parseInt(localpp[i].value)<0){
                    $("#alert").css({"display":"block"});
                        e.preventDefault();
                        return false;
                    }
                }

                    var goles = $("#golLocalTotal").html() + "-" + $("#golVisitanteTotal").html();
                    $("#res" + pos).empty();
                    $("#res" + pos).html(goles);
                }
            },
            cancel: {
                label: '<span class="fa fa-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });
}


function calcGol() {

    var local = document.getElementsByName("golLocal");
    var localpp = document.getElementsByName("golLocalpp");
    var visitante = document.getElementsByName("golVisitante");
    var visitantepp = document.getElementsByName("golVisitantepp");
    var loc = 0;
    var vis = 0;

    for(i=0;i<local.length;i++){
        if(parseInt(local[i].value)<0){
            $("#alert").css({"display":"block"});}
        loc = loc + parseInt(local[i].value);
    }

    for(i=0;i<visitantepp.length;i++){
        if(parseInt(visitantepp[i].value)<0){
            $("#alert").css({"display":"block"});}
        loc = loc + parseInt(visitantepp[i].value);
    }

    for(i=0;i<visitante.length;i++){
        if(parseInt(visitante[i].value)<0){
            $("#alert").css({"display":"block"});}
        vis = vis + parseInt(visitante[i].value);
    }

    for(i=0;i<localpp.length;i++){
        if(parseInt(localpp[i].value)<0){
            $("#alert").css({"display":"block"});}
        vis = vis + parseInt(localpp[i].value);
    }

    $("#golLocalTotal").empty();
    $("#golLocalTotal").html(loc);
    $("#golVisitanteTotal").empty();
    $("#golVisitanteTotal").html(vis);

}

function modifyEq() {
    var msg =
        "<span id=\"nameaux\"><h4>Nombre :</h4></span><textarea maxlength='64' cols='1' id='Name' class='textareaDiv' " +
        "placeholder='Enter name'></textarea><span id='campoaux'><h4>Campo :</h4></span><textarea maxlength='250'" +
        " id='Campo' class='textareaDiv' placeholder='Enter campo'></textarea><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable' onchange='readURL(this);'/><img id='preview' src='#' alt='' class='imagePrev'/>";

    bootbox.dialog({
        closeButton: false,
        title: "Nuevo equipo",
        message: msg,
        buttons: {
            ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success",
                callback: function () {
                }
            },
            cancel: {
                label: '<span class="fa fa-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });
}

function modifyComp() {
    var msg =
        "<span id=\"nameaux\"><h4>Nombre :</h4></span><textarea maxlength='64' cols='1' id='Name' class='textareaDiv' " +
        "placeholder='Enter name'></textarea><span id='campoaux'><h4>Temporada :</h4></span><select>" +
        "<option value='13/14'>13/14</option> </select><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable' onchange='readURL(this);'/><img id='preview' src='#' alt='' class='imagePrev'/>";

    bootbox.dialog({
        closeButton: false,
        title: "Modificar Competicion",
        message: msg,
        buttons: {
            ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success",
                callback: function () {
                }
            },
            cancel: {
                label: '<span class="fa fa-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });
}