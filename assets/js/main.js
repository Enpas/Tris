// Seleziona tutti gli elementi con la classe ".tris-box" (le caselle di gioco)
const trisBoxes = document.querySelectorAll(".tris-box");

// Inizializza il turno del gioco con "X", e imposta lo stato del gioco come "in corso"
let currentPlayer = "X";
let isGameOver = false;

// Seleziona gli elementi per visualizzare i risultati e il pulsante per giocare di nuovo
const results = document.querySelector("#results");
const playAgainBtn = document.querySelector("#play-again");

// Seleziona l'elemento per il "segnale" che indica il turno (barra di sfondo che si sposta)
const turnBackground = document.querySelector(".turn-background");

// Assicura che le caselle siano vuote all'inizio e aggiunge l'evento di click su ogni casella
trisBoxes.forEach(e => {
    e.innerHTML = ""; // Inizializza le caselle vuote all'inizio

    // Aggiungi un evento di click per ogni casella
    e.addEventListener("click", () => {
        // Se il gioco non è finito e la casella è vuota, esegui l'azione
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = currentPlayer; // Imposta il simbolo del giocatore corrente (X o O) nella casella
            checkWin(); // Controlla se il giocatore ha vinto
            checkDraw(); // Controlla se c'è un pareggio
            changeTurn(); // Cambia il turno
        }
    });
});

// Funzione per cambiare il turno da X a O o viceversa
function changeTurn() {
    // Se il turno è X, cambialo a O, altrimenti cambialo a X
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    // Cambia la posizione della barra di sfondo che indica il turno del giocatore
    turnBackground.style.left = (currentPlayer === "X") ? "0" : "125px";
}

// Funzione per verificare se c'è una vittoria
function checkWin() {
    // Le condizioni di vittoria (orizzontali, verticali e diagonali)
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Orizzontali
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticali
        [0, 4, 8], [2, 4, 6] // Diagonali
    ];

    // Cicla attraverso tutte le condizioni di vittoria
    for (const [a, b, c] of winConditions) {
        // Prendi i valori delle caselle specificate dalle condizioni di vittoria
        const v0 = trisBoxes[a].innerHTML, v1 = trisBoxes[b].innerHTML, v2 = trisBoxes[c].innerHTML;

        // Se tutte e tre le caselle della condizione di vittoria sono uguali e non vuote
        if (v0 && v0 === v1 && v0 === v2) {
            // Il gioco è finito (vittoria)
            isGameOver = true;
            results.innerHTML = `Il giocatore ${currentPlayer} ha vinto!!`; // Mostra il risultato di vittoria
            playAgainBtn.style.display = "inline"; // Mostra il pulsante per giocare di nuovo

            // Evidenzia le caselle vincenti
            [a, b, c].forEach(index => {
                trisBoxes[index].style.backgroundColor = "#000"; // Cambia lo sfondo delle caselle vincenti
                trisBoxes[index].style.color = "#fff"; // Cambia il colore del testo delle caselle vincenti
            });
            return; // Esce dalla funzione una volta trovata una vittoria
        }
    }
}

// Funzione per verificare se c'è un pareggio (quando tutte le caselle sono piene senza vincitore)
function checkDraw() {
    // Se il gioco non è finito e tutte le caselle sono occupate, è un pareggio
    if (!isGameOver && [...trisBoxes].every(e => e.innerHTML !== "")) {
        isGameOver = true; // Imposta il gioco come finito
        results.innerHTML = "Pareggio!!"; // Mostra il risultato di pareggio
        playAgainBtn.style.display = "inline"; // Mostra il pulsante per giocare di nuovo
    }
}

// Gestione del pulsante "Rigioca" per riavviare il gioco
playAgainBtn.addEventListener("click", () => {
    // Resetta lo stato del gioco
    isGameOver = false;
    currentPlayer = "X"; // Ripristina il turno a "X"
    turnBackground.style.left = "0"; // Ripristina la posizione della barra di sfondo
    results.innerHTML = ""; // Rimuovi il messaggio di vittoria o pareggio
    playAgainBtn.style.display = "none"; // Nascondi il pulsante "Rigioca"

    // Resetta tutte le caselle (le svuota e rimuove gli stili di evidenza)
    trisBoxes.forEach(e => {
        e.innerHTML = ""; // Svuota la casella
        e.style.removeProperty("background-color"); // Rimuovi il colore di sfondo
        e.style.color = "#000"; // Ripristina il colore del testo
    });
});
