/**
 * Created by Alex on 06/04/2015.
 */

function addEquipo() {

    var msg = "<div  id ='alert'  class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>El nombre del equipo y el campo no pueden estar vacios</div>" +
        "<form><span id=\"nameaux\"><h4>Nombre :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-font' aria-hidden='true'></span></span>"+
        "<input id='Name' type='text' class='form-control' placeholder='Enter name' aria-describedby='sizing-addon2' maxlength='64'>"+
        "</div><span id='campoaux'><h4>Campo :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-building' aria-hidden='true'></span></span>"+
        "<input id='Campo' type='text' class='form-control' placeholder='Enter campo' aria-describedby='sizing-addon2' maxlength='250'>"+
        "</div><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable'/><img id='preview' src='#' alt='' class='imagePrev'/></form>";

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
                        //addJugadores(name);
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
        "<form><span id=\"nameaux\"><h4>Nombre :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-font' aria-hidden='true'></span></span>"+
        "<input id='Name' type='text' class='form-control' placeholder='Enter name' aria-describedby='sizing-addon2' maxlength='64'>"+
        "</div><div class='row row-right'><div class='col-md-6'><span id='campoaux'><h4>Temporada :</h4></span><select>" +
        "<option value='13/14'>13/14</option> </select></div><div class='col-md-6'><span><h4>Numero equipos :</h4></span>" +
        "<input type='number' id='neq' min='2' max='100' step='2' value='38'></div></div><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable'/><img id='preview' src='#' alt='' class='imagePrev'/></form>";

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
        "<div class='name'>Error!</div>El nombre del jugador no puede estar vacio y el dorsal debe ser valido</div>" +
        "<form><span id=\"nameaux\"><h4>Nombre :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-child' aria-hidden='true'></span></span>"+
        "<input id='Name' type='text' class='form-control' placeholder='Enter name' aria-describedby='sizing-addon2' maxlength='64'>"+
        "</div><div class='row row-right'><div class='col-md-4'><span><h4>Posicion :</h4></span><select id='posicion'>" +
        "<option value='po'>Portero</option><option value='df'>Defensa</option><option value='ce'>Mediocentro</option>"+
        "<option value='dl'>Delantero</option></select></div><div class='col-md-4'><h4>Equipo :</h4></span>"+
        "<select id='equipo'><option value='1'>Eq1</option><option value='2'>Eq2</option><option value='3'>Eq3</option>"+
        "<option value='4'>Eq4</option></select></div>"+
        "<div class='col-md-4'><span><h4>Dorsal :</h4></span>" +
        "<input type='number' id='dorsal' min='1' max='99' value='1'></div></div><span id=\"fotoaux\"><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable'/><img id='preview' src='#' alt='' class='imagePrev'/></form>";

    bootbox.dialog({
        closeButton: false,
        title: "Nuevo jugador",
        message: msg,
        buttons: {
            ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success",
                callback: function (e) {
                    var name = $("#Name").val();
                    var dorsal = $("#dorsal").val();
                    var dor = [33,5,6];
                    var disp = true;
                    for(var i =0;i<dor.length && disp;i++){
                        if(dor[i]==dorsal){
                            disp = false;
                        }
                    }

                    if (name == "" || name == null ||!disp) {
                        $("#alert").css({"display": "block"});
                        if(!disp){
                            document.getElementById('dorsal').setCustomValidity('Invalid');
                        }
                        if(name == "" || name == null){
                            document.getElementById('Name').setCustomValidity('Invalid');
                        }
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
        title: "Añadir jugadores al equipo: " + nameEquipo,
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
        "<div class='row'><div class='col-md-6'><form><span><h4>Equipos :</h4></span><div class='table-responsive jornada'>" +
        "<table class='table table-striped table-bordered'><thead><tr><th>Nombre</th><th>Borrar</th></tr></thead>" +
        "<tbody id='tablebodyAdded'></tbody>" +
        "</table></div></div></form><div class='col-md-6'><span>" +
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
        $("#tablebodyAdded").append("<tr id='" + el[0].parentNode.id.split("add")[1] + "'><input type='hidden' value='"+
            el[0].parentNode.id.split("add")[1] +"' name='equipo'/><td>" +
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

function jornadaVisual(jor) {
    var msg =
        "<span id=\"nameaux\"><h4>Partidos :</h4></span><div class='table-responsive jornada'>" +
        "<table class='table table-striped table-bordered dataTable sortable-theme-bootstrap'' id='jornadaTable'><thead><tr><th>editar</th><th>Local</th>" +
        "<th>Visitante</th><th>Resultado</th></tr></thead>" +
        "<tbody id='tablebody'>"+
        "<tr><td class='butt' href='#'><span class='fa fa-eye'></span></td><td>eq1</td><td>eq2</td><td id='res0'>1-2</td></tr>"+
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
}

function partido(id, pos) {
    var msg = "<div  id ='alert' class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>goles negativos</div>" +
        "<form><div class='row row-right'><div class='col-md-6'> <span id='campoaux'><h4>Local :</h4></span>" +
        "<li>Goles: <span id='golLocalTotal' class='badge gol'>0</li><li>Estadisticas:" +
        "<div class='table-responsive jornada'><table><thead><tr><th>Jug</th>th>Nombre</th><th>Dorsal</th><th>Amarillas</th><th>Rojas</th><th>Goles</th><th>Goles PP</th></tr></thead>" +
        "<tbody><tr><td><input type='checkbox' name='jugadoLocal'></td><td>Jugador</td><td>15</td><td><input type='number' min='0' max='2' value='0' style='width: 5em;'></td><td>" +
        "<input type='checkbox'name='rojaLocal'></td><td><input name='golLocal' type='number' min='0' max='100' value='0' style='width: 5em;' onchange='calcGol();'required=''></td>" +
        "<td><input name='golLocalpp' type='number' min='0' max='100' value='0' style='width: 5em;' onchange='calcGol();'required=''></td></tr></tbody></table></div></li>" +
        "</div><div class='col-md-6'><span id='neq'><h4>Visitante :</h4></span>" +
        "<li>Goles: <span id='golVisitanteTotal' class='badge gol'>0</span></li><li>Estadisticas:" +
        "<div class='table-responsive jornada'><table><thead><tr><th>Nombre</th><th>Dorsal</th><th>Amarillas</th><th>Rojas</th><th>Goles</th><th>Goles PP</th></tr></thead>" +
        "<tbody><tr><input type='checkbox'name='jugadoVisitante'></td><td><td>Jugador</td><td>15</td><td><input type='number' min='0' max='2' value='0' style='width: 5em;'></td><td>" +
        "<input type='checkbox' name='rojaVisitante'></td><td><input name='golVisitante' type='number' min='0' max='100' value='0' style='width: 5em;' onchange='calcGol();' required=''></td>" +
        "<td><input type='number' name='golVisitantepp' min='0' max='100' value='0' style='width: 5em;' onchange='calcGol();'required=''></td></tr></tbody></table></div></li></div></div></form>";

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
        "<form><span id=\"nameaux\"><h4>Nombre :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-font' aria-hidden='true'></span></span>"+
        "<input id='Name' type='text' class='form-control' placeholder='Enter name' aria-describedby='sizing-addon2' maxlength='64'>"+
        "</div><span id='campoaux'><h4>Campo :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-building' aria-hidden='true'></span></span>"+
        "<input id='newCampo' type='text' class='form-control' placeholder='Enter campo' aria-describedby='sizing-addon2' maxlength='250'>"+
        "</div><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable'/><img id='preview' src='#' alt='' class='imagePrev'/></form>";

    bootbox.dialog({
        closeButton: false,
        title: "Modificar equipo",
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
        "<form><span id=\"nameaux\"><h4>Nombre :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-font' aria-hidden='true'></span></span>"+
        "<input id='Name' type='text' class='form-control' placeholder='Enter name' aria-describedby='sizing-addon2' maxlength='64'></div>"+
        "<span id='campoaux'><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable'/><img id='preview' src='#' alt='' class='imagePrev'/></form>";

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
        "<form><span id=\"nameaux\"><h4>Nombre :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-font' aria-hidden='true'></span></span>"+
        "<input id='Name' type='text' class='form-control' placeholder='Enter name' aria-describedby='sizing-addon2' maxlength='64'></div>"+
        "<h4>Dorsal :</h4></span><input type='number' id='newDorsal' min='1' max='99' value='1'><span id='campoaux'><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable'/><img id='preview' src='#' alt='' class='imagePrev'/></form>";

    bootbox.dialog({
        closeButton: false,
        title: "Modificar Jugador",
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
    $("#newDorsal").val($("#dorsal").html());


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