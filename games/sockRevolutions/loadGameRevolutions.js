function loadGame_revolutions() {
  console.log("que inicie el baile");
  const gameContainer = document.getElementById('gameContainer');

  const gameHTML = `
    <link rel="stylesheet" type="text/css" href="games/sockRevolutions/css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Monoton" rel="stylesheet">
    <link rel="shortcut icon" type="image/x-icon" href="games/sockRevolutions/assets/favicon.ico" />

    <span id="modalOverlay">
      <div id="startGameModal" class="modalMessage">
        <h3>Sock Sock Revolution!</h3>        
        <button id="redirectButton">Continuar</button>
      </div>

      <div id="endGameModal" class="modalMessage">
        <h3>Gracias por Jugar!</h3>
        <button id="playAgainButton">Play Again</button>
      </div>
    </span>

    <canvas id="ttrCanvas" width="450" height="600"></canvas>

    <div class="mobileControls">
      <button onclick="simulateKeyCode(37)">
        <img id="left" src="games/sockRevolutions/assets/staticLeft.png" width="60px">
      </button>
      <button onclick="simulateKeyCode(40)">
        <img id="down" src="games/sockRevolutions/assets/staticDown.png" width="60px">
      </button>
      <button onclick="simulateKeyCode(38)">
        <img id="up" src="games/sockRevolutions/assets/staticUp.png" width="60px">
      </button>
      <button onclick="simulateKeyCode(39)">
        <img id="right" src="games/sockRevolutions/assets/staticRight.png" width="60px">
      </button>
    </div>

    <div class="controls">
      <img id="muteIcon" src="games/sockRevolutions/assets/sound.png">
      <img id="pauseIcon" src="games/sockRevolutions/assets/pause.png">
      <img id="restartIcon" src="games/sockRevolutions/assets/restart.png">
    </div>

    <div class="combo">
      <p id="comboCount"></p>
      <span id="comboText">combo</span>
    </div>

    <div id="score">Puntos: 0</div>

    <section class="canvasArea">     
      <div id="directions">        
           <button id="playButton">Play!</button>
      </div>

      <div class="arrowImages">
        <img id="left" src="games/sockRevolutions/assets/staticLeft.png">
        <img id="down" src="games/sockRevolutions/assets/staticDown.png">
        <img id="up" src="games/sockRevolutions/assets/staticUp.png">
        <img id="right" src="games/sockRevolutions/assets/staticRight.png">
      </div>

     <audio id="mainSong" controls></audio>

      <audio id="endApplause" src="games/sockRevolutions/assets/applause.mp3"></audio>
    </section>
  `;

  // Insertar el HTML sin los scripts aún
  gameContainer.innerHTML = gameHTML;

  // Crear dinámicamente los scripts después de cargar el HTML
  const script1 = document.createElement("script");
  script1.src = "games/sockRevolutions/js/arrowSprites.js";
  script1.type = "text/javascript";
  script1.onload = () => {
    const script2 = document.createElement("script");
    script2.src = "games/sockRevolutions/js/script.js";
    script2.type = "text/javascript";
    document.body.appendChild(script2);
  };

  document.body.appendChild(script1);
}