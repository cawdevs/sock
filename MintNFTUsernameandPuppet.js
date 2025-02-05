  

        // Arrays con los nombres de los archivos SVG
 const baseImages = [
    '00.SVG', '01.SVG', '02.SVG', '03.SVG', '04.SVG', 
    '05.SVG', '06.SVG', '07.SVG', '08.SVG', '09.SVG', 
    '0a.SVG', '0b.SVG', '0c.SVG', '0d.SVG', '0e.SVG', '0f.SVG'
];

//const fondoImages = [
//    '00.SVG', '01.SVG'
//];


const brazoImages = [
    '00.SVG', '01.SVG', '02.SVG', '03.SVG', '04.SVG', '05.SVG' 
];

const cuerpoImages = [
    '00.SVG', '01.SVG', '02.SVG', '03.SVG', '04.SVG', 
    '05.SVG', '06.SVG', '07.SVG', '08.SVG', '09.SVG', 
    '0a.SVG', '0b.SVG', '0c.SVG', '0d.SVG', '0e.SVG', 
    '0f.SVG', '10.SVG', '11.SVG', '12.SVG', '13.SVG', 
    '14.SVG', '15.SVG', '16.SVG', '17.SVG', '18.SVG', 
    '19.SVG', '1a.SVG', '1b.SVG', '1c.SVG', '1d.SVG', 
    '1e.SVG', '1f.SVG', '20.SVG', '21.SVG'
];

const cuelloImages = [
    '00.SVG', '01.SVG', '02.SVG', '03.SVG', '04.SVG',
    '05.SVG', '06.SVG'
];
        // Nuevos arrays para las carpetas de ojos, boca y pelo
 const ojosImages = [
    '00.SVG', '01.SVG', '02.SVG', '03.SVG', '04.SVG',
    '05.SVG', '06.SVG', '07.SVG', '08.SVG', '09.SVG',
    '0a.SVG', '0b.SVG', '0c.SVG', '0d.SVG', '0e.SVG',
    '0f.SVG', '10.SVG', '11.SVG', '12.SVG', '13.SVG',
    '14.SVG', '15.SVG', '16.SVG', '17.SVG', '18.SVG',
    '19.SVG'
];

const peloImages = [
    '00.SVG', '01.SVG', '02.SVG', '03.SVG', '04.SVG',
    '05.SVG', '06.SVG', '07.SVG', '08.SVG', '09.SVG',
    '0a.SVG', '0b.SVG', '0c.SVG', '0d.SVG', '0e.SVG',
    '0f.SVG','10.SVG','11.SVG','12.SVG','13.SVG','14.SVG'
];

//const bocaImages = [
//    'b1.SVG', 'b2.SVG', 'b3.SVG', 'b4.SVG', 'b5.SVG', 'b6.SVG', 'b7.SVG', 'b8.SVG', 'b9.SVG', 'b10.SVG',
//    'b11.SVG', 'b12.SVG', 'b13.SVG', 'b14.SVG', 'b15.SVG', 'b16.SVG', 'b17.SVG', 'b18.SVG', 'b19.SVG', 'b20.SVG',
//    'b21.SVG', 'b22.SVG', 'b23.SVG', 'b24.SVG', 'b25.SVG', 'b26.SVG', 'b27.SVG', 'b28.SVG', 'b29.SVG', 'b30.SVG',
//    'b31.SVG', 'b32.SVG', 'b33.SVG'
//];



 function getRandomImage(images) {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}



async function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'layer';

        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Error al cargar la imagen: ${src}`));
    });
}

async function loadImages() {
    const container = document.getElementById('image-container');
    container.innerHTML = ''; // Limpiar el contenedor antes de cargar nuevas imágenes

    // Obtener una imagen aleatoria de cada carpeta
    const baseImage = getRandomImage(baseImages);
    const brazoImage = getRandomImage(brazoImages);
    const cuerpoImage = getRandomImage(cuerpoImages);
    const cuelloImage = getRandomImage(cuelloImages);
    const ojosImage = getRandomImage(ojosImages);
    const peloImage = getRandomImage(peloImages);

    // Crear un objeto con las fuentes de las imágenes
    const imageSources = {
        base: `pupets_imagenes/base/${baseImage}`,
        brazo: `pupets_imagenes/brazo/${brazoImage}`,
        cuerpo: `pupets_imagenes/cuerpo/${cuerpoImage}`,
        cuello: `pupets_imagenes/cuello/${cuelloImage}`,
        ojos: `pupets_imagenes/ojos/${ojosImage}`,
        pelo: `pupets_imagenes/pelo/${peloImage}`
    }; 
   

    // Mostrar "Cargando..." mientras se cargan las imágenes
    const loadingText = document.createElement('div');

    loadingText.textContent = 'Cargando...';
    container.appendChild(loadingText);

    try {
        const promises = Object.values(imageSources).map(src => loadImage(src));
        const images = await Promise.all(promises);

        // Limpiar "Cargando..." y agregar las imágenes al contenedor
        container.innerHTML = ''; // Limpiar el contenedor
        images.forEach(img => container.appendChild(img));


        // Crear cadena hexadecimal
        let hexString = '0x';
        for (const image of Object.keys(imageSources)) {
            const fileName = imageSources[image].split('/').pop(); // Obtener solo el nombre del archivo
            const fileWithoutExtension = fileName.split('.')[0]; // Eliminar la extensión
            hexString += fileWithoutExtension; // Concatenar a la cadena
            
        }
       //console.log(hexString); // Mostrar la cadena hexadecimal en la consola
       //alert('Hexa: ' +hexString);
       hexString += "0000000000000000000000000000000000000000000000000000";
       
       document.getElementById("codeimageHexa").textContent = hexString;
            
    } catch (error) {
        console.error(error);
        container.innerHTML = '<p>Error al cargar las imágenes.</p>';
    }
}

function getImageFromHex(hexCode, imagesArray) {
    // Convierte el valor hexadecimal en un número decimal
    const index = parseInt(hexCode, 16);

    // Verifica si el índice está dentro de los límites del array
    if (index >= 0 && index < imagesArray.length) {
        return imagesArray[index];
    } else {
        console.error("Índice fuera de rango para el array de imágenes.");
        return imagesArray[0]; // Retorna una imagen por defecto si el índice es inválido
    }
}


async function getImageNFTUsername(image_contenedor){

    const selectorNFTs = document.getElementById('selector_NFTs').value;
   
    try {
    
        let codeHexaImage;
        if (nftUsernameContract.methods) {
                console.log("Con MetaMask ");
                // Usando web3.js
                codeHexaImage = await nftUsernameContract.methods.getimagecodeHexaFromUsername(selectorNFTs).call();     
                   
        } else {
                 // Usando ethers.js
                console.log("Con SockWallet "); 
                codeHexaImage = await nftUsernameContract.getimagecodeHexaFromUsername(selectorNFTs);
                // Usar la función para cargar la imagen con el código hexadecimal y el contenedor de imagen proporcionado
                                                             
        } 

        await loadImagesFromHex(codeHexaImage, image_contenedor);        


    }catch (error) {
                
            console.error('Error:', error);
    }
    
}

async function loadImagesFromHex(hexString, image_contenedor, size = "medium") {

    const container = document.getElementById(image_contenedor);
    //container.style.border = "1px solid blue"; // Borde blanco alrededor del contenedor
    container.style.padding = "5px"; // Espacio interno para separar el contenido del borde
    container.style.position = "relative"; // Posicionamiento para las imágenes
    container.style.overflow = "hidden"; // Asegura que no se salga del borde

    // Limpiar el contenedor
    container.innerHTML = "";


    // Limpiar el contenedor removiendo todos los nodos hijos
    //while (container.firstChild) {
    //    container.removeChild(container.firstChild);
    //}

    // Eliminar el prefijo '0x' del código hexadecimal si está presente
    hexString = hexString.startsWith('0x') ? hexString.slice(2) : hexString;

    // Tomar los primeros dos caracteres hexadecimales para cada categoría
    const baseHex = hexString.slice(0, 2);
    const brazoHex = hexString.slice(2, 4);
    const cuerpoHex = hexString.slice(4, 6);
    const cuelloHex = hexString.slice(6, 8);
    const ojosHex = hexString.slice(8, 10);
    const peloHex = hexString.slice(10, 12);

    // Obtener las imágenes correspondientes a cada capa usando el código hexadecimal
    const baseImage = getImageFromHex(baseHex, baseImages);
    const brazoImage = getImageFromHex(brazoHex, brazoImages);
    const cuerpoImage = getImageFromHex(cuerpoHex, cuerpoImages);
    const cuelloImage = getImageFromHex(cuelloHex, cuelloImages);
    const ojosImage = getImageFromHex(ojosHex, ojosImages);
    const peloImage = getImageFromHex(peloHex, peloImages);

    // Crear un objeto con las fuentes de las imágenes
    const imageSources = {
        base: `pupets_imagenes/base/${baseImage}`,
        brazo: `pupets_imagenes/brazo/${brazoImage}`,
        cuerpo: `pupets_imagenes/cuerpo/${cuerpoImage}`,
        cuello: `pupets_imagenes/cuello/${cuelloImage}`,
        ojos: `pupets_imagenes/ojos/${ojosImage}`,
        pelo: `pupets_imagenes/pelo/${peloImage}`
    };

    // Mostrar "Cargando..." mientras se cargan las imágenes
    //const loadingText = document.createElement('div');
    //loadingText.textContent = 'Cargando...';
    //container.appendChild(loadingText);

    try {
        // Cargar y mostrar las imágenes
        const promises = Object.values(imageSources).map(src => loadImage(src));
        const images = await Promise.all(promises);

        //alert('images: ' + hexString);
     

        

        // Configuración de tamaño según la variable `size`
    let width, height;
    if (size === "small") {
        width = "60px";
        height = "60px";
    } else if (size === "medium") {
        width = "80px";
        height = "80px";
    } else if (size === "big") {
        width = "200px";
        height = "200px";
    } else {
        // Valor por defecto si no se proporciona `size` válido
        width = "150px";
        height = "150px";
    }

      

        images.forEach(img => {
            img.style.width = width;
            img.style.height = height;
            img.style.objectFit = "cover";
            container.appendChild(img);
        });



       

    } catch (error) {
        console.error(error);
        container.innerHTML = '<p>Error al cargar las imágenes.</p>';
    }
}



async function info_profile_sock(){
    
        const selectorNFTs = document.getElementById('selector_NFTs').value;
                
        const containner_info_sock = document.getElementById('info-sock');
        containner_info_sock.innerHTML = "";   
        containner_info_sock.style.display = "flex";
        containner_info_sock.style.flexDirection = "column"; // Por defecto, para dispositivos móviles
        containner_info_sock.style.alignItems = "center"; // Centrar verticalmente en móviles
        containner_info_sock.style.marginBottom = "10px"; // Espacio entre filas
        containner_info_sock.style.border = "1px solid white"; // Borde blanco alrededor del contenedor
        containner_info_sock.style.padding = "5px"; // Espacio interno para separar el contenido del borde
        containner_info_sock.style.width = "100%"; // Ocupa todo el ancho disponible 
        

        try {

             let info_username,total_minted_NFT;
             
             if (nftUsernameContract.methods) {
                 console.log("Con MetaMask ");
                 // Usando web3.js
                info_username = await nftUsernameContract.methods.getNFTInfoByUsername(selectorNFTs).call();
                total_minted_NFT = await nftUsernameContract.methods.getTotalMintedNFTs().call();
            
             } else {
                 // Usando ethers.js
                console.log("Con SockWallet "); 
                info_username = await nftUsernameContract.getNFTInfoByUsername(selectorNFTs);
                total_minted_NFT = await nftUsernameContract.getTotalMintedNFTs();
                                              
              } 
                        
             
             //alert('info' +" "+ info_username+ "*/* " + total_minted_NFT);

             //function transferNFT(address to, string memory username)

             id_info = info_username[0];
             username_info = info_username[1];
             is_minted = info_username[2];
             forsale_info = info_username[3];
             precio_info = info_username[4];
             usernameHash_info = info_username[5];
             codeHexaImage_info = info_username[6];
             
             const username_date = tiempoTranscurrido(info_username[7]);
      

            try{
              // Crear un contenedor para la imagen
              const imageUserContainer = document.createElement("div");
                  imageUserContainer.id = `imageContainerId`; // ID único por usuario
                  imageUserContainer.style.width = "200px"; // Ancho del contenedor
                  imageUserContainer.style.height = "200px"; // Alto del contenedor
                  imageUserContainer.style.display = "flex"; // Para centrar la imagen en el contenedor
                  imageUserContainer.style.justifyContent = "center"; // Centrar horizontalmente
                  imageUserContainer.style.alignItems = "center"; // Centrar verticalmente
                  imageUserContainer.style.marginRight = "10px"; // Espacio entre imagen y nombre
                  imageUserContainer.style.border = "1px solid white"; // Borde blanco alrededor del contenedor de la imagen
                  imageUserContainer.style.padding = "5px"; // Espacio interno para separar el contenido del borde
               
             containner_info_sock.appendChild(imageUserContainer);

// Crear el contenedor principal
const infoContainer = document.createElement("div");
infoContainer.style.marginLeft = "10px"; // Margen izquierdo para el contenedor
infoContainer.style.color = "white"; // Color de texto blanco
infoContainer.classList.add("info-container"); // Clase para aplicar estilos

        // Agregar cada párrafo con contenido
        const paragraph0 = document.createElement("p");
        paragraph0.textContent = `ID: ${id_info}`;
        paragraph0.style.color = "black";
        paragraph0.style.fontSize = "18px";
        infoContainer.appendChild(paragraph0);

        const paragraph1 = document.createElement("p");
        paragraph1.textContent = `Username: ${username_info}`;
        paragraph1.style.color = "black";
        paragraph1.style.fontSize = "18px";
        infoContainer.appendChild(paragraph1);
               
        // Convertir de wei a MATIC para mostrar al usuario
        let maticAmount;
        if (typeof tokenContract.methods !== 'undefined') {
                console.log("Con MetaMask");
                maticAmount = web3.utils.fromWei(precio_info, 'ether');
                // Lógica específica para contratos instanciados con web3.js
        } else {
                console.log("Con SockWallet.");
                maticAmount = ethers.utils.formatUnits(precio_info, 'ether');
               // Lógica específica para contratos instanciados con ethers.js
        }
        

        const paragraph4 = document.createElement("p");
        paragraph4.textContent = `Price: ${maticAmount}`;
        paragraph4.style.color = "green";
        paragraph4.style.fontSize = "18px";
        infoContainer.appendChild(paragraph4);

        //const paragraph5 = document.createElement("p");
        //paragraph5.textContent = `HashUsername: ${usernameHash_info}`;
        //paragraph5.style.color = "darkgreen";
        //infoContainer.appendChild(paragraph5);

        //const paragraph6 = document.createElement("p");
        //paragraph6.textContent = `CodeHexaImage: ${codeHexaImage_info}`;
        //paragraph6.style.color = "darkgreen";
        //infoContainer.appendChild(paragraph6);

        const paragraph7 = document.createElement("p");
        paragraph7.textContent = `Date: ${username_date}`;
        paragraph7.style.color = "darkgreen";
        paragraph7.style.fontSize = "18px";
        infoContainer.appendChild(paragraph7);


        // Loading animation
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loadingAnimation-info-sock-puppet';
        loadingDiv.style.display = 'none';
        loadingDiv.innerHTML = '<div class="spinner"></div>';
        infoContainer.appendChild(loadingDiv);



        // Crear el contenedor de botones y entrada de texto
        const sellContainer = document.createElement("div");
        sellContainer.style.display = "flex";
        sellContainer.style.justifyContent = "space-around"; // Espacio entre elementos
        sellContainer.style.alignItems = "center"; // Centra los elementos verticalmente
        sellContainer.style.marginTop = "10px"; // Espacio entre el último <p> y el contenedor

                // Función para crear botones
                function createButton(text, color, onClick) {
                    const button = document.createElement("button");
                    button.textContent = text;
                    button.style.padding = "10px 20px";
                    button.style.margin = "0 5px"; // Espacio entre elementos
                    button.style.backgroundColor = color;
                    button.style.color = "white";
                    button.style.border = "none";
                    button.style.borderRadius = "20px"; // Bordes redondeados
                    button.style.cursor = "pointer";
                    button.addEventListener("click", onClick);
                    return button;
                }

                // Función para crear la entrada de texto redondeada
                function createTextInput(placeholder) {
                    const input = document.createElement("input");
                    input.type = "text";
                    input.placeholder = placeholder;
                    input.style.padding = "10px";
                    input.style.margin = "0 5px"; // Espacio entre elementos
                    input.style.borderRadius = "20px"; // Bordes redondeados
                    input.style.border = "1px solid #ccc"; // Borde gris claro
                    input.style.outline = "none"; // Remover borde de enfoque por defecto
                    
                    // Asegura que el placeholder y el texto ingresado tengan colores visibles
                    input.style.color = "black"; // Texto ingresado en negro
                    input.style.fontSize = "14px"; // Tamaño de texto
                    input.style.placeholderColor = "#888"; // Color del placeholder (dependiendo del navegador)
    
                    return input;
                }

                // Define las funciones que llamarán cada botón
                // Define las funciones que llamarán cada botón
                async function handleButtonSellClick() {
                    //alert("Has clickeado el Botón 1");
                    // Obtén el valor del input
                    document.getElementById('loadingAnimation-info-sock-puppet').style.display = 'block';
                    const price = textInput_sell.value; // Accede al valor de la entrada de texto

                    // Verifica si el valor es válido
                    if (!price || isNaN(price) || parseFloat(price) <= 0) {
                        alert("Invalid Price. Please enter a valid number greater than 0.");
                        return;
                    }

                     let priceInWei;
                    try {
                         
                       if (nftUsernameContract.methods) {
                            console.log("Con MetaMask ");
                            priceInWei = web3.utils.toWei(price.toString(), 'ether'); // Convertir a Wei
                            
                            await nftUsernameContract.methods.sellNFT(username_info, priceInWei).send({
                            from: globalWalletKey,                            
                            });
                            console.log('NFT Username ready to Sell.');
                                       

                       } else {
                            // Usando ethers.js
                            console.log("Con SockWallet "); 
                            // Llamar al método sellNFT
                                                       
                            // Obtener la tarifa de gas base desde la red
                            //const feeData = await provider.getGasPrice();
                            //const gasPrice = feeData.gasPrice;
                            //const adjustedGasPrice = gasPrice.mul(110).div(100);
                            const adjustedGasPrice = await obtenerGasAjustado();
                            
                            //Convertir el precio a wei
                            priceInWei = ethers.utils.parseEther(price.toString());

                            // Establecer gasLimit estimado
                            const estimatedGas = await nftUsernameContract.estimateGas.sellNFT(username_info, priceInWei);
                            const adjustedGasLimit = estimatedGas.mul(110).div(100); // Aumenta en 10%

                            // Ejecutar la transacción con los valores ajustados
                            const tx = await nftUsernameContract.sellNFT(username_info, priceInWei, {
                                gasLimit: adjustedGasLimit,
                                gasPrice: adjustedGasPrice
                            });

                            console.log("Transacción enviada:", tx.hash);

                            // Esperar la confirmación
                            const receipt = await tx.wait();
                            console.log("Transacción confirmada:", receipt);
                            document.getElementById('loadingAnimation-info-sock-puppet').style.display = 'none';
                            alert('Transaction ok :)');

                                   
                          } 

                    } catch (error) {
                        console.error('Error al listar el NFT Username:', error);
                        document.getElementById('loadingAnimation-info-sock-puppet').style.display = 'none';
                    }
                }

                async function handleButtonCancelSellClick() {
                    //alert("Has clickeado el Botón 2");
                   
                    try {                        

                         document.getElementById('loadingAnimation-info-sock-puppet').style.display = 'block'; 

                        if (nftUsernameContract.methods) {
                            console.log("Con MetaMask ");
                            await nftUsernameContract.methods.cancelNFTSale(username_info,).send({
                                from: globalWalletKey,                               
                            });
                            console.log('NFT Username is Delisted.');
                                                       

                       } else {
                           console.log("Con SockWallet ");
                            // Llamada con ethers.js
                           
                           // Obtener datos de gas
                           //const feeData = await provider.getGasPrice();
                           //const gasPrice = feeData.gasPrice;
                           //const adjustedGasPrice = gasPrice.mul(110).div(100);
                         
                           const adjustedGasPrice = await obtenerGasAjustado();

                           // Estimar gas necesario para la función cancelNFTSale
                           //const estimatedGasLimit = await nftUsernameContract.estimateGas.cancelNFTSale(username_info);
                           //const adjustedGasLimit = estimatedGasLimit.mul(110).div(100); // Incrementar un 10%

                           //console.log("Gas Limit estimado:", estimatedGasLimit.toString());
                           //console.log("Gas Limit con 10% extra:", adjustedGasLimit.toString());
                           console.log("Gas Limit con 10% extra:");

                           // Llamada con ethers.js
                           const tx = await nftUsernameContract.cancelNFTSale(username_info, {
                                    gasLimit: 600000,
                                    gasPrice: adjustedGasPrice
                                });

                           console.log("Transacción enviada:", tx.hash);

                           // Esperar confirmación
                           const receipt = await tx.wait();
                           console.log("Transacción confirmada:", receipt);
                           document.getElementById('loadingAnimation-info-sock-puppet').style.display = 'none';
                           alert('Transaction ok :)');

                       }

               }catch (error) {
                        document.getElementById('loadingAnimation-info-sock-puppet').style.display = 'none'; 
                        console.error('Error al deslistar el NFT Username:', error);
                     }
                }

                // Define las funciones que llamarán cada botón
                
                async function handleButtonTransferClick() {
                    //alert("Has clickeado el Botón 3");
                    const address_to = textInput_transfer.value; // Accede al valor de la entrada de texto
                    // Verificar si la dirección es válida
                    
                    
                    try {
                          document.getElementById('loadingAnimation-info-sock-puppet').style.display = 'block';
                         
                         
                         if (nftUsernameContract.methods) {

                            if (!web3.utils.isAddress(address_to)) {
                                alert("Invalid  address.");
                                return; // Detener la ejecución si la dirección no es válida
                            }
                            console.log("Con MetaMask ");
                            await nftUsernameContract.methods.transferNFT(address_to , username_info).send({
                                from: globalWalletKey, 
                                });
                            console.log('NFT transferido.');
                                                      
                         } else {

                            // Llamada con ethers.js
                            if (!ethers.utils.isAddress(address_to)) {
                                console.error("La dirección de la wallet no es válida.");
                                return;
                            }
                                                     
                            console.log("Con SockWallet ");

                            // Obtener datos de gas
                            //const feeData = await provider.getGasPrice();
                            //const gasPrice = feeData.gasPrice;
                            //const adjustedGasPrice = gasPrice.mul(110).div(100);
                            const adjustedGasPrice = await obtenerGasAjustado();
                            
                            // Estimar gas necesario para la función transferNFT
                            const estimatedGasLimit = await nftUsernameContract.estimateGas.transferNFT(address_to, username_info);
                            const adjustedGasLimit = estimatedGasLimit.mul(110).div(100); // Incrementar un 10%

                            // Llamada con ethers.js
                            const tx = await nftUsernameContract.transferNFT(address_to, username_info, {
                                    gasLimit: adjustedGasLimit,
                                    gasPrice: adjustedGasPrice
                                });

                            console.log("Transacción enviada:", tx.hash);

                            // Esperar confirmación
                            const receipt = await tx.wait();
                            console.log("Transacción confirmada:", receipt);
                            document.getElementById('loadingAnimation-info-sock-puppet').style.display = 'none';
                            alert('Transaction ok :)');
                          }
                        
                     }catch (error) {
                        document.getElementById('loadingAnimation-info-sock-puppet').style.display = 'none';
                        console.error('Error al transferir NFT Username:', error);
                     }
                }

                


                let textInput_sell; 

                if (forsale_info === false) {
                    const button_sell = createButton("List for Sale", "green", handleButtonSellClick);
                    textInput_sell = createTextInput("Price in Matic"); // Solo asignación
                    sellContainer.appendChild(button_sell);
                    sellContainer.appendChild(textInput_sell);
                } else {
                    const button_cancel_sell = createButton("Cancel Listing", "orange", handleButtonCancelSellClick);
                    sellContainer.appendChild(button_cancel_sell);
                }
              
                

                // Agregar el contenedor de controles al infoContainer
        infoContainer.appendChild(sellContainer);


        // Crear el contenedor de botones y entrada de texto
        const transferContainer = document.createElement("div");
        transferContainer.style.display = "flex";
        transferContainer.style.justifyContent = "space-around"; // Espacio entre elementos
        transferContainer.style.alignItems = "center"; // Centra los elementos verticalmente
        transferContainer.style.marginTop = "10px"; // Espacio entre el último <p> y el contenedor

                
                             
                // Crear dos botones y una entrada de texto
                const button_transfer= createButton("Transfer to:", "green", handleButtonTransferClick);
                const textInput_transfer = createTextInput("0x........");

                // Agregar los botones y la entrada de texto al contenedor
                transferContainer.appendChild(button_transfer);
                transferContainer.appendChild(textInput_transfer);
                


                // Agregar el contenedor de controles al infoContainer
        infoContainer.appendChild(transferContainer);



                           
// Agregar el contenedor al elemento principal
containner_info_sock.appendChild(infoContainer);                                                
                             
await loadImagesFromHex(codeHexaImage_info,imageUserContainer.id,"big"); // Cargar la imagen al iniciar
              


                    
              
              
               


          } catch (error){

            console.error("Error en find (images)  :", error);

           
          }





        }catch (error) {   
            
            console.error('Error:', error);
        }
    
}


 function tiempoTranscurrido(timestamp) {

          timestamp=timestamp*1000;
          const diferencia = Date.now() - timestamp;
          const segundos = Math.floor(diferencia / 1000);
          const minutos = Math.floor(segundos / 60);
          const horas = Math.floor(minutos / 60);
          const dias = Math.floor(horas / 24);

          if (segundos < 60) {
            return 'Hace unos segundos';
          } else if (minutos < 60) {
            return `Hace ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
          } else if (horas < 24) {
            return `Hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
          } else {
            const fecha = new Date(timestamp);
            return fecha.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
          }
}  