

function createPublicationElements() {
    // Obtener el nombre de usuario del selector
    const nftusername = document.getElementById('selector_NFTs').value;
   

    const container = document.getElementById('publication-post-container');
    container.style.cssText = 'background-color:#fff;';
    container.style.width = '100%';
    container.style.borderRadius = '20px';
    container.innerHTML = '';
    
    const form = document.createElement('form');

    /////////////////////////////////////////////////////////////////////////
    // NUEVO: contenedor para el editor

// Reemplaza esta parte de createPublicationElements
const textareaDiv = document.createElement('div');
textareaDiv.classList.add('form-group');

const editorContainer = document.createElement('div');
editorContainer.id = 'miContenedorEditor'; // Este es el nuevo editor dinámico
editorContainer.style.cssText = 'border: 2px solid black; border-radius: 20px; width: 100%; height: 160px; margin-bottom: 10px; font-size: 18px;';
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
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['link']
            ]
        }
    });

    window.miEditorQuill = quill;

    const MAX_CHARS = 512;

    // Crear el contador
    const contadorElement = document.createElement('div');
    contadorElement.id = 'contadorCaracteres';
    contadorElement.style.cssText = 'text-align: right; font-size: 14px; color: gray; margin-top: 5px;';
    quill.container.parentNode.appendChild(contadorElement);

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
    mediaInput.placeholder = 'Link to media publication';
    mediaInput.style.cssText = 'border: 2px solid black; border-radius: 20px; width: 100%; margin-bottom: 10px; height: 40px; width: 100%;';
    mediaInputDiv.appendChild(mediaInput);
    form.appendChild(mediaInputDiv);

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

    container.appendChild(form);    

    getImageNFTUsername("publication-NFT_image-container");

}






async function publicar_main_post(){
   
   
    try{        ////////////////////

           

            const loadingAnimation = document.getElementById('loadingAnimation-post-publication');
            loadingAnimation.style.display = 'block'; // Muestra la animación al ejecutar la función
           

            const selected_username = document.getElementById('selector_NFTs').value;
//////////            const content = document.getElementById("publicacion").value;
            const content = window.miEditorQuill.root.innerHTML;
            const jsonMetadata = {
                    media: document.getElementById('media-publication').value,
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
                           console.log("publicado Con SockWallet ");
                            // Llamada con ethers.js

                           const adjustedGasPrice = obtenerGasAjustado();
                
                           const estimatedGas = await publisherContract.estimateGas.createPublication(selected_username,content,jsonString,publicationType,publicationType,threadOrder);
                           const adjustedGasLimit = estimatedGas.mul(110).div(100); // Aumenta en 10%  
                           
                           const tx = await publisherContract.createPublication(selected_username,content,jsonString,publicationType,publicationType,threadOrder , {
                            gasLimit: adjustedGasLimit,
                            gasPrice: adjustedGasPrice, // Gas Price en Gwei
                           });

                           console.log("Transacción enviada:", tx.hash);
                           // Esperar confirmación
                           tx.wait().then(receipt => {
                               showSuccess("Confirmado: Publicado Main Post", receipt);
                           }).catch(error => {
                               showError("Sin confirmar:Publicado Main Post.",error);
                           });

                       } 

            loadingAnimation.style.borderLeftColor = 'lime';                 
            setTimeout(() => { 
                loadingAnimation.style.display = 'none';
            }, 2000);


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




async function get_all_publications_home(homecontainnerID) {

    try {

        document.getElementById(homecontainnerID).innerHTML = '';

        let total_publication;

        if (publisherContract.methods) {
            console.log("get_publication Con MetaMask");
            total_publication = await publisherContract.methods.publicationCount().call();
        } else {
            console.log("get_publication Con SockWallet");
            total_publication = await publisherContract.publicationCount();
        }
       
       // Definir el inicio y el fin del bucle
        const start = total_publication;  
        let count = 0; // Contador de publicaciones válidas
        let i = start;

        while (count < 5 && i >= 1) {  
            let type_publication = await get_publication(i, homecontainnerID);
            
            if (type_publication !== 3) { 
                count++; // Solo contar publicaciones válidas
            } 

            i--; // Continuar iterando hacia atrás
        }

    } catch (error) {
        alert('Error al intentar get_publications_home.');
        console.error('Error completo:', error);
    }
}






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


function resaltarPalabrasEspeciales(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    function procesarNodo(nodo) {
        if (nodo.nodeType === Node.TEXT_NODE) {
            const texto = nodo.nodeValue;
            const nuevoHTML = texto
                .replace(/@(\w+)/g, `<span style="color: #2196F3;">@$1</span>`)
                .replace(/#(\w+)/g, `<span style="color: #4CAF50;">#$1</span>`)
                .replace(/\$(\w+)/g, `<span style="color: #FF9800;">\$$1</span>`);

            if (nuevoHTML !== texto) {
                const temp = document.createElement('span');
                temp.innerHTML = nuevoHTML;

                const parent = nodo.parentNode;
                while (temp.firstChild) {
                    parent.insertBefore(temp.firstChild, nodo);
                }
                parent.removeChild(nodo);
            }
        } else if (nodo.nodeType === Node.ELEMENT_NODE) {
            for (let i = nodo.childNodes.length - 1; i >= 0; i--) {
                procesarNodo(nodo.childNodes[i]);
            }
        }
    }

    // Procesar el body del documento HTML generado
    procesarNodo(doc.body);

    return doc.body.innerHTML;
}


async function createPublicationElement(publication) {
    const { id, nftUsername, timestamp, content, media, privacidad, clasificacion, imageProfile, usernameProfile } = publication;
    const selected_username = document.getElementById('selector_NFTs').value;
    
    // ---- Creación de contenedores ----
    const publicationDiv = document.createElement('div');
    publicationDiv.classList.add('publication-container');
    publicationDiv.style.cssText = 'border: 1px solid gray; padding: 0px; border-radius: 10px; margin-bottom: 10px; width: 100%; max-width: 500px; overflow: hidden;';

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
    





// ---- Fila 2: Contenido de la publicación ----

const contentDiv = document.createElement('div');
contentDiv.classList.add('publication-content');

// Procesamos el contenido para resaltar palabras
const processedContent = resaltarPalabrasEspeciales(content);

// Insertamos el contenido procesado en el div
contentDiv.innerHTML = processedContent;





      
    contentDiv.style.cssText = 'margin-bottom: 10px; font-size: 16px; padding: 10px;';

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
                const iframe = document.createElement('iframe');
                iframe.width = '560';
                iframe.height = '315';
                iframe.src = `https://www.youtube.com/embed/${videoId}`;
                iframe.title = 'YouTube video';
                iframe.frameBorder = '0';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                iframe.allowFullscreen = true;
                mediaDiv.appendChild(iframe);
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
                const errorMessage = document.createElement('div');
                errorMessage.textContent = 'El archivo o URL no es válido.';
                errorMessage.style.cssText = 'background-color: green; color: white; padding: 10px; border-radius: 5px; text-align: center;';
                mediaDiv.appendChild(errorMessage);
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
   



  