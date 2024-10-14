async function findNftWallet(value) {
  // Obtener la dirección de la cuenta conectada
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
                
                index=randomNumbers[i];
                username= await contractNFT.methods.getUsernameByTokenId(index).call();                
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
    for (const username of nftUsernames) {

          listaNFTUsernames.push(username);    
    
          try{
              

              const container = document.createElement("div");



// Crea un contenedor para las imágenes
const imageUserContainer = document.createElement("div");
imageUserContainer.id = "imageContainerId"; // Este ID se usará en la función
// Estilos para el contenedor de imágenes
imageUserContainer.style.display = "inline-block"; // Para que se muestre como un botón
imageUserContainer.style.marginLeft = "10px"; // Margen izquierdo similar al userButton
imageUserContainer.style.cursor = "pointer"; // Para indicar que es clickeable
container.appendChild(imageUserContainer);

// Cargar la imagen automáticamente
const hexString = "tuHexString"; // Define tu hexString aquí
loadImagesFromHex(hexString, imageUserContainer.id); // Cargar la imagen al iniciar

             
                           

              const nameButton = document.createElement("span");
              nameButton.innerHTML = '<span style="font-size: 14px; vertical-align: middle; display: inline-block;"></span>';
              nameButton.textContent = username;
              nameButton.classList.add("clickable-button");
              nameButton.addEventListener("click", function () {
                  //alert("Clickeaste el botón de usuario para " + username);
              });
              nameButton.style.marginLeft = "10px"; // Añadir un margen izquierdo para separar los elementos

              
              container.appendChild(imageUserContainer);           
              container.appendChild(nameButton);

              // Verifica si el usuario sigue a 'username'
              

              nftUsernameList.appendChild(container);

              
          } catch (error){

           
          }


    }
              
    return listaNFTUsernames;

            

 } catch (error) {
          
        console.error("Error al buscar NFTs:", error);
               
 }



}