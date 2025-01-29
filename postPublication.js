

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
    alert('publicar_main_post');

       
    
    
    try{        ////////////////////

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

    } catch (error) {
           
          alert('Error al intentar Publicar.');
          console.error('Error completo ppp:', error.code); // Mostrar el error completo para debug.
    
    }
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

