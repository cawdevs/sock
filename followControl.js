
async function follow_username(username_to_follow) {

 
    try{        ////////////////////

    	     const selected_username = document.getElementById('selector_NFTs').value;
             

            if (followControlContract.methods) {
                            console.log("seguir Con MetaMask ");
                            await followControlContract.methods.follow(selected_username,username_to_follow).send({
                            	from: globalWalletKey,
                              });

                            console.log('NFT Username is Delisted.');
                                                       

            } else {
                           console.log("seguir Con SockWallet ");

                           // Obtener la tarifa de gas base desde la red
                           const adjustedGasPrice = obtenerGasAjustado();
                            // Llamada con ethers.js

                           const estimatedGas = await followControlContract.estimateGas.follow(selected_username, username_to_follow);
                           const adjustedGasLimit = estimatedGas.mul(110).div(100); // Aume 
                           
                           const tx = await followControlContract.follow(selected_username, username_to_follow , {
                           gasLimit: adjustedGasLimit,
                           gasPrice: adjustedGasPrice
                           });

                           console.log("Transacción enviada:", tx.hash);
                           // Esperar confirmación
                           tx.wait().then(receipt => {
                                showSuccess("Confirmado: follow", receipt);
                           }).catch(error => {
                                showError("Sin confirmar:follow.",error);

                           });

                       } 

    } catch (error) {
          
          showError("Error: No se puede segir al NFTUsername.",error);
          
    }

}


async function unfollow_username(username_to_unfollow) {

 
    try{        

    	     const selected_username = document.getElementById('selector_NFTs').value;
             

            if (followControlContract.methods) {
                            console.log("dejar de seguir Con MetaMask ");
                            await followControlContract.methods.unfollow(selected_username,username_to_unfollow).send({from: 
                              globalWalletKey,
                              });

                            console.log('NFT Username is Delisted.');                                                       

            } else {
                           console.log("dejar de seguir Con SockWallet ");
                            // Llamada con ethers.js
                           
                           // Obtener la tarifa de gas base desde la red
                           const adjustedGasPrice = obtenerGasAjustado(); 

                           const estimatedGas = await followControlContract.estimateGas.unfollow(selected_username, username_to_unfollow);
                           const adjustedGasLimit = estimatedGas.mul(110).div(100); 

                           const tx = await followControlContract.unfollow(selected_username, username_to_unfollow , {
                           gasLimit: adjustedGasLimit,
                           gasPrice: adjustedGasPrice
                           });

                           console.log("Transacción enviada:", tx.hash);
                           // Esperar confirmación

                           tx.wait().then(receipt => {
                                showSuccess("Confirmado: Unfollow", receipt);
                           }).catch(error => {
                                showError("Sin confirmar:Unfollow.",error);

                           });
                      

                       } 

    } catch (error) {
           
          showError("Error: No se puede dejar de segir al NFTUsername.",error);
    }

}



async function count_follow_username(username) {
 
    try{        
    	    let following_count;
    	    let follower_count;

            if (followControlContract.methods) {

                           console.log("cant Con MetaMask ");
                           following_count= await followControlContract.methods.getFollowingCount(username).call();  
                           follower_count= await followControlContract.methods.getFollowerCount(username).call();      
                 
            } else {
                           console.log("cant Con SockWallet ");
                            // Llamada con ethers.js
                           following_count= await followControlContract.getFollowingCount(username);  
                           follower_count= await followControlContract.getFollowerCount(username);                       
            } 

            // Devuelve los valores como un objeto
            return { following_count, follower_count };
    
    } catch (error) {
           
          showError("Error: en Conteo de seguidos y seguidores.",error);
    }

}


/*async function is_following_username() {
     
    try {
        
	    if (followControlContract.methods) {
		        console.log("seguir Con MetaMask ");
		        // Usando web3.js
		        isMintedNFT = await followControlContract.methods.isMinted(nftusername).call();
		        
		} else {
		                 // Usando ethers.js
		        console.log("seguir Con SockWallet "); 
	            isMintedNFT = await followControlContract.isMinted(nftusername); 
		        
		}
     
    } catch (error) {    
       
        alert('Error en averigur si es seguidor.');
        console.error('Error completo :', error.code); // Mostrar el error completo para debug.
    
    }

}
*/