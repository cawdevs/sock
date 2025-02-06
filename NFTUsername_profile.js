


async function create_NFTUsername_profile(value) {
    const loadingAnimation = document.getElementById('loadingAnimation-profile');
    loadingAnimation.style.display = 'block'; // Mostrar la animación de carga.

    try {
        // Obtener los valores del formulario.
        const nftusername = document.getElementById('selector_NFTs').value;
        const nombre = document.getElementById('nombre').value;
        const bio = document.getElementById('bio').value;
        const ubicacion = document.getElementById('ubicacion').value;
        const paginaWeb = document.getElementById('pagina-web').value;
        const fotoPerfil = document.getElementById('foto-perfil').value;
        const fotoPortada = document.getElementById('foto-portada').value;
        const key1 = document.getElementById('selector_key1').value;
        const key2 = document.getElementById('selector_key2').value;
        const key3 = document.getElementById('selector_key3').value;

        const preferenciasArray = [key1, key2, key3];
        const perfilJSON = JSON.stringify({ nombre, bio, ubicacion, paginaWeb, fotoPerfil, fotoPortada });

        let dataProfile, tx;
        let estimatedGas,gasLimitWithExtra;

        console.log("nftusername", nftusername );
         console.log("perfilJSON", perfilJSON );
          console.log("preferenciasArray", preferenciasArray);
        
         console.log("nftUsernameContract", nftUsernameContract);
        let isMintedNFT;
        let isOwner;
    if (nftUsernameContract.methods) {
                 console.log("Con MetaMask ");
                 // Usando web3.js
                 isMintedNFT = await nftUsernameContract.methods.isMinted(nftusername).call();
                 isOwner     = await nftUsernameContract.methods.getNFTOwner(nftusername).call();
    } else {
                 // Usando ethers.js
                console.log("Con SockWallet "); 
                isMintedNFT = await nftUsernameContract.isMinted(nftusername); 
                isOwner     = await nftUsernameContract.getNFTOwner(nftusername);
    }

     console.log("isMintedNFT", isMintedNFT);
     console.log("isOwner", isOwner);


        if (profileContract.methods) {
            console.log("Con MetaMask");

            if (value === 0) {
                console.log("Creando nuevo perfil...");
                dataProfile = await profileContract.methods.createProfile(nftusername, perfilJSON, preferenciasArray).send({
                    from: globalWalletKey,
                });
            } else {
                console.log("Actualizando perfil...");
                dataProfile = await profileContract.methods.updateProfile(nftusername, perfilJSON, preferenciasArray).send({
                    from: globalWalletKey,                   
                });
            }
        } else {
            console.log("Con SockWallet");



            // Obtener la tarifa de gas base desde la red
            const adjustedGasPrice = obtenerGasAjustado();
            


            
            if (value === 0) {
                console.log("Creando nuevo perfil...");
                estimatedGas = await profileContract.estimateGas.createProfile(nftusername, perfilJSON, preferenciasArray);
                adjustedGasLimit = estimatedGas.mul(110).div(100); // Aumenta en 10%

                tx = await profileContract.createProfile(nftusername, perfilJSON, preferenciasArray, {
                    gasLimit: adjustedGasLimit,
                    gasPrice: adjustedGasPrice
                });
            } else {


                console.log("Actualizando perfil...");
                estimatedGas = await profileContract.estimateGas.updateProfile(nftusername, perfilJSON, preferenciasArray);
                adjustedGasLimit = estimatedGas.mul(110).div(100); // Aumenta en 10%

                tx = await profileContract.updateProfile(nftusername, perfilJSON, preferenciasArray, {
                    gasLimit: adjustedGasLimit,
                    gasPrice: adjustedGasPrice
                });
            }

            console.log("Transacción enviada con SockWallet:", tx.hash);
            await tx.wait(); // Confirmar la transacción.
            //console.log("Transacción confirmada con SockWallet:", receipt);
        }

        loadingAnimation.style.display = 'none';
        $('#myModalprofile').modal('hide');
        alert('Perfil creado o actualizado correctamente.');

    } catch (error) {
        loadingAnimation.style.display = 'none'; // Ocultar la animación.
        alert('Error al crear o actualizar el perfil.');
        console.error('Error completo ccc:', error); // Mostrar el error completo para debug.
    }
}







  // Función para poner los datos de un perfil
async function get_NFTUsername_profile(nftusername = undefined) {
  // Obtener la dirección de la cuenta conectada
  //alert('Get profile');


 
  
  try {
    let nftProfileDiv;
  	if (nftusername) {
            console.log("NFTUsername proporcionado:", nftusername);
            nftProfileDiv = document.getElementById('modal_nft-username-profile');

            // Lógica cuando se proporciona el nftusername
  } else {
            console.log("No se proporcionó NFTUsername, usando lógica alternativa.");
            nftusername = document.getElementById('selector_NFTs').value;
            nftProfileDiv = document.getElementById('nft-username-profile');
            // Lógica cuando no se proporciona el nftusername
  }
  

   
    let profileText;
    if (profileContract.methods) {
            console.log("Con MetaMask ");                           	 
		    profileText =await profileContract.methods.getProfileByUsername(nftusername).call();  	       
                 
    } else {
            console.log("Con SOCKWALLET ");
            profileText =await profileContract.getProfileByUsername(nftusername);  	       
            
    }	
    

    console.log("profileTex:", profileText );

    // Extraer los datos
	const nftUsername = profileText[0];
	const jsonProfile = JSON.parse(profileText[1]);
	const tags = profileText[2];
	const timestamp = profileText[3];

	const { nombre, bio, ubicacion, paginaWeb, fotoPerfil, fotoPortada } = jsonProfile;

	// Obtener el contenedor del perfil
	//const nftProfileDiv = document.getElementById('nft-username-profile');
	if (!nftProfileDiv) {
	    alert("Error: No se encontró el contenedor con id 'nft-username-profile'");
	    return;
	}

	// Crear el contenedor principal del perfil
	const profileContainer = document.createElement('div');
	profileContainer.style.width = '100%';
	profileContainer.style.maxWidth = '500px';
	profileContainer.style.margin = '0 auto';
	profileContainer.style.border = '1px solid #ddd';
	profileContainer.style.borderRadius = '8px';
	profileContainer.style.overflow = 'hidden';
	profileContainer.style.backgroundColor = '#fff';

	// Crear la imagen de portada
	const coverImage = document.createElement('img');
	coverImage.src = fotoPortada || ''; // Asegurarse de que `fotoPortada` esté definido
	coverImage.style.width = '100%';
	coverImage.style.height = '200px';
	coverImage.style.objectFit = 'cover';

	// Crear el contenido del perfil
	const profileContent = document.createElement('div');
	profileContent.style.padding = '20px';
	profileContent.style.marginTop = '10px'; // Ajuste del espacio superior

	// Crear el encabezado del perfil
	const profileHeader = document.createElement('div');
	profileHeader.style.display = 'flex';
	profileHeader.style.alignItems = 'center';
	profileHeader.style.gap = '15px'; // Espaciado entre la imagen y el texto

	// Crear el contenedor para la imagen de perfil
	const profileImageContainer = document.createElement('div');
	profileImageContainer.style.borderRadius = '50%';
	profileImageContainer.style.overflow = 'hidden';
	profileImageContainer.style.border = '4px solid white';
	profileImageContainer.style.width = '80px';
	profileImageContainer.style.height = '80px';
	profileImageContainer.style.flexShrink = '0';

	// Crear la imagen de perfil
	const profileImage = document.createElement('img');
	profileImage.src = fotoPerfil || ''; // Asegurarse de que `fotoPerfil` esté definido
	profileImage.style.width = '100%';
	profileImage.style.height = '100%';
	profileImage.style.objectFit = 'cover';

	// Agregar la imagen de perfil al contenedor
	profileImageContainer.appendChild(profileImage);

	// Crear el contenedor de texto (nombre y biografía)
	const textContainer = document.createElement('div');

	// Nombre
	const name = document.createElement('h3');
	name.innerText = nombre || 'Sin nombre'; // Valor por defecto
	name.style.margin = '0';
	textContainer.appendChild(name);

	// Biografía
	const biography = document.createElement('p');
	biography.innerText = bio || 'Sin biografía'; // Valor por defecto
	biography.style.margin = '0';
	textContainer.appendChild(biography);

	// Agregar imagen y texto al encabezado
	profileHeader.appendChild(profileImageContainer);
	profileHeader.appendChild(textContainer);

	// Agregar el encabezado al contenido del perfil
	profileContent.appendChild(profileHeader);

	// Agregar los elementos adicionales al contenido del perfil
	const location = document.createElement('p');
	location.innerText = `Ubicación: ${ubicacion || 'No especificada'}`;
	location.style.marginTop = '10px'; // Ajuste del espacio superior
	
	profileContent.appendChild(location);

	const website = document.createElement('a');
	website.href = paginaWeb || '#';
	website.target = '_blank';
	website.innerText = 'Visitar Página Web';
	website.style.display = 'block';
	website.style.marginBottom = '10px';
	profileContent.appendChild(website);

	// Crear y agregar las etiquetas
	const tagContainer = document.createElement('div');
	tagContainer.style.display = 'flex';
	tagContainer.style.flexWrap = 'wrap';
	(tags || []).forEach(tag => {
	    const tagElement = document.createElement('span');
	    tagElement.innerText = `#${tag}`;
	    tagElement.style.marginRight = '10px';
	    tagElement.style.fontWeight = 'bold';
	    tagElement.style.color = '#007BFF';
	    tagContainer.appendChild(tagElement);
	});
	profileContent.appendChild(tagContainer);

	// Agregar el timestamp
	const timestampElement = document.createElement('p');
	timestampElement.innerText = `Creado en: ${new Date(timestamp * 1000).toLocaleString()}`;
	profileContent.appendChild(timestampElement);

    /////obtiene seguidores y seguidos
    const cont_follow = await count_follow_username(nftusername);

    if (cont_follow) {
    const followingCount = cont_follow.following_count;
    const followerCount = cont_follow.follower_count;

    // Crear un contenedor para la fila
    const rowElement = document.createElement('div');
    rowElement.style.display = 'flex'; // Usar flexbox para alinear elementos
    rowElement.style.justifyContent = 'center'; // Centrar los elementos
    rowElement.style.gap = '20px'; // Separar los elementos
    rowElement.style.marginTop = '10px'; // Espaciado superior opcional

    // Crear el elemento para "Siguiendo"
    const followingElement = document.createElement('p');
    followingElement.innerText = `Siguiendo: ${followingCount}`;
    followingElement.style.margin = '0'; // Quitar márgenes por defecto
    followingElement.style.textAlign = 'center';

    // Crear el elemento para "Seguidores"
    const followerElement = document.createElement('p');
    followerElement.innerText = `Seguidores: ${followerCount}`;
    followerElement.style.margin = '0'; // Quitar márgenes por defecto
    followerElement.style.textAlign = 'center';

    // Agregar los elementos al contenedor
    rowElement.appendChild(followingElement);
    rowElement.appendChild(followerElement);

    // Agregar el contenedor al contenido del perfil
    profileContent.appendChild(rowElement);
    }




	// Agregar los elementos al contenedor principal
	profileContainer.appendChild(coverImage);
	profileContainer.appendChild(profileContent);

	// Agregar el contenedor principal al DOM
	nftProfileDiv.innerHTML = ''; // Limpiar el contenido anterior
	nftProfileDiv.appendChild(profileContainer);








	// Mensajes de éxito
	//alert('Funcion get profile OK:');
	showSuccess('Create profile is OK!');

  } catch (error) {
    console.error('Error al obtener el perfil:', error);
  }
}
   
async function restore_button_update() {
	// Obtener el botón por su ID o clase
    const button = document.getElementById('btn-create-profile');
    // Cambiar el texto del botón
    button.textContent = 'Create Profile';
    // Cambiar el atributo onclick para llamar a la función con el valor deseado
    button.setAttribute('onclick', 'create_NFTUsername_profile(0)');

    document.getElementById('nombre').value = '';
    document.getElementById('bio').value = '';
    document.getElementById('ubicacion').value = '';
    document.getElementById('pagina-web').value = '';
    document.getElementById('foto-perfil').value = '';
    document.getElementById('foto-portada').value = '';

}




async function loadProfile() {

    //alert('Get profile');
    
     // Obtener el botón por su ID o clase
    const button = document.getElementById('btn-create-profile');
    // Cambiar el texto del botón
    button.textContent = 'Update Profile';
    // Cambiar el atributo onclick para llamar a la función con el valor deseado
    button.setAttribute('onclick', 'create_NFTUsername_profile(1)');

    // Obtener el nombre de usuario del selector
    const nftusername = document.getElementById('selector_NFTs').value;

    try {
        let profileText;

        // Determinar el método de obtención de datos según el tipo de wallet
        if (profileContract.methods) {
            console.log("Con MetaMask");
            profileText = await profileContract.methods.getProfileByUsername(nftusername).call();
        } else {
            console.log("Con SOCKWALLET");
            profileText = await profileContract.getProfileByUsername(nftusername);
        }

        console.log("profileText:", profileText);

        // Validar que el perfil fue obtenido correctamente
        if (!profileText || profileText.length < 4) {
            throw new Error("El perfil no contiene datos suficientes.");
        }

        // Extraer los datos
        const nftUsername = profileText[0];
        const jsonProfile = JSON.parse(profileText[1]);
        const tags = profileText[2];
        const timestamp = profileText[3];

        // Desestructurar los datos del perfil
        const { nombre, bio, ubicacion, paginaWeb, fotoPerfil, fotoPortada, preferencias } = jsonProfile;

        // Actualizar los elementos del formulario con los datos del perfil
        document.getElementById('nombre').value = nombre || '';
        document.getElementById('bio').value = bio || '';
        document.getElementById('ubicacion').value = ubicacion || '';
        document.getElementById('pagina-web').value = paginaWeb || '';
        document.getElementById('foto-perfil').value = fotoPerfil || '';
        document.getElementById('foto-portada').value = fotoPortada || '';

        // Actualizar los selects con las preferencias (si existen)
		// Actualizar cada selector con su respectiva preferencia
		if (preferencias) {
		    const preferenciasArray = JSON.parse(preferencias);

		    // Asociar preferencias con los selectores
		    const selectors = [
		        { id: "selector_key1", value: preferenciasArray[0] },
		        { id: "selector_key2", value: preferenciasArray[1] },
		        { id: "selector_key3", value: preferenciasArray[2] }
		    ];

		    // Actualizar cada selector
		    selectors.forEach(({ id, value }) => {
		        const select = document.getElementById(id);
		        if (select) {
		            const option = Array.from(select.options).find(opt => opt.value === value);

		            if (option) {
		                select.value = value; // Setear el valor de la preferencia
		            } else {
		                console.warn(`La preferencia "${value}" no se encuentra en las opciones del selector con id "${id}".`);
		                select.selectedIndex = 0; // Fallback a la primera opción
		            }
		        } else {
		            console.error(`No se encontró el selector con id "${id}".`);
		        }
		    });
		}

        // Mostrar el modal (asumiendo que usas Bootstrap)
        $('#myModalprofile').modal('show');

        alert('Funcion update profile OK');
    } catch (error) {
        console.error('Error:', error);
        alert('Error al obtener y cargar el perfil');
    }
}
  

async function clear_NFTUsername_profile(){

  const nftusername = document.getElementById('selector_NFTs').value;
  
  try {   
		    
		    if (profileContract.methods) {
		            console.log("Con MetaMask ");                           	 
				    await profileContract.methods.deleteProfile(nftusername).call();  	       
		                 
		    } else {
		            console.log("Con SOCKWALLET ");
		            await profileContract.deleteProfile(nftusername);  	       
		            
		    }

		    alert('Perfil eliminado');
    		
  } catch (error) {   
  			console.error('Error al borrar perfil:', error.message);
    		
  }	






}


