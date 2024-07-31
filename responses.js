 

async function getresponses(parent_id){
	
    const responsesElement = document.getElementById('responses');
    responsesElement.innerHTML = '';

    const accounts = await web3.eth.getAccounts();
    const myAddress = accounts[0];

    const selectorNFTs = document.getElementById('selector_NFTs').value;
    const nftusername_sender = selectorNFTs.replace('@CAW', '');


    const contractPUBLICATION = new web3.eth.Contract(Publisher_ContractABI, publisherContractAddress);
    const arrayindexresponses = await contractPUBLICATION.methods.getResponsesToPublication(parent_id).call();


    const contractPROFILE = new web3.eth.Contract(Profile_ContractABI, profileContractAddress);


for (let i = 0; i < arrayindexresponses.length; i++) {
     const currentIndex = arrayindexresponses[i];

     //obtiene la respuesta  
     const result = await contractPUBLICATION.methods.getIndexPublication(currentIndex).call();
     //alert('Responsesd' + result[0]+ result[1]+ result[2]+ result[3]+result[4]+result[5]); 
    

   //obtiene nombre y foto de perfil del usuario que respondio  
     const profileText = await contractPROFILE.methods.getProfile(result[0]).call();
     const profile = JSON.parse(profileText);
     profile_picture_publication=profile.fotoPerfil;
     profile_name=profile.nombre;

     //alert('Profile' +profile_name +"  " + profile_name ); 

     //alert('getSmartUserPublications(nftusername,"user");' + user+profile.nombre); 
     
    

      
      //Convierte la cadena JSON a un objeto JavaScript
      let linkToMedia; 
      let filterPrivacidad;
                  
       let jsonMetadata;
       try{      
        jsonMetadata = JSON.parse(result[3]);
        linkToMedia = jsonMetadata.linkToMedia;
        filterPrivacidad = jsonMetadata.filterPrivacidad;
      }catch{
         linkToMedia = '';
         filterPrivacidad = '';
      }
       
      

      const publication_username =result[0];
      const publication_ID =result[1];
      const content_publication = result[2];      
      const timestamp = result[4];
      const publication_Type=result[5];

      const publication_date = tiempoTranscurrido(timestamp);                                                  

     //alert('Publication:g '+ publication_Type);
      //alert('Publication:g '+publication_ID+ publication_username+content_publication+ timestamp+filterPrivacidad+linkToMedia);
            
      const userPublicationGroup = document.createElement('div');
      userPublicationGroup.style.background="white";
      userPublicationGroup.classList.add('user-publication-group');
      userPublicationGroup.addEventListener('click', () => {
        // Acción al hacer clic en la publicación completa
        // Por ejemplo, ver más detalles o redireccionar a una página
      });
      userPublicationGroup.style.width = '100%'; // Ocupar el ancho completo del contenedor principal
      userPublicationGroup.style.border = '2px solid #ccc'; // Ejemplo de borde para mostrar el contenedor
      userPublicationGroup.style.display= "inline-block";
      userPublicationGroup.style.marginTop = '10px';
      userPublicationGroup.style.borderRadius="20px"
      
       const userPublicationId = document.createElement('div');
       userPublicationId.classList.add('user-publication-id');
       userPublicationId.innerHTML = `ID: ${publication_ID}`;
       userPublicationId.style.display= "inline-block";


       const imageLink = document.createElement('a');
       imageLink.href = 'URL_DE_DESTINO'; // Coloca la URL a la que quieres redirigir al hacer clic en la imagen


       const roundImage = document.createElement('img');
       roundImage.src = profile_picture_publication; // Inserta la URL de la imagen que deseas mostrar
       roundImage.style.borderRadius = '50%'; // Para crear una imagen redonda
       roundImage.style.width = '60px'; // Establece el ancho de la imagen
       roundImage.style.height = '60px'; // Establece la altura de la imagen
       roundImage.style.marginRight = '15px'; // Añade margen derecho
       roundImage.style.marginLeft = '0px';
       roundImage.style.display= "inline-block";
       roundImage.style.marginTop= "10px";
       roundImage.style.marginBottom= "20px";
       // Agrega la imagen redonda al enlace
       imageLink.appendChild(roundImage);

      // Agrega el enlace con la imagen redonda al contenedor 'userPublicationId'
      

      const usernamePublication = document.createElement('div');
      usernamePublication.classList.add('user-publication-id');
      usernamePublication.innerHTML = profile_name;
      usernamePublication.style.marginRight = '15px'; // Añade margen derecho
      usernamePublication.style.fontSize = '1.5em'; // Tamaño de letra más grande
      usernamePublication.style.display= "inline-block";

      
      const nftusernamePublication = document.createElement('div');
      nftusernamePublication.classList.add('user-publication-id');
      nftusernamePublication.innerHTML ="@"+publication_username;
      nftusernamePublication.style.marginRight = '15px'; // Añade margen derecho
      nftusernamePublication.style.display= "inline-block";


      const userPublicationDate = document.createElement('div');
      userPublicationDate.classList.add('user-publication-id');
      userPublicationDate.innerHTML =publication_date;
      userPublicationDate.style.display= "inline-block";
   
  
      

const userPublication = document.createElement('div');
userPublication.classList.add('user-publication');
userPublication.style.width = '100%'; // Ocupar el ancho completo del contenedor principal
userPublication.style.fontSize = '1.2em'; // Tamaño de letra más grande
userPublication.style.marginBottom = "20px";
userPublication.style.wordWrap = 'break-word'; // Envolver el texto si es demasiado largo
userPublication.style.whiteSpace = 'pre-line'; // Mantener los saltos de línea del texto original  

const words = content_publication.split(/(P\S+|r\S+|\s+)/); // Divide el contenido


words.forEach(word => {
  const span = document.createElement('span');

  if (word.startsWith('@')) {
    span.style.color = 'blue'; // Colorear las palabras que comienzan con @
    span.innerText = word;
    span.style.fontWeight = 'bold'; // Hacer la letra más gruesa (negrita)
    span.addEventListener('click', () => {
      // Acción al hacer clic en una palabra que comienza con @
    });
  } else if (word.startsWith('#')) {
    span.style.color = 'green'; // Colorear las palabras que comienzan con #
    span.style.fontWeight = 'bold'; // Hacer la letra más gruesa (negrita)
    span.innerText = word;
    span.addEventListener('click', () => {
      // Acción al hacer clic en una palabra que comienza con #
    });
  } else if (word === ' ') {
    // Preserva el espacio entre las palabras
    span.innerHTML = '&nbsp;';
  } else {
    span.innerText = word;
  }

  userPublication.appendChild(span);
});
    

      const userPublicationImage = document.createElement('img');
      userPublicationImage.classList.add('user-publication-image');
      userPublicationImage.src = linkToMedia;
      userPublicationImage.style.borderRadius = '15px'; // Redondear las esquinas
      userPublicationImage.style.width = '100%'; // Expandir la imagen al ancho del contenedor
     
      // ... Crear y configurar otros elementos para mostrar la información
    
      

      // Agregar todos los elementos al contenedor de la publicación
      //userPublicationGroup.appendChild(userPublicationId);
      userPublicationGroup.appendChild(imageLink);
      userPublicationGroup.appendChild(usernamePublication);
      userPublicationGroup.appendChild(nftusernamePublication);
      userPublicationGroup.appendChild(userPublicationDate);  

      userPublicationGroup.appendChild(userPublication);
      userPublicationGroup.appendChild(userPublicationImage);
      

      // Agregar la publicación al contenedor principal
      //if (publication_Type==="0"){
      responsesElement.appendChild(userPublicationGroup);
      //}
      // Agregar espacio entre publicaciones
     responsesElement.appendChild(document.createElement('br'));

   	// Tu lógica para trabajar con currentIndex aquí
	   	console.log(`Procesando índice ${currentIndex}`);
}



      
 




}