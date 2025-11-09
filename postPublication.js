
function createPublicationElements() {
    // Obtener el nombre de usuario del selector
    const nftusername = document.getElementById('selector_NFTs').value;
       
   // const container = document.getElementById('publication-post-container');
    const container = document.getElementById('menu-publicar');
    container.style.cssText = 'background-color:var(--fondo_post);';
    container.style.width = '90%';
    container.style.borderRadius = '20px';
    container.innerHTML = '';   

    const form = document.createElement('form');

    ///////////////////////////////////////////////////////////////////
    /////////////publicar/////////////////////////////////////////////

    // Tercera fila: Contenedor con imagen, select y botón de enviar
    const controlsDiv = document.createElement('div');
    controlsDiv.classList.add('form-group');
    controlsDiv.style.cssText = 'display: flex; align-items: center; justify-content: center; gap: 10px; justify-content: space-between;';
        
    

    /////////////////////////////////////////////////////////////////////////
    // NUEVO: contenedor para el editor

// Reemplaza esta parte de createPublicationElements
const textareaDiv = document.createElement('div');
textareaDiv.classList.add('form-group');

const editorContainer = document.createElement('div');
editorContainer.id = 'miContenedorEditor'; // Este es el nuevo editor dinámico
editorContainer.style.cssText = 'border: 2px solid black; border-radius: 20px; width: 100%; height: 100px; margin-bottom: 10px; font-size: 18px;';
textareaDiv.appendChild(editorContainer);
form.appendChild(textareaDiv);

// Inicializa Quill después de que el contenedor está en el DOM
setTimeout(() => {
    const quill = new Quill('#miContenedorEditor', {
        theme: 'snow',
        placeholder: `${nftusername} ¿Qué quieres publicar hoy?`,
        modules: {
            toolbar: [
                ['emoji'], // <-- botón de emoji
                //[{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic'],
                [{ 'color': [] }], // <-- aquí añadimos color y fondo
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                //[{ 'align': [] }],
                //['link']

            ],
             'emoji-toolbar': false,
             'emoji-textarea': true,
             'emoji-shortname': true
        }
    });

    window.miEditorQuill = quill;

    const MAX_CHARS = 10240;

    // Crear el contador
    const contadorElement = document.createElement('div');
    contadorElement.id = 'contadorCaracteres';
    contadorElement.style.cssText = 'text-align: right; font-size: 14px; color: gray; margin-top: 5px;';
    quill.container.parentNode.appendChild(contadorElement);

    
 /////////////////////////////////////////////////////////////////////////

    // Segunda fila: Input para el link de la imagen
    const mediaInputDiv = document.createElement('div');
    mediaInputDiv.classList.add('form-group');
     
    const mediaInput = document.createElement('input');
    mediaInput.type = 'text';
    mediaInput.id = 'media-publication';
    mediaInput.placeholder = 'Subir un Link o enlace a youtube, X, image, etc';
    mediaInput.style.cssText = 'border: 2px solid black; border-radius: 20px; width: 100%; margin-bottom: 10px; height: 40px; width: 100%;';
    mediaInputDiv.appendChild(mediaInput);
            
    form.appendChild(mediaInputDiv);
    /////////////////////////////////////////////////////  


 

 // Crear contenedor del select de clasificación
    const selectClassDiv = document.createElement('div');
    selectClassDiv.classList.add('form-group');

    // Crear el select de clasificación
    const selectClass = document.createElement('select');
    selectClass.classList.add('form-control');
    selectClass.id = 'filter-classification';
    selectClass.innerHTML = `
        <option value="para > 18">Para mayores de 18 años</option>
        <option value="para > 21">Para mayores de 21 años</option>
        <option value="para todos">Para todo publico</option>
        
    `;
    selectClass.style.cssText = 'border: 2px solid black; border-radius: 20px; height: 35px;';

    // Agregar el select al contenedor y luego al `controlsDiv`
    selectClassDiv.appendChild(selectClass);

    form.appendChild(selectClassDiv);
    













// Segunda fila: Input para el link de la imagen
    const publicarButtomDiv = document.createElement('div');
    
   // Botón de enviar publicación
    const submitLink = document.createElement('button');
    submitLink.type ='button'; // ← evita comportamiento submit
    //submitLink.href = '#';
    submitLink.id = 'btn-publication';
    //submitLink.style.cssText = 'padding: 5px 20px; font-size: 14px; align-items: center; justify-content: center; background-color: dodgerblue; color: white; border: 2px solid blue; border-radius: 20px; cursor: pointer;';
    submitLink.style.cssText = 'font-size: 18px; border: 2px solid blue; border-radius: 20px; width: 100%; margin: 10px 0; height: 40px; cursor: pointer; background-color: dodgerblue; color: white;';

    submitLink.textContent = 'Hacer Publicación';


    // Agregar evento de clic
    submitLink.addEventListener('click', async function(event) {
        event.preventDefault(); // Evita que el enlace navegue a otra página
        await publicar_main_post(); // Llama a la función asíncrona

        console.log('iniciamos get_ultima_publication.'); 
        get_ultima_publication('recent-home-publications-container'); 
        
        
    });

    publicarButtomDiv.appendChild(submitLink);

    form.appendChild(publicarButtomDiv);








const MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20MB máximo
const MAX_VIDEO_DURATION = 60; // 60 segundos máximo

const subirBtn = document.createElement('button');
subirBtn.type = 'button'; // ← evita comportamiento submit

subirBtn.textContent = 'Subir Foto/Video';
subirBtn.style.cssText = 'font-size: 18px; border: 2px solid dodgerblue; border-radius: 20px; width: 100%; margin: 10px 0; height: 40px; cursor: pointer;';


const inputArchivo = document.createElement('input');
inputArchivo.type = 'file';
inputArchivo.accept = 'image/*,video/*';
inputArchivo.id = 'input-media-publication'; // ← le das un ID
inputArchivo.style.display = 'none';


const previewContainer = document.createElement('div');
previewContainer.style.cssText = 'margin-top: 10px;';

const mensajeSpan = document.createElement('span');
mensajeSpan.style.cssText = 'display: block; font-style: italic; color: gray; margin-bottom: 5px;';

subirBtn.addEventListener('click', () => {
    mensajeSpan.textContent = '';
    previewContainer.innerHTML = '';
    inputArchivo.value = '';
    inputArchivo.click();
});

inputArchivo.addEventListener('change', () => {
    previewContainer.innerHTML = '';
    mensajeSpan.textContent = '';

    if (inputArchivo.files.length > 0) {
        const archivo = inputArchivo.files[0];
        const tipo = archivo.type;

        if (!tipo.startsWith('image/') && !tipo.startsWith('video/')) {
            mensajeSpan.style.color = 'red';
            mensajeSpan.textContent = 'Error: Solo se permiten imágenes o videos válidos.';
            return;
        }

        if (archivo.size > MAX_SIZE_BYTES) {
            mensajeSpan.style.color = 'red';
            mensajeSpan.textContent = `Error: El archivo es muy grande (máximo 20MB). Tamaño actual: ${(archivo.size / (1024*1024)).toFixed(2)} MB.`;
            return;
        }

        if (tipo.startsWith('image/')) {
            mensajeSpan.style.color = 'gray';
            mensajeSpan.textContent = `Imagen seleccionada: ${archivo.name}`;

            // Redimensionar imagen para preview
            const img = new Image();
            img.onload = () => {
                const MAX_WIDTH = 300;
                const MAX_HEIGHT = 300;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height = Math.round(height * (MAX_WIDTH / width));
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width = Math.round(width * (MAX_HEIGHT / height));
                        height = MAX_HEIGHT;
                    }
                }

                // Canvas para redimensionar
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const previewImg = document.createElement('img');
                previewImg.src = canvas.toDataURL(tipo);
                previewImg.style.maxWidth = '100%';
                previewImg.style.height = 'auto';

                previewContainer.appendChild(previewImg);
            };
            img.src = URL.createObjectURL(archivo);
        } else if (tipo.startsWith('video/')) {
            mensajeSpan.style.color = 'gray';
            mensajeSpan.textContent = `Video seleccionado: ${archivo.name}`;

            // Crear video para verificar duración
            const video = document.createElement('video');
            video.preload = 'metadata';

            video.onloadedmetadata = () => {
                URL.revokeObjectURL(video.src); // liberar memoria

                if (video.duration > MAX_VIDEO_DURATION) {
                    mensajeSpan.style.color = 'red';
                    mensajeSpan.textContent = `Error: El video dura más de 1 minuto (${Math.floor(video.duration)}s). Por favor seleccione otro.`;
                    previewContainer.innerHTML = '';
                    inputArchivo.value = '';
                    return;
                }

                // Si duración ok, mostrar preview
                video.controls = true;
                video.style.maxWidth = '100%';
                previewContainer.appendChild(video);
            };

            video.onerror = () => {
                mensajeSpan.style.color = 'red';
                mensajeSpan.textContent = 'Error al cargar el video.';
                previewContainer.innerHTML = '';
                inputArchivo.value = '';
            };

            video.src = URL.createObjectURL(archivo);
        }
    }
});

quill.container.parentNode.appendChild(subirBtn);
quill.container.parentNode.appendChild(inputArchivo);
quill.container.parentNode.appendChild(mensajeSpan);
quill.container.parentNode.appendChild(previewContainer);






    // Función para actualizar contador
    function actualizarContador() {
        const textoPlano = quill.getText(); // sin HTML
        const caracteres = textoPlano.trim().length;
        const restantes = MAX_CHARS - caracteres;
        contadorElement.textContent = `${restantes} caracteres restantes`;
        if (restantes < 0) {
            contadorElement.style.color = 'red';
        } else {
            contadorElement.style.color = 'gray';
        }
    }

    // Llamar cuando se escribe
    quill.on('text-change', actualizarContador);
    actualizarContador(); // al inicio

}, 0);



    container.appendChild(form);    

    getImageNFTUsername("publication-NFT_image-container");

}






async function obtenerCorrelativoDesdeBlockchain() {
    let total_publication;

    if (publisherContract.methods) {
        console.log("get_publication Con MetaMask");
        total_publication = await publisherContract.methods.publicationCount().call();
    } else {
        console.log("get_publication Con SockWallet");
        total_publication = await publisherContract.publicationCount();
    }

    return total_publication;
}



async function subirArchivoAlServidorYRetornarURL(file=null) {
    
    // Obtener correlativo desde la blockchain
    const correlativo = await obtenerCorrelativoDesdeBlockchain();
    
    if (!correlativo || isNaN(correlativo)) {
        throw new Error("No se obtuvo un correlativo válido desde la blockchain");
    }

    const formData = new FormData();
    formData.append('correlativo', correlativo);
    
    if (file){ 
           
            formData.append('archivo', file);
            // Enviar al servidor, aunque no haya archivo
            console.log("esto se va a subir",correlativo,file.name);
            const respuesta = await fetch('https://api.thesocks.net/subirW3/', {
                method: 'POST',
                body: formData
            });    
            
            const data = await respuesta.json();

            console.log("esto se recibe",data, data.mensaje);
            
            if (!respuesta.ok || !data.cid) {
                console.error(`Error del servidor: ${data.mensaje || 'CID no retornado'}`);
                return false; // ❌ En lugar de lanzar error, retornamos false
            }
            console.log("enlace retornado desd django",data.cid);

            // Después de hacer el fetch y antes de devolver:
            let cidRaw = data.cid;
            // 1) Elimina caracteres de control o invisibles:
            cidRaw = cidRaw.replace(/[^\x20-\x7E]/g, '');
            // 2) Recorta espacios en los extremos:
            cidRaw = cidRaw.trim();



            // 3) Si el backend ya devuelve la URL completa, úsala tal cual:
            //se almacenara en la BD django si es un video
            /*if (cidRaw && cidRaw.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
                                
                                addVideoPublication(correlativo)
                                console.log(`🎥 Es un video. Guardando ID: ${correlativo}`);
            }*/
            
            return cidRaw;
           

    }else{
        //const respuesta = await fetch('https://api.thesocks.net/subirDj/', {
        //    method: 'POST',
        //    body: formData
        //});
    }   


}




async function publicar_main_post(){
   
    const loadingAnimation = document.getElementById('loadingAnimation-post-publication');

    const barra = inicializarBarra(3); // Indica el total de pasos


    const container_publication = document.getElementById('menu-publicar');
    container_publication.style.display = 'none';

    try{        ////////////////////

      
            loadingAnimation.style.display = 'block'; // Muestra la animación al ejecutar la función

            //obtenemos el CID del archivo guardado en IPSF 
            let link_to_media = document.getElementById('media-publication').value
            const selected_username = document.getElementById('selector_NFTs').value;
//////////            const content = document.getElementById("publicacion").value;
            let content = window.miEditorQuill.root.innerHTML;
            
            const inputArchivo = document.getElementById('input-media-publication');
            let  url_ipsf;
            
            if (inputArchivo && inputArchivo.files.length > 0) {
                 
                    const archivo = inputArchivo.files[0];
                    url_ipsf = await subirArchivoAlServidorYRetornarURL(archivo);

                    // Este es el archivo que debes pasar al servidor o a IPFS
                    console.log("Archivo seleccionado:", archivo.name);
                    
                    if (url_ipsf != false){
                           
                           link_to_media=url_ipsf;
                           //se almacena el id en servidor si es un video
                           barra.avanzar("Archivo media subido con exito...");
                           
                    }else{
                           //no se pudo subir la imagen
                           console.log("No se pudo subir la imagen a IPSF"); 
                           barra.avanzar("Archivo media no se pudo subir...");
                    }

                    
            } else {
                    //url_ipsf = await subirArchivoAlServidorYRetornarURL();
                    url_ipsf = null;
                    console.log("No se ha seleccionado ningún archivo.");
                    barra.avanzar("Publicación sin Archivo media......");
            }
          
                
           
            
           
            const jsonMetadata = {
                    media: link_to_media,
                    calsificacion: document.getElementById('filter-classification').value
                    
            };

            
            // Convertir a formato de texto (string)
            const jsonString = JSON.stringify(jsonMetadata);
            const publicationType = 0; 
            const threadOrder=0;          
                         

            if (publisherContract.methods) {
                            console.log("publicar Con MetaMask ");
                            await publisherContract.methods.createPublication(selected_username,content,jsonString,publicationType,publicationType,threadOrder).send({
                                from: globalWalletKey, 
                                });
                            console.log('publicado Con MetaMask.');
                            barra.avanzar("publicado con metamask Wallet...");
                                                                                

            } else {

                    // SockWallet con ethers.js
                    console.log("publicado Con SockWallet ");

                    const adjustedGasPrice = obtenerGasAjustado();
                    const estimatedGas = await publisherContract.estimateGas.createPublication(
                        selected_username,
                        content,
                        jsonString,
                        publicationType,
                        publicationType,
                        threadOrder
                    );
                    const adjustedGasLimit = estimatedGas.mul(110).div(100); // 10% más gas

                    const tx = await publisherContract.createPublication(
                        selected_username,
                        content,
                        jsonString,
                        publicationType,
                        publicationType,
                        threadOrder,
                        {
                            gasLimit: adjustedGasLimit,
                            gasPrice: adjustedGasPrice,
                        }
                    );

                    console.log("Transacción enviada:", tx.hash);

                    try {
                        const receipt = await tx.wait(); // 👈 Espera confirmación aquí
                        showSuccess("Confirmado: Publicado Main Post", receipt);
                        barra.avanzar("publicado con Socks Wallet...");
                    } catch (error) {
                        showError("Sin confirmar: Publicado Main Post.", error);
                        //return; // ❌ No seguir si falló
                    }
                           

            } 
               
            //const recent_publication = document.getElementById('recent-home-publications-container');
               
            
            loadingAnimation.style.borderLeftColor = 'lime';                 
            setTimeout(() => { 
                loadingAnimation.style.display = 'none';
            }, 5000);

            
            barra.avanzar("Finalizado con excito..."); 
          
           $('a[href="#home"]').tab('show');//me lleva al menu home
           

    } catch (error) {

          container_publication.style.display = 'block';
          
// Cambia el color de la animación a rojo y lo mantiene 2 segundos
          loadingAnimation.style.borderLeftColor = 'red';                 
          setTimeout(() => { 
              loadingAnimation.style.display = 'none';
          }, 5000);
          
          showError("Sin confirmar:Publicado Main Post.",error);
          
    }
}


let currentIndex = null;
let total_publication = null;
let randomSeenIndexes = new Set(); // 📌 Guardará los índices ya usados en modo random

async function get_all_publications_home(containerID, append = false, mode = "last") {
    try {
        const container = document.getElementById(containerID);
        const loadingAnimation = document.getElementById('loadingAnimation-principal');

        if (!append) {
            container.innerHTML = '';

            // Obtener total de publicaciones
            if (publisherContract.methods) {
                total_publication = await publisherContract.methods.publicationCount().call();
            } else {
                total_publication = await publisherContract.publicationCount();
            }

            currentIndex = total_publication;

            // Si es modo random y no se está haciendo append, reiniciar el set
            if (mode === "random") {
                randomSeenIndexes.clear();
            }
        }

        let count = 0;

        if (mode === "last") {
            // 📌 Últimas 5 publicaciones
            let i = currentIndex;
            while (count < 5 && i >= 1) {
                let type_publication = await get_publication(i, containerID);
                loadingAnimation.style.display = 'none';

                if (type_publication !== 3) {
                    count++;
                }
                i--;
            }
            currentIndex = i;

        } else if (mode === "random") {
            // 📌 5 publicaciones aleatorias sin repetir entre llamadas
            while (count < 5 && randomSeenIndexes.size < total_publication) {
                let randomIndex = Math.floor(Math.random() * total_publication) + 1;
                if (!randomSeenIndexes.has(randomIndex)) {
                    randomSeenIndexes.add(randomIndex);

                    let type_publication = await get_publication(randomIndex, containerID);
                    loadingAnimation.style.display = 'none';

                    if (type_publication !== 3) {
                        count++;
                    }
                }
            }
        }

        // Si ya no hay más publicaciones en modo "last"
        if (mode === "last" && currentIndex < 1) {
            document.getElementById("verMasBtn").style.display = "none";
        }

        // Si ya no hay más publicaciones en modo "random"
        if (mode === "random" && randomSeenIndexes.size >= total_publication) {
            document.getElementById("verMasBtn").style.display = "none";
        }

    } catch (error) {
        console.error('Error completo:', error);
    }
}


async function get_ultima_publication(containerID) {
    try {
        const container = document.getElementById(containerID);

        let currentIndex;
        if (publisherContract.methods) {
            currentIndex = await publisherContract.methods.publicationCount().call();
        } else {
            currentIndex = await publisherContract.publicationCount();
        }

        currentIndex = Number(currentIndex);  // Solo si es BigNumber
        
       
        console.log('get_publication  valor del currentIndex si' , currentIndex);  
        
        if (currentIndex > 0) {
            await get_publication(currentIndex-1, containerID);
        } else {
            console.log('No hay publicaciones aún.');
        }
        console.log('publicamos' , currentIndex); 

    } catch (error) {
        alert('Error al intentar get_ultima_publication.');
        console.error('Error completo:', error);
    }
}







// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
    //get_all_publications_home("home-publications-container");

    // Configurar el botón una vez que el DOM esté listo
    document.getElementById("verMasBtn").addEventListener("click", () => {
        get_all_publications_home("home-publications-container", true, "last");
    });

    // Configurar el botón una vez que el DOM esté listo
    document.getElementById("verMasBtnRand").addEventListener("click", () => {
        get_all_publications_home("home-publications-container", true, "random");
    });



});





async function get_NFTUsername_publication(nftusername, NFTUsenmane_container){  
      
 try {
        document.getElementById(NFTUsenmane_container).innerHTML = '';

        let my_publication =[];
        if (publisherContract.methods) {
            console.log("get_mypublication Con MetaMask",nftusername);
            my_publication = await publisherContract.methods.getMainPostsByNFTUsername(nftusername).call();
        } else {
            console.log("get_mypublication Con SockWallet",nftusername);
            my_publication = await publisherContract.getMainPostsByNFTUsername(nftusername);
        }

        //recorrer el array desde la más nueva a la más vieja
        const reversedPublications = [...my_publication].reverse();
       
        for (const publicationId of reversedPublications) {
            await get_publication(publicationId, NFTUsenmane_container);
          
        }


    } catch (error) {
        alert('Error al intentar getmy_publications_home.');
        console.error('Error completo:', error);
    }  

}

async function get_publication_NFTUsername(){    
}


async function get_publication(id_publication,principalContainerID) {
    try {
        let publication = [];

        if (publisherContract.methods) {
            console.log("get_publication Con MetaMask");
            publication = await publisherContract.methods.getPublication(id_publication).call();
        } else {
            console.log("get_publication Con SockWallet");
            publication = await publisherContract.getPublication(id_publication);
        }

        const publicationData = publication[0];
        const jsonMetadata = JSON.parse(publicationData.jsonMetadata);

        const publicationObject = {
            id: publicationData.id,
            content: publicationData.content,
            nftUsername: publicationData.nftUsername,
            publicationType: publicationData.publicationType,
            timestamp: new Date(publicationData.timestamp * 1000).toLocaleString(),
            media: jsonMetadata.media || '',
            clasificacion: jsonMetadata.clasificacion || 'para > 18'
        };
        //alert('publicationObject.publicationType'+publicationObject.publicationType);
        //console.log(typeof publicationObject.publicationType);
        //verifica si la publicacion esta marcada como borrada

        if (publicationObject.publicationType != 3) {


                    try {
                        let profileText;
                        
                        if (profileContract.methods) {
                            console.log("Con MetaMask ");
                            profileText = await profileContract.methods.getProfileByUsername(publicationObject.nftUsername).call();
                        } else {
                            console.log("Con SOCKWALLET ");
                            profileText = await profileContract.getProfileByUsername(publicationObject.nftUsername);
                        }

                        // Intentar parsear los datos obtenidos
                        let jsonProfile = {};
                        if (profileText && profileText[1]) {
                            jsonProfile = JSON.parse(profileText[1]);
                        }

                        // Extraer los datos o asignar valores predeterminados
                        const { nombre = '', bio = '', ubicacion = '', paginaWeb = '', fotoPerfil = '', fotoPortada = '' } = jsonProfile;

                        // Añadir imagen y username del perfil de usuario si existe
                        publicationObject.imageProfile = fotoPerfil;
                        publicationObject.usernameProfile = nombre;

                    } catch (error) {
                        console.error("Error al obtener el perfil:", error);

                        // Asignar valores predeterminados en caso de error
                        publicationObject.imageProfile = '';
                        publicationObject.usernameProfile = '';
                    }
                





                // 🔹 Primero agregamos la publicación al DOM
                const publicationElement = await createPublicationElement(publicationObject);

                const principalContainer = document.getElementById(principalContainerID);
                // Estilos para centrar el div y darle fondo blanco
                // Estilos para centrar el div y darle fondo blanco
                principalContainer.style.backgroundColor = "var(--fondo_base)"; // Fondo blanco
                principalContainer.style.margin = "0 auto"; // Centrar horizontalmente
                principalContainer.style.display = "flex"; // Usa flexbox
                principalContainer.style.flexDirection = "column"; // Coloca los elementos en columna
                principalContainer.style.justifyContent = "center"; // Centrar si es necesario
                principalContainer.style.alignItems = "center"; // Mantener el contenido alineado
                principalContainer.style.width = "100%"; // Ajusta el ancho según necesites
                principalContainer.style.borderRadius = "10px"; // Bordes redondeados opcional
                principalContainer.style.padding = "10px"; // Espaciado interno opcional

                // Asegurar que los elementos hijos ocupen el máximo ancho permitido
                publicationElement.style.width = "100%"; // Los elementos ocupan todo el ancho

                principalContainer.appendChild(publicationElement);
                                       
                // 🔥 Ahora podemos cargar la imagen porque el elemento ya está en el DOM
                const profileImageContainerId = `imageContainerId_${publicationObject.id}`;
            
                //si existe una imagen para el perfil no se pone la imagen del NFTUsername
                if (!publicationObject.imageProfile) {
                 
                        let codeHexaImage;             
                        if (nftUsernameContract.methods) {
                            console.log("get_codehexa Con MetaMask ");
                            codeHexaImage = await nftUsernameContract.methods.getimagecodeHexaFromUsername(publicationObject.nftUsername).call();
                        } else {
                            console.log("get_codehaxa Con SockWallet "); 
                            codeHexaImage = await nftUsernameContract.getimagecodeHexaFromUsername(publicationObject.nftUsername);
                        }

                         await loadImagesFromHex(codeHexaImage, profileImageContainerId, "small");

                }                      
                        
        
        }
        return publicationObject.publicationType;
    } catch (error) {
        //alert('Error al intentar get_publication.');
        console.error('Error completo:', error);
    }
}



async function createPublicationElement(publication) {
    const { id, nftUsername, timestamp, content, media, clasificacion, imageProfile, usernameProfile } = publication;
    const selected_username = document.getElementById('selector_NFTs').value;

    // 🧱 CONTENEDOR PRINCIPAL
    const publicationDiv = document.createElement('div');
    publicationDiv.classList.add('publication-container');
    publicationDiv.style.cssText = `
        background-color: var(--fondo_post);
        border: 1px solid #ddd;
        border-radius: 12px;
        margin-bottom: 20px;
        padding: 15px;
        width: 100%;
        box-sizing: border-box;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        transition: box-shadow 0.2s ease, transform 0.1s ease;
    `;
    publicationDiv.onmouseover = () => publicationDiv.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    publicationDiv.onmouseout = () => publicationDiv.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";

    // 🧩 ENCABEZADO
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('publication-header');
    headerDiv.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    `;

    // Imagen de perfil circular
    const profileImageContainer = document.createElement('div');
    profileImageContainer.id = `imageContainerId_${id}`;
    profileImageContainer.style.cssText = `
        width: 55px;
        height: 55px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        border: 1px solid #ccc;
        cursor: pointer;
    `;

    if (imageProfile) {
        const profileImage = document.createElement('img');
        profileImage.src = imageProfile;
        profileImage.alt = "Profile Image";
        profileImage.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: cover;
        `;
        profileImage.addEventListener("click", async function () {
            await get_NFTUsername_profile(nftUsername);
            await get_NFTUsername_publication(nftUsername, "modal_publication-nftusername");
            $('#UsernameProfileModal').modal('show');
        });
        profileImageContainer.appendChild(profileImage);
    }

    // Información de usuario
    const userInfoDiv = document.createElement('div');
    userInfoDiv.style.cssText = `
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 10px;
        flex-grow: 1;
    `;

    if (usernameProfile) {
        const profileUsernameSpan = document.createElement('span');
        profileUsernameSpan.textContent = usernameProfile;
        profileUsernameSpan.style.cssText = `
            font-weight: 600;
            font-size: 16px;
            color: #000;
        `;
        userInfoDiv.appendChild(profileUsernameSpan);
    }

    const usernameSpan = document.createElement('span');
    usernameSpan.textContent = `@${nftUsername}`;
    usernameSpan.style.cssText = `
        font-size: 14px;
        color: #555;
    `;
    userInfoDiv.appendChild(usernameSpan);

    const dateSpan = document.createElement('span');
    dateSpan.textContent = timestamp;
    dateSpan.style.cssText = `
        font-size: 12px;
        color: #999;
    `;
    userInfoDiv.appendChild(dateSpan);

    headerDiv.appendChild(profileImageContainer);
    headerDiv.appendChild(userInfoDiv);

    // 🗑️ Botón de eliminar (si es del usuario)
    if (selected_username === nftUsername) {
        const deleteIcon = document.createElement('span');
        deleteIcon.className = 'glyphicon glyphicon-trash';
        deleteIcon.style.cssText = `
            cursor: pointer;
            font-size: 18px;
            color: #888;
            margin-left: 10px;
            padding: 5px;
        `;
        deleteIcon.onmouseover = () => deleteIcon.style.color = "#e63946";
        deleteIcon.onmouseout = () => deleteIcon.style.color = "#888";
        deleteIcon.onclick = function() {
            mostrarModal_si_no('¿Borrar publicación?', () => delete_post(id), () => {});
        };
        headerDiv.appendChild(deleteIcon);
    }

    // 📜 CONTENIDO DEL POST
    const contentDiv = document.createElement('div');
    contentDiv.style.cssText = `
        margin-top: 10px;
        color: #111;
        font-size: 15px;
        line-height: 1.5;
    `;

    if (content && content.trim() !== '') {
        contentDiv.innerHTML = `
            <div class="rich-text short-view" style="max-height: 150px; overflow: hidden; position: relative;">
                ${content}
            </div>
            <div class="rich-text full-view" style="display: none;">
                ${content}
            </div>
            <span class="toggle-button" style="color: #1d9bf0; cursor: pointer; display: inline-block; margin-top: 5px;">Mostrar más</span>
        `;

        const shortView = contentDiv.querySelector('.short-view');
        const fullView = contentDiv.querySelector('.full-view');
        const toggleButton = contentDiv.querySelector('.toggle-button');

        setTimeout(() => {
            if (shortView.scrollHeight <= 150) toggleButton.style.display = 'none';
        }, 0);

        toggleButton.addEventListener('click', () => {
            const isShort = shortView.style.display !== 'none';
            shortView.style.display = isShort ? 'none' : 'block';
            fullView.style.display = isShort ? 'block' : 'none';
            toggleButton.textContent = isShort ? 'Mostrar menos' : 'Mostrar más';
        });
                
                contentDiv.style.cssText = 'margin-bottom: 10px; font-size: 16px; padding: 10px;';
    }



    // ---- Fila 3: Media (Imagen o Video de YouTube) ----
    const mediaDiv = document.createElement('div');
    mediaDiv.classList.add('publication-media');

    if (media) {
        // Comprobamos si es un video de YouTube mediante un iframe
        if (media.includes("youtube.com/watch") || media.includes("youtu.be/")) {
            let videoId;

            // Si la URL es del tipo "https://www.youtube.com/watch?v=..."
            if (media.includes("youtube.com/watch")) {
                videoId = media.split("v=")[1]?.split("&")[0]; // Obtener el ID del video
            }
            // Si la URL es del tipo "https://youtu.be/..."
            else if (media.includes("youtu.be/")) {
                videoId = media.split("youtu.be/")[1]?.split("?")[0]; // Obtener el ID del video
            }

            
            if (videoId) {
                  const wrapper = document.createElement('div');
                  wrapper.setAttribute('style', `
                    position: relative;
                    padding-bottom: 56.25%;
                    padding-top: 25px;
                    height: 0;
                    overflow: hidden;
                    max-width: 100%;
                    margin: auto;
                  `);

                  const iframe = document.createElement('iframe');
                  iframe.src = `https://www.youtube.com/embed/${videoId}`;
                  iframe.title = 'YouTube video';
                  iframe.setAttribute('style', `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: 0;
                  `);
                  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                  iframe.allowFullscreen = true;

                  wrapper.appendChild(iframe);
                  mediaDiv.appendChild(wrapper);
                }




        } else if (media.includes("x.com/")) {
    let tweetUrl;

    // Si la URL es del tipo "https://x.com/usuario/status/..."
    if (media.match(/x\.com\/([^\/]+)\/status\/(\d+)/)) {
        tweetUrl = media.replace("x.com", "twitter.com");
    }
    // Si la URL es del tipo "https://x.com/i/status/..."
    else if (media.match(/x\.com\/i\/status\/(\d+)/)) {
        const tweetId = media.split("/").pop();
        tweetUrl = `https://twitter.com/i/status/${tweetId}`;
    }

    if (tweetUrl) {
        // Contenedor visual centrado
        mediaDiv.style.cssText = `
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-top: 10px;
            margin-bottom: 10px;
        `;

        const blockquote = document.createElement("blockquote");
        blockquote.className = "twitter-tweet";
        blockquote.setAttribute("data-media-max-width", "500");
        blockquote.style.cssText = `
            margin: auto;
            max-width: 500px;
            width: 100%;
        `;

        const link = document.createElement("a");
        link.href = tweetUrl;

        blockquote.appendChild(link);
        mediaDiv.appendChild(blockquote);

        // Agregar el script de Twitter para renderizar el embed
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://platform.twitter.com/widgets.js";
        script.charset = "utf-8";
        document.body.appendChild(script);
    }
}

        else if (media.includes("tiktok.com")) {
            let tiktokUrl = media;

            // Detectar link corto
            if (media.includes("vm.tiktok.com")) {
                // En producción: el servidor debería devolver la URL larga
                // En navegador local mostramos alerta
                alert("Para ver este video, usa el link largo de TikTok (www.tiktok.com/@usuario/video/ID).");
                return;
            }

            // Extraer usuario y ID del video (link largo)
            const match = tiktokUrl.match(/tiktok\.com\/@([\w.-]+)\/video\/(\d+)/);
            if (!match) {
                console.error("No se pudo extraer el ID del video de TikTok.");
                return;
            }

            const usuario = match[1];
            const videoID = match[2];

            // Crear contenedor para el blockquote (opcional, ayuda con responsive)
const wrapper = document.createElement("div");
wrapper.className = "tiktok-wrapper";
wrapper.style.width = "100%";
wrapper.style.maxWidth = "400px"; // Ajusta al tamaño máximo que quieras
wrapper.style.aspectRatio = "9/16"; // Mantiene proporción vertical
wrapper.style.overflow = "hidden"; // Evita espacio sobrante
wrapper.style.display = "block";
wrapper.style.display = "flex";
wrapper.style.justifyContent = "center";
wrapper.style.alignItems = "center";

// Crear blockquote para TikTok
const blockquote = document.createElement("blockquote");
blockquote.className = "tiktok-embed";
blockquote.setAttribute("data-video-id", videoID);
blockquote.style.width = "100%";
blockquote.style.height = "100%"; // Ocupa toda la altura del wrapper
blockquote.style.display = "block";

const section = document.createElement("section");
const link = document.createElement("a");
link.href = tiktokUrl;
link.target = "_blank";
link.textContent = `@${usuario}`;
section.appendChild(link);
blockquote.appendChild(section);

// Agregar blockquote dentro del wrapper
wrapper.appendChild(blockquote);
mediaDiv.appendChild(wrapper);

            // Agregar script de TikTok si no existe
            if (!window.tiktokEmbed) {
                const script = document.createElement("script");
                script.async = true;
                script.src = "https://www.tiktok.com/embed.js";
                document.body.appendChild(script);
            } else {
                window.tiktokEmbed.load();
            }
        }        // Comprobamos si es una imagen

        else if (media.endsWith('.jpg') || media.endsWith('.jpeg') || media.endsWith('.png') || media.endsWith('.gif')) {
            const mediaImage = document.createElement('img');
            mediaImage.src = media;
            mediaImage.alt = 'Publicación';
            mediaImage.style.cssText = 'width: 100%; border-radius: 10px; object-fit: cover;';
            mediaDiv.appendChild(mediaImage);
        }

        

// Uso:
else if (media.includes("facebook.com") || media.includes("fb.watch")) {
    const wrapper = document.createElement("div");
    wrapper.className = "fb-wrapper";
    wrapper.style.display = "flex";
    wrapper.style.justifyContent = "center";
    wrapper.style.alignItems = "center";

    mediaDiv.appendChild(wrapper);

    // Agregar el script de Twitter para que cargue el embed
                

                const script = document.createElement("script");
script.id = "facebook-jssdk";
script.async = true;
script.defer = true;
script.crossOrigin = "anonymous";
script.src = "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v17.0";
document.body.appendChild(script);

    // Detectar videos, reels, fb.watch o watch?v
    const isVideo =
        media.includes("/videos/") ||
        media.includes("/reel/") ||
        media.includes("fb.watch") ||
        media.includes("/watch?v=");

    const fbElement = document.createElement("div");
    fbElement.className = isVideo ? "fb-video" : "fb-post";
    fbElement.setAttribute("data-href", media);
    fbElement.setAttribute("data-width", "500");
    if (isVideo) fbElement.setAttribute("data-show-text", "true");

    wrapper.appendChild(fbElement);

    // Reintentos para asegurar que el iframe se genere
    let attempts = 0;
    const maxAttempts = 5;

    function tryParse() {
        if (window.FB) FB.XFBML.parse(wrapper);

        attempts++;
        setTimeout(() => {
            const iframe = wrapper.querySelector("iframe");
            if (!iframe && attempts < maxAttempts) {
                tryParse(); // Reintentar
            } else if (!iframe) {
                // Fallback seguro a enlace
                wrapper.innerHTML = `<a href="${media}" target="_blank">Ver en Facebook</a>`;
            }
        }, 500);
    }

    tryParse();
}




else if (media.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
    const video = document.createElement('video');
    video.controls = true;
    video.style.cssText = 'width: 100%; border-radius: 10px; object-fit: cover;';
    const videoUrl = ipfsToSubdomain(media);
    console.log('Video URL final:', videoUrl);
    video.src = videoUrl;

    // Fallback para Chrome si falla
    video.addEventListener('error', async () => {
        try {
            const res = await fetch(videoUrl, { mode: 'cors' });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const blob = await res.blob();
            video.src = URL.createObjectURL(blob);
        } catch(e) {
            console.error('Error cargando video:', e);
        }
    });

    mediaDiv.appendChild(video);
    publicationDiv.appendChild(mediaDiv); // 🔹 muy importante
}
             
        // Si es una URL válida a una imagen, aunque no tenga extensión visible
        else {
            const img = new Image();
            img.onload = function() {
                const mediaImage = document.createElement('img');
                mediaImage.src = media;
                mediaImage.alt = 'Publicación';
                mediaImage.style.cssText = 'width: 100%; border-radius: 10px; object-fit: cover;';
                mediaDiv.appendChild(mediaImage);
            };
             img.onerror = function() {
                // Recortar visualmente la URL si es muy larga
                const displayURL = media.length > 50 ? media.slice(0, 47) + '...' : media;

                // Crear un enlace como texto enriquecido
                const linkHTML = `<a href="${media}" target="_blank" style="color: blue; text-decoration: underline;">${displayURL}</a>`;

                // Insertar el enlace al final del contenido
                const fullView = contentDiv.querySelector('.full-view');
                const shortView = contentDiv.querySelector('.short-view');

                if (fullView && shortView) {
                    fullView.innerHTML += `<br>${linkHTML}`;
                    shortView.innerHTML += `<br>${linkHTML}`;
                }
            };
            img.src = media; // Intenta cargar la imagen de la URL proporcionada
       }

        // Si no es una URL válida, mostramos el cuadro verde
        
    }

    //creamos un div donde van a estar las reacciones 
    const publicationReactionDiv = document.createElement('div');
    publicationReactionDiv.id = `publication-reaction-icons-${id}`;  // ID único basado en la variable id
    publicationReactionDiv.className = "icon-reaction-container";
    publicationReactionDiv.style.marginBottom = '20px';

    await getReactions(selected_username,nftUsername, id , publicationReactionDiv,media);



   //const respuestaDiv = crearDivRespuesta(id, selected_username);
   





    // Agregar filas al contenedor principal
    publicationDiv.appendChild(headerDiv);
    publicationDiv.appendChild(contentDiv);
    publicationDiv.appendChild(mediaDiv);
    publicationDiv.appendChild(publicationReactionDiv);

    //publicationDiv.appendChild(respuestaDiv);

    return publicationDiv;
}


function ipfsToSubdomain(url) {
  const match = url.match(/https?:\/\/w3s\.link\/ipfs\/([^/]+)\/(.*)/);
  if (match) {
    const cid = match[1];
    const path = match[2];
    return `https://${cid}.ipfs.w3s.link/${path}`;
  }
  return url;
}




function crearDivRespuesta(id, username) {
  // Crear contenedor principal para respuestas
  const respuestaDiv = document.createElement('div');
  respuestaDiv.id = `respuesta-div-${id}`;
  respuestaDiv.className = "respuesta-container";
  respuestaDiv.style.marginTop = '10px';

  // Contenedor flex para que textarea y botón estén en la misma fila
  const fila = document.createElement('div');
  fila.style.display = 'flex';
  fila.style.gap = '8px'; // espacio entre textarea y botón

  // Textarea (dos líneas) con placeholder "Comentar publicación"
  const textarea = document.createElement('textarea');
  textarea.rows = 2;
  textarea.placeholder = "Comentar publicación";
  textarea.style.flexGrow = '1';       // ocupa todo el espacio disponible
  textarea.style.boxSizing = 'border-box';
  textarea.style.borderRadius = '6px';
  textarea.style.padding = '8px';

  // Botón "Comentar"
  const botonComentar = document.createElement('button');
  botonComentar.textContent = "Comentar";
  botonComentar.style.padding = '8px 12px';
  botonComentar.style.backgroundColor = 'dodgerblue';
  botonComentar.style.color = '#fff';
  botonComentar.style.border = 'none';
  botonComentar.style.borderRadius = '6px';
  botonComentar.style.cursor = 'pointer';

  // Acción al hacer clic en "Comentar"
  botonComentar.onclick = async () => {
    const comentario = textarea.value.trim();
    if (!comentario) {
      alert("Escribe un comentario antes de enviar.");
      return;
    }
    await enviarRespuestaADjango(id, username, comentario);
    textarea.value = ''; 
    respuestaDiv.remove(); 
  };

  // Ensamblar fila y agregar al contenedor principal
  fila.appendChild(textarea);
  fila.appendChild(botonComentar);
  respuestaDiv.appendChild(fila);

  return respuestaDiv;
}

async function enviarRespuestaADjango(publicationId, username, respuestaTexto) {
  try {
    const response = await fetch('https://api.thesocks.net/enviar-respuesta/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        publication_id: publicationId,
        responder: username,
        respuesta: respuestaTexto,
      }),
    });

    if (!response.ok) throw new Error("Error al enviar respuesta");

    const data = await response.json();
    console.log("Respuesta enviada:", data);
    // Puedes mostrar un mensaje al usuario si quieres

  } catch (error) {
    console.error("Error comunicándose con Django:", error);
    alert("Ocurrió un error al enviar tu respuesta.");
  }
}




async function delete_post(publicationId){
    
    try{        ////////////////////
 

            if (publisherContract.methods) {
                            console.log("delete Con MetaMask ");
                            await publisherContract.methods.deletePublication(publicationId).send({
                                from: globalWalletKey, 
                                });
                            console.log('publicado Con MetaMask.');
                                                       

            } else {
                           console.log("publicado Con SockWallet ",publicationId);
                            // Llamada con ethers.js

                           const adjustedGasPrice = obtenerGasAjustado();
                
                           const estimatedGas = await publisherContract.estimateGas.deletePublication(publicationId);
                           const adjustedGasLimit = estimatedGas.mul(110).div(100); // Aumenta en 10%  
                           console.log("adjustedGasLimit ",adjustedGasLimit);
                           
                           const tx = await publisherContract.deletePublication(publicationId, {
                            gasLimit: adjustedGasLimit,
                            gasPrice: adjustedGasPrice, // Gas Price en Gwei
                           });

                           console.log("Transacción enviada:", tx.hash);
                           // Esperar confirmación
                           tx.wait().then(receipt => {
                               showSuccess("Confirmado: Main Post Eliminado", receipt);
                           }).catch(error => {
                               showError("Sin confirmar:Main Post Elimiado.",error);
                           });

                       }  
                       alert('Pubicación Borrada');

    } catch (error) {
         
          showError("error :Al eliminar Main Post.",error);
          
    }
}
   



  