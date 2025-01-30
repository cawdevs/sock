

function createPublicationElements() {
    // Obtener el nombre de usuario del selector
    const nftusername = document.getElementById('selector_NFTs').value;
   

    const container = document.getElementById('publication-post-container');
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


async function get_publication(id_publication) {
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
        document.getElementById('publications-container').appendChild(publicationElement);

        // 🔥 Ahora podemos cargar la imagen porque el elemento ya está en el DOM
        const profileImageContainerId = `imageContainerId_${publicationObject.nftUsername}`;
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
    const { nftUsername, timestamp, content, media } = publication;

    // ---- Creación de contenedores ----
    const publicationDiv = document.createElement('div');
    publicationDiv.classList.add('publication-container');
    publicationDiv.style.cssText = 'border: 1px solid gray; padding: 0px; border-radius: 10px; margin-bottom: 10px; width: 100%; max-width: 500px; overflow: hidden;';

    // ---- Fila 1: NFTUsername, Nombre, Fecha y Select ----
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('publication-header');
    headerDiv.style.cssText = 'display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;';

    const profileImageContainer = document.createElement('div');
    profileImageContainer.id = `imageContainerId_${nftUsername}`;
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

    // ---- Fila 3: Imagen de la publicación ----
    const mediaDiv = document.createElement('div');
    mediaDiv.classList.add('publication-media');

    if (media) {
        const mediaImage = document.createElement('img');
        mediaImage.src = media;
        mediaImage.alt = 'Publicación';
        mediaImage.style.cssText = 'width: 100%; border-radius: 10px; object-fit: cover;';
        mediaDiv.appendChild(mediaImage);
    }

    // Agregar filas al contenedor principal
    publicationDiv.appendChild(headerDiv);
    publicationDiv.appendChild(contentDiv);
    publicationDiv.appendChild(mediaDiv);

    return publicationDiv;
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

  NFT_Username = document.getElementById('selector_NFTs').value;
  content = document.getElementById("publicacion").value;
            const jsonMetadata = {
                    media: document.getElementById('media-publication').value,
                    privacidad: document.getElementById('filter-privacidad').value,
                    calsificacion: document.getElementById('filter-classification').value
                    
            };
            // Convertir a formato de texto (string)
            const jsonString = JSON.stringify(jsonMetadata);
            const publicationType = 0; 
            const threadOrder=0; 