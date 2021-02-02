// * Importamos FileSystem para poder manipular el archivo
const fs = require('fs');

// * Defino la clase Ticket

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio
    }
}


// * Defino la clase TicketControl
class TicketControl {

    constructor() {
        // * Inicializamos ultimo = 0
        this.ultimo = 0;
        // * Nos traemos la fecha del sistema
        this.hoy = new Date().getDate();
        // * Declaramos un array de tickets (tickets pendientes)
        this.tickets = [];
        // * Declaramos un array de ultimos4 (para atender los ultimos 4)
        this.ultimos4 = [];

        // * importamos la base de datos que va ser en un archivo json
        let data = require('../data/data.json');
        console.log(data);

        // * Con el condicional verificamos el ultimo valor que se guardo en BD es igual a hoy
        if (data.hoy === this.hoy) {
            // * Ultimo lo inicializamos con la ultima data
            this.ultimo = data.ultimo;
            // * Salvamos lo que esta en data.tickets en tickets
            this.tickets = data.tickets;
            // * Salvamos lo que esta en data.ultimos4 en ultimos4
            this.ultimos4 = data.ultimos4;
        } else {
            // * Si la fecha no es igual llamamos al metodo reiniciarConteo
            this.reiniciarConteo();
        }

    }

    // ================================
    // ! Metodo para contar siguiente ticket
    // ================================
    siguienteTicket() {
        // * se incrementa en 1
        this.ultimo = this.ultimo + 1;

        // ! creamos un nuevo ticket donde Ticket(this.ultimo, escritorio)
        // * cuando se crea el ticket obiamente no se sabe en que escritorio se aetendera le pasamos null
        let ticket = new Ticket(this.ultimo, null);
        // ! Agragamos el nuevo ticket al arreglo tickets
        this.tickets.push(ticket);

        // * Guardamos en la Base de datos
        this.guardarArchivo();

        // * retornamos ultimo
        return `Ticket ${ this.ultimo }`
    }


    // ===============================================================
    // ! Metodo para traer el ultimo ticket si se cae la pagina o actualiza
    // ===============================================================
    getUltimoTicket() {

        // * retornamos ultimo ticket
        return `Ticket ${ this.ultimo }`
    }


    // ===============================================================
    // ! Metodo para traer los ultimos 4 tickets
    // ===============================================================
    getUltimos4() {

        // * retornamos los ultimos 4 ticket
        return this.ultimos4;
    }

    // ===============================================================
    // ! Metodo para atender ticket en un determinado escritorio
    // ===============================================================
    atenderTicket(escritorio) {

        // * Verificamos si hay ticket por atender
        if (this.tickets.length === 0) {
            // * retornamos un string que no hay tickets
            return 'No hay tickets';
        }

        // * obtenemos el numero del ticket para romper la relacion que tiene JS con todos los obj cuando son pasados por referencia
        let numeroTicket = this.tickets[0].numero;
        // * borramos ese ticket que se encuentra en el primer elemento con shift
        this.tickets.shift();

        // ! Aqui agrego un nuevo ticket del partiendo del numeroTicket para ser atendido
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        // ! Colocamos atenderTicket al inicio del arreglo con unshift
        this.ultimos4.unshift(atenderTicket);

        // ! Preguntamamos si el arrecgo es mayor a 4 ()<para verificar que solo sean 4 tickets que tenga el arreglo
        if (this.ultimos4.length > 4) {
            // * Eliminamos el ultimo elemento con splice(-1, 1)
            this.ultimos4.splice(-1, 1)
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        // * LLamamos al metodo guardarArchivo para que guarde ultimos4
        this.guardarArchivo();

        // * Retornamos atenderTicket 
        return atenderTicket;

    }

    // ================================
    // ! Metodo para reiniciar conteo
    // ================================
    reiniciarConteo() {
        // * Inicializamos en 0 el conteo
        this.ultimo = 0;
        // * Inicializamos vacio el array tickets
        this.tickets = [];
        // * Inicializamos vacio el array ultimos4
        this.ultimos4 = [];

        console.log('Se ha inicializado el sistema');

        // * Guardamos en BD 
        this.guardarArchivo();
    }

    // ================================
    // ! Metodo para Guardar en archivo json
    // ================================
    guardarArchivo() {
        // * Preparamos el objeto
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        // * Para poderlo guardar en BD hay que convertir en string con stringify
        let jsonDataString = JSON.stringify(jsonData);

        // * Guardamos la data utilizando fs
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

// ? Exportamos la clase TicketControl
module.exports = {
    TicketControl
}