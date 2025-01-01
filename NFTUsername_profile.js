

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

            console.log("Profile:", nftusername,perfilJSON, preferenciasArray );


            let dataProfile; 
            let tx;
    	    if (profileContract.methods) {
                    console.log("Con MetaMask ");                           	 
		           	      
                    if (value === 0) {// Lógica para crear un nuevo perfil
		        	    dataProfile = await profileContract.methods.createProfile("ernesto", "{neto:hola,mario:tener}",["1","2","3"]).send({
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
    		//console.error('Error:', error.message);
    		console.error("Transaction failed:", error.reason);
  }


}







  // Función para poner los datos de un perfil
async function get_NFTUsername_profile() {
  // Obtener la dirección de la cuenta conectada
  
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
    

    console.log("profileTex:", profileTex );


  
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
   
    */
    alert('Funcion get profile OK :');
    showSuccess('Create profile is OK!.');
    


  } catch (error) {
   
      showSuccess('Error to create profile.');
      alert('Error get profile');
      console.error('Error:', error);
  
    
  }

}










async function clear_NFTUsername_profile(){

}



async function recomended_NFTUsername_profile(){

}
