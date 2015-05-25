/**
 * Created by Alex on 13/05/2015.
 */

$( document ).ready(function() {
   $("#addEquipo").click(function () {
        addEquipo($(this).data("token"));
    });
   
   $("#addCompeticion").click(function () {
        addLiga($(this).data("token"));
    });

   $("#editEquipo").click(function () {
        modifyEq($(this).data("token"));
    });

   $("#editCompeticion").click(function () {
        modifyComp($(this).data("token"));
    });

   $("#editJugador").click(function () {
        modifyJug($(this).data("token"));
    });

   $("#addJugador").click(function () {
        addJugador($(this).data("token"));
    });
   
   $(".day").click(function () {
    $('.day').removeClass('active');
    $(this).addClass('active');
    if(document.getElementById('editCompeticion')){
        jornada($(this).html($(this).data("token")));
    }else{
        jornadaVisual($(this).html());
    }
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