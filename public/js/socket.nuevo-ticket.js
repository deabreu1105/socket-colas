// * Comando para estrablecer la conexión
var socket = io();

// * haciendo referencia con jquery de el objeto html con id lblNuevoTicket
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectando al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectando del servidor');
});

// *  escuchamos lo que se emita de estadoActual y recojemos el ultimo ticket 
socket.on('estadoActual', function(resp) {
    console.log(resp);
    label.text(resp.actual);
});


// * Evento click del boton
$('button').on('click', function() {
    // console.log('click');

    // * Funcion para emitir mensajes al servidor normalmente se le pasa un objeto
    // * en este caso le pasamos null porque no queremos enviarle nada
    socket.emit('siguienteTicket', null,
        function(siguienteTicket) { // * recojemos el callback
            // * Aqui inyectamos en eñ objeto de html lo que venga de siguienteTicket
            label.text(siguienteTicket);
        });



});