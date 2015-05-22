/**
 * Created by Alex on 06/04/2015.
 */

function addEquipo() {

    var msg = "<div  id ='alert'  class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>El nombre del equipo y el campo no pueden estar vacios</div>" +
        "<span id=\"nameaux\"><h4>Nombre :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-font' aria-hidden='true'></span></span>"+
        "<input id='Name' type='text' class='form-control' placeholder='Enter name' aria-describedby='sizing-addon2' maxlength='64'>"+
        "</div><span id='campoaux'><h4>Campo :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-building' aria-hidden='true'></span></span>"+
        "<input id='Campo' type='text' class='form-control' placeholder='Enter campo' aria-describedby='sizing-addon2' maxlength='250'>"+
        "</div><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable'/><img id='preview' src='#' alt='' class='imagePrev'/>";

    bootbox.dialog({
        closeButton: false,
        title: "Nuevo equipo",
        message: msg,
        buttons: {
            ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success",
                callback: function () {
                    var name = $("#Name").val();
                    var campo = $("#Campo").val();
                    if (name == "" || name == null || campo == "" || campo == null) {
                        $("#alert").css({"display": "block"});
                        e.preventDefault();
                        return false;
                    }
                    else {
                        $("#alert").css({"display": "none"});
                        addJugadores(name);
                    }
                }
            },
            cancel: {
                label: '<span class="fa fa-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });
    $(".selectable").change(function () {
        readURL(this);
    });

}

function addLiga() {

    var msg = "<div  id ='alert'  class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>El nombre de la liga no puede estar vacio y los equipos deben ser validos</div>" +
        "<span id=\"nameaux\"><h4>Nombre :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-font' aria-hidden='true'></span></span>"+
        "<input id='Name' type='text' class='form-control' placeholder='Enter name' aria-describedby='sizing-addon2' maxlength='64'>"+
        "</div><div class='row row-right'><div class='col-md-6'> <span id='campoaux'><h4>Temporada :</h4></span><select>" +
        "<option value='13/14'>13/14</option> </select></div><div class='col-md-6'><span><h4>Numero equipos :</h4></span>" +
        "<input type='number' id='neq' min='2' max='100' step='2' value='38'></div></div><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable'/><img id='preview' src='#' alt='' class='imagePrev'/>";

    bootbox.dialog({
        closeButton: false,
        title: "Nuevo Liga",
        message: msg,
        buttons: {
            ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success",
                callback: function (e) {

                    var name = $("#Name").val();
                    var neq = $("#neq").val();
                    if (name == "" || name == null || neq < 2 || neq > 100) {
                        $("#alert").css({"display": "block"});
                        e.preventDefault();
                        return false;
                    }
                    else {
                        $("#alert").css({"display": "none"});
                        addEquipos(name, neq);
                    }
                }
            },
            cancel: {
                label: '<span class="fa fa-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });
    $(".selectable").change(function () {
        readURL(this);
    });
}

function addJugador() {
    var msg = "<div  id ='alert'  class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>El nombre del jugador no puede estar vacio</div>" +
        "<span id=\"nameaux\"><h4>Nombre :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-child' aria-hidden='true'></span></span>"+
        "<input id='Name' type='text' class='form-control' placeholder='Enter name' aria-describedby='sizing-addon2' maxlength='64'>"+
        "</div><span id=\"dorsalaux\"><h4>Dorsal :</h4></span>" +
        "<input type='number' id='dorsal' min='1' max='99' value='1'><span id=\"fotoaux\"><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable'/><img id='preview' src='#' alt='' class='imagePrev'/>";

    bootbox.dialog({
        closeButton: false,
        title: "A�adir jugador",
        message: msg,
        buttons: {
            ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success",
                callback: function () {
                    var name = $("#Name").val();
                    if (name == "" || name == null) {
                        $("#alert").css({"display": "block"});
                        e.preventDefault();
                        return false;
                    }
                    else {
                        var jug = "<tr id='1'><td>" + name + "</td><td>" + $("#dorsal").val() + "</td><td>" +
                            "<button class='btn btn-danger deljugador'><span class='fa fa-remove'' aria-hidden='true'></span></button></td></tr>";
                        $("#tablebody").append(jug);
                        $(".deljugador").click(function () {
                            $(this)[0].parentNode.parentNode.remove();
                        });
                    }
                }
            },
            cancel: {
                label: '<span class="fa fa-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });

    $(".selectable").change(function () {
        readURL(this);
    });
}

function addJugadores(nameEquipo) {

    var msg =
        "<span id=\"nameaux\"><h4>Jugadores :</h4></span><div class='table-responsive jornada'>" +
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

function addEquipos(nameLiga, num) {
    var msg = "<div  id ='alert'  class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>El numero de equipos en la liga debe ser: " + num + "</div>" +
        "<div class='row'><div class='col-md-6'><span id=\"nameaux\"><h4>Equipos :</h4></span><div class='table-responsive jornada'>" +
        "<table class='table table-striped table-bordered'><thead><tr><th>Nombre</th><th>Borrar</th></tr></thead>" +
        "<tbody id='tablebodyAdded'></tbody>" +
        "</table></div></div><div class='col-md-6'><span id=\"nameaux\">" +
        "<h4>Equipos :</h4></span><div class='table-responsive jornada'>" +
        "<table class='table table-striped table-bordered'><thead><tr><th>Nombre</th><th>Add</th></tr></thead>" +
        "<tbody id='tablebody'><tr id='add2'><td>E2</td><td class='butt'><span class='fa fa-plus'></span></td></tr>" +
        "<tr id='add3'><td>E3</td><td class='butt'><span class='fa fa-plus'></span></td></tr>" +
        "<tr id='add4'><td>E4</td><td class='butt'><span class='fa fa-plus'></span></td></tr></tbody>" +
        "</table></div></div> </div>";

    bootbox.dialog({
        closeButton: false,
        title: "Add equipos a liga: " + nameLiga,
        message: msg,
        buttons: {
            ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success",
                callback: function () {
                    var add = document.getElementById("tablebodyAdded").children;
                    if (num != add.length) {
                        $("#alert").css({"display": "block"});
                        e.preventDefault();
                        return false;
                    }
                }
            },
            cancel: {
                label: '<span class="fa fa-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });

    $(".butt").click(function () {
        $("#alert").css({"display": "none"});
        var el = $(this);
        $("#tablebodyAdded").append("<tr id='" + el[0].parentNode.id.split("add")[1] + "'><td>" +
            el[0].parentNode.childNodes[0].childNodes[0].data +
            "</td><td class='butt-danger'><span class='fa fa-minus'></span></td></tr>");
        el.addClass('disabled');
        $(".butt-danger").click(function () {
            $("#alert").css({"display": "none"});
            document.getElementById("add" + $(this)[0].parentNode.id).children[1].setAttribute("class", "butt");
            $(this)[0].parentNode.remove();
        });
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
            '<button id="editCompeticion" type="button" class="btn btn-primary" onclick="modifyComp();" title="Add equipo">' +
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
        $("#admindiv").html('<div class="col-md-6"><h3 class="sub-header">Jugadores</h3>' +
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
        "<span id=\"nameaux\"><h4>Partidos :</h4></span><div class='table-responsive jornada'>" +
        "<table class='table table-striped table-bordered dataTable sortable-theme-bootstrap'' id='jornadaTable'><thead><tr><th>editar</th><th>Local</th>" +
        "<th>Visitante</th><th>Resultado</th></tr></thead>" +
        "<tbody id='tablebody'>"+
        "<tr><td class='butt' id = '1_0'><span class='fa fa-pencil-square-o'></span></td><td>eq1</td><td>eq2</td><td id='res0'>1-2</td></tr>"+
        "</tbody></table></div> ";


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

    if(document.getElementById('editCompeticion')){
        $(".butt").click(function () {
            var x = $(this)[0].id.split('_');
           var goles = partido(x[0] ,x[1]);
        });
    }
}

function partido(id, pos) {
    var msg = "<div  id ='alert' class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>goles negativos</div>" +
        "<div class='row row-right'><div class='col-md-6'> <span id='campoaux'><h4>Local :</h4></span>" +
        "<li>Goles: <span id='golLocalTotal' class='badge gol'>0</li><li>Estadisticas:" +
        "<div class='table-responsive jornada'><table><thead><tr><th>Nombre</th><th>Dorsal</th><th>Amarillas</th><th>Rojas</th><th>Goles</th><th>Goles PP</th></tr></thead>" +
        "<tbody><tr><td>Jugador</td><td>15</td><td><input type='number' min='0' max='2' value='0' style='width: 5em;'></td><td>" +
        "<input type='checkbox'></td><td><input name='golLocal' type='number' min='0' max='100' value='0' style='width: 5em;' onchange='calcGol();'required=''></td>" +
        "<td><input name='golLocalpp' type='number' min='0' max='100' value='0' style='width: 5em;' onchange='calcGol();'required=''></td></tr></tbody></table></div></li>" +
        "</div><div class='col-md-6'><span id=\"neq\"><h4>Visitante :</h4></span>" +
        "<li>Goles: <span id='golVisitanteTotal' class='badge gol'>0</span></li><li>Estadisticas:" +
        "<div class='table-responsive jornada'><table><thead><tr><th>Nombre</th><th>Dorsal</th><th>Amarillas</th><th>Rojas</th><th>Goles</th><th>Goles PP</th></tr></thead>" +
        "<tbody><tr><td>Jugador</td><td>15</td><td><input type='number' min='0' max='2' value='0' style='width: 5em;'></td><td>" +
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

                    for (i = 0; i < local.length; i++) {
                        if (parseInt(local[i].value) < 0) {
                            $("#alert").css({"display": "block"});
                            e.preventDefault();
                            return false;
                        }
                    }

                    for (i = 0; i < visitantepp.length; i++) {
                        if (parseInt(visitantepp[i].value) < 0) {
                            $("#alert").css({"display": "block"});
                            e.preventDefault();
                            return false;
                        }
                    }

                    for (i = 0; i < visitante.length; i++) {
                        if (parseInt(visitante[i].value) < 0) {
                            $("#alert").css({"display": "block"});
                            e.preventDefault();
                            return false;
                        }
                    }

                    for (i = 0; i < localpp.length; i++) {
                        if (parseInt(localpp[i].value) < 0) {
                            $("#alert").css({"display": "block"});
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

    for (i = 0; i < local.length; i++) {
        if (parseInt(local[i].value) < 0) {
            $("#alert").css({"display": "block"});
        }
        loc = loc + parseInt(local[i].value);
    }

    for (i = 0; i < visitantepp.length; i++) {
        if (parseInt(visitantepp[i].value) < 0) {
            $("#alert").css({"display": "block"});
        }
        loc = loc + parseInt(visitantepp[i].value);
    }

    for (i = 0; i < visitante.length; i++) {
        if (parseInt(visitante[i].value) < 0) {
            $("#alert").css({"display": "block"});
        }
        vis = vis + parseInt(visitante[i].value);
    }

    for (i = 0; i < localpp.length; i++) {
        if (parseInt(localpp[i].value) < 0) {
            $("#alert").css({"display": "block"});
        }
        vis = vis + parseInt(localpp[i].value);
    }

    $("#golLocalTotal").empty();
    $("#golLocalTotal").html(loc);
    $("#golVisitanteTotal").empty();
    $("#golVisitanteTotal").html(vis);

}

function modifyEq() {
    var msg = "<div  id ='alert'  class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>El nombre del equipo y el campo no pueden estar vacios</div>" +
        "<span id=\"nameaux\"><h4>Nombre :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-font' aria-hidden='true'></span></span>"+
        "<input id='Name' type='text' class='form-control' placeholder='Enter name' aria-describedby='sizing-addon2' maxlength='64'>"+
        "</div><span id='campoaux'><h4>Campo :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-building' aria-hidden='true'></span></span>"+
        "<input id='newCampo' type='text' class='form-control' placeholder='Enter campo' aria-describedby='sizing-addon2' maxlength='250'>"+
        "</div><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable'/><img id='preview' src='#' alt='' class='imagePrev'/>";

    bootbox.dialog({
        closeButton: false,
        title: "Nuevo equipo",
        message: msg,
        buttons: {
            ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success",
                callback: function () {
                    var name = $("#Name").val();
                    var campo = $("#newCampo").val();
                    if (name == "" || name == null || campo == "" || campo == null) {
                        $("#alert").css({"display": "block"});
                        e.preventDefault();
                        return false;
                    }
                    else {
                        $("#alert").css({"display": "none"});
                        $("#media-heading").empty();
                        $("#media-heading").html(name);
                        $("#campo").empty();
                        $("#campo").html(campo);
                    }
                }
            },
            cancel: {
                label: '<span class="fa fa-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });

    
    $("#Name").val($("#media-heading").html());
    $("#newCampo").val($("#campo").html());
    $(".selectable").change(function () {
        readURL(this);
    });
}

function modifyComp() {
    var msg = "<div  id ='alert'  class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>El nombre de la competicion no puede estar vacio</div>" +
        "<span id=\"nameaux\"><h4>Nombre :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-font' aria-hidden='true'></span></span>"+
        "<input id='Name' type='text' class='form-control' placeholder='Enter name' aria-describedby='sizing-addon2' maxlength='64'></div>"+
        "<span id='campoaux'><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable'/><img id='preview' src='#' alt='' class='imagePrev'/>";

    bootbox.dialog({
        closeButton: false,
        title: "Modificar Competicion",
        message: msg,
        buttons: {
            ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success",
                callback: function () {
                    var name = $("#Name").val();
                    if (name == "" || name == null) {
                        $("#alert").css({"display": "block"});
                        e.preventDefault();
                        return false;
                    }
                    else {
                        $("#alert").css({"display": "none"});
                        $("#media-heading").empty();
                        $("#media-heading").html(name);
                    }
                }
            },
            cancel: {
                label: '<span class="fa fa-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });

    $("#Name").val($("#media-heading").html());


    $(".selectable").change(function () {
        readURL(this);
    });
}
function modifyJug() {
    var msg = "<div  id ='alert'  class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>El nombre del jugador no puede estar vacio</div>" +
        "<span id=\"nameaux\"><h4>Nombre :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-font' aria-hidden='true'></span></span>"+
        "<input id='Name' type='text' class='form-control' placeholder='Enter name' aria-describedby='sizing-addon2' maxlength='64'></div>"+
        "<h4>Dorsal :</h4></span><input type='number' id='newDorsal' min='1' max='99' value='1'><span id='campoaux'><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable'/><img id='preview' src='#' alt='' class='imagePrev'/>";

    bootbox.dialog({
        closeButton: false,
        title: "Modificar Competicion",
        message: msg,
        buttons: {
            ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success",
                callback: function () {
                    var name = $("#Name").val();
                    var dorsal = $("#newDorsal").val();
                    if (name == "" || name == null) {
                        $("#alert").css({"display": "block"});
                        e.preventDefault();
                        return false;
                    }
                    else {
                        $("#alert").css({"display": "none"});
                        $("#media-heading").empty();
                        $("#media-heading").html(name);
                        $("#dorsal").empty();
                        $("#dorsal").html(dorsal);
                    }
                }
            },
            cancel: {
                label: '<span class="fa fa-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });

    $("#Name").val($("#media-heading").html());
    $("#newDorsal").val($("#dorsal").val());


    $(".selectable").change(function () {
        readURL(this);
    });
}



function getJSON(url) {
    var json = "";
    $.getJSON(url,
        function (data) {
            json = JSON.parse(JSON.stringify(data));
        });
    return json;
}

function sendJSON(url, json) {
    var success = false;

    $.post(url, json).done(function () {
        success = true;
    });
    return success;
}