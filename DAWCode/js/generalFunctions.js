/**
 * Created by Alex on 13/05/2015.
 */

$( document ).ready(function() {
   $("#addEquipo").click(function () {
            addEquipo();
        });
   
   $("#addCompeticion").click(function () {
            addLiga();
        });

   $("#editEquipo").click(function () {
            modifyEq();
        });

   $("#editCompeticion").click(function () {
            modifyComp();
        });

   $("#editJugador").click(function () {
            addEquipo();
        });

   $("#addJugador").click(function () {
            addJugador();
        });
   
   $(".day").click(function () {
            $('.day').removeClass('active');
            $(this).addClass('active');
            jornada($(this).html());
        });
});


function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#preview').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function editUserData(id) {
    var msg = "<div  id ='alert'  class='alert alert-danger alert-dismissible alerta' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<div class='name'>Error!</div>El nombre e email de usuario no pueden estar vacios</div>" +
        "<span id=\"nameaux\"><h4>Nombre Real:</h4></span><textarea maxlength='64' cols='1' id='newName' class='textareaDiv' " +
        "placeholder='Enter name'>" + $("#realName").val() + "</textarea><span id=\"nameaux\"><h4>Email:</h4></span>" +
        "<div class='input-group'><span class='input-group-addon' id='sizing-addon2' required>@</span>" +
        "<input id='newEmail' type='email' class='form-control' placeholder='Username' aria-describedby='sizing-addon2' value='" +
        $("#email").val() + "'></div>";

    bootbox.dialog({
        closeButton: false,
        title: "Editar datos",
        message: msg,
        buttons: {
            ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success",
                type: "submit",
                callback: function () {
                    var name = $("#newName").val();
                    var mail = $("#newEmail").val();
                    if (name == "" || name == null || mail == "" || mail == null) {
                        $("#alert").css({"display": "block"});
                        e.preventDefault();
                        return false;
                    }
                    else {
                        $("#alert").css({"display": "none"});

                        $("#realName").empty;
                        $("#realName").html(name);
                        $("#email").empty;
                        $("#email").html(mail);
                        //Añadir jugadores
                    }
                }
            },
            cancel: {
                label: '<span class="fa fa-remove" aria-hidden="true"></span>',
                className: "btn-danger"
            }
        }
    });

    $("#newName").val($("#realName").html());
    $("#newEmail").val($("#email").html());
}