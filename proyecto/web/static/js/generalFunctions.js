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
        modifyJug();
    });

   $("#addJugador").click(function () {
        addJugador();
    });
   
   $(".day").click(function () {
    $('.day').removeClass('active');
    $(this).addClass('active');
    if(document.getElementById('editCompeticion')){
        jornada($(this).html());
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