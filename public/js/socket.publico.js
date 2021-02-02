// * Comando para estrablecer la conexión
var socket = io();

// * Nos traemos con jquery cada uno de las etiquetas para mostrar los tickets
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

// * Nos traemos con jquery cada uno de las etiquetas para mostrar los escritorios
var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

// * Colocamos las variables anteriores en array
var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('connect', function() {
    console.log('Conectando al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectando del servidor');
});


// * Escuchamos el estado actual del socket
socket.on('estadoActual', function(data) {
    // console.log(data);
    // * Llamamos la funcion actualizaHTML
    actualizaHTML(data.ultimos4);
});

// * Escuchamos el ultimos4
socket.on('ultimos4', function(data) {
    // console.log(data);

    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    // * Llamamos la funcion actualizaHTML
    actualizaHTML(data.ultimos4);
});


function actualizaHTML(ultimos4) {
    for (var i = 0; i <= ultimos4.length - 1; i++) {
        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}