
function createPublicationElements() {
    // Obtener el nombre de usuario del selector
    const nftusername = document.getElementById('selector_NFTs').value;
   

    const container = document.getElementById('publication-post-container');
    container.style.cssText = 'background-color:#fff;';
    container.style.width = '100%';
    container.style.borderRadius = '20px';
    container.innerHTML = '';
    
    const form = document.createElement('form');





    ///////////////////////////////////////////////////////////////////
    /////////////publicar/////////////////////////////////////////////

    // Tercera fila: Contenedor con imagen, select y botón de enviar
    const controlsDiv = document.createElement('div');
    controlsDiv.style.cssText = 'display: flex; align-items: center; gap: 10px; justify-content: space-between;';

    // Imagen
    const imageContainer = document.createElement('div');
    imageContainer.id = 'publication-NFT_image-container';
    imageContainer.style.cssText = 'width: 80px; height: 80px; border-radius: 50%; ';
    controlsDiv.appendChild(imageContainer);

    // Select de privacidad
    const selectDiv = document.createElement('div');
    selectDiv.classList.add('form-group');
    const select = document.createElement('select');
    select.classList.add('form-control');
    select.id = 'filter-privacidad';
    select.innerHTML = '<option>*</option><option>>12</option><option>>18</option>';
    select.style.cssText = 'border: 2px solid black; border-radius: 20px; height: 40px;';
    selectDiv.appendChild(select);
    controlsDiv.appendChild(selectDiv);

    // Crear contenedor del select de clasificación
    const selectClassDiv = document.createElement('div');
    selectClassDiv.classList.add('form-group');

    // Crear el select de clasificación
    const selectClass = document.createElement('select');
    selectClass.classList.add('form-control');
    selectClass.id = 'filter-classification';
    selectClass.innerHTML = `
        <option value="general">General</option>
        <option value="personal">Personal</option>
        <option value="profesional">Profesional</option>
    `;
    selectClass.style.cssText = 'border: 2px solid black; border-radius: 20px; height: 40px;';

    // Agregar el select al contenedor y luego al `controlsDiv`
    selectClassDiv.appendChild(selectClass);
    controlsDiv.appendChild(selectClassDiv);
    
    // Botón de enviar publicación
    const submitLink = document.createElement('a');
    submitLink.href = '#';
    submitLink.id = 'btn-publication';
    submitLink.style.cssText = 'padding: 10px 20px; font-size: 16px; background-color: black; color: white; border: 2px solid lime; border-radius: 20px; cursor: pointer;';
    submitLink.innerHTML = 'Publicar';

    // Agregar evento de clic
    submitLink.addEventListener('click', async function(event) {
        event.preventDefault(); // Evita que el enlace navegue a otra página
        await publicar_main_post(); // Llama a la función asíncrona
        
    });

    controlsDiv.appendChild(submitLink);
    form.appendChild(controlsDiv);

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////










    /////////////////////////////////////////////////////////////////////////
    // NUEVO: contenedor para el editor

// Reemplaza esta parte de createPublicationElements
const textareaDiv = document.createElement('div');
textareaDiv.classList.add('form-group');

const editorContainer = document.createElement('div');
editorContainer.id = 'miContenedorEditor'; // Este es el nuevo editor dinámico
editorContainer.style.cssText = 'border: 2px solid black; border-radius: 20px; width: 100%; height: 220px; margin-bottom: 10px; font-size: 18px;';
textareaDiv.appendChild(editorContainer);
form.appendChild(textareaDiv);

// Inicializa Quill después de que el contenedor está en el DOM
setTimeout(() => {
    const quill = new Quill('#miContenedorEditor', {
        theme: 'snow',
        placeholder: `${nftusername} ¿Qué quieres publicar hoy?`,
        modules: {
            toolbar: [
                
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline'],
                [{ 'color': [] }, { 'background': [] }], // <-- aquí añadimos color y fondo
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['link']

            ]
        }
    });

    window.miEditorQuill = quill;

    const MAX_CHARS = 10240;

    // Crear el contador
    const contadorElement = document.createElement('div');
    contadorElement.id = 'contadorCaracteres';
    contadorElement.style.cssText = 'text-align: right; font-size: 14px; color: gray; margin-top: 5px;';
    quill.container.parentNode.appendChild(contadorElement);

    
    const MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20MB máximo
const MAX_VIDEO_DURATION = 60; // 60 segundos máximo

const subirBtn = document.createElement('button');
subirBtn.textContent = 'Subir Foto/Video';
subirBtn.style.cssText = 'font-size: 18px; border: 2px solid lime; border-radius: 20px; width: 100%; margin: 10px 0; height: 40px; cursor: pointer;';

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
            return cidRaw;
           

    }else{
        const respuesta = await fetch('https://api.thesocks.net/subirDj/', {
            method: 'POST',
            body: formData
        });
    }   


}




async function publicar_main_post(){
   
    const loadingAnimation = document.getElementById('loadingAnimation-post-publication');
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
                           //si se pudo subir la imagem    
                           content += `<br><a href="${link_to_media}" target="_blank" rel="noopener noreferrer">Ver link adjunto</a>`;
                           link_to_media=url_ipsf;
                           

                    }else{
                           //no se pudo subir la imagen
                           console.log("No se pudo subir la imagen a IPSF"); 
                    }

                    
            } else {
                    url_ipsf = await subirArchivoAlServidorYRetornarURL();
                    console.log("No se ha seleccionado ningún archivo.");
            }
          
   
             
           
            
           
            const jsonMetadata = {
                    media: link_to_media,
                    privacidad: document.getElementById('filter-privacidad').value,
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
                    } catch (error) {
                        showError("Sin confirmar: Publicado Main Post.", error);
                        return; // ❌ No seguir si falló
                    }
                           

            } 

               
            //const recent_publication = document.getElementById('recent-home-publications-container');
                 
            

            loadingAnimation.style.borderLeftColor = 'lime';                 
            setTimeout(() => { 
                loadingAnimation.style.display = 'none';
            }, 10000);

            console.log('iniciamos get_ultima_publication.'); 
            await get_ultima_publication('recent-home-publications-container'); 
            console.log('regresamoss get_ultima_publication.'); 

           //$('#myModal_publication').on('hidden.bs.modal', function () {
    //$('.modal-backdrop').remove();
    //$('body').removeClass('modal-open');
//});
           $('#myModal_publication').modal('hide');


           

    } catch (error) {
          
          // Cambia el color de la animación a rojo y lo mantiene 2 segundos
          loadingAnimation.style.borderLeftColor = 'red';                 
          setTimeout(() => { 
              loadingAnimation.style.display = 'none';
          }, 2000);
          
          showError("Sin confirmar:Publicado Main Post.",error);
          
    }
}






let currentIndex = null;
let total_publication = null;
async function get_all_publications_home(containerID, append = false) {
    try {
        const container = document.getElementById(containerID);

        if (!append) {
            container.innerHTML = '';

            // Obtener total de publicaciones
            if (publisherContract.methods) {
                total_publication = await publisherContract.methods.publicationCount().call();
            } else {
                total_publication = await publisherContract.publicationCount();
            }

            currentIndex = total_publication;
        }

        let count = 0;
        let i = currentIndex;

        while (count < 5 && i >= 1) {
            let type_publication = await get_publication(i, containerID);

            if (type_publication !== 3) {
                count++;
            }

            i--;
        }

        currentIndex = i;

        // Si ya no hay más publicaciones, ocultar el botón
        if (currentIndex < 1) {
            document.getElementById("verMasBtn").style.display = "none";
        }

    } catch (error) {
       // alert('Error al intentar get_publications_home.');
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

        currentIndex = currentIndex.toNumber();  // Solo si es BigNumber
        

       
        console.log('get_publication  valor del currentIndex si' , currentIndex);  
        
        if (currentIndex > 0) {
            await get_publication(currentIndex, containerID);
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
    await get_all_publications_home("home-publications-container");

    // Configurar el botón una vez que el DOM esté listo
    document.getElementById("verMasBtn").addEventListener("click", () => {
        get_all_publications_home("home-publications-container", true);
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
            privacidad: jsonMetadata.privacidad || 'Pública',
            clasificacion: jsonMetadata.clasificacion || 'General'
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
                principalContainer.style.backgroundColor = "white"; // Fondo blanco
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
    const { id, nftUsername, timestamp, content, media, privacidad, clasificacion, imageProfile, usernameProfile } = publication;
    const selected_username = document.getElementById('selector_NFTs').value;
    
    // ---- Creación de contenedores ----
    const publicationDiv = document.createElement('div');
    publicationDiv.classList.add('publication-container');
    publicationDiv.style.cssText = 'border: 1px solid gray; padding: 0px; border-radius: 10px; margin-bottom: 10px; width: 100%; max-width: 100%; overflow: hidden; box-sizing: border-box;';

    // ---- Fila 1: NFTUsername, Nombre, Fecha y Select ----
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('publication-header');
    headerDiv.style.cssText = 'display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;';
    


    const profileImageContainer = document.createElement('div');
    profileImageContainer.id = `imageContainerId_${id}`;
    profileImageContainer.style.width = "60px";
    profileImageContainer.style.height = "60px";
    profileImageContainer.style.display = "flex";
    profileImageContainer.style.justifyContent = "center";
    // Verificar si imageProfile está definido y no es una cadena vacía
    if (imageProfile) {
        const profileImage = document.createElement('img');
        profileImage.src = imageProfile;
        profileImage.alt = "Profile Image";
        profileImage.style.width = "100%";  // Para que la imagen se ajuste al contenedor
        //profileImage.style.height = "100%";
        profileImage.style.borderRadius = "50%"; // Para que la imagen sea circular
        profileImage.style.objectFit = "cover";  // Para que la imagen mantenga su aspecto

        profileImage.addEventListener("click", async function () {
                await get_NFTUsername_profile(nftUsername);
                await get_NFTUsername_publication(nftUsername,"modal_publication-nftusername");
                $('#UsernameProfileModal').modal('show');
            });

        profileImageContainer.appendChild(profileImage);

        

    }


    const userInfoDiv = document.createElement('div');
    userInfoDiv.style.cssText = `
        display: flex; 
        flex-direction: column; /* Colocar los elementos en tres filas */
        gap: 5px; /* Espacio entre los elementos */
        width: 100%; /* Asegurar que ocupe el ancho completo */
    `;

            if (usernameProfile) {
                const profileUsernameSpan = document.createElement('span');
                profileUsernameSpan.textContent = usernameProfile;
                profileUsernameSpan.style.cssText = 'font-weight: bold; font-size: 20px; margin-left: 10px;';
                userInfoDiv.appendChild(profileUsernameSpan);
            }

            const usernameSpan = document.createElement('span');
            usernameSpan.textContent = `${nftUsername}@sock`;
            usernameSpan.style.cssText = 'font-weight: bold; font-size: 18px; margin-left: 10px;';
            userInfoDiv.appendChild(usernameSpan);

            // Contenedor para justificar dateSpan a la derecha
            const dateContainer = document.createElement('div');
            dateContainer.style.cssText = `
                display: flex;
                justify-content: flex-end; /* Alinear a la derecha */
                width: 100%;
            `;

                    const dateSpan = document.createElement('span');
                    dateSpan.textContent = timestamp;
                    dateSpan.style.cssText = 'font-size: 12px; color: gray;';
            dateContainer.appendChild(dateSpan);

    // Agregar los elementos al headerDiv
    userInfoDiv.appendChild(dateContainer);

    headerDiv.appendChild(profileImageContainer);
    headerDiv.appendChild(userInfoDiv);


    if (selected_username === nftUsername) {
        const deleteIcon = document.createElement('span');
        deleteIcon.className = 'glyphicon glyphicon-trash';
        deleteIcon.style.cssText = 'cursor: pointer; font-size: 18px; color: gray; padding: 5px;';
        deleteIcon.onclick = function() {
            mostrarModal_si_no('¿Borrar publicación?', function () {
                    
                    delete_post(id); // Llama a la función para eliminar la publicación
                }, hacer_nada);
            };
                 
        // Agregarlo también a headerDiv si es necesario
        headerDiv.appendChild(deleteIcon);
    }
    


//const contentProcesado = resaltarPalabrasEspecialesHTML(content);
///mostrar el texto de la publicacion, si es corto se muestra como tal, si es largo se muestra una parte
const contentDiv = document.createElement('div');
contentDiv.style.cssText = 'margin-bottom: 0px; font-size: 16px; padding: 0px;';
    if (content && content.trim() !== '') {
            
            contentDiv.classList.add('publication-content');

            contentDiv.innerHTML = `
              <div class="rich-text short-view" style="max-height: 150px; overflow: hidden; position: relative;">
                ${content}
              </div>
              <div class="rich-text full-view" style="display: none;">
                ${content}
              </div>
              <span class="toggle-button" style="color: blue; cursor: pointer; display: inline-block; margin-top: 5px;">Mostrar más</span>
            `;

            document.body.appendChild(contentDiv); // O añádelo donde corresponda

            const shortView = contentDiv.querySelector('.short-view');
            const fullView = contentDiv.querySelector('.full-view');
            const toggleButton = contentDiv.querySelector('.toggle-button');

            // Evaluar si el contenido es más alto que el límite visible
            // Esperamos a que el DOM lo renderice primero
            setTimeout(() => {
              if (shortView.scrollHeight <= 150) {
                // Si no es más alto, no mostrar el botón
                toggleButton.style.display = 'none';
              }
            }, 0);

            // Controlador del botón
            toggleButton.addEventListener('click', () => {
              if (shortView.style.display !== 'none') {
                shortView.style.display = 'none';
                fullView.style.display = 'block';
                toggleButton.textContent = 'Mostrar menos';
              } else {
                shortView.style.display = 'block';
                fullView.style.display = 'none';
                toggleButton.textContent = 'Mostrar más';
              }
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
                const blockquote = document.createElement("blockquote");
                blockquote.className = "twitter-tweet";
                blockquote.setAttribute("data-media-max-width", "500");

                const link = document.createElement("a");
                link.href = tweetUrl;

                blockquote.appendChild(link);
                mediaDiv.appendChild(blockquote);

                // Agregar el script de Twitter para que cargue el embed
                const script = document.createElement("script");
                script.async = true;
                script.src = "https://platform.twitter.com/widgets.js";
                script.charset = "utf-8";
                document.body.appendChild(script);
            }
        }
        // Comprobamos si es una imagen
        else if (media.endsWith('.jpg') || media.endsWith('.jpeg') || media.endsWith('.png') || media.endsWith('.gif')) {
            const mediaImage = document.createElement('img');
            mediaImage.src = media;
            mediaImage.alt = 'Publicación';
            mediaImage.style.cssText = 'width: 100%; border-radius: 10px; object-fit: cover;';
            mediaDiv.appendChild(mediaImage);
        }

        else if (media.endsWith('.mp4') || media.endsWith('.webm') || media.endsWith('.ogg')) {
            const mediaVideo = document.createElement('video');
            mediaVideo.controls = true;
            mediaVideo.style.cssText = 'width: 100%; border-radius: 10px; object-fit: cover;';

            const source = document.createElement('source');
            source.src = media;

            // Determinar el tipo MIME correcto
            if (media.endsWith('.mp4')) {
                source.type = 'video/mp4';
            } else if (media.endsWith('.webm')) {
                source.type = 'video/webm';
            } else if (media.endsWith('.ogg')) {
                source.type = 'video/ogg';
            }

            mediaVideo.appendChild(source);
            mediaDiv.appendChild(mediaVideo);
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

    await getReactions(selected_username,nftUsername, id , publicationReactionDiv);

    // Agregar filas al contenedor principal
    publicationDiv.appendChild(headerDiv);
    publicationDiv.appendChild(contentDiv);
    publicationDiv.appendChild(mediaDiv);
    publicationDiv.appendChild(publicationReactionDiv);

    return publicationDiv;
}



/*
async function publicar_thread_post(){
         alert('publicar_thread_post');

        //textarea.id = 'publicacion';
        //const nftusername = document.getElementById('selector_NFTs').value;
        //mediaInput.id = 'media-publication';
        //select.id = 'filter-privacidad';
}
async function publicar_response_post(){
         alert('publicar_response_post');

        //textarea.id = 'publicacion';
        //const nftusername = document.getElementById('selector_NFTs').value;
        //mediaInput.id = 'media-publication';
        //select.id = 'filter-privacidad';
}

async function edit_post(){
         alert('edit_post');

        //textarea.id = 'publicacion';
        //const nftusername = document.getElementById('selector_NFTs').value;
        //mediaInput.id = 'media-publication';
        //select.id = 'filter-privacidad';
}
*/
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
   



  