// * Comando para estrablecer la conexión
var socket = io();


socket.on('connect', function() {
    console.log('Conectando al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectando del servidor');
});

// * URLSearchParams buscar window.location.search por la url 
var searchParams = new URLSearchParams(window.location.search);

// * con has preguntamos si hay una variable llamada escritorio
// * Preguntamos si no viene el escritorio
if (!searchParams.has('escritorio')) {
    // * redireccionamos a index
    window.location = 'index.html';
    // * mandamos un error
    throw new Error('El escritortio es necesario');
}

var escritorio = searchParams.get('escritorio');
// * nos traemos lo que se encuentre en la etiqueta small
var label = $('small');

console.log(escritorio);

// * actualizamos el texto dentro de la estiqueta small
$('h1').text('Escritorio ' + escritorio);


// * Evento click para escribir el escritorio
$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        // console.log(resp);

        // * Validamos si no hay tickets
        if (resp === 'No hay tickets') {
            // * Mostramos en el label que es el small la respuesta de que no hay tickets
            label.text(resp);
            // * damos un alert y salimos de la ejecucion con un return
            alert(resp);
            return;
        }

        label.text('Ticket' + resp.numero);
    });


});