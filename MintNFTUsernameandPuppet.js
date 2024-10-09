  

        // Arrays con los nombres de los archivos SVG
 const baseImages = [
    '00.SVG', '01.SVG', '02.SVG', '03.SVG', '04.SVG', 
    '05.SVG', '06.SVG', '07.SVG', '08.SVG', '09.SVG', 
    '0A.SVG', '0B.SVG', '0C.SVG', '0D.SVG', '0E.SVG', '0F.SVG'
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
    '0A.SVG', '0B.SVG', '0C.SVG', '0D.SVG', '0E.SVG', 
    '0F.SVG', '10.SVG', '11.SVG', '12.SVG', '13.SVG', 
    '14.SVG', '15.SVG', '16.SVG', '17.SVG', '18.SVG', 
    '19.SVG', '1A.SVG', '1B.SVG', '1C.SVG', '1D.SVG', 
    '1E.SVG', '1F.SVG', '20.SVG', '21.SVG'
];

const cuelloImages = [
    '00.SVG', '01.SVG', '02.SVG', '03.SVG', '04.SVG',
    '05.SVG', '06.SVG'
];
        // Nuevos arrays para las carpetas de ojos, boca y pelo
 const ojosImages = [
    '00.SVG', '01.SVG', '02.SVG', '03.SVG', '04.SVG',
    '05.SVG', '06.SVG', '07.SVG', '08.SVG', '09.SVG',
    '0A.SVG', '0B.SVG', '0C.SVG', '0D.SVG', '0E.SVG',
    '0F.SVG', '10.SVG', '11.SVG', '12.SVG', '13.SVG',
    '14.SVG', '15.SVG', '16.SVG', '17.SVG', '18.SVG',
    '19.SVG'
];

const peloImages = [
    '00.SVG', '01.SVG', '02.SVG', '03.SVG', '04.SVG',
    '05.SVG', '06.SVG', '07.SVG', '08.SVG', '09.SVG',
    '0A.SVG', '0B.SVG', '0C.SVG', '0D.SVG', '0E.SVG',
    '0F.SVG','10.SVG','11.SVG','12.SVG','13.SVG','14.SVG'
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
       
       document.getElementById("codeimageHexa").textContent = hexString;
            
    } catch (error) {
        console.error(error);
        container.innerHTML = '<p>Error al cargar las imágenes.</p>';
    }
}