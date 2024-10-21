

async function openBuyNftModal(username) {
    

   const accounts = await web3.eth.getAccounts();
   const myAddress = accounts[0];
   const contractNFT = new web3.eth.Contract(NFT_ContractABI, nftContractAddress); 

   
   try{

         const info_username = await contractNFT.methods.getNFTInfoByUsername(username).call();
         
         id_info = info_username[0];
         username_info = info_username[1];
         precio_info = info_username[4]; 
         codeHexaImage_info = info_username[6];                 
         const username_date = tiempoTranscurrido(info_username[7]);
         
         const nftUsername = document.getElementById('nft-username');
         const nftPrice = document.getElementById('nft-price');
         const nftDate = document.getElementById('nft-date');
         const nftId = document.getElementById('nft-Id');

         const image_container = document.getElementById('image-container_buy');


         await loadImagesFromHex(codeHexaImage_info, image_container, "big");


          nftId.textContent = id_info;    
          nftUsername.textContent = username_info; // Mostrar el nombre del NFT
          nftPrice.textContent = `Precio: ${precio_info} POL (Matic)`; // Mostrar el precio
          
    } catch (error){

            console.error("Error en find (images)  :", error);
         
    }


    $('#buyNftModal').modal('show'); // Abrir el modal utilizando jQuery
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
                            
                        openBuyNftModal(username);  

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






