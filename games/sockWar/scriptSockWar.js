
  // Variables globales
let greenGrid, orangeGrid, greenCount, orangeCount;
const greenMax = 5; // Máximo de imágenes en cuadros verdes
const orangeMax = 5; // Máximo de imágenes en cuadros naranjas

// Función para inicializar el juego
function initializeSockWarGame() {
    // Referencias a los contenedores
    greenGrid = document.getElementById('greenGrid');
    orangeGrid = document.getElementById('orangeGrid');
    greenCount = 0;
    orangeCount = 0;

    // Generar cuadros verdes y naranjas
    createGrid(greenGrid, 'green', 'green');
    createGrid(orangeGrid, 'orange', 'orange');

    // Generar opciones dinámicamente en el selector de tokens
    const tokenSelector = document.getElementById('tokenSelector');
    for (let i = 100000; i <= 100000; i += 100000) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i.toLocaleString()} SOCK`;
        tokenSelector.appendChild(option);
    }
}

// Crear cuadros dinámicamente
function createGrid(grid, colorClass, type) {
    for (let i = 0; i < 9; i++) {
        const box = document.createElement('div');
        box.classList.add('box', colorClass);
        box.dataset.index = i;
        box.dataset.type = type;
        
        // Añadir cuadro a la cuadrícula
        grid.appendChild(box);

        // Añadir evento de clic para alternar la imagen
        box.addEventListener('click', () => toggleImage(box));
    }

    // Asegurarse de que la cuadrícula se reorganice después de agregar todos los cuadros
    grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    grid.style.gridTemplateRows = 'repeat(3, 1fr)';
}

// Alternar imagen en los cuadros
function toggleImage(box) {
    const type = box.dataset.type; // Tipo de cuadro (verde/naranja)
    const hasImage = box.querySelector('img');

    if (hasImage) {
        // Eliminar la imagen
        box.removeChild(hasImage);
        if (type === 'green') greenCount--;
        else orangeCount--;
    } else {
        // Agregar imagen si no supera el límite
        if ((type === 'green' && greenCount < greenMax) ||
            (type === 'orange' && orangeCount < orangeMax)) {
            const img = document.createElement('img');
            img.src = type === 'green' ? 'games/sockWar/images/house.SVG' : 'games/sockWar/images/bomb.SVG'; // Ruta de las imágenes
            box.appendChild(img);

            if (type === 'green') greenCount++;
            else orangeCount++;
        }
    }

    // Verificar si se han completado las apuestas
    checkCompletion();
}

function checkCompletion() {
    const button = document.getElementById('create-fight-bomb-bets');
    if (greenCount === greenMax && orangeCount === orangeMax) {
        // Mostrar el botón si se completaron las apuestas
        button.style.display = 'block';
    } else {
        // Ocultar el botón si no se completaron
        button.style.display = 'none';
    }
}
// Obtener el estado del tablero
function getGridState() {
    const greenState = Array.from(greenGrid.children).map(box => box.querySelector('img') ? 1 : 0);
    const orangeState = Array.from(orangeGrid.children).map(box => box.querySelector('img') ? 1 : 0);
    alert(`En Desarrollo.!  :)`);
    //alert(`Estado de los cuadros verdes: ${greenState.join(', ')}\nEstado de los cuadros naranjas: ${orangeState.join(', ')}`);
}

// Cargar el juego dinámicamente
function loadGame_sockWar() {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';

    // Verificar si los estilos ya están cargados
   

     // Eliminar el estilo anterior
    const previousStyles = document.getElementById('gameStyles');
    if (previousStyles) {
        previousStyles.remove();
    }

    // Cargar el nuevo estilo para el juego SockWar
    const link = document.createElement('link');
    link.id = 'gameStyles';
    link.rel = 'stylesheet';
    link.href = 'games/sockWar/styles.css'; // Ruta de los estilos de SockWar
    document.head.appendChild(link);

    const gameHTML = `
        <h3>SockWar</h3>
        <center>
            <div> 
                <select id="tokenSelector"></select>
                <br><br>
                <div class="containerbox" id="greenGrid"></div>
                <br>
                <div class="containerbox" id="orangeGrid"></div>
                <br>
                <button id="create-fight-bomb-bets" style="display: none;" onclick="getGridState()">Fight!</button>
              </div>
        </center>
    `;

    // Insertar el contenido dinámico en el contenedor
    gameContainer.innerHTML = gameHTML;

    // Inicializar el juego
    initializeSockWarGame();
}
