const { io } = require('../server');

// ? Importamos la clase TicketControl
const { TicketControl } = require('../classes/ticket-control');

// * Instanciamos la clase para poderla utilizar en este archivo
const ticketControl = new TicketControl();


io.on('connection', (client) => {

    // * Recojemos el mensaje que nos envia el cliente donde data es null
    client.on('siguienteTicket', (data, callback) => {

        // * Activamos la funcion siguienteTicket de la clase ticketControl
        // * Esta nos traera el ultimo ticket
        let siguiente = ticketControl.siguienteTicket();

        console.log('Cual es el siguiente ' + siguiente);

        // * con el callback le pasamos la respuesta al cliente
        callback(siguiente);
    });

    // * Emitir un evento 'estadoActual' trallendonos el ultimo ticket
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    // * Estamos pendiente 
    client.on('atenderTicket', (data, callback) => {
        // ! Si no enviamos escritorio 
        if (!data.escritorio) {
            // * retornamos el callback con el siguiente objeto
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        // * Llamamos el metodo atenderTicket(data.escritorio)
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        // * con el callback le pasamos la respuesta al cliente del escritorio para poder atenderlo
        callback(atenderTicket);
        // Actualizar/modificar cambios en los ULTIMOS 4
        // Emitir socket ultimos4
        // * Lo emitimos con broadcast para que le lleguen a todas las personas
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });
    });

});