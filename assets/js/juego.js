/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

// Función anónima auto invocada

/*(function() {

})();*/

const miModulo = (() => {
    'use strict'

    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // Referencias del HTML
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML           = document.querySelectorAll('small');

    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled   = false;
        btnDetener.disabled = false;
    }


    // Esta función crea un nuevo deck
    const crearDeck = () => {

        deck = [];
        for(let i = 2; i <= 10; i++) {
            for(let tipo of tipos) {
                deck.push(i + tipo);
            }
            
            // deck.push(i + 'C');
        }

        for(let tipo of tipos) {
            for(let esp of especiales) {
                deck.push(esp + tipo);
            }
        }

        // console.log(deck);
        return _.shuffle(deck);
    }



    // Esta función me permite tomar una carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

        return deck.pop();
    }

    // for (let i = 0; i <= 100; i++) {  // Comprobar medida de seguridad throw no hay cartas
    //     pedirCarta();
    // }

    // pedirCarta();
    const valorCarta = (carta) => {

        // // const valor = carta[0]; // Trabaja el string como un array '2D' [0] = 2
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
                (valor === 'A') ? 11 : 10
                : valor * 1;
    }

    // Turno: 0 =  primer jugador, y el último será la computadora
    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
        // divCartasComputadora.append(imgCarta);

    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {

            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana');
            } else if (puntosComputadora > 21) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }
        }, 100); 
    }

        // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }



        // // let puntos  = 0;
        // // console.log({valor});
        // if (isNaN(valor)) {  // isNaN: is not a number
        //     puntos = (valor === 'A') ? 11 : 10;
        // } else {
        //     puntos = valor * 1; // Se multiplica *1 para volverlo un valor númerico
        // }

        // console.log(puntos);
        


    // valorCarta('AD');
    // const valor = valorCarta('KD');


    // Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {
            console.warn('21, genial!');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled   = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);
    });

    // btnNuevo.addEventListener('click', () => {

    //     inicializarJuego();

    // })

    return {
        nuevoJuego: inicializarJuego
    };

})();




