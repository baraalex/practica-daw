/**
 * Created by Alex on 06/04/2015.
 */

function addEquipo(token) {

    var msg = "<div  id ='alert'  class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>El nombre del equipo y el campo no pueden estar vacios</div>" +
        "<form id='formulario' method='POST' enctype='multipart/form-data' action='"+document.location.pathname+
        "'><span><h4>Nombre :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-font' aria-hidden='true'></span></span>"+
        "<input id='Name' name='nombre' type='text' class='form-control' placeholder='Enter name' aria-describedby='sizing-addon2' maxlength='64' required=''/>"+
        "</div><span><h4>Campo :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-building' aria-hidden='true'></span></span>"+
        "<input id='Campo' name='campo' type='text' class='form-control' placeholder='Enter campo' aria-describedby='sizing-addon2' maxlength='250' required=''/>"+
        "</div><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' name='imagen' class='selectable' required=''/><img id='preview' src='#' alt='' class='imagePrev'/><input type='hidden' name='csrfmiddlewaretoken' value='"+
        token+"' required=''/></form>";

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
                        $("#formulario").submit();
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

function addLiga(token) {


    var temp = "";

    var d = new Date().getFullYear();

    for(var i =0 ; i<5; i++){
        temp=temp + "<option value='"+(d+i)+"/"+(d+i+1)+"'>"+(d+i)+"/"+(d+i+1)+"</option>";
    }

    var msg = "<div  id ='alert'  class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>El nombre de la liga no puede estar vacio y los equipos deben ser validos</div>" +
        "<form id='formulario' method='POST' enctype='multipart/form-data' action='"+document.location.pathname+
        "'><span><h4>Nombre :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-font' aria-hidden='true'></span></span>"+
        "<input id='Name' name='nombre' type='text' class='form-control' placeholder='Enter name' aria-describedby='sizing-addon2' maxlength='64'/>"+
        "</div><div class='row row-right'><div class='col-md-4'><span><h4>Temporada :</h4></span><select name='temporada'>" + temp+
        "</select></div><div class='col-md-4'><span><h4>Numero equipos :</h4></span>" +
        "<input type='number' id='neq' min='2' max='100' step='2' value='38'/></div><div class='col-md-4'><span><h4>Liga Privada :</h4></span>" +
        "<input type='checkbox' id='privada' name='privada'/></div></div><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable' name='imagen'/><img id='preview' src='#' alt='' class='imagePrev'/><input type='hidden' name='csrfmiddlewaretoken' value='"+
        token+"' required=''/></form>";

    bootbox.dialog({
        closeButton: false,
        title: "Nuevo Liga",
        message: msg,
        buttons: {
            add: {
                label: '<span class="fa fa-plus" aria-hidden="true"></span>',
                className: "btn-primary",
                callback: function (e) {

                    var name = $("#Name").val();
                    var neq = $("#neq").val();
                    if (name == "" || name == null || neq < 2 || neq > 100) {
                        $("#alert").css({"display": "block"});
                    }
                    else {
                            addEquipos(name, neq, token);
                        }
                        e.preventDefault();
                            return false;
                    }
                },
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
                        var add = document.getElementsByName("equipo");

                        if(add.length==neq){
                            $("#alert").css({"display": "none"});
                            $("#formulario").submit();
                        }else{
                            $("#alert").css({"display": "block"});
                            e.preventDefault();
                            return false;
                        }
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

function addJugador(token) {

    var eq ="";

    $.ajax({url: '/web/get/equipos/',
        dataType: 'json',
        async: false,
        success: function(data) {
            $.each(data, function(i, field) { 
                eq = eq + "<option value='"+field.pk + "'>"+field.fields.nombre + "</option>";
            });
        }
    });


    var msg = "<div  id ='alert'  class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>El nombre del jugador no puede estar vacio y el dorsal debe ser valido</div>" +
        "<form id='formulario' method='POST' enctype='multipart/form-data' action='"+document.location.pathname+
        "'><span><h4>Nombre :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-child' aria-hidden='true'></span></span>"+
        "<input id='Name' name='name' type='text' class='form-control' placeholder='Enter name' aria-describedby='sizing-addon2' maxlength='64'/>"+
        "</div><div class='row row-right'><div class='col-md-4'><span><h4>Posicion :</h4></span><select id='posicion' name='pos'>" +
        "<option value='po'>Portero</option><option value='df'>Defensa</option><option value='ce'>Mediocentro</option>"+
        "<option value='dl'>Delantero</option></select></div><div class='col-md-4'><h4>Equipo :</h4></span>"+
        "<select id='equipo' name='equipo'>"+eq+"</select></div>"+
        "<div class='col-md-4'><span><h4>Dorsal :</h4></span>" +
        "<input type='number' id='dorsal' min='1' max='99' value='1' name='dorsal'/></div></div><span><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable' name='imagen'/><img id='preview' src='#' alt='' class='imagePrev'/><input type='hidden' name='csrfmiddlewaretoken' value='"+
        token+"' required=''/></form>";

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
                    var equipo = $("#equipo").val();
                    var dor = [];

                    $.ajax({url: '/web/get/dorsales/'+equipo,
                        dataType: 'json',
                        async: false,
                        success: function(data) {
                            $.each(data, function(i, field) { 
                                dor.push(field.fields.dorsal);
                            });
                        }
                    });

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
                        }else{
                            document.getElementById('dorsal').setCustomValidity('');
                        }
                        if(name == "" || name == null){
                            document.getElementById('Name').setCustomValidity('Invalid');
                        }
                        e.preventDefault();
                        return false;
                    }
                    else {
                        $("#formulario").submit();
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

function addEquipos(nameLiga, num, token) {

    var eq ="";
    var eq2 ="";
    var added = document.getElementsByName("equipo");

    $.ajax({url: '/web/get/equipos/',
        dataType: 'json',
        async: false,
        success: function(data) {
            $.each(data, function(i, field) { 
                var esta = false;
                for(var j=0;j<added.length && !esta;j++){
                    if(added[j].value==field.pk){
                        eq2 = eq2 + "<tr id='" + field.pk + "' name='equipos'><td>" + field.fields.nombre +
                        "</td><td class='butt-danger'><span class='fa fa-minus'></span></td></tr>";
                        eq = eq + "<tr id='add" + field.pk + "'><td>" + field.fields.nombre + "</td><td class='butt disabled'><span class='fa fa-plus'></span></td></tr>";
                        esta = true;
                    }
                }
                if(!esta){
                        eq = eq + "<tr id='add" + field.pk + "'><td>" + field.fields.nombre + "</td><td class='butt'><span class='fa fa-plus'></span></td></tr>";
                }
            });
        }
    });



    var msg = "<div  id ='alert2'  class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>El numero de equipos en la liga debe ser: " + num + "</div>" +
        "<div class='row'><div class='col-md-6'><span><h4>Equipos :</h4></span><div class='table-responsive jornada'>" +
        "<table class='table table-striped table-bordered'><thead><tr><th>Nombre</th><th>Borrar</th></tr></thead>" +
        "<tbody id='tablebodyAdded'>"+eq2+"</tbody>" +
        "</table></div></div><div class='col-md-6'><span>" +
        "<h4>Equipos :</h4></span><div class='table-responsive jornada'>" +
        "<table class='table table-striped table-bordered'><thead><tr><th>Nombre</th><th>Add</th></tr></thead>" +
        "<tbody id='tablebody'>"+eq+"</tbody>" +
        "</table></div></div> </div><input type='hidden' name='csrfmiddlewaretoken' value='"+
        token+"' required=''/>";

    bootbox.dialog({
        closeButton: false,
        title: "Add equipos a liga: " + nameLiga,
        message: msg,
        buttons: {
            ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success",
                callback: function (e) {
                    var add = document.getElementsByName("equipos");
                    if (num != add.length) {
                        $("#alert2").css({"display": "block"});
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
        $("#alert2").css({"display": "none"});
        var el = $(this);
        $("#formulario").append("<input id='equipo"+el[0].parentNode.id.split("add")[1] +"' type='hidden' value='"+el[0].parentNode.id.split("add")[1] +"' name='equipo'/>");
        $("#tablebodyAdded").append("<tr id='" + el[0].parentNode.id.split("add")[1] + "' name='equipos'><td>" +
            el[0].parentNode.childNodes[0].childNodes[0].data +
            "</td><td class='butt-danger'><span class='fa fa-minus'></span></td></tr>");
        el.addClass('disabled');

        $(".butt-danger").click(function () {
            $("#alert").css({"display": "none"});
            document.getElementById("add" + $(this)[0].parentNode.id).children[1].setAttribute("class", "butt");
            $("#equipo"+$(this)[0].parentNode.id)[0].remove();
            $(this)[0].parentNode.remove();
        });
    });

    $(".butt-danger").click(function () {
        $("#alert").css({"display": "none"});
        $("#alert2").css({"display": "none"});
        document.getElementById("add" + $(this)[0].parentNode.id).children[1].setAttribute("class", "butt");
        $("#equipo"+$(this)[0].parentNode.id)[0].remove();
        $(this)[0].parentNode.remove();
        });
}

function jornada(id, comp, token) {

    var eq;
    $.ajax({url: '/web/get/equipos/',
        dataType: 'json',
        async: false,
        success: function(data) {
            eq=data;
        }
    });

    var partidos = "";

    $.ajax({url: '/web/get/partidos/'+comp+'/'+id+'/',
        dataType: 'json',
        async: false,
        success: function(data) {
            $.each(data, function(i, field) { 
                var loc ="";
                var vis ="";
                for(var j = 0; j<eq.length && (loc =="" || vis =="");j++){
                        if(field.fields.equipo_loc==eq[j].pk){
                            loc=eq[j].fields.nombre;
                        }else if(field.fields.equipo_vis==eq[j].pk){
                            vis=eq[j].fields.nombre;
                        }
                }

                var res = "";
                if(field.fields.celebrado){
                    res=field.fields.goles_loc + "-"+ field.fields.goles_vis;
                }else{
                    res="No celebrado"
                }
                partidos=partidos+"<tr><td class='butt-visual' id='"+ field.pk+
                "'><span class='fa fa-eye'></span></td><td class='butt' id = '"+ field.pk + "_" + i + "'>"+
                "<span class='fa fa-pencil-square-o'></span></td><td id='"+ field.fields.equipo_loc +"'>"+ loc + 
                "</td><td id='"+ field.fields.equipo_vis +"'>"+ vis + "</td><td id='res0'>"+ res + "</td></tr>";
            });
        }
    });

    var msg =
        "<span><h4>Partidos :</h4></span><div class='table-responsive jornada'>" +
        "<table class='table table-striped table-bordered dataTable sortable-theme-bootstrap'' id='jornadaTable'>"+
        "<thead><tr><th>Ficha</th><th>editar</th><th>Local</th>" +
        "<th>Visitante</th><th>Resultado</th></tr></thead>" +
        "<tbody id='tablebody'>"+ partidos +
        "</tbody></table></div> ";


    bootbox.dialog({
        closeButton: false,
        title: "Jornada: " + id,
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
            partido(x[0], x[1], $(this)[0].parentNode.childNodes[2].id, $(this)[0].parentNode.childNodes[3].id, token);
        });
    }
    
    $(".butt-visual").click(function () {
           var x = $(this)[0].id;
           window.location.assign(window.location.protocol + "//" + window.location.host + "/web/partido/" + x + "/");
        });
}

function jornadaVisual(id, comp) {

    var eq;
    $.ajax({url: '/web/get/equipos/',
        dataType: 'json',
        async: false,
        success: function(data) {
            eq=data;
        }
    });

    var partidos = "";

    $.ajax({url: '/web/get/partidos/'+comp+'/'+id+'/',
        dataType: 'json',
        async: false,
        success: function(data) {
            $.each(data, function(i, field) { 
                var loc ="";
                var vis ="";
                for(var j = 0; j<eq.length && (loc =="" || vis =="");j++){
                        if(field.fields.equipo_loc==eq[j].pk){
                            loc=eq[j].fields.nombre;
                        }else if(field.fields.equipo_vis==eq[j].pk){
                            vis=eq[j].fields.nombre;
                        }
                }
                var res = "";
                if(field.fields.celebrado){
                    res=field.fields.goles_loc + "-" + field.fields.goles_vis;
                }else{
                    res="No celebrado"
                }
                partidos=partidos+"<tr><td class='butt-visual' id='"+ field.pk+
                "'><span class='fa fa-eye'></span></td><td id='"+ field.fields.equipo_loc +"'>"+ loc + 
                "</td><td id='"+ field.fields.equipo_vis +"'>"+ vis + "</td><td id='res0'>"+ res + "</td></tr>";
            });
        }
    });

    var msg =
        "<span><h4>Partidos :</h4></span><div class='table-responsive jornada'>" +
        "<table class='table table-striped table-bordered dataTable sortable-theme-bootstrap'' id='jornadaTable'><thead><tr><th>Ficha</th><th>Local</th>" +
        "<th>Visitante</th><th>Resultado</th></tr></thead>" +
        "<tbody id='tablebody'>"+partidos+
        "</tbody></table></div> ";


    bootbox.dialog({
        closeButton: false,
        title: "Jornada: " + id,
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

    $(".butt-visual").click(function () {
           var x = $(this)[0].id;
           window.location.assign(window.location.protocol + "//" + window.location.host + "/web/partido/" + x + "/");
        });
}

function partido(id, pos, loc, vis, token) {


    var eq;
    $.ajax({url: '/web/get/equipos/',
        dataType: 'json',
        async: false,
        success: function(data) {
            eq=data;
        }
    });

    var localeq ="";
    var viseq ="";
    for(var j = 0; j<eq.length && (localeq =="" || viseq =="");j++){
            if(loc==eq[j].pk){
                localeq=eq[j].fields.nombre;
            }else if(vis==eq[j].pk){
                viseq=eq[j].fields.nombre;
            }
    }

    var eqlocal = "";
    var eqvisitante = "";
    var jug;
    $.ajax({url: '/web/get/jugadores/'+ loc +'/',
        dataType: 'json',
        async: false,
        success: function(data) {
             $.each(data, function(i, field) { 
                $.ajax({url: '/web/get/jugador/'+ id +'/'+ field.pk +'/',
                    dataType: 'json',
                    async: false,
                    success: function(data) {
                        jug=data;
                    }
                });
                if(jug==""){
                    eqlocal=eqlocal+  "<tr><td><input type='checkbox' name='jugadoLocal'/></td><td>"+field.fields.nombre+"</td><td>"+field.fields.dorsal+"</td><td><input type='number' name='amarillasLocal' min='0' max='2' value='0' style='width: 5em;'/></td><td>" +
                    "<input type='checkbox'name='rojaLocal'/></td><td><input name='golLocal' type='number' min='0' max='100' value='0' style='width: 5em;' onchange='calcGol();'required=''/></td>" +
                    "<td><input name='golLocalpp' type='number' min='0' max='100' value='0' style='width: 5em;' onchange='calcGol();'required=''></td></tr>";
                }else{
                    eqlocal=eqlocal+  "<tr><td><input type='checkbox' name='jugadoLocal' checked/></td><td>"+field.fields.nombre+"</td><td>"+field.fields.dorsal+"</td><td><input type='number' name='amarillasLocal' min='0' max='2' value='"+
                    jug[0].fields.amarillas+"' style='width: 5em;'/></td><td>" +
                    "<input type='checkbox'name='rojaLocal'";
                    if(jug[0].fields.roja){
                        eqlocal=eqlocal+" checked";
                    }
                    eqlocal=eqlocal+ "/></td><td><input name='golLocal' type='number' min='0' max='100' value='"+jug[0].fields.goles+"' style='width: 5em;' onchange='calcGol();'required=''/></td>" +
                    "<td><input name='golLocalpp' type='number' min='0' max='100' value='"+jug[0].fields.goles_pp+"' style='width: 5em;' onchange='calcGol();'required=''></td></tr>";
                }
            });
        }
    });

    $.ajax({url: '/web/get/jugadores/'+ vis +'/',
        dataType: 'json',
        async: false,
        success: function(data) {
            $.each(data, function(i, field) { 
                $.ajax({url: '/web/get/jugador/'+ id +'/'+ field.pk +'/',
                    dataType: 'json',
                    async: false,
                    success: function(data) {
                        jug=data;
                    }
                });
                if(jug==""){
                    eqvisitante=eqvisitante+  "<tr><td><input type='checkbox' name='jugadoVisitante'/></td><td>"+field.fields.nombre+"</td><td>"+field.fields.dorsal+"</td><td><input type='number' name='amarillasVisitante' min='0' max='2' value='0' style='width: 5em;'/></td><td>" +
                    "<input type='checkbox'name='rojaVisitante'/></td><td><input name='golVisitante' type='number' min='0' max='100' value='0' style='width: 5em;' onchange='calcGol();'required=''/></td>" +
                    "<td><input name='golVisitantepp' type='number' min='0' max='100' value='0' style='width: 5em;' onchange='calcGol();'required=''></td></tr>";
                }else{
                    eqvisitante=eqvisitante+  "<tr><td><input type='checkbox' name='jugadoVisitante' checked/></td><td>"+field.fields.nombre+"</td><td>"+field.fields.dorsal+"</td><td><input type='number' name='amarillasVisitante' min='0' max='2' value='"+
                    jug[0].fields.amarillas+"' style='width: 5em;'/></td><td>" +
                    "<input type='checkbox'name='rojaVisitante'";
                    if(jug[0].fields.roja){
                        eqvisitante=eqvisitante+" checked";
                    }
                    eqvisitante=eqvisitante+ "/></td><td><input name='golVisitante' type='number' min='0' max='100' value='"+jug[0].fields.goles+"' style='width: 5em;' onchange='calcGol();'required=''/></td>" +
                    "<td><input name='golVisitantepp' type='number' min='0' max='100' value='"+jug[0].fields.goles_pp+"' style='width: 5em;' onchange='calcGol();'required=''></td></tr>";
                }
            });
        }
    });

    var msg = "<div  id ='alert' class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>goles negativos</div><div  id ='alert2' class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>Deben jugar entre 11 y 15 jugadores en el equipo local</div><div  id ='alert3' class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>Deben jugar entre 11 y 15 jugadores en el equipo visitante</div>" +
        "<form id='formulario' method='POST' enctype='multipart/form-data' action='"+document.location.pathname+
        "'><div class='row row-right'><div class='col-md-6'> <span><h4>Local : "+ localeq +"</h4></span>" +
        "<li>Goles: <span id='golLocalTotal' class='badge gol'>0</span></li><li>Estadisticas:" +
        "<div class='table-responsive jornada'><table><thead><tr><th>Jug</th><th>Nombre</th><th>Dorsal</th><th>Amarillas</th><th>Rojas</th><th>Goles</th><th>Goles PP</th></tr></thead>" +
        "<tbody>"+eqlocal+"</tbody></table></div></li>" +
        "</div><div class='col-md-6'><span><h4>Visitante : "+ viseq +"</h4></span>" +
        "<li>Goles: <span id='golVisitanteTotal' class='badge gol'>0</span></li><li>Estadisticas:" +
        "<div class='table-responsive jornada'><table><thead><tr><th>Jug</th><th>Nombre</th><th>Dorsal</th><th>Amarillas</th><th>Rojas</th><th>Goles</th><th>Goles PP</th></tr></thead>" +
        "<tbody>"+eqvisitante+"</tbody></table></div></li></div></div><input type='hidden' name='csrfmiddlewaretoken' value='"+
        token+"' required=''/></form>";

    bootbox.dialog({
        closeButton: false,
        title: "Partido: "+ localeq + " vs " + viseq,
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

                    var jugaLoc = document.getElementsByName("jugadoLocal");
                    var jugaVis = document.getElementsByName("jugadoVisitante");
                    var nl=0;
                    var nv=0;

                    for (i = 0; i < jugaLoc.length; i++) {
                        if(jugaLoc[i].checked){
                            nl=nl+1;
                        }
                    }
                    for (i = 0; i < jugaVis.length; i++) {
                        if(jugaVis[i].checked){
                            nv=nv+1;
                        }
                    }

                    if(nl<11 || nl>15){
                            $("#alert2").css({"display": "block"});
                            e.preventDefault();
                            return false;
                    }
                    if(nv<11 || nv>15){
                            $("#alert3").css({"display": "block"});
                            e.preventDefault();
                            return false;
                    }



                    var goles = $("#golLocalTotal").html() + "-" + $("#golVisitanteTotal").html();
                    $("#res" + pos).empty();
                    $("#res" + pos).html(goles);
                    $("#formulario").submit();
                }
            },
            cancel: {
                label: '<span class="fa fa-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });
    calcGol();
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

function modifyEq(token) {
    var msg = "<div  id ='alert'  class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>El nombre del equipo y el campo no pueden estar vacios</div>" +
        "<form id='formulario' method='POST' enctype='multipart/form-data' action='"+document.location.pathname+
        "'><span><h4>Nombre :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-font' aria-hidden='true'></span></span>"+
        "<input id='Name' name='nombre' type='text' class='form-control' placeholder='Enter name' aria-describedby='sizing-addon2' maxlength='64'/>"+
        "</div><span><h4>Campo :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-building' aria-hidden='true'></span></span>"+
        "<input id='newCampo' name='campo' type='text' class='form-control' placeholder='Enter campo' aria-describedby='sizing-addon2' maxlength='250'/>"+
        "</div><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable' name='imagen'/><img id='preview' src='#' alt='' class='imagePrev'/><input type='hidden' name='csrfmiddlewaretoken' value='"+
        token+"' required=''/></form>";

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
                        $("#formulario").submit();
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

function modifyComp(token) {
    var msg = "<div  id ='alert'  class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>El nombre de la competicion no puede estar vacio</div>" +
        "<form id='formulario' method='POST' enctype='multipart/form-data' action='"+document.location.pathname+
        "'><span><h4>Nombre :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-font' aria-hidden='true'></span></span>"+
        "<input id='Name' name='nombre' type='text' class='form-control' placeholder='Enter name' aria-describedby='sizing-addon2' maxlength='64'/></div>"+
        "<span><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable' name='imagen' /><img id='preview' src='#' alt='' class='imagePrev'/><input type='hidden' name='csrfmiddlewaretoken' value='"+
        token+"' required=''/></form>";

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
                        $("#formulario").submit();
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

function modifyJug(token) {

    var eq ="";

    $.ajax({url: '/web/get/equipos/',
        dataType: 'json',
        async: false,
        success: function(data) {
            $.each(data, function(i, field) { 
                if(field.fields.nombre==$("#equipo").html()){
                eq = eq + "<option value='"+field.pk + "' selected>"+field.fields.nombre + "</option>";
                }
                else{
                eq = eq + "<option value='"+field.pk + "'>"+field.fields.nombre + "</option>";
                }
            });
        }
    });

    var msg = "<div  id ='alert'  class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>El nombre del jugador no puede estar vacio y el dorsal debe ser valido</div>" +
        "<form id='formulario' method='POST' enctype='multipart/form-data' action='"+document.location.pathname+
        "'><span><h4>Nombre :</h4></span><div class='input-group'><span class='input-group-addon' id='sizing-addon2'>"+
        "<span class='fa fa-font' aria-hidden='true'></span></span>"+
        "<input id='Name' name='nombre' type='text' class='form-control' placeholder='Enter name' aria-describedby='sizing-addon2' maxlength='64'/></div>"+
        "<div class='row row-right'><div class='col-md-4'><h4>Equipo :</h4></span>"+
        "<select id='newEquipo' name='equipo'>"+eq+"</select></div>"+
        "<div class='col-md-4'><span><h4>Dorsal :</h4></span>" +
        "<input type='number' id='newDorsal' name='dorsal' min='1' max='99' value='1'/></div></div><span><h4>Foto :</h4></span><input type='file' " +
        "id='foto' accept='image/*' class='selectable' name='imagen'/><img id='preview' src='#' alt='' class='imagePrev'/><input type='hidden' name='csrfmiddlewaretoken' value='"+
        token+"' required=''/></form>";

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
                    var equipo = $("#newEquipo").val();
                    var dorsal = $("#newDorsal").val();
                    var dor = [];

                    $.ajax({url: '/web/get/dorsales/'+equipo,
                        dataType: 'json',
                        async: false,
                        success: function(data) {
                            $.each(data, function(i, field) { 
                                dor.push(field.fields.dorsal);
                            });
                        }
                    });

                    var disp = true;
                    for(var i =0;i<dor.length && disp;i++){
                        if(dor[i]==dorsal && dorsal !=$("#dorsal").html()){
                            disp = false;
                        }
                    }
                    if (name == "" || name == null) {
                        $("#alert").css({"display": "block"});
                        e.preventDefault();
                        return false;
                    }
                    else if(!disp){
                        $("#alert").css({"display": "block"});
                        e.preventDefault();
                        document.getElementById('newDorsal').setCustomValidity('Invalid');
                        return false;
                    }
                    else {
                        $("#alert").css({"display": "none"});
                        $("#formulario").submit();
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