/**
 * Created by Alex on 13/05/2015.
 */

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function editUserData(id) {
    var msg =
        "<span id=\"nameaux\"><h4>Nombre Real:</h4></span><textarea maxlength='64' cols='1' id='newName' class='textareaDiv' " +
        "placeholder='Enter name'>" + $("#realName").val() + "</textarea><span id=\"nameaux\"><h4>Email:</h4></span>" +
        "<textarea maxlength='64' cols='1' id='newEmail' class='textareaDiv' placeholder='Enter name'>" +
        $("#email").val() + "</textarea>";

    bootbox.dialog({
        closeButton: false,
        title: "Editar datos",
        message: msg,
        buttons: {
            ok: {
                label: '<span class="fa fa-check" aria-hidden="true"></span>',
                className: "btn-success",
                callback: function () {
                    var name = $("#newName").val();
                    var mail = $("#newEmail").val();
                    $("#realName").empty;
                    $("#realName").html(name);
                    $("#email").empty;
                    $("#email").html(mail);
                    //Añadir jugadores
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