
async function follow_username(username_to_follow) {

 
    try{        

    	     const selected_username = document.getElementById('selector_NFTs').value;
             

            if (followControlContract.methods) {
                            console.log("seguir Con MetaMask ");
                            await followControlContract.methods.follow(selected_username,username_to_follow).send({from: globalWalletKey, gas: 200000, gasPrice: web3.utils.toWei('50', 'gwei') });
                            console.log('NFT Username is Delisted.');
                                                       

            } else {
                           console.log("seguir Con SockWallet ");
                            // Llamada con ethers.js
                           const tx = await followControlContract.follow(selected_username, username_to_follow {
                           gasLimit: 200000,
                           gasPrice: ethers.utils.parseUnits('50', 'gwei') // Gas price en gwei
                           });

                           console.log("Transacción enviada:", tx.hash);
                           // Esperar confirmación
                           const receipt = await tx.wait();
                           console.log("Transacción confirmada:", receipt);
                           alert('Transaction ok :)');

                       } 

    } catch (error) {
           
          alert('Error al intentar seguir al NFTUSERNAME.');
          console.error('Error completo ccc:', error.code); // Mostrar el error completo para debug.
    
    }

}



async function is_following_username() {
     
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
