// miarchivo.js
  
// Simulación de datos de conversación
  const conversacion = [
   
    // ... Agrega más mensajes según sea necesario
  ];


// Función para enviar un mensaje
function sendDirectETHtowallet(){
     
    const accounts = await web3.eth.getAccounts();
    const myAddress = accounts[0];
    const tokenContract = new web3.eth.Contract(CAW_tokenABI, tokenContractAddress);

    const contractNFTUsername = new web3.eth.Contract(NFT_ContractABI, nftContractAddress);
    //obtiene la direccion del destinatario

    const nftusername_receiver = document.getElementById('NFTreceiver-direct-message').innerHTML;
    alert(' nftusername_receiver:  ' + nftusername_receiver); 
    /*
    let receiverAddress = await contractNFTUsername.methods.getNFTOwner(nftusername_receiver).call();  
    //obtener el monto en ether a enviar
    const amount = document.getElementById('text-mount-ETH-send').value;             
    // Dirección del destinatario
   
    // Monto en wei (1 ether = 1e18 wei)
    const amountInWei = web3.utils.toWei(amount, 'ether');
    // Enviar transacción

    alert('Info Transacción:  ' + "  " + myAddress + "  " + receiverAddress + "  "+ amountInWei);   
    


    const transactionHash = await web3.eth.sendTransaction({
        from: myAddress,
        to: receiverAddress,
        value: amountInWei,
    });

    //console.log('Transacción enviada. Hash:', transactionHash);
    alert('Transacción enviada. Hash:  ' + transactionHash);       
   */
}  


  async function readConversation(nftusername_receiver){

      const accounts = await web3.eth.getAccounts();
      const myAddress = accounts[0];

      const selectorNFTs = document.getElementById('selector_NFTs').value;
      const nftusername_sender = selectorNFTs.replace('@CAW', '');

      //poner los nombres de los usuarios en la pantalla de mensajes
      const elementNFTusername_sender = document.getElementById('NFTsender-direct-message');
      const elementNFTusername_receiver = document.getElementById('NFTreceiver-direct-message');

      elementNFTusername_sender.innerText=nftusername_sender;
      elementNFTusername_receiver.innerText=nftusername_receiver;

      const contractPROFILE = new web3.eth.Contract(Profile_ContractABI, profileContractAddress);

      const profileTextSender = await contractPROFILE.methods.getProfile(nftusername_sender).call();
      const profileSender = JSON.parse(profileTextSender);
      const img_profileSender = profileSender.fotoPerfil;

      const profileTextReciever = await contractPROFILE.methods.getProfile(nftusername_receiver).call();
      const profileReciever = JSON.parse(profileTextReciever);
      const img_profileReciever = profileReciever.fotoPerfil;


      const imagePerfilSender = document.getElementById('profile-photo-sender');
      imagePerfilSender.src =  img_profileSender;
      
      const imagePerfilReciever = document.getElementById('profile-photo-reciever');
      imagePerfilReciever.src =  img_profileReciever;


      const contractNFTUsername = new web3.eth.Contract(NFT_ContractABI, nftContractAddress);
            //obtiene los nfthash de el sender y el receiver
      const senderNFTHash = await contractNFTUsername.methods.getHashFromUsername(nftusername_sender).call();  
      const receiverNFTHash = await contractNFTUsername.methods.getHashFromUsername(nftusername_receiver).call();  

      //alert('conversations hashes: --> '+ nftusername_sender + senderNFTHash + nftusername_receiver + receiverNFTHash ); 

      console.log('conversations hashes: ' + nftusername_sender + senderNFTHash + nftusername_receiver + receiverNFTHash);         
    	const contractDirectMesage = new web3.eth.Contract(DirectMessage_ContractABI, directMessageContractAddress);
      const p2pconversation = await contractDirectMesage.methods.getConversation(senderNFTHash,receiverNFTHash).call(); 

   
    const senderToReceiverMessages = p2pconversation[0];
    const receiverToSenderMessages = p2pconversation[1];


    //agregar nftusername_sender al principio de cada mensaje en senderToReceiverMessages
    const modifiedSenderToReceiverMessages = senderToReceiverMessages.map(mensaje => [nftusername_sender, ...mensaje]);
    // Agregar nftusername_receiver al principio de cada mensaje en receiverToSenderMessages
    const modifiedReceiverToSenderMessages = receiverToSenderMessages.map(mensaje => [nftusername_receiver, ...mensaje]);
    // Unificar mensajes de sender a receiver y de receiver a sender
    const allMessages = modifiedSenderToReceiverMessages.concat(modifiedReceiverToSenderMessages);


    // Ordenar los mensajes por timestamp de menor a mayor
    const conversacion2 = allMessages.sort((a, b) => parseInt(a[2]) - parseInt(b[2]));

    // Mostrar la conversación en el elemento HTML
    mostrarConversacion(conversacion2);
}
     


// Función para decodificar un mensaje
function decodeMessage(NFTUsenname, message) {
    const encryptedMessage = hexToString(message[0]);
    const jsonMetadataEncrypted = message[1];
    const timestamp = parseInt(message[2]);

    // Puedes hacer lo que necesites con estos datos, por ejemplo, imprimirlos en la consola
    console.log("Encrypted Message:", encryptedMessage);
    console.log("JSON Metadata Encrypted:", jsonMetadataEncrypted);
    console.log("Timestamp:", timestamp);

    // Aquí puedes retornar los datos, mostrarlos en la interfaz de usuario, etc.
}


// Función para mostrar la conversación
function mostrarConversacion(conversacion) {
    const conversationElement = document.getElementById('conversation');
    conversationElement.innerHTML = '';

    conversacion.forEach((message, index) => {
        const [NFTUsername, encryptedMessage, jsonMetadataEncrypted, timestamp] = message;    
        // Convertir el mensaje hexadecimal a cadena de texto
        const decryptedMessage = hexToString(encryptedMessage);
        const message_date = tiempoTranscurrido(timestamp);   

        // Crear el elemento del mensaje
        const mensajeElement = document.createElement('div');
        mensajeElement.innerHTML = `<strong>${NFTUsername}:</strong> ${decryptedMessage} - ${message_date}`;   
        
        // Aplicar estilos según el usuario
        mensajeElement.style.backgroundColor = (index % 2 === 0) ? '#f0f0f0' : '#ffffcc'; // Alternar colores
        mensajeElement.style.padding = '10px';
        mensajeElement.style.marginBottom = '10px';
        mensajeElement.style.borderRadius = '20px'; // Ajusta el valor según tu preferencia
        mensajeElement.style.width = '80%'; // Ajusta el valor según tu preferencia


        // Aplicar estilos adicionales para alinear y justificar el texto
        if (index % 2 === 0) {
            // Usuario 1 (índices pares)
            mensajeElement.style.textAlign = 'left';
        } else {
            // Usuario 2 (índices impares)
            mensajeElement.style.marginLeft = '30px';
        }

        // Agregar el elemento al contenedor de la conversación
        conversationElement.appendChild(mensajeElement);  
    });

    // Desplázate hacia abajo para ver el último mensaje
    conversationElement.scrollTop = conversationElement.scrollHeight;
}

  




async function enviarMensaje() {
    
		  const accounts = await web3.eth.getAccounts();
		  const myAddress = accounts[0];
		  //const contract = new web3.eth.Contract(Profile_ContractABI, profileContractAddress);
		  const selectorNFTs = document.getElementById('selector_NFTs').value;
		  const nftusername_sender = selectorNFTs.replace('@CAW', '');
           
      const nftusername_receiver = document.getElementById('NFTreceiver-direct-message').innerHTML;
      //alert('nftusername_receiver: -->' + nftusername_receiver);

      const contractNFTUsername = new web3.eth.Contract(NFT_ContractABI, nftContractAddress);
      
      //obtiene los nfthash de el sender y el receiver
      let senderNFTHash = await contractNFTUsername.methods.getHashFromUsername(nftusername_sender).call();  
      let receiverNFTHash = await contractNFTUsername.methods.getHashFromUsername(nftusername_receiver).call();  
            
      const messageInput = document.getElementById('messageInput');
      const hexMessage = stringToHex(messageInput.value);

      //const nuevoMensaje ={ usuario: nftusername_sender, mensaje: messageInput.value }; 
      const timestamp = Date.now(); // Obtener la marca de tiempo actual


      const nuevoMensaje = [nftusername_sender, hexMessage, '', timestamp];
      conversacion.push(nuevoMensaje);    
           
      mostrarConversacion(conversacion);     
      
      const jsonMetadataEncrypted = "";//deshabilitado en esta version 
      const signatureToUser = '0xabcdef1234567890fedcba0987654321abcdef1234567890fedcba0987654321';
       

      const contractDirectMesage = new web3.eth.Contract(DirectMessage_ContractABI, directMessageContractAddress); 

      try{
          //alert('el mensaje '+ hexMessage); 
          await contractDirectMesage.methods.sendDirectMessage(senderNFTHash, receiverNFTHash, hexMessage, jsonMetadataEncrypted,signatureToUser).send({ from: myAddress }); 
     }
     
     catch{
         alert('error: -->' ); 
     } 

      // Borra el contenido del cuadro de entrada después de enviar el mensaje
		  messageInput.value = '';
  }

  // Mostrar la conversación al cargar la página
  window.onload = mostrarConversacion;



function hexToString(hex) {
    hex = hex.substring(2); // Elimina el prefijo '0x'
    const pairs = hex.match(/[\dA-F]{2}/gi);
    const str = pairs.map((s) => String.fromCharCode(parseInt(s, 16))).join('');
    return str;
}
function stringToHex(str) {
  let hex = '';
  for(let i = 0; i < str.length; i++) {
    hex += str.charCodeAt(i).toString(16).padStart(2, '0');
  }
  return '0x' + hex;
}

