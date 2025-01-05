
async function openBuyNftModal(username) {  

    console.log(`openBuyNftModal called with username: ${username}`);

    const containner_info_sock = document.getElementById('info-sock-to-buy');
    
    if (!containner_info_sock) {
        console.error("El contenedor no se encontró");
        return; // Salir si no se encuentra
    }

    containner_info_sock.innerHTML = "";   
    containner_info_sock.style.display = "flex";
    containner_info_sock.style.flexDirection = "column"; 
    containner_info_sock.style.alignItems = "center"; 
    containner_info_sock.style.marginBottom = "10px"; 
    //containner_info_sock.style.border = "1px solid white"; 
    containner_info_sock.style.padding = "5px"; 
    containner_info_sock.style.width = "100%"; 

    try {
          console.log(`try : ${username}`);
            
          let info_username; 
          if (nftUsernameContract.methods) {
              console.log("Con MetaMask ");
              info_username = await nftUsernameContract.methods.getNFTInfoByUsername(username).call();
          }else{
               console.log("Con SockWallet "); 
               info_username = await nftUsernameContract.getNFTInfoByUsername(username);
          } 
       
        // Declarar las variables
        let id_info = info_username[0];
        let username_info = info_username[1];
        let is_minted = info_username[2];
        let forsale_info = info_username[3];
        let precio_info = info_username[4];
        let usernameHash_info = info_username[5];
        let codeHexaImage_info = info_username[6];
        const username_date = tiempoTranscurrido(info_username[7]);

        console.log(`informacion :`); 
     
        // Crear contenedor para la imagen
        const imageUserContainer = document.createElement("div");
        imageUserContainer.id = `imageContainerId_buy`; 
        imageUserContainer.style.width = "200px"; 
        imageUserContainer.style.height = "200px"; 
        imageUserContainer.style.display = "flex"; 
        imageUserContainer.style.justifyContent = "center"; 
        imageUserContainer.style.alignItems = "center"; 
        imageUserContainer.style.marginRight = "10px"; 
        //imageUserContainer.style.border = "1px solid white"; 
        imageUserContainer.style.padding = "5px"; 

        containner_info_sock.appendChild(imageUserContainer);

        // Crear el contenedor principal
        const infoContainer = document.createElement("div");
        infoContainer.style.marginLeft = "10px"; 
        infoContainer.style.color = "white"; 
        infoContainer.classList.add("info-container");

        // Agregar cada párrafo con contenido

        // Convertir de wei a MATIC para mostrar al usuario
        let maticAmount;
        if (typeof tokenContract.methods !== 'undefined') {
                console.log("Con MetaMask");
                maticAmount = web3.utils.fromWei(precio_info, 'ether');
                // Lógica específica para contratos instanciados con web3.js
        } else {
                console.log("Con SockWallet.");
                maticAmount = ethers.utils.formatUnits(precio_info, 'ether');
               // Lógica específica para contratos instanciados con ethers.js
        }




        const paragraphs = [
            { text: `ID: ${id_info}`, color: "white" },
            { text: `Username: ${username_info}`, color: "white" },
            { text: `Price: ${maticAmount}`, color: "yellow" },
            { text: `Date: ${username_date}`, color: "white" }
        ];

        paragraphs.forEach(({ text, color }) => {
            const paragraph = document.createElement("p");
            paragraph.textContent = text;
            paragraph.style.color = color;
            paragraph.style.fontSize = "24px";
            infoContainer.appendChild(paragraph);
        });

        // Crear el contenedor de botones
        const sellContainer = document.createElement("div");
        sellContainer.style.display = "flex";
        sellContainer.style.justifyContent = "space-around"; 
        sellContainer.style.alignItems = "center"; 
        sellContainer.style.marginTop = "10px"; 

        function createButton(text, color, onClick) {
            const button = document.createElement("button");
            button.textContent = text;
            button.style.padding = "10px 20px";
            button.style.margin = "0 5px"; 
            button.style.backgroundColor = color;
            button.style.color = "white";
            button.style.border = "none";
            button.style.borderRadius = "20px"; 
            button.style.cursor = "pointer";
            button.addEventListener("click", onClick);
            return button;
        }

        async function handleButtonBuyNFTUsernameClick() {
            //alert("Has clickeado el Botón 1");
            // Lógica para la compra aquí
            let precio_info = info_username[4];
            
            //const maticAmount = web3.utils.toWei(precio_info, 'ether'); // 10 MATIC
       
            console.log(`Precio del NFT: ${precio_info} MATIC`);
            console.log(`Cantidad en Wei: ${maticAmount}`);

            if (nftUsernameContract.methods) {
                  console.log("Con MetaMask");
                  // Ejecutar la función mintNFT
                  await nftUsernameContract.methods.buyNFT(username).send({
                  from: globalWalletKey,
                  gas: 800000,
                  gasPrice: web3.utils.toWei('60', 'gwei'),
                  value: precio_info // Especificar el valor de 10 MATIC
                  });
               


            } else {
                console.log("Con SockWallet.");
               
                const tx = await nftUsernameContract.buyNFT(username, {
                gasLimit: 800000, // Límite de gas
                gasPrice: ethers.utils.parseUnits('60', 'gwei'), // Gas Price en Gwei
                value: precio_info // Cantidad de MATIC en Wei
                });

                // Registrar el hash de la transacción
                console.log("Transacción enviada:", tx.hash);

                // Esperar la confirmación de la transacción
                const receipt = await tx.wait();
                console.log("Transacción confirmada:", receipt);
                alert('Transaction ok :)');
                
        }            

        }

        const button_buy_NFTUsername = createButton("Buy NFTUsername", "green", handleButtonBuyNFTUsernameClick);
        sellContainer.appendChild(button_buy_NFTUsername);

        // Agregar el contenedor de controles al infoContainer
        infoContainer.appendChild(sellContainer);


        containner_info_sock.appendChild(infoContainer);                                                

        await loadImagesFromHex(codeHexaImage_info, imageUserContainer.id, "big");
                                                    

    } catch (error) {
        console.error("Error al obtener información del NFT:", error);
    }
}









//    // Lógica para procesar la compra
//    console.log('Compra confirmada');
    // Aquí puedes agregar la lógica para realizar la compra del NFT
//    $('#buyNftModal').modal('hide'); // Cerrar el modal después de confirmar
//}

async function findNftWallet(value) {
  // Obtener la dirección de la cuenta conectada
  //alert("Clickeaste el botón de find wallet ");
  //const accounts = await web3.eth.getAccounts();
  //const myAddress = accounts[0];
  //const contractNFT = new web3.eth.Contract(NFT_ContractABI, nftContractAddress);

  //const contractPROFILE = new web3.eth.Contract(Profile_ContractABI, profileContractAddress);

  const addressUserNfts = document.getElementById('text-address-wallet').value;

  const selectorNFTs = document.getElementById('selector_NFTs').value;
  const nft_username_selected = selectorNFTs.replace('@CAW', '');
  

  try {
      
        
        let nftUsernames, totalNFTs,limit;
        
        if (nftUsernameContract.methods) {
                console.log("Con MetaMask");
                totalNFTs= await nftUsernameContract.methods.getTotalMintedNFTs().call()-1;
                
                // Lógica específica para contratos instanciados con web3.js
        } else {
                console.log("Con SockWallet.");
                totalNFTs= await nftUsernameContract.getTotalMintedNFTs()-1;
                
               // Lógica específica para contratos instanciados con ethers.js
        }


        if (value==="following"){
         
             console.log("Estás siguiendo a alguien.");
        }else if (value==="foryou"){
                 
              console.log("Contenido recomendado para ti.");

        }else if (value==="foryourand"){
           
            
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
                let username;    
                if (nftUsernameContract.methods) {
                        console.log("Con MetaMask");
                        username = await nftUsernameContract.methods.getUsernameByTokenId(index).call(); 
                        
                        // Lógica específica para contratos instanciados con web3.js
                } else {
                        console.log("Con SockWallet.");
                        username = await nftUsernameContract.getUsernameByTokenId(index); 
                        
                       // Lógica específica para contratos instanciados con ethers.js
                }
                               
                nftUsernames2.push(username);
                console.log("username " + (i + 1) + ": " +username );
            }
            nftUsernames=nftUsernames2;
 
            

        }else if (value==="foryoulast"){

                    
                if (nftUsernameContract.methods) {
                        console.log("Con MetaMask");
                        nftUsernames= await nftUsernameContract.methods.getUsernamesInRange(0,totalNFTs).call();    
          
                        // Lógica específica para contratos instanciados con web3.js
                } else {
                        console.log("Con SockWallet.");
                        nftUsernames= await nftUsernameContract.getUsernamesInRange(0,totalNFTs);    
          
                       // Lógica específica para contratos instanciados con ethers.js
                }   
            
                 

        } else{

               // Expresión regular para verificar el formato de una dirección Ethereum
              const ethAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
              // Verificar si la dirección tiene el formato correcto
              if (ethAddressRegex.test(addressUserNfts)) {
                  // La dirección tiene el formato correcto (es una dirección Ethereum válida)
                  console.log("La dirección es válida:", addressUserNfts);
                  // Aquí puedes realizar acciones relacionadas con una dirección Ethereum válida
                  
                  if (nftUsernameContract.methods) {
                       nftUsernames = await nftUsernameContract.methods.getMintedUsernames(addressUserNfts).call();
                  }
                  else{
                       nftUsernames = await nftUsernameContract.getMintedUsernames(addressUserNfts);
                  
                  }  
             



              } else {
                      let isMintedNFT;
                      if (nftUsernameContract.methods) {
                            console.log("Con MetaMask ");
                            isMintedNFT = await nftUsernameContract.methods.isMinted(addressUserNfts).call();
                      } else {
                             // Usando ethers.js
                             console.log("Con SockWallet "); 
                             isMintedNFT = await nftUsernameContract.isMinted(addressUserNfts);
                     
                       }
               
  
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

                let for_sale;  
                let codeHexaImage;     
                let walletOwner;
                if (nftUsernameContract.methods) {
                        console.log("Con MetaMask ");
                        for_sale = await nftUsernameContract.methods.isNFTForSale(username).call();  
                        codeHexaImage = await nftUsernameContract.methods.getimagecodeHexaFromUsername(username).call();     
                        walletOwner     = await nftUsernameContract.methods.getNFTOwner(username).call();
                } else {
                         // Usando ethers.js
                         console.log("Con SockWallet "); 
                         for_sale = await nftUsernameContract.isNFTForSale(username);  
                         codeHexaImage = await nftUsernameContract.getimagecodeHexaFromUsername(username);     
                         walletOwner     = await nftUsernameContract.getNFTOwner(username);
                }
              
            //console.log("codeHexaImage:", codeHexaImage);
             
          
            // Crear un contenedor para la fila de usuario
        const userRowContainer = document.createElement("div");
        userRowContainer.style.display = "flex";
        userRowContainer.style.alignItems = "center"; // Centrar verticalmente la imagen y el nombre
        userRowContainer.style.marginBottom = "10px"; // Espacio entre filas
        //userRowContainer.style.border = "1px solid white"; // Borde blanco alrededor del contenedor
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
                  //imageUserContainer.style.border = "1px solid white"; // Borde blanco alrededor del contenedor de la imagen
                  imageUserContainer.style.padding = "5px"; // Espacio interno para separar el contenido del borde
              
               userRowContainer.appendChild(imageUserContainer);
                                                            
              
              const nameButton = document.createElement("span");
                  nameButton.innerHTML = '<span style="font-size: 18px; vertical-align: middle; display: inline-block;"></span>';
                  nameButton.textContent = username;
                  nameButton.style.color = "white";
                  nameButton.classList.add("clickable-button");
                  nameButton.addEventListener("click", async function () {
                      //alert("Clickeaste el botón de usuario para " + username);
                      //alert("Clickeaste el botón de usuario para " + username);
                      await get_NFTUsername_profile(username);  
                      // Ahora muestra el modal
                      $('#UsernameProfileModal').modal('show');
                  });
                  nameButton.style.marginLeft = "10px"; // Añadir un margen izquierdo para separar los elementos
                                    
              userRowContainer.appendChild(nameButton);

                   
             

              if (for_sale){ 

                    const buyButton = document.createElement("button");
                    buyButton.textContent = "For Sale";
                    buyButton.addEventListener("click", async function () {
                        //alert("Has clickeado el Botón 1");    
                        await openBuyNftModal(username);  

                        // Ahora muestra el modal
                        $('#buyNftModal').modal('show');

                    });
                    buyButton.style.marginLeft = "10px"; // Añadir un margen izquierdo para separar los elementos
                    buyButton.style.backgroundColor = "lime"; // Establecer el color de fondo
                    buyButton.style.color = "black"; // Establecer el color del texto
                    buyButton.style.borderRadius = "15px"; // Redondear las esquinas
                    
                    userRowContainer.appendChild(buyButton);
              }  

              const walletButton = document.createElement("span");
                  walletButton.innerHTML = '<span style="font-size: 6px; vertical-align: middle;"></span>';
                  walletButton.textContent = walletOwner;
                  walletButton.style.color = "gray";
                  walletButton.classList.add("clickable-button");
                  walletButton.addEventListener("click", async function () {
                      //alert("Clickeaste el botón de usuario para " + username);
                      //alert("Clickeaste el botón de usuario para " + username);
                      await get_NFTUsername_profile(username);  
                      // Ahora muestra el modal
                      $('#UsernameProfileModal').modal('show');
                  });
                  walletButton.style.marginLeft = "10px"; // Añadir un margen izquierdo para separar los elementos
                                    
              userRowContainer.appendChild(walletButton);
             
             
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






