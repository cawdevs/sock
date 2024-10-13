  

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
        
        const accounts = await web3.eth.getAccounts();
        const myAddress = accounts[0];
        //alert('Conectado con éxito a MetaMask. Dirección de la cuenta: ' + myAddress);
            
        const contract = new web3.eth.Contract(NFT_ContractABI, nftContractAddress);
    
        // Define las opciones en un array
//const codeHexaOptions = [
//    "0x0d01140005080000000000000000000000000000000000000000000000000000",
//    "0x0d02130005080000000000000000000000000000000000000000000000000000"
//];

// Selecciona aleatoriamente una opción
//const selectedCodeHexaImage = codeHexaOptions[Math.floor(Math.random() * codeHexaOptions.length)];

// Llama a la función con la opción seleccionada
//loadImagesFromHex(selectedCodeHexaImage,image_contenedor);
    
        try {
            const codeHexaImage = await contract.methods.getimagecodeHexaFromUsername(selectorNFTs).call();     

            loadImagesFromHex(codeHexaImage,image_contenedor);                           

        }catch (error) {
    
            //alert('Error Create profile');
            console.error('Error:', error);
        }
    
}


async function loadImagesFromHex(hexString, image_contenedor) {
    const container = document.getElementById(image_contenedor);

    // Limpiar el contenedor removiendo todos los nodos hijos
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

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
    const loadingText = document.createElement('div');
    loadingText.textContent = 'Cargando...';
    container.appendChild(loadingText);

    try {
        // Cargar y mostrar las imágenes
        const promises = Object.values(imageSources).map(src => loadImage(src));
        const images = await Promise.all(promises);

        // Limpiar "Cargando..." y agregar las imágenes al contenedor
        container.innerHTML = ''; 
        images.forEach(img => container.appendChild(img));

    } catch (error) {
        console.error(error);
        container.innerHTML = '<p>Error al cargar las imágenes.</p>';
    }
}