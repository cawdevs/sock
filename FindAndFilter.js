async function openBuyNftModal(username){  
               
        const accounts = await web3.eth.getAccounts();
        const myAddress = accounts[0];
        //alert('Conectado con éxito a MetaMask. Dirección de la cuenta: ' + myAddress);
            
        const contract = new web3.eth.Contract(NFT_ContractABI, nftContractAddress);
     
        const containner_info_sock = document.getElementById('info-sock-to-buy');
        containner_info_sock.innerHTML = "";   
        containner_info_sock.style.display = "flex";
        containner_info_sock.style.flexDirection = "column"; // Por defecto, para dispositivos móviles
        containner_info_sock.style.alignItems = "center"; // Centrar verticalmente en móviles
        containner_info_sock.style.marginBottom = "10px"; // Espacio entre filas
        containner_info_sock.style.border = "1px solid white"; // Borde blanco alrededor del contenedor
        containner_info_sock.style.padding = "5px"; // Espacio interno para separar el contenido del borde
        containner_info_sock.style.width = "100%"; // Ocupa todo el ancho disponible 
        
        try {
                        
            const info_username = await contract.methods.getNFTInfoByUsername(username).call();
          

             //function transferNFT(address to, string memory username)

             id_info = info_username[0];
             username_info = info_username[1];
             is_minted = info_username[2];
             forsale_info = info_username[3];
             precio_info = info_username[4];
             usernameHash_info = info_username[5];
             codeHexaImage_info = info_username[6];
             
             const username_date = tiempoTranscurrido(info_username[7]);

   


            try{
              // Crear un contenedor para la imagen
              const imageUserContainer = document.createElement("div");
                  imageUserContainer.id = `imageContainerId`; // ID único por usuario
                  imageUserContainer.style.width = "200px"; // Ancho del contenedor
                  imageUserContainer.style.height = "200px"; // Alto del contenedor
                  imageUserContainer.style.display = "flex"; // Para centrar la imagen en el contenedor
                  imageUserContainer.style.justifyContent = "center"; // Centrar horizontalmente
                  imageUserContainer.style.alignItems = "center"; // Centrar verticalmente
                  imageUserContainer.style.marginRight = "10px"; // Espacio entre imagen y nombre
                  imageUserContainer.style.border = "1px solid white"; // Borde blanco alrededor del contenedor de la imagen
                  imageUserContainer.style.padding = "5px"; // Espacio interno para separar el contenido del borde
                  
                  

              containner_info_sock.appendChild(imageUserContainer);



// Crear el contenedor principal
const infoContainer = document.createElement("div");
infoContainer.style.marginLeft = "10px"; // Margen izquierdo para el contenedor
infoContainer.style.color = "white"; // Color de texto blanco
infoContainer.classList.add("info-container"); // Clase para aplicar estilos

        // Agregar cada párrafo con contenido
        const paragraph0 = document.createElement("p");
        paragraph0.textContent = `ID: ${id_info}`;
        paragraph0.style.color = "black";
        paragraph0.style.fontSize = "18px";
        infoContainer.appendChild(paragraph0);

        const paragraph1 = document.createElement("p");
        paragraph1.textContent = `Username: ${username_info}`;
        paragraph1.style.color = "black";
        paragraph1.style.fontSize = "18px";
        infoContainer.appendChild(paragraph1);

        //const paragraph2 = document.createElement("p");
        //paragraph2.textContent = `Minteado: ${is_minted}`;
        //paragraph2.style.color = "black";
        //infoContainer.appendChild(paragraph2);

        //const paragraph3 = document.createElement("p");
        //paragraph3.textContent = `Forsale: ${forsale_info}`;
        //paragraph3.style.color = "lime";
        //infoContainer.appendChild(paragraph3);

        const paragraph4 = document.createElement("p");
        paragraph4.textContent = `Price: ${precio_info}`;
        paragraph4.style.color = "green";
        paragraph4.style.fontSize = "18px";
        infoContainer.appendChild(paragraph4);

        //const paragraph5 = document.createElement("p");
        //paragraph5.textContent = `HashUsername: ${usernameHash_info}`;
        //paragraph5.style.color = "darkgreen";
        //infoContainer.appendChild(paragraph5);

        //const paragraph6 = document.createElement("p");
        //paragraph6.textContent = `CodeHexaImage: ${codeHexaImage_info}`;
        //paragraph6.style.color = "darkgreen";
        //infoContainer.appendChild(paragraph6);

        const paragraph7 = document.createElement("p");
        paragraph7.textContent = `Date: ${username_date}`;
        paragraph7.style.color = "darkgreen";
        paragraph7.style.fontSize = "18px";
        infoContainer.appendChild(paragraph7);



        // Crear el contenedor de botones y entrada de texto
        const sellContainer = document.createElement("div");
        sellContainer.style.display = "flex";
        sellContainer.style.justifyContent = "space-around"; // Espacio entre elementos
        sellContainer.style.alignItems = "center"; // Centra los elementos verticalmente
        sellContainer.style.marginTop = "10px"; // Espacio entre el último <p> y el contenedor

                // Función para crear botones
                function createButton(text, color, onClick) {
                    const button = document.createElement("button");
                    button.textContent = text;
                    button.style.padding = "10px 20px";
                    button.style.margin = "0 5px"; // Espacio entre elementos
                    button.style.backgroundColor = color;
                    button.style.color = "white";
                    button.style.border = "none";
                    button.style.borderRadius = "20px"; // Bordes redondeados
                    button.style.cursor = "pointer";
                    button.addEventListener("click", onClick);
                    return button;
                }

                
                // Define las funciones que llamarán cada botón
                // Define las funciones que llamarán cada botón
                async function handleButtonBuyNFTUsernameClick() {
                    alert("Has clickeado el Botón 1");
                    // Obtén el valor del input
                    }

                              
               
                    const button_buy_NFTUsername = createButton("Buy NFTUsername", "green", handleButtonBuyNFTUsernameClick);
                    sellContainer.appendChild(button_buy_NFTUsername);
                
              
                

                // Agregar el contenedor de controles al infoContainer
        infoContainer.appendChild(sellContainer);


        



                           
// Agregar el contenedor al elemento principal
containner_info_sock.appendChild(infoContainer);                                                
                             
await loadImagesFromHex(codeHexaImage_info,imageUserContainer.id,"big"); // Cargar la imagen al iniciar
              


                    
              
              
               


          } catch (error){

            console.error("Error en find (images)  :", error);

           
          }


        }catch (error) {   
            
            console.error('Error:', error);
        }
    
}








function confirmPurchase() {
    // Lógica para procesar la compra
    console.log('Compra confirmada');
    // Aquí puedes agregar la lógica para realizar la compra del NFT
    $('#buyNftModal').modal('hide'); // Cerrar el modal después de confirmar
}


async function findNftWallet(value) {
  // Obtener la dirección de la cuenta conectada
  alert("Clickeaste el botón de find wallet ");
  const accounts = await web3.eth.getAccounts();
  const myAddress = accounts[0];

  const contractNFT = new web3.eth.Contract(NFT_ContractABI, nftContractAddress);

  //const contractPROFILE = new web3.eth.Contract(Profile_ContractABI, profileContractAddress);

  const addressUserNfts = document.getElementById('text-address-wallet').value;

  const selectorNFTs = document.getElementById('selector_NFTs').value;
  const nft_username_selected = selectorNFTs.replace('@CAW', '');
  

  try {
      
        
        let nftUsernames, totalNFTs,limit;

        if (value==="following"){
         
             console.log("Estás siguiendo a alguien.");
        }else if (value==="foryou"){
                 
              console.log("Contenido recomendado para ti.");

        }else if (value==="foryourand"){
           
            totalNFTs= await contractNFT.methods.getTotalMintedNFTs().call()-1;
            limit=totalNFTs;
            const randomNumbers = [];
            if( totalNFTs > 10 ){
              
              for (let i = 0; i < 10; i++) {
                   const randomNumber = Math.floor(Math.random() * limit) + 1;
                   randomNumbers.push(randomNumber);
              }

            } else{

              for (let i = 0; i < totalNFTs ; i++) {
                   const randomNumber = Math.floor(Math.random() * limit) + 1;
                   randomNumbers.push(randomNumber);
              }
            }
 
            const nftUsernames2 = [];


            for (let i = 0; i < randomNumbers.length; i++) {
                
                let index=randomNumbers[i];
                let username= await contractNFT.methods.getUsernameByTokenId(index).call();                
                nftUsernames2.push(username);
                console.log("username " + (i + 1) + ": " +username );
            }
            nftUsernames=nftUsernames2;
 
            

        }else if (value==="foryoulast"){

          totalNFTs= await contractNFT.methods.getTotalMintedNFTs().call()-1;   
          nftUsernames= await contractNFT.methods. getUsernamesInRange(0,totalNFTs).call();    
            
                 

        } else{

               // Expresión regular para verificar el formato de una dirección Ethereum
              const ethAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
              // Verificar si la dirección tiene el formato correcto
              if (ethAddressRegex.test(addressUserNfts)) {
                  // La dirección tiene el formato correcto (es una dirección Ethereum válida)
                  console.log("La dirección es válida:", addressUserNfts);
                  // Aquí puedes realizar acciones relacionadas con una dirección Ethereum válida
                  nftUsernames = await contractNFT.methods.getMintedUsernames(addressUserNfts).call();
 
              } else {

                  const isMintedNFT = await contractNFT.methods.isMinted(addressUserNfts).call();

    
                  if (isMintedNFT) {
                      // Si está minteado, crear un arreglo nftUsernames con un solo elemento
                      nftUsernames = [addressUserNfts];
                      console.log("NFT minteado:", nftUsernames);

                      // Aquí puedes realizar acciones adicionales para el caso de un NFT minteado
                  } else {
                      // Si no está minteado, puedes no hacer nada o realizar acciones adicionales según sea necesario
                      console.log("El NFT no está minteado.");                 
                      nftUsernames = [];
                      // Aquí puedes realizar acciones relacionadas con una dirección no válida
                  }
         

           
            }

        }       

        const nftUsernameList = document.getElementById('nft-username-list');

        //nftUsernameList.style.display="none";

        // Limpia el contenido actual del contenedor
        nftUsernameList.innerHTML = "";
 
        
        const listaNFTUsernames = [];
        //nftUsernames.forEach(function (username) {
    

    console.log("Lista usernames2:", nftUsernames);

    
    for (const username of nftUsernames) {

          listaNFTUsernames.push(username);
         
          try{
            
            const for_sale = await contractNFT.methods.isNFTForSale(username).call();  
            const codeHexaImage = await contractNFT.methods.getimagecodeHexaFromUsername(username).call();     
              
            //console.log("codeHexaImage:", codeHexaImage);
             
          
            // Crear un contenedor para la fila de usuario
        const userRowContainer = document.createElement("div");
        userRowContainer.style.display = "flex";
        userRowContainer.style.alignItems = "center"; // Centrar verticalmente la imagen y el nombre
        userRowContainer.style.marginBottom = "10px"; // Espacio entre filas
        userRowContainer.style.border = "1px solid white"; // Borde blanco alrededor del contenedor
        userRowContainer.style.padding = "5px"; // Espacio interno para separar el contenido del borde

              // Crear un contenedor para la imagen
              const imageUserContainer = document.createElement("div");
                  imageUserContainer.id = `imageContainerId_${username}`; // ID único por usuario
                  imageUserContainer.style.width = "80px"; // Ancho del contenedor
                  imageUserContainer.style.height = "80px"; // Alto del contenedor
                  imageUserContainer.style.display = "flex"; // Para centrar la imagen en el contenedor
                  imageUserContainer.style.justifyContent = "center"; // Centrar horizontalmente
                  imageUserContainer.style.alignItems = "center"; // Centrar verticalmente
                  imageUserContainer.style.marginRight = "10px"; // Espacio entre imagen y nombre
                  imageUserContainer.style.border = "1px solid white"; // Borde blanco alrededor del contenedor de la imagen
                  imageUserContainer.style.padding = "5px"; // Espacio interno para separar el contenido del borde
              
               userRowContainer.appendChild(imageUserContainer);
                                                            
              
              const nameButton = document.createElement("span");
                  nameButton.innerHTML = '<span style="font-size: 18px; vertical-align: middle; display: inline-block;"></span>';
                  nameButton.textContent = username;
                  nameButton.style.color = "white";
                  nameButton.classList.add("clickable-button");
                  nameButton.addEventListener("click", function () {
                      //alert("Clickeaste el botón de usuario para " + username);
                  });
                  nameButton.style.marginLeft = "10px"; // Añadir un margen izquierdo para separar los elementos
                                    
              userRowContainer.appendChild(nameButton);

                   
             

              if (for_sale){ 

                    const buyButton = document.createElement("button");
                    buyButton.textContent = "For Sale";
                    buyButton.addEventListener("click", function () {
                            
                        await openBuyNftModal(username);  

                    });
                    buyButton.style.marginLeft = "10px"; // Añadir un margen izquierdo para separar los elementos
                    buyButton.style.backgroundColor = "lime"; // Establecer el color de fondo
                    buyButton.style.color = "black"; // Establecer el color del texto
                    buyButton.style.borderRadius = "15px"; // Redondear las esquinas
                    
                    userRowContainer.appendChild(buyButton);
              }  
             
             
              nftUsernameList.appendChild(userRowContainer);
              
              await loadImagesFromHex(codeHexaImage, imageUserContainer.id); // Cargar la imagen al iniciar
              



          } catch (error){

            console.error("Error en find (images)  :", error);

           
          }


    }
              
    return listaNFTUsernames;

            

 } catch (error) {
          
        console.error("Error al buscar NFTs:", error);
               
 }



}






