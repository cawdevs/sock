
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
             if (followControlContract.methods) {
                      console.log("Con MetaMask");
                      nftUsernames = await followControlContract.methods.getFollowingList(nft_username_selected).call();
                      
                      // Lógica específica para contratos instanciados con web3.js
              } else {
                      console.log("Con SockWallet.");
                      nftUsernames = await followControlContract.getFollowingList(nft_username_selected);
                      
                     // Lógica específica para contratos instanciados con ethers.js
              }



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
                let is_following;
                let is_follower;
                let codeHexaImage;     
                let walletOwner;
                if (nftUsernameContract.methods) {
                        console.log("Con MetaMask ");
                        for_sale = await nftUsernameContract.methods.isNFTForSale(username).call();  
                        codeHexaImage = await nftUsernameContract.methods.getimagecodeHexaFromUsername(username).call();     
                        walletOwner     = await nftUsernameContract.methods.getNFTOwner(username).call();
                        //following=?
                        //follower =?
                        is_following = await followControlContract.methods.isFollowing(selectorNFTs,username).call();
                        is_follower = await followControlContract.methods.isFollowedBy(selectorNFTs,username).call();

                } else {
                         // Usando ethers.js
                         console.log("Con SockWallet "); 
                         for_sale = await nftUsernameContract.isNFTForSale(username);  
                         codeHexaImage = await nftUsernameContract.getimagecodeHexaFromUsername(username);     
                         walletOwner     = await nftUsernameContract.getNFTOwner(username);
                         //following=?
                         //follower =?
                         is_following = await followControlContract.isFollowing(selectorNFTs,username);
                         is_follower = await followControlContract.isFollowedBy(selectorNFTs,username);
                }

            const start = walletOwner.slice(0, 6);
            const end = walletOwner.slice(-4);
            walletOwnerCut = `${start}...${end}`;
               
              
            //console.log("codeHexaImage:", codeHexaImage);
             
          
            // Crear un contenedor para la fila de usuario
            // Crear un contenedor principal para la fila de usuario
            const userRowContainer = document.createElement("div");
            userRowContainer.style.display = "flex"; // Imagen y elementos estarán en línea
            userRowContainer.style.alignItems = "center"; // Centrar verticalmente la imagen con los elementos
            userRowContainer.style.marginBottom = "10px"; // Espacio entre filas
            userRowContainer.style.padding = "5px"; // Espaciado interno

            // Contenedor para la imagen
            const imageUserContainer = document.createElement("div");
            imageUserContainer.id = `imageContainerId_${username}`; // ID único
            imageUserContainer.style.width = "80px"; // Tamaño del contenedor
            imageUserContainer.style.height = "80px";
            imageUserContainer.style.display = "flex";
            imageUserContainer.style.justifyContent = "center";
            imageUserContainer.style.alignItems = "center";
            imageUserContainer.style.marginRight = "10px"; // Espacio entre imagen y los elementos a la derecha
            userRowContainer.appendChild(imageUserContainer); // Añadir la imagen al contenedor principal

            // Contenedor para los elementos a la derecha
            const elementsContainer = document.createElement("div");
            elementsContainer.style.display = "flex";
            elementsContainer.style.flexDirection = "column"; // Alinear elementos en dos filas (vertical)

            // Fila 1: Nombre del usuario y botón "For Sale" (si aplica)
            const topRow = document.createElement("div");
            topRow.style.display = "flex";
            topRow.style.alignItems = "center"; // Centrar verticalmente los elementos en la fila superior

            if (is_follower) {           
                const followSymbol = document.createElement("span");
                followSymbol.textContent = "*"; // Representa el asterisco
                followSymbol.style.fontSize = "24px";
                followSymbol.style.cursor = "pointer"; // Cambiar el cursor para indicar que es interactivo
                followSymbol.style.color = "lime"; // Cambiar el color del texto
                followSymbol.style.marginRight = "7px"; // Espacio entre el nombre y el botón "For Sale"
                topRow.appendChild(followSymbol); // Añadir el asterisco interactivo a la fila superior
           }   
             
            // Nombre del usuario
            const nameButton = document.createElement("span");
            nameButton.textContent = username;
            nameButton.style.color = "white";
            nameButton.style.fontSize = "18px"; // Texto más grande para el nombre
            nameButton.classList.add("clickable-button");   
            nameButton.style.marginRight = "14px";         
            nameButton.addEventListener("click", async function () {
                await get_NFTUsername_profile(username);
                $('#UsernameProfileModal').modal('show');
            });
            topRow.appendChild(nameButton); // Añadir el nombre a la fila superior

            




            // Botón "For Sale", si aplica
            if (for_sale) {
                const buyButton = document.createElement("button");
                buyButton.textContent = "For Sale";
                buyButton.style.fontSize = "12px"; 
                buyButton.style.backgroundColor = "lime";
                buyButton.style.color = "black";
                buyButton.style.borderRadius = "15px";
                buyButton.addEventListener("click", async function () {
                    await openBuyNftModal(username);
                    $('#buyNftModal').modal('show');
                });
                topRow.appendChild(buyButton); // Añadir el botón "For Sale" a la fila superior
            }

            // Botón "seguir o siguiend segun sea
            if (is_following) {
                const followingButton = document.createElement("button");
                followingButton.textContent = "Siguiendo";
                followingButton.style.fontSize = "12px"; // Texto más pequeño 
                followingButton.style.backgroundColor = "green";
                followingButton.style.color = "white";
                followingButton.style.borderRadius = "15px";
                
                topRow.appendChild(followingButton); // Añadir el botón "For Sale" a la fila superior


                const unfollowButton = document.createElement("button");
                unfollowButton.textContent = " x ";
                unfollowButton.style.fontSize = "12px"; 
                unfollowButton.style.backgroundColor = "red";
                unfollowButton.style.color = "white";
                unfollowButton.style.borderRadius = "15px";
                unfollowButton.addEventListener("click", async function () {
                    //await unfollow(username); 
                    await unfollow_username(username);

                });
                topRow.appendChild(unfollowButton); // Añadir el botón "For Sale" a la fila superior






            }
            else{
                //const followButton = document.createElement("button");
                //followButton.textContent = "Seguir";
                //followButton.style.fontSize = "10px";
                //followButton.style.backgroundColor = "gray";
                //followButton.style.color = "white";
                //followButton.style.borderRadius = "15px";
                //followButton.addEventListener("click", async function () {
                //    await follow_username(username);                                        
                //});
                //topRow.appendChild(followButton); // Añadir el botón "For Sale" a la fila superior
              

                //////////////////////////////////////////////////////
                const followButton = document.createElement("button");
                followButton.textContent = "Seguir";
                followButton.style.fontSize = "10px";
                followButton.style.backgroundColor = "gray";
                followButton.style.color = "white";
                followButton.style.borderRadius = "15px";



                // Crear spinner oculto inicialmente
                const spinner = document.createElement("span");
                spinner.classList.add("spinner-border", "spinner-border-sm"); // Bootstrap spinner
                spinner.style.display = "none"; // Oculto por defecto
                spinner.style.marginLeft = "5px";

                followButton.appendChild(spinner); // Añadir spinner al botón

                followButton.addEventListener("click", async function () {
                    
                    followButton.disabled = true;  // Desactivar botón
                    followButton.textContent = "Siguiendo..."; 
                    followButton.appendChild(spinner); 
                    spinner.style.display = "inline-block"; // Mostrar spinner

                    try {
                        await follow_username(username);  // Llamada a la función de seguimiento
                        followButton.textContent = "Siguiendo";
                        followButton.style.backgroundColor = "green";
                    } catch (error) {
                        console.error("Error al seguir:", error);
                        followButton.textContent = "Seguir";  // Restaurar texto si hay error
                        followButton.style.backgroundColor = "gray";
                    } finally {
                        spinner.style.display = "none"; // Ocultar spinner
                        followButton.disabled = false;  // Reactivar botón
                    }
                });
                topRow.appendChild(followButton); 





            }         
            





            // Añadir la fila superior al contenedor de elementos
            elementsContainer.appendChild(topRow);

            // Fila 2: Wallet del usuario
            const bottomRow = document.createElement("div");
            bottomRow.style.marginTop = "5px"; // Espacio entre la fila superior y la inferior

            const walletButton = document.createElement("span");
            walletButton.textContent = walletOwnerCut;
            walletButton.style.color = "gray";
            walletButton.style.fontSize = "12px"; // Texto más pequeño para el wallet
            walletButton.classList.add("clickable-button");
            walletButton.addEventListener("click", async function () {
                await get_NFTUsername_profile(username);
                $('#UsernameProfileModal').modal('show');
            });

            const sendwalletButton = document.createElement("span");
            sendwalletButton.innerHTML = `<font color="lime"><span class="glyphicon glyphicon-send"></span></font>`; // Icono en lugar de texto
            sendwalletButton.style.marginLeft = "20px"; // Espacio entre el nombre y el botón "For Sale"
            sendwalletButton.style.fontSize = "24px"; // Ajusta el tamaño si es necesario

            sendwalletButton.classList.add("clickable-button");
            sendwalletButton.addEventListener("click", async function () {
                await  modal_enviarTokens(username,walletOwner);
                $('#myModalEnviarTokens').modal('show');
            });

            // Añadir el walletButton a la fila inferior
            bottomRow.appendChild(walletButton);
            // Añadir el walletButton a la fila inferior
            bottomRow.appendChild(sendwalletButton);

            // Añadir la fila inferior al contenedor de elementos
            elementsContainer.appendChild(bottomRow);

            // Añadir el contenedor de elementos al contenedor principal
            userRowContainer.appendChild(elementsContainer);

            // Añadir el contenedor principal a la lista de usuarios
            nftUsernameList.appendChild(userRowContainer);

            // Cargar la imagen
            await loadImagesFromHex(codeHexaImage, imageUserContainer.id);



          } catch (error){

            console.error("Error en find (images)  :", error);

           
          }


    }
              
    return listaNFTUsernames;

            

 } catch (error) {
          
        console.error("Error al buscar NFTs:", error);
               
 }



}






