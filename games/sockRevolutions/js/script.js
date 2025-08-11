const canvas = document.getElementById("ttrCanvas");
const ctx = canvas.getContext("2d");
let modalOverlay = document.getElementById("modalOverlay");
let directions = document.getElementById("directions");
let playButton = document.getElementById("playButton");
let mainSong = document.getElementById("mainSong");
let applause = document.getElementById("endApplause");
let startModal = document.getElementById("startGameModal");
let endModal = document.getElementById("endGameModal");
let scoreDisplay = document.getElementById("score");
let comboCount = document.getElementById("comboCount");
let comboText = document.getElementById("comboText");
let pauseIcon = document.getElementById("pauseIcon");
let score = 0;
let combo = 0;
let pause = false;
let restart = false;
let ended = false;
let leftPressed = false;
let downPressed = false;
let upPressed = false;
let rightPressed = false;
let dirSty = window.getComputedStyle(directions).getPropertyValue("display");
let arrowArray = [];
let arrowDrawTimeout;









window.onload = drawStaticArrows;
document.getElementById("redirectButton").onclick = popupDirections;
playButton.onclick = gameStart;
document.getElementById("playAgainButton").onclick = playAgain;
document.getElementById("muteIcon").onclick = toggleMute;
pauseIcon.onclick = gamePause;
document.getElementById("restartIcon").onclick = gameRestart;
document.getElementById("mainSong").onended = songEnd;
document.getElementById("endApplause").onended = gameEnd;
document.addEventListener("keydown", handleKeyPress);
document.addEventListener("keyup", handleKeyPress);





// Lista de canciones disponibles
const songs = [
  "games/sockRevolutions/assets/captainJack.mp3",
  //"games/sockRevolutions/assets/inTheNavy.mp3",
  //"games/sockRevolutions/assets/paranoia.mp3"
];

// Selecciona una canción al azar
const randomIndex = Math.floor(Math.random() * songs.length);
const selectedSong = songs[randomIndex];

// Asigna la canción al elemento <audio>
const audioElement = document.getElementById("mainSong");
audioElement.src = selectedSong;


function drawStaticArrows() {
  let leftImg = document.getElementById("left");
  let leftSX = 1.5 * (canvas.width / 8);
  let downImg = document.getElementById("down");
  let downSX = 2.75 * (canvas.width / 8);
  let upImg = document.getElementById("up");
  let upSX = 4.0 * (canvas.width / 8);
  let rightImg = document.getElementById("right");
  let rightSX = 5.25 * (canvas.width / 8);

  let img;
  let sx;
  let sy = 40;
  let width = 75;
  let height = 75;
  ["left", "down", "up", "right"].forEach(dir => {
    switch (dir) {
      case "left":
        img = leftImg;
        sx = leftSX;
        break;
      case "down":
        img = downImg;
        sx = downSX;
        break;
      case "up":
        img = upImg;
        sx = upSX;
        break;
      case "right":
        img = rightImg;
        sx = rightSX;
    }
    ctx.drawImage(img, sx, sy, width, height);
  });
}

function popupDirections() {
  startModal.style.display = "none";
  directions.style.zIndex = 10;
  if (dirSty === "none") {
    directions.style.display = "flex";
  }
}

function gameStart() {
  modalOverlay.style.visibility = "hidden";
  playButton.style.display = "none";
  directions.style.zIndex = 0;
  if (dirSty === "none") {
    directions.style.display = "none";
  }
  mainSong.play();
  arrowDraw();
  setInterval(draw, 1);
}

function arrowDraw() {
  if (ended || restart) {
    return;
  } else {
    if (!pause) {
      let nextArrow = arrowCreate();
      arrowArray.push(nextArrow);
      arrowArray[arrowArray.length - 1].drawArrow();
      arrowArray.forEach(arrow => (arrow.dy = -4));
      let time;
      if (arrowArray.length <= 20) {
        time = 600;
      } else if (arrowArray.length <= 40 && arrowArray.length > 20) {
        time = Math.floor(Math.random() * (600 - 400 + 1)) + 400;
      } else {
        time = Math.floor(Math.random() * (600 - 250 + 1)) + 250;
      }
      arrowDrawTimeout = setTimeout(arrowDraw, time);
    } else {
      for (let i = 0; i < arrowArray.length; i++) {
        arrowArray[i].dy = 0;
      }
      arrowDrawTimeout = setTimeout(arrowDraw, 100);
    }
  }
}

function arrowCreate() {
  let num = Math.floor(Math.random() * 4) + 1;
  switch (num) {
    case 1:
      return new ArrowSprite("left");
    case 2:
      return new ArrowSprite("down");
    case 3:
      return new ArrowSprite("up");
    case 4:
      return new ArrowSprite("right");
  }
}

function gamePause() {
  pause = !pause;
  if (pause) {
    mainSong.pause();
    pauseIcon.src = "games/sockRevolutions/assets/play.png";
  } else {
    mainSong.play();
    pauseIcon.src = "games/sockRevolutions/assets/pause.png";
  }
}

function gameRestart() {
  restarting();
  if (restart === true) {
    restart = false;
    playButton.style.display = "flex";
    startModal.style.display = "flex";
    modalOverlay.style.visibility = "visible";
  }
}

function restarting() {
  clearTimeout(arrowDrawTimeout);
  restart = true;
  pause = false;
  clearNumbers();
  mainSong.pause();
  mainSong.currentTime = 0;
  arrowArray = arrowArray.map(arrow => {
    arrow.y = canvas.height;
    arrow.dy = 0;
  });
  arrowArray = [];
}

function clearNumbers() {
  score = 0;
  scoreDisplay.innerHTML = "Score: " + `${score}`;
  combo = 0;
  comboCount.innerHTML = "";
}

function songEnd() {
  ended = true;
  if (ended === true) {
    applause.play();
  }
}

function gameEnd() {
  modalOverlay.style.visibility = "visible";
  endModal.style.display = "flex";


  add_points(score);
}

function playAgain() {
  modalOverlay.style.visibility = "hidden";
  endModal.style.display = "none";
  clearNumbers();
  ended = false;
  gameStart();
}

function toggleMute() {
  mainSong.muted = !mainSong.muted;
}

function handleKeyPress(e) {
  switch (e.keyCode) {
    case 37:
      leftPressed = !leftPressed;
      break;
    case 38:
      upPressed = !upPressed;
      break;
    case 39:
      rightPressed = !rightPressed;
      break;
    case 40:
      downPressed = !downPressed;
      break;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawStaticArrows();

  for (let i = 0; i < arrowArray.length; i++) {
    if (combo > 0) {
      comboText.style.visibility = "visible";
    } else {
      comboText.style.visibility = "hidden";
    }

    if (leftPressed) {
      if (
        arrowArray[i].x === 84.375 &&
        arrowArray[i].y < 28 &&
        arrowArray[i].y > 1
      ) {
        if (arrowArray[i].combo === true) {
          combo += 1;
          arrowArray[i].combo = false;
        }
        comboCount.innerHTML = combo;

        if (arrowArray[i].points === true && combo <= 10) {
          score += 50;
          arrowArray[i].points = false;
        } else if (arrowArray[i].points === true && combo > 10 && combo <= 25) {
          score += 75;
          arrowArray[i].points = false;
        } else if (arrowArray[i].points === true && combo > 25 && combo <= 50) {
          score += 100;
          arrowArray[i].points = false;
        } else if (
          arrowArray[i].points === true &&
          combo > 50 &&
          combo <= 100
        ) {
          score += 150;
          arrowArray[i].points = false;
        } else if (arrowArray[i].points === true && combo > 100) {
          score += 200;
          arrowArray[i].points = false;
        }
        scoreDisplay.innerHTML = "Score: " + `${score}`;
        arrowArray[i].directionImage.src = "";
      }
    }

    if (downPressed) {
      if (
        arrowArray[i].x === 154.6875 &&
        arrowArray[i].y < 28 &&
        arrowArray[i].y > 1
      ) {
        if (arrowArray[i].combo === true) {
          combo += 1;
          arrowArray[i].combo = false;
        }
        comboCount.innerHTML = combo;

        if (arrowArray[i].points === true && combo <= 10) {
          score += 50;
          arrowArray[i].points = false;
        } else if (arrowArray[i].points === true && combo > 10 && combo <= 25) {
          score += 75;
          arrowArray[i].points = false;
        } else if (arrowArray[i].points === true && combo > 25 && combo <= 50) {
          score += 100;
          arrowArray[i].points = false;
        } else if (
          arrowArray[i].points === true &&
          combo > 50 &&
          combo <= 100
        ) {
          score += 150;
          arrowArray[i].points = false;
        } else if (arrowArray[i].points === true && combo > 100) {
          score += 200;
          arrowArray[i].points = false;
        }
        scoreDisplay.innerHTML = "Score: " + `${score}`;
        arrowArray[i].directionImage.src = "";
      }
    }

    if (upPressed) {
      if (
        arrowArray[i].x === 225 &&
        arrowArray[i].y < 28 &&
        arrowArray[i].y > 1
      ) {
        if (arrowArray[i].combo === true) {
          combo += 1;
          arrowArray[i].combo = false;
        }
        comboCount.innerHTML = combo;

        if (arrowArray[i].points === true && combo <= 10) {
          score += 50;
          arrowArray[i].points = false;
        } else if (arrowArray[i].points === true && combo > 10 && combo <= 25) {
          score += 75;
          arrowArray[i].points = false;
        } else if (arrowArray[i].points === true && combo > 25 && combo <= 50) {
          score += 100;
          arrowArray[i].points = false;
        } else if (
          arrowArray[i].points === true &&
          combo > 50 &&
          combo <= 100
        ) {
          score += 150;
          arrowArray[i].points = false;
        } else if (arrowArray[i].points === true && combo > 100) {
          score += 200;
          arrowArray[i].points = false;
        }
        scoreDisplay.innerHTML = "Score: " + `${score}`;
        arrowArray[i].directionImage.src = "";
      }
    }

    if (rightPressed) {
      if (
        arrowArray[i].x === 295.3125 &&
        arrowArray[i].y < 28 &&
        arrowArray[i].y > 1
      ) {
        if (arrowArray[i].combo === true) {
          combo += 1;
          arrowArray[i].combo = false;
        }
        comboCount.innerHTML = combo;

        if (arrowArray[i].points === true && combo <= 10) {
          score += 50;
          arrowArray[i].points = false;
        } else if (arrowArray[i].points === true && combo > 10 && combo <= 25) {
          score += 75;
          arrowArray[i].points = false;
        } else if (arrowArray[i].points === true && combo > 25 && combo <= 50) {
          score += 100;
          arrowArray[i].points = false;
        } else if (
          arrowArray[i].points === true &&
          combo > 50 &&
          combo <= 100
        ) {
          score += 150;
          arrowArray[i].points = false;
        } else if (arrowArray[i].points === true && combo > 100) {
          score += 200;
          arrowArray[i].points = false;
        }
        scoreDisplay.innerHTML = "Score: " + `${score}`;
        arrowArray[i].directionImage.src = "";
      }
    }

    if (arrowArray[i].y <= 1 && arrowArray[i].points !== false) {
      combo = 0;
      comboCount.innerHTML = "";
      arrowArray[i].points = false;
    }
  }
}


function simulateKeyCode(keyCode) {
  const downEvent = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    keyCode: keyCode,
    which: keyCode,
  });

  const upEvent = new KeyboardEvent("keyup", {
    bubbles: true,
    cancelable: true,
    keyCode: keyCode,
    which: keyCode,
  });

  // Forzar el valor de keyCode si no se aplica automáticamente
  Object.defineProperty(downEvent, "keyCode", { get: () => keyCode });
  Object.defineProperty(upEvent, "keyCode", { get: () => keyCode });

  document.dispatchEvent(downEvent);
  setTimeout(() => document.dispatchEvent(upEvent), 300);

  // Mostrar en consola qué tecla se presionó
  const keyNames = {
    37: "Flecha izquierda",
    38: "Flecha arriba",
    39: "Flecha derecha",
    40: "Flecha abajo"
  };

  console.log("Tecla simulada:", keyNames[keyCode] || `Código ${keyCode}`);
}


function add_points_to_wallet(walletKey, points) {
    console.log(`Agregando ${points} puntos a:`, walletKey);

    fetch("https://api.thesocks.net/add-points/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            wallet_key: walletKey,
            puntos: points
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta del servidor:", data);

        if (data.status === "success") {
            console.log(`✅ Puntos agregados correctamente a ${walletKey}`);
        } else {
            console.warn("⚠ No se pudieron agregar puntos:", data.error || "Error desconocido");
        }
    })
    .catch(error => {
        console.error("❌ Error al agregar puntos:", error);
    });
}

function add_points(points) {
    add_points_to_wallet(globalWalletKey, points);
    get_total_points();

}