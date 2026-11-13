
function monster_SOCKS_game() {

    //==================================================
    // ESTILOS: SELECCIÓN Y ANIMACIÓN
    //==================================================

    if (!document.getElementById("monsterSocksStyle")) {
        const style = document.createElement("style");
        style.id = "monsterSocksStyle";
        style.textContent = `
            .ms-wrapper {
                width: 100%;
                max-width: 460px;
                margin: 0 auto;
                padding: 20px 12px;
                box-sizing: border-box;
                text-align: center;
                background: #101827;
                color: #ffffff;
                font-family: Arial, Helvetica, sans-serif;
                border-radius: 14px;
            }

            .ms-wrapper * { box-sizing: border-box; }

            .ms-title {
                margin: 0;
                color: #e8eef8;
                font-size: clamp(25px, 7vw, 36px);
                letter-spacing: 3px;
                text-shadow: 0 3px 0 #1e90ff;
            }

            .ms-subtitle {
                margin: 7px 0 16px;
                color: #9fb3cc;
                font-size: 13px;
                letter-spacing: 1px;
            }

            #selectionScreen {
                width: 100%;
                animation: msAppear .5s ease;
            }

            .ms-selection-title {
                margin: 15px 0 5px;
                color: #ffd45c;
                font-size: 24px;
                letter-spacing: 2px;
                text-shadow: 0 2px 5px #000;
            }

            .ms-selection-description {
                color: #9fb3cc;
                font-size: 13px;
                margin-bottom: 18px;
            }

            #selectedCardContainer {
                width: 100%;
                min-height: 300px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 20px;
            }

            #selectedCard {
                display: block;
                max-width: 85%;
                max-height: 300px;
                width: auto;
                height: auto;
                object-fit: contain;
                border-radius: 12px;
                filter: drop-shadow(0 8px 15px rgba(0,0,0,.7));
                animation: msCardAppear .3s ease;
            }

            .ms-cards-title {
                color: #ffffff;
                font-size: 13px;
                letter-spacing: 2px;
                margin-bottom: 12px;
            }

            #cardsContainer {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
                width: 100%;
                margin-bottom: 22px;
            }

            .card-option {
                padding: 4px;
                background: transparent;
                border: 2px solid #34445d;
                border-radius: 9px;
                cursor: pointer;
                transition: all .2s ease;
            }

            .card-option img {
                display: block;
                width: 100%;
                height: auto;
                border-radius: 5px;
            }

            .card-option:hover {
                transform: translateY(-5px);
                border-color: #1e90ff;
            }

            .card-option.selected {
                border: 3px solid #ffd45c;
                box-shadow: 0 0 10px #ffd45c,
                            0 0 20px rgba(255,212,92,.4);
                transform: translateY(-5px);
            }

            #startCombatButton {
                width: 100%;
                padding: 15px 12px;
                border: none;
                border-radius: 10px;
                background: linear-gradient(135deg, #ffcc33, #ff8c00);
                color: #191919;
                font-size: 17px;
                font-weight: bold;
                letter-spacing: 2px;
                cursor: pointer;
                box-shadow: 0 5px 0 #a65300;
                transition: all .2s ease;
            }

            #startCombatButton:hover:not(:disabled) {
                transform: translateY(-2px);
                filter: brightness(1.1);
            }

            #startCombatButton:active:not(:disabled) {
                transform: translateY(3px);
                box-shadow: 0 2px 0 #a65300;
            }

            #startCombatButton:disabled {
                opacity: .65;
                cursor: not-allowed;
            }

            #game {
                width: 100%;
                max-width: 420px;
                margin: 0 auto;
            }

            #canvas {
                width: 100%;
                display: block;
                background: #496382;
                touch-action: none;
            }

            #acciones {
                display: flex;
                width: 100%;
                gap: 16px;
                margin-top: 8px;
                touch-action: none;
            }

            #left, #right {
                flex: 1;
                height: 70px;
                font-size: 32px;
                cursor: pointer;
                border: 2px solid white;
                border-radius: 10px;
                background: #263e5d;
                color: white;
                user-select: none;
                -webkit-user-select: none;
                touch-action: none;
            }

            #left:active, #right:active {
                transform: scale(.92);
                background: #1e90ffcc;
            }

            #fire {
                width: 60px;
                height: 60px;
                flex: none;
                align-self: center;
                font-size: 28px;
                border-radius: 50%;
                background: dodgerblue;
                color: white;
                border: 2px solid white;
                cursor: pointer;
                touch-action: none;
                user-select: none;
                -webkit-user-select: none;
            }

            #fire:active {
                transform: scale(.92);
                background: #1e90ffcc;
            }

            #game {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
                width: 100%;
            }

            #fight {
                width: 100%;
                padding: 15px;
                font-size: 20px;
                font-weight: 900;
                letter-spacing: 2px;
                color: #ffffff;
                background: linear-gradient(135deg, #ff1744, #8e00ff);
                border: 3px solid #ffffff;
                border-radius: 12px;
                cursor: pointer;
                box-shadow: 0 0 15px rgba(255,0,100,.6);
            }

            .ms-footer {
                margin-top: 14px;
                color: #8194ad;
                font-size: 12px;
            }

            @keyframes msAppear {
                from { opacity: 0; transform: translateY(15px); }
                to { opacity: 1; transform: translateY(0); }
            }

            @keyframes msCardAppear {
                from { opacity: 0; transform: scale(.85); }
                to { opacity: 1; transform: scale(1); }
            }

            @media (max-width: 360px) {
                #cardsContainer { gap: 6px; }
                .card-option { padding: 3px; }
                #selectedCardContainer { min-height: 270px; }
                #selectedCard { max-height: 270px; }
            }
        `;
        document.head.appendChild(style);
    }

    //==================================================
    // CONTENEDOR PRINCIPAL
    //==================================================

    let principal = document.getElementById("gameContainer");

    if (!principal) {
        principal = document.createElement("div");
        principal.id = "gameContainer";
        document.body.appendChild(principal);
    }

    principal.innerHTML = `
        <main class="ms-wrapper" id="monsterSocksRoot">
            <header>
                <h1 class="ms-title">MONSTER_SOCKS</h1>
                <p class="ms-subtitle" id="mainSubtitle">
                    PREPÁRATE PARA EL COMBATE
                </p>
            </header>

            <section id="selectionScreen">
                <h2 class="ms-selection-title">ELIGE TU PODER</h2>
                
                <div id="selectedCardContainer">
                    <img id="selectedCard" src="" alt="Carta seleccionada">
                </div>

                <div class="ms-cards-title">SELECCIONA UNA CARTA</div>

                <div id="cardsContainer">
                    <button class="card-option" data-card="fuego"
                            type="button" aria-label="Seleccionar Fuego">
                        <img src="games/monsterSocksCombat/imagenes/cartas/carta_fuego.png"
                             alt="Fuego">
                    </button>

                    <button class="card-option" data-card="agua"
                            type="button" aria-label="Seleccionar Agua">
                        <img src="games/monsterSocksCombat/imagenes/cartas/carta_agua.png"
                             alt="Agua">
                    </button>

                    <button class="card-option" data-card="rayo"
                            type="button" aria-label="Seleccionar Rayo">
                        <img src="games/monsterSocksCombat/imagenes/cartas/carta_rayo.png"
                             alt="Rayo">
                    </button>
                </div>

                <div id="combatResult" style="display:none; margin:20px 0;
                     padding:15px; background:#1b2940; border-radius:12px;">
                    <h3>Resultado del enfrentamiento</h3>
                    <p id="player1Selection"></p>
                    <p id="player2Selection"></p>
                    <h2 id="winnerText"></h2>
                </div>

                <button id="startCombatButton" type="button" disabled>
                    ¡ESPERANDO SELECCIÓN!
                </button>
            </section>

            <section id="gameContainerAnimation" style="display:none;">
                <div id="game"></div>
            </section>

            <footer class="ms-footer" id="gameFooter">
                Selecciona tu poder y prepárate para luchar.
            </footer>
        </main>
    `;

    //==================================================
    // ELEMENTOS DE LA INTERFAZ Y SELECCIÓN DE CARTAS
    //==================================================

    const selectionScreen = principal.querySelector("#selectionScreen");
    const gameAnimationScreen = principal.querySelector("#gameContainerAnimation");
    const gameArea = principal.querySelector("#game");
    const mainSubtitle = principal.querySelector("#mainSubtitle");
    const gameFooter = principal.querySelector("#gameFooter");
    const selectedCard = principal.querySelector("#selectedCard");
    const startCombatButton = principal.querySelector("#startCombatButton");
    const cardOptions = principal.querySelectorAll(".card-option");

    let selectedPower = null;
    let opponentPower = null;
    let resultadoCombate = null;
    let gameInstance = null;

    const powers = ["fuego", "rayo", "agua"];

    const powerNames = {
        fuego: "🔥 Fuego",
        rayo: "⚡ Rayo",
        agua: "💧 Agua"
    };

    const cardImages = {
        fuego: "games/monsterSocksCombat/imagenes/cartas/carta_fuego.png",
        rayo: "games/monsterSocksCombat/imagenes/cartas/carta_rayo.png",
        agua: "games/monsterSocksCombat/imagenes/cartas/carta_agua.png"
    };

    const advantages = {
        fuego: "agua",
        agua: "rayo",
        rayo: "fuego"
    };

    function determinarGanador(poder1, poder2) {
        if (poder1 === poder2) return "empate";
        if (advantages[poder1] === poder2) return "usuario1";
        return "usuario2";
    }

    function resolverCombateSimulado() {
        if (!selectedPower) return;

        opponentPower = powers[
            Math.floor(Math.random() * powers.length)
        ];

        const resultado = determinarGanador(selectedPower, opponentPower);

        principal.querySelector("#player1Selection").textContent =
            "Usuario 1 (Tief): " + powerNames[selectedPower];

        principal.querySelector("#player2Selection").textContent =
            "Usuario 2 (Hero): " + powerNames[opponentPower];

        const winnerText = principal.querySelector("#winnerText");

        if (resultado === "usuario1") {
            winnerText.textContent = "¡GANA TIEF!";
            resultadoCombate = "tief_wins";
        } else if (resultado === "usuario2") {
            winnerText.textContent = "¡GANA HERO!";
            resultadoCombate = "hero_wins";
        } else {
            winnerText.textContent = "¡EMPATE!";
            resultadoCombate = "empate";
        }

        principal.querySelector("#combatResult").style.display = "none";

        startCombatButton.disabled = false;
        startCombatButton.textContent = "VER COMBATE";

        //console.log("Usuario 1:", selectedPower);
        //console.log("Usuario 2:", opponentPower);
        //console.log("Resultado:", resultado);
    }

    cardOptions.forEach(card => {
        card.addEventListener("click", () => {
            selectedPower = card.dataset.card;

            selectedCard.src = cardImages[selectedPower];
            selectedCard.style.animation = "none";
            void selectedCard.offsetWidth;
            selectedCard.style.animation = "msCardAppear .3s ease";

            cardOptions.forEach(option => option.classList.remove("selected"));
            card.classList.add("selected");

            resolverCombateSimulado();
        });
    });

    startCombatButton.addEventListener("click", () => {
        if (!selectedPower || !opponentPower || !resultadoCombate || gameInstance) {
            return;
        }

        selectionScreen.style.display = "none";
        gameAnimationScreen.style.display = "block";
        mainSubtitle.textContent = "¡QUE COMIENCE EL COMBATE!";
        gameFooter.textContent = "MONSTER SOCKS - FIGHT!";

        //console.log("Combate iniciado.");
        //console.log("Tief:", selectedPower);
        //console.log("Hero:", opponentPower);
        //console.log("Resultado:", resultadoCombate);

        // El canvas se crea ahora, cuando el usuario confirma la carta.
        const canvas = document.createElement("canvas");
        canvas.id = "canvas";
        canvas.width = 300;
        canvas.height = 500;
        canvas.tabIndex = 0;
        canvas.style.width = "100%";
        canvas.style.maxWidth = "400px";
        canvas.style.height = "auto";
        canvas.style.display = "block";

        gameArea.appendChild(canvas);

        const ctx = canvas.getContext("2d");

        const acciones = document.createElement("div");
        acciones.id = "acciones";
        acciones.style.width = "100%";
        acciones.style.maxWidth = "400px";
        gameArea.appendChild(acciones);

        const fight = document.createElement("button");
        fight.id = "fight";
        fight.type = "button";
        fight.textContent = "LOADING...";
        acciones.appendChild(fight);

        gameInstance = new MonsterSocksGame(canvas, ctx, resultadoCombate);
    });

    // La clase MonsterSocksGame y las clases de personajes
    // continúan debajo de este punto.


    
class Hero {

    constructor(ctx, canvas) {

        this.ctx = ctx;
        this.canvas = canvas;

        //================================
        // SPRITESHEETS
        //================================

        this.walkSprite = new Image();
        this.idleSprite = new Image();

        this.attackSprite = new Image();
        this.attackDowSprite = new Image();
        this.defenseSprite = new Image();
        this.winsSprite = new Image();
        this.killSprite = new Image();
        this.recibirSprite = new Image();

        // Estados de carga
        this.walkLoaded = false;
        this.idleLoaded = false;
        this.attackLoaded = false;
        this.attackDowLoaded = false;
        this.defenseLoaded = false;
        this.winsLoaded = false;
        this.killLoaded = false;
        this.recibirLoaded = false;

        //================================
        // ANIMACIÓN CAMINAR
        //================================

        this.walkFrame = 0;
        this.walkFrameTime = 0;

        //================================
        // ANIMACIÓN ESPERA
        //================================

        this.idleFrame = 0;
        this.idleDirection = 1;
        this.idleFrameTime = 0;

        //================================
        // ANIMACIÓN ATAQUE
        //================================

        this.attacking = false;
        this.attackFrame = 0;
        this.attackFrameTime = 0;
        this.attackFlipX = false;
        this.attackType = "normal";

        //================================
        // ANIMACIÓN DEFENSA
        //================================

        this.defending = false;
        this.defenseFrame = 0;
        this.defenseFrameTime = 0;

        //================================
        // ANIMACIÓN WINS
        //================================

        this.winning = false;
        this.winsFrame = 0;
        this.winsFrameTime = 0;
        this.winsLoop = false;

        //================================
        // ANIMACIÓN RECIBIR
        //================================

        this.receiving = false;
        this.recibirFrame = 0;
        this.recibirFrameTime = 0;

        //================================
        // ANIMACIÓN KILL
        //================================

        this.killing = false;
        this.killFrame = 0;
        this.killDirection = 1;
        this.killFrameTime = 0;
        this.killLoop = false;

        //================================
        // CONFIGURACIÓN DE ANIMACIONES
        //================================

        this.frameCount = 6;

        this.frameDuration = 210;
        this.frameDuration_walk = 320;
        this.frameDuration_ataque = 75;
        this.frameDuration_defense = 75;
        this.frameDuration_wins = 350;

        //================================
        // POSICIÓN Y PROFUNDIDAD
        //================================

        this.x = canvas.width / 2;

        this.direction = 1;
        this.moveSpeed = 180;

        this.progress = 0;
        this.advanceDuration = 13;

        this.startY = 100;
        this.endY = 400;

        this.startScale = 0.27;
        this.endScale = 0.90;

        this.y = this.startY;
        this.scale = this.startScale;

        this.arrived = false;

        //================================
        // CALLBACK
        //================================

        this.animationCallback = null;

        //================================
        // SONIDOS
        //================================

        this.soundWalk = new Audio("games/monsterSocksCombat/sonidos/aparece.mp3");
        this.soundWalk.volume = 0.5;
        this.soundWalk.loop = true;

        this.soundPunch = new Audio("games/monsterSocksCombat/sonidos/punch.mp3");
        this.soundSlap = new Audio("games/monsterSocksCombat/sonidos/slap.mp3");

        this.soundWins = new Audio("games/monsterSocksCombat/sonidos/you_wins.mp3");
        this.soundLose = new Audio("games/monsterSocksCombat/sonidos/you_lose.mp3");
        this.soundMareo = new Audio("games/monsterSocksCombat/sonidos/mareo.mp3");

        this.soundKill = new Audio("games/monsterSocksCombat/sonidos/kill.mp3");





        this.soundPunch.volume = 0.7;
        this.soundSlap.volume = 0.7;

        this.soundWins.volume = 0.7;
        this.soundLose.volume = 0.7;
        this.soundMareo.volume = 0.7;
        this.soundKill.volume = 0.7;

        //================================
        // CARGA DE SPRITESHEETS
        //================================

        const configureSprite = (sprite, filename, loadedName) => {

            sprite.onload = () => {

                this[loadedName] = true;

                this[filename + "FrameWidth"] =
                    sprite.naturalWidth / 6;

                this[filename + "FrameHeight"] =
                    sprite.naturalHeight;

                //console.log("Hero:", filename, "cargado");
            };

            sprite.onerror = () => {
                console.error("Error cargando:", sprite.src);
            };
        };

        configureSprite(this.walkSprite, "walk", "walkLoaded");
        configureSprite(this.idleSprite, "idle", "idleLoaded");

        configureSprite(this.attackSprite, "attack", "attackLoaded");
        configureSprite(this.attackDowSprite, "attackDow", "attackDowLoaded");

        configureSprite(this.defenseSprite, "defense", "defenseLoaded");
        configureSprite(this.winsSprite, "wins", "winsLoaded");

        configureSprite(this.killSprite, "kill", "killLoaded");
        configureSprite(this.recibirSprite, "recibir", "recibirLoaded");

        //================================
        // RUTAS
        //================================

        this.walkSprite.src = "games/monsterSocksCombat/imagenes/hero.svg";
        this.idleSprite.src = "games/monsterSocksCombat/imagenes/espera_hero.svg";

        this.attackSprite.src = "games/monsterSocksCombat/imagenes/ataque_hero.svg";
        this.attackDowSprite.src = "games/monsterSocksCombat/imagenes/ataque_hero_dow.svg";

        this.defenseSprite.src = "games/monsterSocksCombat/imagenes/defensa_hero.svg";
        this.winsSprite.src = "games/monsterSocksCombat/imagenes/wins_hero.svg";

        this.killSprite.src = "games/monsterSocksCombat/imagenes/kill_hero.svg";
        this.recibirSprite.src = "games/monsterSocksCombat/imagenes/mareado_hero.svg";
    }

    //================================
    // ESPERAR CARGA DE SPRITES
    //================================

    waitForSprites(callback) {

        const checkLoaded = () => {

            const loaded =
                this.walkLoaded &&
                this.idleLoaded &&
                this.attackLoaded &&
                this.attackDowLoaded &&
                this.defenseLoaded &&
                this.winsLoaded &&
                this.killLoaded &&
                this.recibirLoaded;

            if (loaded) {
                //console.log("Todos los sprites de Hero están cargados");
                callback();
                return;
            }

            requestAnimationFrame(checkLoaded);
        };

        checkLoaded();
    }

    //================================
    // CALLBACK
    //================================

    setAnimationCallback(callback = null) {

        this.animationCallback =
            typeof callback === "function"
                ? callback
                : null;
    }

    notifyAnimationComplete() {

        const callback = this.animationCallback;

        this.animationCallback = null;

        if (callback) {
            callback();
        }
    }

    //================================
    // COMPROBAR ANIMACIÓN
    //================================

    isAnimating() {

        return (
            this.attacking ||
            this.defending ||
            this.winning ||
            this.receiving ||
            this.killing
        );
    }

    //================================
    // DETENER CAMINATA
    //================================

    stopWalkingSound() {

        this.soundWalk.pause();
        this.soundWalk.currentTime = 0;
    }

    //================================
    // ATAQUE
    //================================

    attack(direction = "left", onComplete = null) {

        if (this.isAnimating()) {
            console.warn("Hero todavía está ejecutando una animación");
            return false;
        }

        const useDow = Math.random() < 0.5;

        if (useDow && !this.attackDowLoaded) {
            console.warn("Ataque bajo Hero todavía no cargado");
            return false;
        }

        if (!useDow && !this.attackLoaded) {
            console.warn("Ataque Hero todavía no cargado");
            return false;
        }

        this.setAnimationCallback(onComplete);

        this.attacking = true;

        this.attackType = useDow ? "dow" : "normal";

        this.attackFrame = 0;
        this.attackFrameTime = 0;

        this.attackFlipX = direction === "right";

        const sound = useDow
            ? this.soundSlap
            : this.soundPunch;

        sound.currentTime = 0;

        sound.play().catch(error => {
            console.warn("Error reproduciendo sonido:", error);
        });

        return true;
    }

    //================================
    // DEFENSA
    // 1 2 3 4 5 6
    //================================

    defense(onComplete = null) {

        if (this.isAnimating() || !this.defenseLoaded) {
            return false;
        }

        this.setAnimationCallback(onComplete);

        this.defending = true;

        this.defenseFrame = 0;
        this.defenseFrameTime = 0;

        return true;
    }

    //================================
    // WINS
    //================================

    wins(onComplete = null) {

        if (this.isAnimating() || !this.winsLoaded) {
            return false;
        }

        this.setAnimationCallback(onComplete);

        this.winning = true;

        this.winsFrame = 0;
        this.winsFrameTime = 0;

        this.winsLoop = !onComplete;

        this.soundWins.currentTime = 0;

        this.soundLose.play().catch(error => {
            console.warn("Error reproduciendo victoria:", error);
        });

        return true;
    }

    //================================
    // RECIBIR / MAREADO
    //================================

    recibir(onComplete = null) {

        if (this.isAnimating() || !this.recibirLoaded) {
            return false;
        }

        this.setAnimationCallback(onComplete);

        this.receiving = true;

        this.recibirFrame = 0;
        this.recibirFrameTime = 0;

        this.soundMareo.currentTime = 0;

        this.soundMareo.play().catch(error => {
            console.warn("Error reproduciendo mareo:", error);
        });

        return true;
    }

    //================================
    // KILL
    //================================

    kill(onComplete = null) {

        if (this.isAnimating() || !this.killLoaded) {
            return false;
        }

        this.setAnimationCallback(onComplete);

        this.killing = true;

        this.killFrame = 0;
        this.killDirection = 1;
        this.killFrameTime = 0;

        this.killLoop = !onComplete;

        /*this.soundLose.currentTime = 0;

        this.soundLose.play().catch(error => {
            console.warn("Error reproduciendo derrota:", error);
        });*/

        this.soundKill.play().catch(error => {
                        console.warn("Error reproduciendo pasos:", error);
                    });

         // Con callback: una sola reproducción.
        // Sin callback: bucle permanente.
        this.killLoop = !onComplete;

        return true;
    }

    //================================
    // ACTUALIZAR HERO
    //================================

    update(dt, keys = {}) {

        if (!this.walkLoaded || !this.idleLoaded) {
            return;
        }

        //================================
        // KILL
        //================================

        if (this.killing) {

            this.killFrameTime += dt * 1000;

            while (this.killFrameTime >= this.frameDuration) {

                this.killFrameTime -= this.frameDuration;

                this.killFrame += this.killDirection;

                if (this.killFrame >= 5) {

                    this.killFrame = 5;

                    if (!this.killLoop) {

                        this.killing = false;
                        this.killFrameTime = 0;

                        this.notifyAnimationComplete();

                        break;
                    }

                    this.killDirection = -1;
                }
                else if (this.killFrame <= 0) {

                    this.killFrame = 0;
                    this.killDirection = 1;
                }
            }

            return;
        }

        //================================
        // RECIBIR
        //================================

        if (this.receiving) {

            this.recibirFrameTime += dt * 1000;

            while (this.recibirFrameTime >= this.frameDuration) {

                this.recibirFrameTime -= this.frameDuration;

                this.recibirFrame++;

                if (this.recibirFrame >= 6) {

                    this.recibirFrame = 5;
                    this.receiving = false;
                    this.recibirFrameTime = 0;

                    this.notifyAnimationComplete();

                    break;
                }
            }

            return;
        }

        //================================
        // WINS
        // 1 2 3 4 5 6
        //================================

        if (this.winning) {

            this.winsFrameTime += dt * 1000;

            while (this.winsFrameTime >= this.frameDuration_wins) {

                this.winsFrameTime -= this.frameDuration_wins;

                this.winsFrame++;

                if (this.winsFrame >= 6) {

                    if (this.winsLoop) {

                        this.winsFrame = 0;
                    }
                    else {

                        this.winsFrame = 5;
                        this.winning = false;
                        this.winsFrameTime = 0;

                        this.notifyAnimationComplete();

                        break;
                    }
                }
            }

            return;
        }

        //================================
        // DEFENSA
        // 1 2 3 4 5 6
        //================================

        if (this.defending) {

            this.defenseFrameTime += dt * 1000;

            while (this.defenseFrameTime >= this.frameDuration_defense) {

                this.defenseFrameTime -= this.frameDuration_defense;

                this.defenseFrame++;

                if (this.defenseFrame >= 5) {

                    this.defenseFrame = 5;
                    this.defending = false;
                    this.defenseFrameTime = 0;

                    this.notifyAnimationComplete();

                    break;
                }
            }

            return;
        }

        //================================
        // ATAQUE
        //================================

        if (this.attacking) {

            this.attackFrameTime += dt * 1000;

            while (this.attackFrameTime >= this.frameDuration_ataque) {

                this.attackFrameTime -= this.frameDuration_ataque;

                this.attackFrame++;

                if (this.attackFrame >= 6) {

                    this.attackFrame = 0;
                    this.attacking = false;
                    this.attackFrameTime = 0;

                    this.notifyAnimationComplete();

                    break;
                }
            }

            return;
        }

        //================================
        // CAMINATA Y PROFUNDIDAD
        //================================

        if (!this.arrived) {

            // Movimiento horizontal
            let dx = 0;

            if (keys.left) {
                dx -= this.moveSpeed * dt;
                this.direction = -1;
            }

            if (keys.right) {
                dx += this.moveSpeed * dt;
                this.direction = 1;
            }

            this.x += dx;

            // Avance automático
            const multiplier = keys.fire ? 2.5 : 1;

            this.progress = Math.min(
                1,
                this.progress + (dt / this.advanceDuration) * multiplier
            );

            // Animación de caminar
            this.walkFrameTime += dt * 1000;

            while (this.walkFrameTime >= this.frameDuration_walk) {

                this.walkFrameTime -= this.frameDuration_walk;

                this.walkFrame =
                    (this.walkFrame + 1) % this.frameCount;
            }

            // Sonido de caminata
            if (this.soundWalk.paused) {

                this.soundWalk.play().catch(error => {
                    console.warn("Error reproduciendo pasos:", error);
                });
            }


            if (this.progress >= 0.90){

                this.stopWalkingSound();

                this.game.soundFight.play().catch(error => {
                console.warn("Error reproduciendo mareo:", error);
                });
            }


            // Llegada al punto de combate
            if (this.progress >= 1) {

                this.progress = 1;
                this.arrived = true;

                this.walkFrame = 0;
                this.idleFrame = 0;
                this.idleDirection = 1;
                this.idleFrameTime = 0;              


                //console.log("Hero llegó al punto de combate");
                // Avisar al juego que Hero llegó.
                if (this.game && typeof this.game.onHeroArrived === "function") {
                    this.game.onHeroArrived();
                }


            }
        }

        else {

            // Movimiento horizontal cuando ya llegó
            let dx = 0;

            if (keys.left) {
                dx -= this.moveSpeed * dt;
                this.direction = -1;
            }

            if (keys.right) {
                dx += this.moveSpeed * dt;
                this.direction = 1;
            }

            this.x += dx;

            // Animación de espera
            this.idleFrameTime += dt * 1000;

            while (this.idleFrameTime >= this.frameDuration) {

                this.idleFrameTime -= this.frameDuration;

                this.idleFrame += this.idleDirection;

                if (this.idleFrame >= 5) {

                    this.idleFrame = 5;
                    this.idleDirection = -1;
                }
                else if (this.idleFrame <= 0) {

                    this.idleFrame = 0;
                    this.idleDirection = 1;
                }
            }
        }

        //================================
        // EFECTO DE PROFUNDIDAD
        //================================

        this.y =
            this.startY +
            (this.endY - this.startY) * this.progress;

        this.scale =
            this.startScale +
            (this.endScale - this.startScale) * this.progress;

        //================================
        // LÍMITES HORIZONTALES
        //================================

        const drawWidth = this.walkLoaded
            ? this.walkFrameWidth * this.scale
            : 40 * this.scale;

        const margin = drawWidth / 2;

        this.x = Math.max(
            margin,
            Math.min(
                this.canvas.width - margin,
                this.x
            )
        );
    }

    //================================
    // DIBUJAR HERO
    //================================

    draw() {

        if (!this.walkLoaded || !this.idleLoaded) {
            return;
        }

        // Seleccionar spritesheet
        const sprite = this.killing
            ? this.killSprite
            : this.receiving
                ? this.recibirSprite
                : this.winning
                    ? this.winsSprite
                    : this.defending
                        ? this.defenseSprite
                        : this.attacking
                            ? (this.attackType === "dow"
                                ? this.attackDowSprite
                                : this.attackSprite)
                            : this.arrived
                                ? this.idleSprite
                                : this.walkSprite;

        // Seleccionar cuadro
        const frame = this.killing
            ? this.killFrame
            : this.receiving
                ? this.recibirFrame
                : this.winning
                    ? this.winsFrame
                    : this.defending
                        ? this.defenseFrame
                        : this.attacking
                            ? this.attackFrame
                            : this.arrived
                                ? this.idleFrame
                                : this.walkFrame;

        // Ancho del cuadro
        const sw = this.killing
            ? this.killFrameWidth
            : this.receiving
                ? this.recibirFrameWidth
                : this.winning
                    ? this.winsFrameWidth
                    : this.defending
                        ? this.defenseFrameWidth
                        : this.attacking
                            ? (this.attackType === "dow"
                                ? this.attackDowFrameWidth
                                : this.attackFrameWidth)
                            : this.arrived
                                ? this.idleFrameWidth
                                : this.walkFrameWidth;

        // Alto del cuadro
        const sh = this.killing
            ? this.killFrameHeight
            : this.receiving
                ? this.recibirFrameHeight
                : this.winning
                    ? this.winsFrameHeight
                    : this.defending
                        ? this.defenseFrameHeight
                        : this.attacking
                            ? (this.attackType === "dow"
                                ? this.attackDowFrameHeight
                                : this.attackFrameHeight)
                            : this.arrived
                                ? this.idleFrameHeight
                                : this.walkFrameHeight;

        if (!sprite || !sw || !sh) return;

        const dw = sw * this.scale;
        const dh = sh * this.scale;

        this.ctx.save();

        this.ctx.imageSmoothingEnabled = true;
        this.ctx.translate(this.x, this.y);

        // Reflejar ataque hacia la derecha
        if (this.attacking && this.attackFlipX) {
            this.ctx.scale(-1, 1);
        }

        // Orientación durante movimiento
        else if (!this.isAnimating() && this.direction < 0) {
            this.ctx.scale(-1, 1);
        }

        this.ctx.drawImage(
            sprite,
            frame * sw,
            0,
            sw,
            sh,
            -dw / 2,
            -dh,
            dw,
            dh
        );

        this.ctx.restore();
    }
}



    
//==================================================
// CLASE Tief: animaciones y secuencia automática
//==================================================

//==================================================
// CLASE TIEF
// Animaciones con notificación de finalización
//==================================================
class Tief {

    constructor(ctx, canvas) {

        this.ctx = ctx;
        this.canvas = canvas;

        //================================
        // SPRITESHEETS
        //================================

        this.idleSprite = new Image();
        this.attackSprite = new Image();
        this.attackDowSprite = new Image();
        this.defenseSprite = new Image();
        this.winsSprite = new Image();
        this.killSprite = new Image();
        this.recibirSprite = new Image();

        // Estado de carga
        this.idleLoaded = false;
        this.attackLoaded = false;
        this.attackDowLoaded = false;
        this.defenseLoaded = false;
        this.winsLoaded = false;
        this.killLoaded = false;
        this.recibirLoaded = false;

        //================================
        // ANIMACIÓN NORMAL
        //================================

        this.idleFrame = 0;
        this.idleDirection = 1;
        this.idleFrameTime = 0;

        //================================
        // ANIMACIÓN ATAQUE
        //================================

        this.attacking = false;
        this.attackFrame = 0;
        this.attackFrameTime = 0;
        this.attackFlipX = false;
        this.attackType = "normal";

        //================================
        // ANIMACIÓN DEFENSA
        //================================

        this.defending = false;
        this.defenseFrame = 0;
        this.defenseDirection = 1;
        this.defenseFrameTime = 0;

        //================================
        // ANIMACIÓN WINS
        //================================

        this.winning = false;
        this.winsFrame = 0;
        this.winsDirection = 1;
        this.winsFrameTime = 0;

        //================================
        // ANIMACIÓN RECIBIR / MAREADO
        //================================

        this.receiving = false;
        this.recibirFrame = 0;
        this.recibirFrameTime = 0;

        //================================
        // ANIMACIÓN KILL
        //================================

        this.killing = false;
        this.killFrame = 0;
        this.killDirection = 1;
        this.killFrameTime = 0;

        //================================
        // CONFIGURACIÓN DE ANIMACIONES
        //================================

        this.frameCount = 6;
        this.frameDuration = 210;
        this.frameDuration_ataque = 75;
        this.frameDuration_defense = 75;
        this.frameDuration_wins = 350;

        //================================
        // POSICIÓN
        //================================

        this.x = canvas.width / 2;
        this.y = canvas.height - 10;
        this.scale = 0.85;

        //================================
        // CALLBACK DE FINALIZACIÓN
        //================================

        this.animationCallback = null;

        //================================
        // SONIDOS
        //================================

        this.soundPunch = new Audio("games/monsterSocksCombat/sonidos/punch.mp3");
        this.soundSlap = new Audio("games/monsterSocksCombat/sonidos/slap.mp3");

        this.soundWins = new Audio("games/monsterSocksCombat/sonidos/you_wins.mp3");
        this.soundLose = new Audio("games/monsterSocksCombat/sonidos/you_lose.mp3");
        this.soundMareo = new Audio("games/monsterSocksCombat/sonidos/mareo.mp3");

         this.soundKill = new Audio("games/monsterSocksCombat/sonidos/kill.mp3");
      

        this.soundPunch.volume = 0.7;
        this.soundSlap.volume = 0.7;

        this.soundWins.volume = 0.7;
        this.soundLose.volume = 0.7;
        this.soundMareo.volume = 0.7;
        
        this.soundKill.volume = 0.7; 


        //================================
        // CARGA DE SPRITESHEETS
        //================================

        this.idleSprite.onload = () => {

            this.idleLoaded = true;

            this.idleFrameWidth =
                this.idleSprite.naturalWidth / 6;

            this.idleFrameHeight =
                this.idleSprite.naturalHeight;

        };

        this.attackSprite.onload = () => {

            this.attackLoaded = true;

            this.attackFrameWidth =
                this.attackSprite.naturalWidth / 6;

            this.attackFrameHeight =
                this.attackSprite.naturalHeight;

        };

        this.attackDowSprite.onload = () => {

            this.attackDowLoaded = true;

            this.attackDowFrameWidth =
                this.attackDowSprite.naturalWidth / 6;

            this.attackDowFrameHeight =
                this.attackDowSprite.naturalHeight;

        };

        this.defenseSprite.onload = () => {

            this.defenseLoaded = true;

            this.defenseFrameWidth =
                this.defenseSprite.naturalWidth / 6;

            this.defenseFrameHeight =
                this.defenseSprite.naturalHeight;

            //console.log("Defensa Tief cargada");

        };

        this.winsSprite.onload = () => {

            this.winsLoaded = true;

            this.winsFrameWidth =
                this.winsSprite.naturalWidth / 6;

            this.winsFrameHeight =
                this.winsSprite.naturalHeight;

            //console.log("Wins Tief cargado");

        };

        this.killSprite.onload = () => {

            this.killLoaded = true;

            this.killFrameWidth =
                this.killSprite.naturalWidth / 6;

            this.killFrameHeight =
                this.killSprite.naturalHeight;

            //console.log("Kill Tief cargado");

        };

        this.recibirSprite.onload = () => {

            this.recibirLoaded = true;

            this.recibirFrameWidth =
                this.recibirSprite.naturalWidth / 6;

            this.recibirFrameHeight =
                this.recibirSprite.naturalHeight;

            //console.log("Mareado Tief cargado");

        };

        //================================
        // ERRORES DE CARGA
        //================================

        this.idleSprite.onerror = () => {
            console.error("Error cargando:", this.idleSprite.src);
        };

        this.attackSprite.onerror = () => {
            console.error("Error cargando:", this.attackSprite.src);
        };

        this.attackDowSprite.onerror = () => {
            console.error("Error cargando:", this.attackDowSprite.src);
        };

        this.defenseSprite.onerror = () => {
            console.error("Error cargando:", this.defenseSprite.src);
        };

        this.winsSprite.onerror = () => {
            console.error("Error cargando:", this.winsSprite.src);
        };

        this.killSprite.onerror = () => {
            console.error("Error cargando:", this.killSprite.src);
        };

        this.recibirSprite.onerror = () => {
            console.error("Error cargando:", this.recibirSprite.src);
        };

        //================================
        // RUTAS DE LOS SPRITESHEETS
        //================================

        this.idleSprite.src = "games/monsterSocksCombat/imagenes/tief.svg";
        this.attackSprite.src = "games/monsterSocksCombat/imagenes/ataque_tief.svg";
        this.attackDowSprite.src = "games/monsterSocksCombat/imagenes/ataque_tief_dow.svg";
        this.defenseSprite.src = "games/monsterSocksCombat/imagenes/defensa_tief.svg";
        this.winsSprite.src = "games/monsterSocksCombat/imagenes/wins_tief.svg";
        this.killSprite.src = "games/monsterSocksCombat/imagenes/kill_tief.svg";
        this.recibirSprite.src = "games/monsterSocksCombat/imagenes/mareado_tief.svg";

    }

    waitForSprites(callback) {
            const sprites = [
                this.attackSprite,
                this.attackDowSprite,
                this.defenseSprite,
                this.winsSprite
            ];

            const checkLoaded = () => {
                const loaded = sprites.every(sprite =>
                    sprite.complete && sprite.naturalWidth > 0
                );

                if (loaded) {
                    callback();
                } else {
                    requestAnimationFrame(checkLoaded);
                }
            };

            checkLoaded();
        }

    //================================
    // REGISTRAR CALLBACK
    //================================

    setAnimationCallback(callback = null) {

        this.animationCallback =
            typeof callback === "function"
                ? callback
                : null;

    }

    //================================
    // NOTIFICAR FINALIZACIÓN
    //================================

    notifyAnimationComplete() {

        const callback = this.animationCallback;

        // Limpiar antes de ejecutar para evitar
        // que se ejecute dos veces.
        this.animationCallback = null;

        if (callback) {
            callback();
        }

    }

    //================================
    // COMPROBAR ESTADO
    //================================

    isAnimating() {

        return (
            this.attacking ||
            this.defending ||
            this.winning ||
            this.receiving ||
            this.killing
        );

    }

    //================================
    // ATAQUE
    //================================

    attack(direction = "left", onComplete = null) {

        if (this.isAnimating()) {
            console.warn("Tief todavía está ejecutando una animación");
            return false;
        }

        if (!this.attackLoaded || !this.attackDowLoaded) {
            console.warn("Spritesheets de ataque todavía no cargados");
            return false;
        }

        // Selección aleatoria
        const useDow = Math.random() < 0.5;

        this.setAnimationCallback(onComplete);

        this.attacking = true;

        this.attackType = useDow
            ? "dow"
            : "normal";

        this.attackFrame = 0;
        this.attackFrameTime = 0;

        // Orientación
        this.attackFlipX = direction === "right";

        // Sonido
        const sound = useDow
            ? this.soundSlap
            : this.soundPunch;

        sound.currentTime = 0;

        sound.play().catch(error => {
            console.warn("Error reproduciendo sonido:", error);
        });

        return true;

    }

    //================================
    // DEFENSA
    //================================

    defense(onComplete = null) {

        if (this.isAnimating() || !this.defenseLoaded) {
            return false;
        }

        this.setAnimationCallback(onComplete);

        this.defending = true;

        this.defenseFrame = 0;
        this.defenseDirection = 1;
        this.defenseFrameTime = 0;

        return true;

    }

    //================================
    // WINS
    //================================

    wins(onComplete = null) {

        if (this.isAnimating() || !this.winsLoaded) {
            return false;
        }

        this.setAnimationCallback(onComplete);

        this.winning = true;

        this.winsFrame = 0;
        this.winsDirection = 1;
        this.winsFrameTime = 0;


        this.soundWins.play().catch(error => {
                        console.warn("Error reproduciendo pasos:", error);
                    });


        // Si hay callback, reproduce una sola vez.
        // Si no hay callback, hace bucle.
        this.winsLoop = !onComplete;

        return true;

    }

    //================================
    // RECIBIR / MAREADO
    //================================

    recibir(onComplete = null) {

        if (this.isAnimating() || !this.recibirLoaded) {
            return false;
        }

        this.setAnimationCallback(onComplete);

        this.receiving = true;

        this.recibirFrame = 0;
        this.recibirFrameTime = 0;
        
        this.soundMareo.play().catch(error => {
                        console.warn("Error reproduciendo pasos:", error);
                    });

        return true;

    }

    //================================
    // KILL
    //================================

    kill(onComplete = null) {

        if (this.isAnimating() || !this.killLoaded) {
            return false;
        }

        this.setAnimationCallback(onComplete);

        this.killing = true;

        this.killFrame = 0;
        this.killDirection = 1;
        this.killFrameTime = 0;


        this.soundLose.play().catch(error => {
                        console.warn("Error reproduciendo pasos:", error);
                    });

        this.soundKill.play().catch(error => {
                        console.warn("Error reproduciendo pasos:", error);
                    });

        // Con callback: una sola reproducción.
        // Sin callback: bucle permanente.
        this.killLoop = !onComplete;

        return true;

    }

    //================================
    // ACTUALIZAR ANIMACIONES
    //================================

    update(dt) {

        if (!this.idleLoaded) {
            return;
        }

        //================================
        // KILL
        //================================

        if (this.killing) {

            this.killFrameTime += dt * 1000;

            while (this.killFrameTime >= this.frameDuration) {

                this.killFrameTime -= this.frameDuration;

                this.killFrame += this.killDirection;

                if (this.killFrame >= 5) {

                    this.killFrame = 5;

                    if (!this.killLoop) {

                        this.killing = false;
                        this.killFrameTime = 0;

                        this.notifyAnimationComplete();

                        break;

                    }

                    this.killDirection = -1;

                }
                else if (this.killFrame <= 0) {

                    this.killFrame = 0;
                    this.killDirection = 1;

                }

            }

            return;

        }

        //================================
        // RECIBIR / MAREADO
        //================================

        if (this.receiving) {

            this.recibirFrameTime += dt * 1000;

            while (this.recibirFrameTime >= this.frameDuration) {

                this.recibirFrameTime -= this.frameDuration;

                this.recibirFrame++;

                if (this.recibirFrame >= 6) {

                    this.recibirFrame = 5;
                    this.receiving = false;
                    this.recibirFrameTime = 0;

                    this.notifyAnimationComplete();

                    break;

                }

            }

            return;

        }

         //================================
        // WINS
        // 1 2 3 4 5 6
        //================================

        if (this.winning) {

            this.winsFrameTime += dt * 1000;

            while (this.winsFrameTime >= this.frameDuration_wins) {

                this.winsFrameTime -= this.frameDuration_wins;

                this.winsFrame++;

                if (this.winsFrame >= 6) {

                    if (this.winsLoop) {

                        // Reiniciar desde el primer cuadro
                        this.winsFrame = 0;

                    }
                    else {

                        // Finalizar animación
                        this.winsFrame = 5;
                        this.winning = false;
                        this.winsFrameTime = 0;

                        this.notifyAnimationComplete();

                        break;
                    }
                }
            }

            return;
        }

        //================================
        // DEFENSA
        // 1 2 3 4 5 6
        //================================

        if (this.defending) {

            this.defenseFrameTime += dt * 1000;

            while (this.defenseFrameTime >= this.frameDuration_defense) {

                this.defenseFrameTime -= this.frameDuration_defense;

                this.defenseFrame++;

                if (this.defenseFrame >= 5) {

                    this.defenseFrame = 5;
                    this.defending = false;
                    this.defenseFrameTime = 0;

                    this.notifyAnimationComplete();

                    break;
                }
            }

            return;
        }

        //================================
        // ATAQUE
        //================================

        if (this.attacking) {

            this.attackFrameTime += dt * 1000;

            while (this.attackFrameTime >= this.frameDuration_ataque) {

                this.attackFrameTime -= this.frameDuration_ataque;

                this.attackFrame++;

                if (this.attackFrame >= 6) {

                    this.attackFrame = 0;
                    this.attacking = false;
                    this.attackFrameTime = 0;

                    this.notifyAnimationComplete();

                    break;

                }

            }

            return;

        }

        //================================
        // ANIMACIÓN NORMAL
        //================================

        this.idleFrameTime += dt * 1000;

        while (this.idleFrameTime >= this.frameDuration) {

            this.idleFrameTime -= this.frameDuration;

            this.idleFrame += this.idleDirection;

            if (this.idleFrame >= 5) {

                this.idleFrame = 5;
                this.idleDirection = -1;

            }
            else if (this.idleFrame <= 0) {

                this.idleFrame = 0;
                this.idleDirection = 1;

            }

        }

    }

    //================================
    // DIBUJAR TIEF
    //================================

    draw() {

        if (!this.idleLoaded) {
            return;
        }

        // Seleccionar spritesheet
        const sprite = this.killing
            ? this.killSprite
            : this.receiving
                ? this.recibirSprite
                : this.winning
                    ? this.winsSprite
                    : this.defending
                        ? this.defenseSprite
                        : this.attacking
                            ? (this.attackType === "dow"
                                ? this.attackDowSprite
                                : this.attackSprite)
                            : this.idleSprite;

        // Seleccionar cuadro
        const frame = this.killing
            ? this.killFrame
            : this.receiving
                ? this.recibirFrame
                : this.winning
                    ? this.winsFrame
                    : this.defending
                        ? this.defenseFrame
                        : this.attacking
                            ? this.attackFrame
                            : this.idleFrame;

        // Ancho del cuadro
        const sw = this.killing
            ? this.killFrameWidth
            : this.receiving
                ? this.recibirFrameWidth
                : this.winning
                    ? this.winsFrameWidth
                    : this.defending
                        ? this.defenseFrameWidth
                        : this.attacking
                            ? (this.attackType === "dow"
                                ? this.attackDowFrameWidth
                                : this.attackFrameWidth)
                            : this.idleFrameWidth;

        // Alto del cuadro
        const sh = this.killing
            ? this.killFrameHeight
            : this.receiving
                ? this.recibirFrameHeight
                : this.winning
                    ? this.winsFrameHeight
                    : this.defending
                        ? this.defenseFrameHeight
                        : this.attacking
                            ? (this.attackType === "dow"
                                ? this.attackDowFrameHeight
                                : this.attackFrameHeight)
                            : this.idleFrameHeight;

        const dw = sw * this.scale;
        const dh = sh * this.scale;

        this.ctx.save();

        this.ctx.imageSmoothingEnabled = true;
        this.ctx.translate(this.x, this.y);

        // Reflejar durante ataque hacia la derecha
        if (this.attacking && this.attackFlipX) {
            this.ctx.scale(-1, 1);
        }

        this.ctx.drawImage(
            sprite,
            frame * sw,
            0,
            sw,
            sh,
            -dw / 2,
            -dh,
            dw,
            dh
        );

        this.ctx.restore();

    }

}


class CombatSequence {

    constructor(hero, tief, resultado) {

        this.hero = hero;
        this.tief = tief;
        this.resultado = resultado;

        this.rewardProcessed = false;

        /////////////////////////////////////////////////////
        const tief_atack = [
                {
                    tief: { action: "attack", direction: "left" },
                    hero: { action: "defense" }
                },
                {
                    tief: { action: "attack", direction: "right" },
                    hero: { action: "defense" }
                },
                {
                    tief: { action: "attack", direction: "left" },
                    hero: { action: "defense" }
                },
                {
                    tief: { action: "attack", direction: "right" },
                    hero: { action: "recibir" }
                }
               ]; 

        const hero_atack = [
                        {
                            hero: { action: "attack", direction: "left" },
                            tief: { action: "defense" }
                        },
                        {
                            hero: { action: "attack", direction: "right" },
                            tief: { action: "defense" }
                        },
                        {
                            hero: { action: "attack", direction: "left" },
                            tief: { action: "defense" }
                        },
                        {
                            hero: { action: "attack", direction: "right" },
                            tief: { action: "recibir" }
                        }
                       ]; 

        const atack_atack = [
                        {
                            hero: { action: "attack", direction: "left" },
                            tief: { action: "attack", direction: "right" },
                        },
                        {
                            hero: { action: "attack", direction: "right" },
                            tief: { action: "attack", direction: "left" },
                        },
                        {
                            hero: { action: "attack", direction: "left" },
                            tief: { action: "attack", direction: "right" },
                        },
                        {
                            hero: { action: "attack", direction: "right" },
                            tief: { action: "attack", direction: "left" },
                        }
                       ]; 

        const reciben =  [
                        {
                            tief: { action: "attack", direction: "left" },
                            hero: { action: "recibir" }
                        },
                        {
                            tief: { action: "recibir" },
                            hero: { action: "attack", direction: "left" }
                        },
                        {
                            tief: { action: "attack", direction: "right" },
                            hero: { action: "recibir" }
                        },
                        {
                            tief: { action: "recibir" },
                            hero: { action: "attack", direction: "right" },
                        }
                       ]; 

        const atack_defense = [
                        {
                            hero: { action: "attack", direction: "left" },
                            tief: { action: "defense" }
                        },
                        {
                            hero: { action: "defense" },
                            tief: { action: "attack", direction: "left" },
                        },
                        {
                            hero: { action: "attack", direction: "right" },
                            tief: { action: "defense" }
                        },               
                        {
                            hero: { action: "attack", direction: "right" },
                            tief: { action: "recibir" }
                        }

                       ];

        const wins_tief = [
            {
                tief: { action: "attack", direction: "left" },
                hero: { action: "defense" }
            },
            {
                tief: { action: "attack", direction: "left" },
                hero: { action: "attack", direction: "left" }
            },
            {
                tief: { action: "attack", direction: "right" },
                hero: { action: "recibir" }
            },
            {
                tief: { action: "attack", direction: "right" },
                hero: { action: "recibir" }
            }
        ];

        const wins_hero = [
            {
                hero: { action: "attack", direction: "left" },
                tief: { action: "defense" }
            },
            {
                hero: { action: "attack", direction: "left" },
                tief: { action: "attack", direction: "left" }
            },
            {
                hero: { action: "attack", direction: "right" },
                tief: { action: "recibir" }
            },
            {
                hero: { action: "attack", direction: "right" },
                tief: { action: "recibir" }
            }
        ];

        const finish_wins_hero = [
            {
                hero: { action: "attack", direction: "left" },
                tief: { action: "defense" }
            },
            {
                hero: { action: "defense" },
                tief: { action: "recibir" }
            },
            {
                hero: { action: "attack", direction: "right" },
                tief: { action: "defense" }
            },
            {
                hero: { action: "wins" },
                tief: { action: "kill" },
                final: true
            }
        ];

        const finish_wins_tief = [
            {
                tief: { action: "attack", direction: "left" },
                hero: { action: "defense" }
            },
            {
                tief: { action: "defense" },
                hero: { action: "recibir" }
            },
            {
                tief: { action: "attack", direction: "right" },
                hero: { action: "defense" }
            },
            {
                tief: { action: "wins" },
                hero: { action: "kill" },
                final: true
            }
        ];

        const finish_empate = [
            {
                tief: { action: "attack", direction: "left" },
                hero: { action: "defense" }
            },
            {
                tief: { action: "defense" },
                hero: { action: "attack", direction: "left" }
            },
            {
                tief: { action: "recibir" },
                hero: { action: "recibir" }
            },
            {
                tief: { action: "kill" },
                hero: { action: "kill" },
                final: true
            }
        ];

                    
        // ======================================
        // SECUENCIAS QUE PUEDEN APARECER
        // ALEATORIAMENTE DURANTE EL COMBATE
        // ======================================

        const secuenciasAleatorias = [
            tief_atack,
            hero_atack,
            atack_atack,
            wins_tief,
            wins_hero,
            reciben,
            atack_defense
        ];

        // ======================================
        // SELECCIONAR ENTRE 3 Y 6 SECUENCIAS
        // SIN REPETIR LA MISMA SECUENCIA
        // ======================================

        const secuenciasDisponibles = [...secuenciasAleatorias];

        // Mezclar aleatoriamente.
        for (let i = secuenciasDisponibles.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [secuenciasDisponibles[i], secuenciasDisponibles[j]] =
                [secuenciasDisponibles[j], secuenciasDisponibles[i]];
        }

        // Elegir cantidad de segmentos: entre 3 y 6.
        const cantidadSegmentos = Math.floor(Math.random() * 4) + 3;

        // Construir secuencia común.
        const secuenciaComun = [];

        for (let i = 0; i < cantidadSegmentos; i++) {
            secuenciaComun.push(...secuenciasDisponibles[i]);
        }

        // ======================================
        // DETERMINAR EL DESENLACE
        // ======================================

        let secuenciaFinal = [];

        if (this.resultado === "tief_wins") {

            secuenciaFinal = [
                ...wins_tief,
                ...wins_tief,
                ...finish_wins_tief
            ];

        } else if (this.resultado === "hero_wins") {

            secuenciaFinal = [
                ...wins_hero,
                ...wins_hero,
                ...finish_wins_hero
            ];

        } else if (this.resultado === "empate") {

            secuenciaFinal = [
                ...reciben, 
                ...reciben,
                ...finish_empate
            ];

        } else {

            throw new Error("Resultado de combate inválido: " + this.resultado);

        }

        // ======================================
        // SECUENCIA DEFINITIVA DEL COMBATE
        // ======================================

        this.steps = [
            ...secuenciaComun,
            ...secuenciaFinal
        ];
                   


        ///////////////////////////////////////////////////////
        this.currentStep = 0;
        this.running = false;
        this.waiting = false;
    }

    //================================
    // INICIAR COMBATE
    //================================

    start() {

        if (this.running) return;

        if (this.hero.isAnimating() || this.tief.isAnimating()) {
            console.warn("Un personaje todavía está animándose");
            return;
        }

        this.running = true;
        this.waiting = false;
        this.currentStep = 0;

        //console.log("COMIENZA EL COMBATE");

        this.next();
    }

    //================================
    // EJECUTAR ACCIÓN
    //================================

    executeAction(character, action, onComplete) {

        switch (action.action) {

            case "attack":

                return character.attack(
                    action.direction || "left",
                    onComplete
                );

            case "defense":

                return character.defense(onComplete);

            case "recibir":

                return character.recibir(onComplete);

            case "kill":

                return character.kill();

            case "wins":

                return character.wins();

            case "idle":

                // El personaje no hace nada.
                onComplete();
                return true;

            default:

                console.error("Acción desconocida:", action.action);
                return false;
        }
    }

    //================================
    // SIGUIENTE PASO
    //================================

    next() {

        if (!this.running || this.waiting) return;

        // Comprobar final de secuencia
        
        //console.log(this.currentStep,this.steps.length);
        if (this.currentStep+1 >= this.steps.length) {

            this.running = false;

            //console.log("COMBATE FINALIZADO");

            if (this.resultado === "tief_wins" && !this.rewardProcessed) {
                this.rewardProcessed = true;
                showCombatResult("tief_wins");
                add_points(1000);
                //console.log("1000 puntos y victoria");
            } else if (this.resultado === "hero_wins" && !this.rewardProcessed) {
                this.rewardProcessed = true;
                showCombatResult("hero_wins");
                //console.log("YOU LOSE");
            } else if (this.resultado === "empate" && !this.rewardProcessed) {
                this.rewardProcessed = true;
                showCombatResult("empate");
                //console.log("EMPATE");
            }








            //return;
        }

        const step = this.steps[this.currentStep];

        //console.log(
        //    "PASO DE COMBATE:",
        //    this.currentStep + 1,
        //    step
        //);

        
        //================================
        // SINCRONIZACIÓN
        //================================

        this.waiting = true;

        let completed = 0;
        let failed = false;

        const animationComplete = () => {

            if (failed) return;

            completed++;

            // Esperar a los dos personajes
            if (completed === 2) {

                this.waiting = false;

                this.currentStep++;

                this.next();
            }
        };

        // Iniciar ambas animaciones
        const heroStarted = this.executeAction(
            this.hero,
            step.hero,
            animationComplete
        );

        const tiefStarted = this.executeAction(
            this.tief,
            step.tief,
            animationComplete
        );

        // Comprobar errores
        if (!heroStarted || !tiefStarted) {

            failed = true;
            this.waiting = false;
            this.running = false;

            console.error(
                "Error al iniciar el paso:",
                this.currentStep + 1,
                {
                    heroStarted,
                    tiefStarted,
                    heroAction: step.hero,
                    tiefAction: step.tief
                }
            );

        }
    }

    //================================
    // DETENER SECUENCIA
    //================================

    stop() {

        this.running = false;
        this.waiting = false;

        //console.log("Combate detenido");
    }

}

    //==================================================
    // CLASE PRINCIPAL DEL JUEGO
    //==================================================

    
class MonsterSocksGame {

    constructor(canvas, ctx, resultado) {

        this.canvas = canvas;
        this.ctx = ctx;
        this.resultado=resultado;

        //================================
        // FONDO
        //================================

        this.background = new Image();
        this.backgroundLoaded = false;

        this.background.onload = () => {
            this.backgroundLoaded = true;
            //console.log("Fondo cargado correctamente");
        };

        this.background.onerror = () => {
            console.error("No se pudo cargar:", this.background.src);
        };

        this.background.src = "games/monsterSocksCombat/imagenes/fondo.png";

        this.soundFight = new Audio("games/monsterSocksCombat/sonidos/ready_fight.mp3");
        this.soundFight.volume = 1.0;
        
        //================================
        // PERSONAJES
        //================================

        this.hero = new Hero(ctx, canvas);
        this.tief = new Tief(ctx, canvas);
        this.hero.game = this

        //this.tiefSequence = new TiefSequence(this.tief);
        this.combatSequence = new CombatSequence(
            this.hero,
            this.tief,
            this.resultado
        );
        //================================
        // ESTADO DEL JUEGO
        //================================

        this.fightStarted = false;
        this.assetsReady = false;

        this.startFightTimer = 0;
        this.startFightDuration = 2.5;

        //================================
        // BOTÓN
        //================================

        this.fightButton = document.getElementById("fight");

        this.bindControls();

        //================================
        // ENERGÍA DE LOS PERSONAJES
        //================================

        this.heroEnergy = 75;
        this.tiefEnergy = 75;

        this.heroEnergyTarget = 75;
        this.tiefEnergyTarget = 75;

        this.energyTimer = 0;
        this.energyNextChange = 0.8;

        //================================
        // PUNTUACIÓN
        //================================

        this.score = "100";

        //================================
        // LOOP
        //================================

        this.lastTime = 0;
        this.running = true;

        requestAnimationFrame(time => this.loop(time));
    }

    

    onHeroArrived() {

        if (this.fightStarted) return;

        //console.log("Iniciando combate automáticamente...");
      

        this.startFight();
    }

    //================================
    // CONTROLES
    //================================

    bindControls() {

        if (!this.fightButton) {
            console.error("No existe el botón #fight");
            return;
        }

        this.fightButton.disabled = true;
        this.fightButton.textContent = "LOADING...";

        this.fightButton.addEventListener("click", () => {
            this.startFight();
        });
    }

    //================================
    // COMPROBAR CARGA DE SPRITES
    //================================

    checkAssets() {

        if (this.assetsReady) return;

        const heroReady =
            this.hero.walkLoaded &&
            this.hero.idleLoaded &&
            this.hero.attackLoaded &&
            this.hero.attackDowLoaded &&
            this.hero.defenseLoaded &&
            this.hero.winsLoaded &&
            this.hero.killLoaded &&
            this.hero.recibirLoaded;

        const tiefReady =
            this.tief.idleLoaded &&
            this.tief.attackLoaded &&
            this.tief.attackDowLoaded &&
            this.tief.defenseLoaded &&
            this.tief.winsLoaded &&
            this.tief.killLoaded &&
            this.tief.recibirLoaded;

        if (heroReady && tiefReady) {

            this.assetsReady = true;

            this.fightButton.disabled = false;
            this.fightButton.textContent = "START FIGHT";

            //console.log("Todos los personajes están preparados");
        }
    }

    //================================
    // INICIAR COMBATE
    //================================

    
    startFight() {

        if (
            this.fightStarted ||
            !this.assetsReady ||
            !this.hero.arrived
        ) {
            return;
        }

        this.fightStarted = true;

        this.startFightTimer = this.startFightDuration;

        // Iniciar combate coordinado
        this.combatSequence.start();

        this.fightButton.disabled = true;
        this.fightButton.textContent = "FIGHT IN PROGRESS";

        //console.log("¡START FIGHT!");
    }


    //================================
    // ACTUALIZAR ENERGÍA
    //================================

    updateEnergy(dt) {

        if (!this.fightStarted) return;

        this.energyTimer += dt;

        // Cambiar objetivos aleatoriamente
        if (this.energyTimer >= this.energyNextChange) {

            this.energyTimer = 0;

            this.energyNextChange =
                0.5 + Math.random() * 1.2;

            this.heroEnergyTarget =
                35 + Math.random() * 65;

            this.tiefEnergyTarget =
                35 + Math.random() * 65;
        }

        // Transición suave hacia los nuevos valores
        const speed = 35 * dt;

        this.heroEnergy +=
            (this.heroEnergyTarget - this.heroEnergy) *
            Math.min(1, speed);

        this.tiefEnergy +=
            (this.tiefEnergyTarget - this.tiefEnergy) *
            Math.min(1, speed);
    }

    //================================
    // UPDATE
    //================================

    update(dt) {

            // Hero camina automáticamente hasta su posición
            this.hero.update(dt, {});

            // Tief permanece en espera o ejecuta sus animaciones
            this.tief.update(dt);

            this.checkAssets();

            this.updateEnergy(dt);

            if (this.startFightTimer > 0) {
                this.startFightTimer = Math.max(
                    0,
                    this.startFightTimer - dt
                );
            }
        }

    //================================
    // DIBUJAR FONDO
    //================================

    drawBackground() {

        if (this.backgroundLoaded) {

            this.ctx.drawImage(
                this.background,
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );

        } else {

            this.ctx.fillStyle = "#24132e";

            this.ctx.fillRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );
        }
    }

    //================================
    // DIBUJAR BARRA DE ENERGÍA
    //================================

    drawEnergyBar(x, y, width, height, value, color, label) {

        const ctx = this.ctx;

        ctx.save();

        // Etiqueta
        ctx.font = "bold 24px Arial";
        ctx.textAlign = "left";
        ctx.fillStyle = "#ffffff";

        ctx.fillText(label, x, y - 3);

        // Fondo
        ctx.fillStyle = "#15121b";

        ctx.fillRect(
            x,
            y,
            width,
            height
        );

        // Borde
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;

        ctx.strokeRect(
            x,
            y,
            width,
            height
        );

        // Energía
        const fillWidth = width * (value / 100);

        ctx.fillStyle = color;

        ctx.fillRect(
            x + 1,
            y + 1,
            Math.max(0, fillWidth - 2),
            height - 2
        );

        // Brillo
        ctx.fillStyle = "rgba(255,255,255,0.25)";

        ctx.fillRect(
            x + 1,
            y + 1,
            Math.max(0, fillWidth - 2),
            2
        );

        ctx.restore();
    }

    //================================
    // DIBUJAR PUNTUACIÓN
    //================================

    drawScore() {

        const ctx = this.ctx;

        ctx.save();

        ctx.textAlign = "right";
        ctx.font = "bold 24px Arial";

        ctx.shadowColor = "#ffcc00";
        ctx.shadowBlur = 8;

        ctx.fillStyle = "#ffdf36";

        ctx.fillText(
            this.score + " SOCKS",
            this.canvas.width-8 ,
            30
        );

        ctx.restore();
    }

    //================================
    // DIBUJAR HUD
    //================================

    drawHUD() {

        if (!this.fightStarted) return;

        this.drawEnergyBar(
            8,
            43,
            285,
            18,
            this.tiefEnergy,
            "#35e34c",
            "You"
        );

        this.drawEnergyBar(
            8,
            90,
            285,
            18,
            this.heroEnergy,
            "#168fff",
            "Monster Sock"
        );

        //this.drawScore();
    }

    //================================
    // TEXTO COLORIDO
    //================================

    drawRainbowText(text, x, y) {

        const ctx = this.ctx;

        const colors = [
            "#ff3333",
            "#ff9d00",
            "#ffe600",
            "#39ed58",
            "#19cfff",
            "#a34dff",
            "#ff45c8"
        ];

        ctx.save();

        ctx.font = "900 64px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.lineWidth = 3;
        ctx.strokeStyle = "#24102f";

        ctx.shadowColor = "#ff00ff";
        ctx.shadowBlur = 15;

        const totalWidth = ctx.measureText(text).width;

        let currentX = x - totalWidth / 2;

        for (let i = 0; i < text.length; i++) {

            const character = text[i];

            ctx.fillStyle = colors[i % colors.length];

            ctx.strokeText(
                character,
                currentX + ctx.measureText(character).width / 2,
                y
            );

            ctx.fillText(
                character,
                currentX + ctx.measureText(character).width / 2,
                y
            );

            currentX += ctx.measureText(character).width;
        }

        ctx.restore();
    }

    //================================
    // ANUNCIO START FIGHT
    //================================

    drawStartFight() {

        if (this.startFightTimer <= 0) return;

        const ctx = this.ctx;

        const progress =
            this.startFightTimer / this.startFightDuration;

        const scale =
            1 + (1 - progress) * 0.15;

        ctx.save();

        // Fondo semitransparente
        ctx.fillStyle = "rgba(0,0,0,0.45)";

        ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        ctx.translate(
            this.canvas.width / 2,
            this.canvas.height / 2
        );

        ctx.scale(scale, scale);

        this.drawRainbowText(
            "FIGHT!",
            0,
            -100
        );

        ctx.restore();
    }

    //================================
    // DRAW
    //================================

    draw() {

        this.drawBackground();

        // Personajes
        this.hero.draw();
        this.tief.draw();

        // Interfaz
        this.drawHUD();

        // Anuncio de inicio
        this.drawStartFight();
    }

    //================================
    // LOOP
    //================================

    loop(time) {

        if (!this.running) return;

        const dt = Math.min(
            (time - (this.lastTime || time)) / 1000,
            0.05
        );

        this.lastTime = time;

        this.update(dt);
        this.draw();

        requestAnimationFrame(
            nextTime => this.loop(nextTime)
        );
    }
}



function add_points_to_wallet(walletKey, points) {
    //console.log(`Agregando ${points} puntos a:`, walletKey);

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

function showCombatResult(resultado) {

    const button = document.getElementById("fight");

    if (!button) return;

    let mensaje = "";
    let color = "";

    if (resultado === "tief_wins") {

        mensaje = `
            YOU WINS!
            <div style="color:#00FF66;">
                +1000 PUNTOS
            </div>
        `;

        color = "#FFD700";

    } else if (resultado === "hero_wins") {

        mensaje = "YOU LOSE";
        color = "#FF3333";

    } else {

        mensaje = "EMPATE";
        color = "#00BFFF";
    }

    button.innerHTML = `
        <div style="
            font-size:35px;
            font-weight:900;
            color:${color};
            text-shadow:3px 3px 5px black;
        ">
            ${mensaje}
        </div>

        <div style="
            font-size:16px;
            margin-top:10px;
            color:white;
        ">
            JUGAR NUEVAMENTE
        </div>
    `;

    // Asegurar que el botón esté habilitado
    button.disabled = false;
    button.type = "button";

    // Eliminar la acción anterior y asignar la nueva
    button.onclick = function(event) {

        event.preventDefault();
        event.stopPropagation();

        //console.log("REINICIANDO JUEGO");
        monster_SOCKS_game();
        //window.location.reload();
    };
}







    //==================================================
    // INICIAR MONSTER_SOCKS
    //==================================================

//const gameInstance =
  //  new MonsterSocksGame(canvas, ctx, resultado);

}


// Exponer la función globalmente
window.monster_SOCKS_game = monster_SOCKS_game;