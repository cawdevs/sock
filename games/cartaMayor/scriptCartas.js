
let selectedCard = null;
let values = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A'];
let cardValues = [];
let winCount = 0;
let lossCount = 0;
let attemptCount = 0;
let claimAvailable = false; // Para gestionar el estado del botón "Reclamar Tokens"

function selectCard(cardNumber) {
    if (selectedCard !== null && selectedCard !== cardNumber) {
        document.getElementById(`card${selectedCard}`).classList.remove('selected');
    }
    selectedCard = cardNumber;
    document.getElementById(`card${cardNumber}`).classList.add('selected');
}

function revealCards() {
    if (selectedCard === null) {
        alert('Selecciona una carta antes de abrir.');
        return;
    }

    document.getElementById('revealButton').disabled = true;

    cardValues = [getRandomCardValue(), getRandomCardValue()];

    // Asegurarse de que ambas cartas sean diferentes
    while (cardValues[0] === cardValues[1]) {
        cardValues[1] = getRandomCardValue(); // Reasignar la segunda carta si es igual
    }

    document.getElementById('card1').querySelector('.front').textContent = cardValues[0];
    document.getElementById('card2').querySelector('.front').textContent = cardValues[1];

    document.getElementById('card1').querySelector('.front').style.visibility = 'visible';
    document.getElementById('card2').querySelector('.front').style.visibility = 'visible';

    checkResult();

    document.getElementById('resetButton').style.display = 'inline-block';
}

function getRandomCardValue() {
    let randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
}
function checkResult() {
    const value1 = cardValues[0];
    const value2 = cardValues[1];

    const result = compareCards(value1, value2);
    const messageElement = document.getElementById('message');

    if (result === 'win') {
        messageElement.textContent = 'YOU WIN!';
        messageElement.style.color = 'lime'; // Color para win
        winCount++;
    } else {
        messageElement.textContent = 'YOU LOSS!';
        messageElement.style.color = 'red'; // Color para loss
        lossCount++;
    }

    attemptCount++;

    document.getElementById('winCount').textContent = winCount;
    document.getElementById('lossCount').textContent = lossCount;
    document.getElementById('attemptCount').textContent = attemptCount;

    // Mostrar el mensaje
    messageElement.style.display = 'block';
    messageElement.style.opacity = 1; // Hacerlo visible

    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => {
        messageElement.style.opacity = 0; // Hacerlo invisible
        setTimeout(() => {
            messageElement.style.display = 'none'; // Ocultar el contenedor
        }, 500); // Tiempo para que la transición de opacidad termine
    }, 2000);

    if (winCount - lossCount >= 2 && !claimAvailable) {
        claimAvailable = true;
        document.getElementById('claimTokensButton').style.display = 'inline-block';

        document.getElementById('revealButton').disabled = true;
        document.getElementById('resetButton').disabled = true;
    }
}
function checkResult2() {
    const value1 = cardValues[0];
    const value2 = cardValues[1];

    const result = compareCards(value1, value2);
    document.getElementById('result').textContent = result === 'win' ? 'WIN' : 'LOSS';

    if (result === 'win') {
        winCount++;
    } else {
        lossCount++;
    }
    attemptCount++;

    document.getElementById('winCount').textContent = winCount;
    document.getElementById('lossCount').textContent = lossCount;
    document.getElementById('attemptCount').textContent = attemptCount;

    if (winCount - lossCount >= 2 && !claimAvailable) {
        claimAvailable = true;
        document.getElementById('claimTokensButton').style.display = 'inline-block';

        document.getElementById('revealButton').disabled = true;
        document.getElementById('resetButton').disabled = true;
    }
}

function compareCards(card1, card2) {
    const cardOrder = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A'];
    const value1 = cardOrder.indexOf(card1);
    const value2 = cardOrder.indexOf(card2);

    if ((selectedCard === 1 && value1 > value2) || (selectedCard === 2 && value2 > value1)) {
        return 'win';
    } else {
        return 'loss';
    }
}

function resetGame() {
    document.getElementById('card1').querySelector('.front').style.visibility = 'hidden';
    document.getElementById('card2').querySelector('.front').style.visibility = 'hidden';

    document.getElementById('card1').classList.remove('selected');
    document.getElementById('card2').classList.remove('selected');

    document.getElementById('result').textContent = '';

    selectedCard = null;
    cardValues = [];

    document.getElementById('revealButton').disabled = false; // Reactivar el botón de "Abrir Cartas"
    document.getElementById('resetButton').style.display = 'none';
}

function fullResetGame() {
    resetGame(); // Reinicia el juego sin afectar el marcador

    document.getElementById('claimTokensButton').style.display = 'none';

    winCount = 0;
    lossCount = 0;
    attemptCount = 0;
    claimAvailable = false;

    document.getElementById('winCount').textContent = winCount;
    document.getElementById('lossCount').textContent = lossCount;
    document.getElementById('attemptCount').textContent = attemptCount;

    // Reactivar los botones después de reiniciar el juego
    document.getElementById('revealButton').disabled = false; // Asegurarse que el botón "Abrir Cartas" esté habilitado
    document.getElementById('resetButton').disabled = false; // Asegurarse que el botón "Reiniciar Juego" esté habilitado
}

function claimTokens() {
    document.getElementById('claimTokensButton').style.display = 'none';
    const privateKey = localStorage.getItem('privateKey'); 

    
    tokensFree_wallet('SOCK');
    
       
    
    


    fullResetGame(); // Reiniciar el juego completamente después de reclamar
}