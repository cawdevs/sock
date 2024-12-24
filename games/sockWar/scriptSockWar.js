/*
Bet_ContractABI = [{"inputs":[{"internalType":"address","name":"sockTokenAddress","type":"address"},{"internalType":"address","name":"nftContractAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newBetAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newRewardAmount","type":"uint256"}],"name":"BetAndRewardAmountUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"betId","type":"uint256"},{"indexed":true,"internalType":"address","name":"player","type":"address"},{"indexed":false,"internalType":"bytes32","name":"nftUsernameHash","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"betAmount","type":"uint256"}],"name":"BetCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"betId","type":"uint256"},{"indexed":true,"internalType":"address","name":"opponent","type":"address"},{"indexed":false,"internalType":"bytes32","name":"nftUsernameHash","type":"bytes32"}],"name":"BetJoined","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"betId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"result","type":"uint256"}],"name":"BetResolved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"betAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"betCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"bets","outputs":[{"internalType":"address","name":"player","type":"address"},{"internalType":"bytes32","name":"nftUsernameHash","type":"bytes32"},{"internalType":"bytes","name":"encryptedMove","type":"bytes"},{"internalType":"uint256","name":"betAmount","type":"uint256"},{"internalType":"bool","name":"resolved","type":"bool"},{"internalType":"address","name":"opponent","type":"address"},{"internalType":"uint256","name":"result","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"nftUsernameHash","type":"bytes32"},{"internalType":"bytes","name":"encryptedMove","type":"bytes"}],"name":"createBet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"betId","type":"uint256"}],"name":"getBetHistory","outputs":[{"components":[{"internalType":"address","name":"player","type":"address"},{"internalType":"bytes32","name":"nftUsernameHash","type":"bytes32"},{"internalType":"bytes","name":"encryptedMove","type":"bytes"},{"internalType":"uint256","name":"betAmount","type":"uint256"},{"internalType":"bool","name":"resolved","type":"bool"},{"internalType":"address","name":"opponent","type":"address"},{"internalType":"uint256","name":"result","type":"uint256"}],"internalType":"struct BettingContract.Bet","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"nftUsernameHash","type":"bytes32"}],"name":"getPlayerBetHistory","outputs":[{"components":[{"internalType":"address","name":"player","type":"address"},{"internalType":"bytes32","name":"nftUsernameHash","type":"bytes32"},{"internalType":"bytes","name":"encryptedMove","type":"bytes"},{"internalType":"uint256","name":"betAmount","type":"uint256"},{"internalType":"bool","name":"resolved","type":"bool"},{"internalType":"address","name":"opponent","type":"address"},{"internalType":"uint256","name":"result","type":"uint256"}],"internalType":"struct BettingContract.Bet[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hasOpenBet","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hasOpenBetStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"playerBets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newBetAmount","type":"uint256"},{"internalType":"uint256","name":"newRewardAmount","type":"uint256"}],"name":"updateBetAndRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const betContractAddress = '0x6430c0a29ff385e84405efd99d32f0c21b983c9e';//polygon verificado  
let betContract;

let  bet_Amount, has_OpenBet;   


if (betContract.methods) {
             console.log("Con MetaMask.");
             bet_Amount = await betContract.methods.betAmount().call();             
             //rewardAmount = await contract.methods.rewardAmount().call();
             console.log("Bet Amount: ", betAmount);
             has_OpenBet = await betContract.methods.hasOpenBet().call();
             console.log("has_OpenBet: ", has_OpenBet);
                        
             // Usando web3.js
} else {
             // Usando ethers.js
             console.log("Con SockWallet.");   
             betAmount = await betContract.betAmount();
             //rewardAmount = await contract.rewardAmount(); 
             has_OpenBet = await betContract.hasOpenBet();
             console.log("has_OpenBet: ", has_OpenBet);    
         }
*/

let  bet_Amount, has_OpenBet, bet_Counter;   
  // Variables globales
let greenGrid, orangeGrid, greenCount, orangeCount;
const greenMax = 5; // Máximo de imágenes en cuadros verdes
const orangeMax = 5; // Máximo de imágenes en cuadros naranjas

// Función para inicializar el juego
function initializeSockWarGame() {
   const bet_counter_element = document.getElementById('bet-counter');
   bet_counter_element.innerText = `${bet_Counter} SockWar`;    

   const bet_amount_elemen  = document.getElementById('bet-amount');  
   bet_amount_elemen.innerText =`3x${bet_Amount} SOCK `;
   

    const sockwarImage = document.getElementById('sockwar-image');
    // Mostrar u ocultar la imagen según el valor de temp
    if (has_OpenBet) {
        sockwarImage.style.display = 'block'; // Muestra la imagen
    } else {
        sockwarImage.style.display = 'none'; // Oculta la imagen
    }

    // Referencias a los contenedores
    greenGrid = document.getElementById('greenGrid');
    orangeGrid = document.getElementById('orangeGrid');
    greenCount = 0;
    orangeCount = 0;

        // Generar cuadros verdes y naranjas
    createGrid(greenGrid, 'green', 'green');
    createGrid(orangeGrid, 'orange', 'orange');
    
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
    //const button = document.getElementById('create-fight-bomb-bets');
    const button = document.getElementById('approve-Bet-SockWar');
    button.innerText = `Apostar ${bet_Amount} de SOCK`;
    
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
     
    // Obtener el estado de los cuadros verdes en binario
    const greenState = Array.from(greenGrid.children)
        .map(box => box.querySelector('img') ? 1 : 0)
        .join('');

    // Obtener el estado de los cuadros naranjas en binario
    const orangeState = Array.from(orangeGrid.children)
        .map(box => box.querySelector('img') ? 1 : 0)
        .join('');

    // Concatenar ambos estados para formar un número binario combinado
    let combinedState = greenState + orangeState;
    
    return  combinedState;

}   


async function get_data_SockWar() {

    const username = document.getElementById('selector_NFTs').value;


    
    try {

         //let bet_Amount, has_OpenBet;   
         let nft_username_Hash;
         if (betContract.methods) {
             console.log("Con MetaMask.");
             bet_Amount = await betContract.methods.betAmount().call(); 
             bet_Amount = web3.utils.fromWei(bet_Amount, 'ether');
             console.log("Bet_amount: ", bet_Amount);     
             bet_Counter= await betContract.methods.betCounter().call();
             //rewardAmount = await contract.methods.rewardAmount().call();
             has_OpenBet = await betContract.methods.hasOpenBet().call();
             nft_username_Hash = await nftUsernameContract.methods.getHashFromUsername(username).call();  
             bet_History= await betContract.methods.getPlayerBetHistory(nft_username_Hash).call();
             console.log("has_OpenBet: ", has_OpenBet);
                         
             // Usando web3.js

         } else {
             // Usando ethers.js
             console.log("Con SockWallet.");   
             betAmount = await betContract.betAmount();
             betAmount = ethers.utils.formatUnits(bet_Amount, 18);
             console.log("Bet_amount: ", bet_Amount);
             bet_Counter= await betContract.betCounter();
             //rewardAmount = await contract.rewardAmount(); 
             has_OpenBet = await betContract.hasOpenBet();
             nft_username_Hash = await nftUsernameContract.getHashFromUsername(username);  
             bet_History= await betContract.getPlayerBetHistory(nft_username_Hash);
             console.log("has_OpenBet: ", has_OpenBet);    
         }



        /*
         // Referencia al contenedor donde se mostrarán los resultados
        const historyContainer = document.getElementById('history-bet-player');
        // Limpia el contenedor antes de agregar los nuevos resultados
        historyContainer.innerHTML = '';
        // Si no hay resultados, mostrar un mensaje
        if (bet_History.length === 0) {
            historyContainer.innerHTML = '<p>No hay apuestas realizadas.</p>';
            return;
        }

         // Crear un elemento para cada resultado y añadirlo al contenedor
        bet_History.forEach(bet => {
            const betElement = document.createElement('div');
            betElement.style.marginBottom = '10px';
            betElement.innerHTML = `
                <p><strong>Contrincante:</strong> xxxxx ${bet}</p>
                <p><strong>Contrincante:</strong> ${bet.opponent}</p>
                <p><strong>Resultado:</strong> ${bet.result ? 'Ganaste' : 'Perdiste'}</p>
                <p><strong>Monto:</strong> ${web3.utils.fromWei(bet.amount, 'ether')} ETH</p>
                <hr>
            `;
            historyContainer.appendChild(betElement);
        });
       */

         //coloca monto de apuesta y si hay un apostador            

    } catch (error) {
        console.error('Error al realizar la transacción:', error);
        alert('Error al realizar la transacción: ' + error.message);
    }


}



async function  approve_Bet_SockWar() {
     console.log("hellooooo.");
    
     const button_figth = document.getElementById('create-fight-bomb-bets');
     button_figth.style.display = 'block';

     const button_approve = document.getElementById('approve-Bet-SockWar');
     button_approve.style.display = 'none';
    
    
    try {
         
        //let bet_Amount;
        let amountToApprove;

        if (betContract.methods) {
              console.log("Con MetaMask.");
        
              //bet_Amount = await betContract.methods.betAmount().call(); 
              amountToApprove = web3.utils.toWei(bet_Amount, 'ether');
              
              await tokenContract.methods.approve(betContractAddress, amountToApprove).send({from: globalWalletKey, gas: 300000, gasPrice: web3.utils.toWei('50', 'gwei') });                       
       
        } else {
             // Usando ethers.js
               
            console.log("Con SockWallet ");
            //bet_Amount = await betContract.betAmount(); 
            amountToApprove = ethers.utils.parseUnits(bet_Amount, 'ether');  // Convertir a ethers usando la cantidad de decimales correcta
            //amountToApprove = betAmount;
            // Aprobar el gasto usando ethers.js
            const tx = await tokenContract.approve(betContractAddress, amountToApprove, {
                gasLimit: 300000,
                gasPrice: ethers.utils.parseUnits('50', 'gwei')
            });

            // Esperar a que se confirme la transacción
            await tx.wait();

            console.log("Aprobación con SockWallet realizada con éxito.");
            alert('Transaction ok :)'); 
                 
        }

         //coloca monto de apuesta y si hay un apostador            

    } catch (error) {
        console.error('Error al realizar la transacción:', error);
        alert('Error al realizar la transacción: ' + error.message);
    }


    //hacer aparecer el boton FIGHT
    

}   
  
 
 async function  create_Bet_SockWar() {
    try {

         const username = document.getElementById('selector_NFTs').value;
                   
         let nft_username_Hash;
         //let bet_Amount;
         let result;
         let binaryMove;
         binaryMove = getGridState();
         alert('binaryMove :) '+ binaryMove);  

         if (betContract.methods) {
              console.log("Con MetaMask.");
              //aprobar monto              
              nft_username_Hash = await nftUsernameContract.methods.getHashFromUsername(username).call();  
              //bet_Amount = await betContract.methods.betAmount().call(); 
              amountToApprove = web3.utils.toWei(bet_Amount, 'ether');
              //amountToApprove = betAmount;

              // Ejemplo de uso:              
              binaryMove = getGridState();
              result_move = addHashAndMove(nft_username_Hash, binaryMove); 
              alert('result_move + hash :) '+ result_move + "  " + nft_username_Hash);  

               
              await betContract.methods.createBet(nft_username_Hash, result_move).send({
                  from: globalWalletKey,
                  gas: 600000,
                  gasPrice: web3.utils.toWei('50', 'gwei') });          
              //create_bet

         } else {
             // Usando ethers.js
            console.log("Con SockWallet.");  
            nft_username_Hash = await nftUsernameContract.getHashFromUsername(username);  
            //bet_Amount = await betContract.betAmount(); 
                        
            amountToApprove = ethers.utils.parseUnits(bet_Amount, 'ether');  // Convertir a ethers usando la cantidad de decimales correcta
            //amountToApprove = betAmount;
            // Ejemplo de uso:              
            binaryMove = getGridState();
            result_move = addHashAndMove(nft_username_Hash, binaryMove);   


            // Aprobar el gasto usando ethers.js
            const tx = await betContract.createBet(nft_username_Hash, result_move, {
                gasLimit: 600000,
                gasPrice: ethers.utils.parseUnits('50', 'gwei')
            });

            // Esperar a que se confirme la transacción
            await tx.wait();

            console.log("transaccion Sockwallet excitosa");
            alert('Transaction ok :)');  
                 
         }

         //coloca monto de apuesta y si hay un apostador            

    } catch (error) {
        console.error('Error al realizar la transacción:', error);
        alert('Error al realizar la transacción: ' + error.message);
    }    
}    


function addHashAndMove(nftUsernameHash, binaryMove) {
    // Convertir la jugada binaria a un número hexadecimal
    const moveDecimal = parseInt(binaryMove, 2); // Convertir binario a decimal
    const moveHex = moveDecimal.toString(16); // Convertir decimal a hexadecimal
    // Convertir el hash y el movimiento a números grandes para manejar valores grandes
    const hashValue = new BigNumber(nftUsernameHash, 16); // Hash como número en base 16
    const moveValue = new BigNumber(moveHex, 16); // Movimiento como número en base 16
    // Sumar ambos valores
    const result = hashValue.plus(moveValue);
    // Convertir el resultado a hexadecimal
    alert('addHashAndMove ok :)');
     
    return '0x' + result.toString(16);
}


// Cargar el juego dinámicamente
function loadGame_sockWar() {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';

    // Verificar si los estilos ya están cargados
    get_data_SockWar(); 
     // Referencia a la imagen
    
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
        <div id="sockwar-container" style="display: flex; align-items: center; gap: 10px;">
            <h3 id= "bet-counter"> </h3>
            <img id="sockwar-image" src="games/sockWar/images/bomb.SVG" alt="Bomb Icon" style="width: 48px; height: auto;">
        </div>

        <h4 id = "bet-amount"> </h4> 
        <center>
            <div>                 
                 <br><br>
                <div class="containerbox" id="greenGrid"></div>
                <br>
                <div class="containerbox" id="orangeGrid"></div>
                <br>
             
                 <button id="approve-Bet-SockWar" style=" display:none" onclick="approve_Bet_SockWar()">Apostar Tokens Sock</button>
                 <button id="create-fight-bomb-bets" style="display: none;" onclick="create_Bet_SockWar()">Fight!</button>
             
              </div>
              <br>
              <p> Resultados </p>
              <div id=history-bet-player></div>

        </center>
    `;

    // Insertar el contenido dinámico en el contenedor
    gameContainer.innerHTML = gameHTML;



    // Inicializar el juego
    initializeSockWarGame();
}
