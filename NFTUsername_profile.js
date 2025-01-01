

async function create_NFTUsername_profile(value){
	
    const loadingAnimation = document.getElementById('loadingAnimation-profile');
    loadingAnimation.style.display = 'block'; // Muestra la animación al ejecutar la
	

	try {
		    // Obtener los valores de los campos del formulario
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
		    
		    // Crear un array con los valores de los selectores
		    const preferenciasArray = [key1, key2, key3];   

		    // Crear un objeto FormData para enviar los datos y las imágenes
		    const formData = new FormData();
		    		
		    		formData.append('nombre', nombre);
		    		formData.append('bio', bio);
		    		formData.append('ubicacion', ubicacion);
		    		formData.append('paginaWeb', paginaWeb);
		    		formData.append('fotoPerfil', fotoPerfil);
		           	formData.append('fotoPortada', fotoPortada);
		     		
		     		
		    // Convertir el objeto FormData a un objeto JSON
		    const perfil = {};
		    for (let [key, value] of formData.entries()) {
		      perfil[key] = value;
		    }

		    // Convertir el objeto JSON a una cadena
		    const perfilJSON = JSON.stringify(perfil);

                      

            let dataProfile; 
            let tx;
    	    if (profileContract.methods) {
                    console.log("Con MetaMask ");                           	 
		           	      
                    if (value === 0) {// Lógica para crear un nuevo perfil
		        	     console.log("value=0 ");
		        	     dataProfile = await profileContract.methods.createProfile(nftusername, perfilJSON , preferenciasArray).send({
		          	    	from: globalWalletKey, 
		          	    	gasLimit: 1000000, 
		          	        gasPrice: web3.utils.toWei('60', 'gwei') }); 
		            }else{
		                 dataProfile = await profileContract.methods.updateProfile(nftusername,perfilJSON, preferenciasArray).send({
		          	      	 from: globalWalletKey, 
		          	       	 gasLimit: 1000000, 
		          	       	 gasPrice: web3.utils.toWei('60', 'gwei') });

		            }

            } else {
                         	console.log("Con SockWallet ");

                   	if (value === 0) {// Lógica para crear un nuevo perfil
                   	    tx = await profileContract.createProfile(nftusername,perfilJSON, preferenciasArray,{
           					gasLimit: 300000,
		            		gasPrice: ethers.utils.parseUnits('50', 'gwei')
		        		   	});
                        
                    }else{
                        tx = await profileContract.updateProfile(nftusername,perfilJSON, preferenciasArray,{
		            		gasLimit: 300000,
		              	    gasPrice: ethers.utils.parseUnits('50', 'gwei')
		        			});


                    }

  			    	console.log("Transacción enviada con SockWallet:", tx.hash);
                    // Esperar la confirmación de la transacción
                    const receipt = await tx.wait();
                    console.log("Transacción confirmada con SockWallet:", receipt);
            }
            
            loadingAnimation.style.display = 'none'; // Oculta la animación
          	$('#myModalprofile').modal('hide');  
            
            alert('Funcion create or update profile OK :');

  } catch (error) {   
  			loadingAnimation.style.display = 'none'; // Oculta la animación
    		alert('Error Create profile');
    		console.error('Error:', error.message);
    		console.error("Transaction failed:", error.reason);
  }


}







  // Función para poner los datos de un perfil
async function get_NFTUsername_profile() {
  // Obtener la dirección de la cuenta conectada
  alert('Get profile');
  const nftusername = document.getElementById('selector_NFTs').value;
  
  try {

   
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
	const nftProfileDiv = document.getElementById('nft-username-profile');
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
	profileContent.style.marginTop = '20px'; // Ajuste del espacio superior

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
	const name = document.createElement('h2');
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

	// Agregar los elementos al contenedor principal
	profileContainer.appendChild(coverImage);
	profileContainer.appendChild(profileContent);

	// Agregar el contenedor principal al DOM
	nftProfileDiv.innerHTML = ''; // Limpiar el contenido anterior
	nftProfileDiv.appendChild(profileContainer);

	// Mensajes de éxito
	alert('Funcion get profile OK:');
	showSuccess('Create profile is OK!');

  } catch (error) {
    console.error('Error al obtener el perfil:', error);
  }
}
   

  
  
    //const elementProfileCreate = document.getElementById('profile-create');
    
    //if (profileText) {
    //    elementProfileCreate.style.display = "none";
    //}
   



    /* 
    const profile = JSON.parse(profileText);

    // Actualizar los elementos del perfil con los datos obtenidos
    const profileContainer = document.querySelector('.profile-container');
    profileContainer.style.display = 'block'; // Cambiar a 'inline' si es un elemento de línea en lugar de bloque
    const profilePhoto = profileContainer.querySelector('.profile-photo');
    const profileCover = profileContainer.querySelector('.profile-cover');
    const profileName = profileContainer.querySelector('.profile-name');
    const profileBio = profileContainer.querySelector('.profile-bio');
    const profileLocation = profileContainer.querySelector('.profile-location');
    const profileWebsite = profileContainer.querySelector('.profile-website');
    const profileUsername = profileContainer.querySelector('.profile-username');


    const profileTime = profileContainer.querySelector('.profile-time');
    const followingCount = profileContainer.querySelector('.following-count');
    const followerCount = profileContainer.querySelector('.follower-count');

  


    // const profileAcount = profileContainer.querySelector('.profile-acount'); // No estás usando profileAcount
    // Obtener la lista de preferencias desde el objeto profile
    const profilePreferences = profileContainer.querySelector('.profile-preferences');
    // Parsear la cadena JSON para obtener el objeto de preferencias
    const preferencesObject = JSON.parse(profile.preferencias);
    // Obtener un array de las preferencias
    const preferenciasArray = Object.values(preferencesObject);
    // Convierte el array a una cadena separada por comas
    const preferenciasText = preferenciasArray.join(', ');
    // Actualizar el elemento en el HTML con la lista de preferencias
    profilePreferences.textContent = preferenciasText;
    // Obtén el elemento de la imagen por su ID
    const imagePerfil = document.getElementById('image-perfil');
    imagePerfil.style.display = 'block'; // Otra configuración, como 'inline-block' si es necesario
    imagePerfil.style.inline = 'inline-block'; // Otra configuración, como 'inline-block' si es necesario

  


    const imagePerfilPublication = document.getElementById('image-perfil-publication');
    imagePerfilPublication.style.display = 'block'; // Otra configuración, como 'inline-block' si es necesario

    const nftUsernamePublication = document.getElementById('nftUsername-publication');
    nftUsernamePublication.style.display = 'block'; // Otra configuración, como 'inline-block' si es necesario


    // Verifica si el perfil tiene una foto y actualiza la imagen
    if (profile.fotoPerfil) {
	    imagePerfil.src = profile.fotoPerfil;
        imagePerfil.style.inline = 'inline-block';
        imagePerfilPublication.src=profile.fotoPerfil;

        nftUsernamePublication.textContent=nftusername;


    } else {
      // Si no hay foto, puedes establecer una imagen predeterminada o hacer algo más
         imagePerfil.src = 'static/images/caw_logo_2.svg'; // Cambia esto por la ruta de tu imagen predeterminada
         imagePerfil.style.inline = 'inline-block';
         imagePerfilPublication.src = 'static/images/caw_logo_2.svg';
         nftUsernamePublication.textContent=nftusername;
    }

    profilePhoto.src = profile.fotoPerfil;
    profileCover.src = profile.fotoPortada;
    profileName.textContent = profile.nombre;
    profileBio.textContent = profile.bio;
    profileLocation.textContent = profile.ubicacion;
    profileWebsite.textContent = profile.paginaWeb;
    profileUsername.textContent = selectorNFTs + "@Xcaw";

    profileTime.textContent=profiletime;
    followingCount.textContent=following_count;
    followerCount.textContent=follower_count;
    //alert('getSmartUserPublications(listFollowingUser,followings_user);'+listFollowingUser); 
    getSmartUserPublications(listFollowingUser,"followings_user");
   
 
    alert('Funcion get profile OK :');
    showSuccess('Create profile is OK!.');
    


  } catch (error) {
   
      showSuccess('Error to create profile.');
      alert('Error get profile');
      console.error('Error:', error);
  
    
  }

}   */










async function clear_NFTUsername_profile(){

}



async function recomended_NFTUsername_profile(){

}
