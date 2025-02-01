

function createPublicationElements() {
    // Obtener el nombre de usuario del selector
    const nftusername = document.getElementById('selector_NFTs').value;
   

    const container = document.getElementById('publication-post-container');
    container.style.cssText = 'background-color:#fff;';
    container.innerHTML = '';

    const form = document.createElement('form');

    // Primera fila: Textarea de publicación
    const textareaDiv = document.createElement('div');
    textareaDiv.classList.add('form-group');
    const textarea = document.createElement('textarea');
    textarea.classList.add('form-control');
    textarea.id = 'publicacion';
    textarea.rows = '3';
    textarea.placeholder = `${nftusername} ¿Qué quieres publicar hoy?`;
    textarea.required = true;
    textarea.style.cssText = 'border: 2px solid black; border-radius: 20px; width: 100%; margin-bottom: 10px; height: 160px; font-size: 18px;';
    textareaDiv.appendChild(textarea);
    form.appendChild(textareaDiv);

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

    // Loading animation
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingAnimation-publication';
    loadingDiv.style.display = 'none';
    loadingDiv.innerHTML = '<div class="spinner"></div>';
    container.appendChild(loadingDiv);

    getImageNFTUsername("publication-NFT_image-container");

}

// Llamar la función para generar los elementos cuando sea necesario
createPublicationElements();



async function publicar_main_post(){
   
   
    try{        ////////////////////

            document.getElementById('loadingAnimation-publication').style.display = 'block';

            const selected_username = document.getElementById('selector_NFTs').value;
            const content = document.getElementById("publicacion").value;
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
                                gas: 600000, 
                                gasPrice: web3.utils.toWei('60', 'gwei') });
                            console.log('publicado Con MetaMask.');
                                                       

            } else {
                           console.log("publicado Con SockWallet ");
                            // Llamada con ethers.js
                           const tx = await publisherContract.createPublication(selected_username,content,jsonString,publicationType,publicationType,threadOrder , {
                           gasLimit: 600000,
                           gasPrice: ethers.utils.parseUnits('60', 'gwei') // Gas price en gwei
                           });

                           console.log("Transacción enviada:", tx.hash);
                           // Esperar confirmación
                           const receipt = await tx.wait();
                           console.log("Transacción confirmada:", receipt);
                           alert('Transaction ok :)');

                       } 
           document.getElementById('loadingAnimation-publication').style.display = 'none';
           

    } catch (error) {
          document.getElementById('loadingAnimation-publication').style.display = 'none';
 
          alert('Error al intentar Publicar.');
          console.error('Error completo ppp:', error.code); // Mostrar el error completo para debug.
    
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

        for (let i = 1; i <= total_publication; i++) {  // Corrección del bucle
            await get_publication(i,homecontainnerID);  // Se pasa `i` como `id_publication`
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

        // Recorrer el array de IDs y obtener cada publicación
        for (const publicationId of my_publication) {
            await get_publication(publicationId,NFTUsenmane_container);
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
        let codeHexaImage;

        if (nftUsernameContract.methods) {
            console.log("get_codehexa Con MetaMask ");
            codeHexaImage = await nftUsernameContract.methods.getimagecodeHexaFromUsername(publicationObject.nftUsername).call();
        } else {
            console.log("get_codehaxa Con SockWallet "); 
            codeHexaImage = await nftUsernameContract.getimagecodeHexaFromUsername(publicationObject.nftUsername);
        }

        await loadImagesFromHex(codeHexaImage, profileImageContainerId, "small");

    } catch (error) {
        alert('Error al intentar get_publication.');
        console.error('Error completo:', error);
    }
}



async function createPublicationElement(publication) {
    const { id, nftUsername, timestamp, content, media } = publication;

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

    const usernameSpan = document.createElement('span');
    usernameSpan.textContent = nftUsername;
    usernameSpan.style.cssText = 'font-weight: bold; font-size: 18px; margin-left: 10px;';

    const dateSpan = document.createElement('span');
    dateSpan.textContent = timestamp; 
    dateSpan.style.cssText = 'font-size: 12px; color: gray;';

    const actionSelect = document.createElement('select');
    actionSelect.innerHTML = '<option></option><option value="edit">Editar</option><option value="delete">Eliminar</option>';
    actionSelect.style.cssText = 'border: 0px solid black; border-radius: 5px; padding: 5px;';

    const userInfoDiv = document.createElement('div');
    userInfoDiv.style.cssText = 'display: flex; align-items: center;';
    userInfoDiv.appendChild(profileImageContainer);
    userInfoDiv.appendChild(usernameSpan);

    headerDiv.appendChild(userInfoDiv);
    headerDiv.appendChild(dateSpan);
    headerDiv.appendChild(actionSelect);

    // ---- Fila 2: Contenido de la publicación ----
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('publication-content');
    contentDiv.textContent = content;
    contentDiv.style.cssText = 'margin-bottom: 10px; font-size: 16px;';

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

    // Agregar filas al contenedor principal
    publicationDiv.appendChild(headerDiv);
    publicationDiv.appendChild(contentDiv);
    publicationDiv.appendChild(mediaDiv);

    return publicationDiv;
}




if (media) {
    // Comprobamos si es un video de YouTube (enlace corto)
    if (media.includes("youtube.com") && media.includes("watch")) {
        const videoId = media.split("v=")[1].split("&")[0]; // Obtener el ID del video
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
    // Comprobamos si es una URL de imagen (y puede ser de otra web)
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
} else {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'El archivo o URL no es válido.';
    errorMessage.style.cssText = 'background-color: green; color: white; padding: 10px; border-radius: 5px; text-align: center;';
    mediaDiv.appendChild(errorMessage);
}





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

async function delete_post(){
         alert('delete_post');

        //textarea.id = 'publicacion';
        //const nftusername = document.getElementById('selector_NFTs').value;
        //mediaInput.id = 'media-publication';
        //select.id = 'filter-privacidad';
}

  