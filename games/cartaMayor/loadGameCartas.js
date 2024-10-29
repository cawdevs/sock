// Función para cargar el contenido del juego dinámicamente
function loadGame() {

    const gameContainer = document.getElementById('gameContainer');

     // Verificar si los estilos ya están cargados
    if (!document.getElementById('gameStyles')) {
        const link = document.createElement('link');
        link.id = 'gameStyles';
        link.rel = 'stylesheet';
        link.href = 'games/cartaMayor/styles.css'; // Ruta corregida
        document.head.appendChild(link);
    }

    const gameHTML = `
        <h1>Select Card</h1>
        <div class="cards">
            <div class="card" id="card1" onclick="selectCard(1)">
                <div class="back"></div>
                <div class="front"></div>
            </div>
            <div class="card" id="card2" onclick="selectCard(2)">
                <div class="back"></div>
                <div class="front"></div>
            </div>
        </div>

        <center>
        <!-- Contenedor para mostrar el mensaje -->
        <h1><div id="message" class="message2"></div><h1>
        <button id="revealButton" onclick="revealCards()">Filp Card</button>
        <button id="resetButton" onclick="resetGame()" style="display: none;">Reload</button>
        
        <div class="scoreboard">
            <h3><p>Wins: <span id="winCount" style="color: green;">0</span></p></h3>
            <h4><p>Loss: <span id="lossCount" style="color: red;">0</span></p></h4>
            <p>Attempts: <span id="attemptCount">0</span></p>
        </div>
        <center>
        <p id="result"></p>
        
        <button id="claimTokensButton" style="display: none;" onclick="claimTokens()">Reclamar Tokens</button>
        
        

    `
    
    ;

    // Insertar el contenido dinámico en el contenedor
    gameContainer.innerHTML = gameHTML;

    fullResetGame();
}