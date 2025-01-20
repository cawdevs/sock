
async function follow_username(username_to_follow) {

 
    try{        ////////////////////

    	     const selected_username = document.getElementById('selector_NFTs').value;
             

            if (followControlContract.methods) {
                            console.log("seguir Con MetaMask ");
                            await followControlContract.methods.follow(selected_username,username_to_follow).send({
                            	from: globalWalletKey, 
                            	gas: 600000, 
                            	gasPrice: web3.utils.toWei('60', 'gwei') });
                            console.log('NFT Username is Delisted.');
                                                       

            } else {
                           console.log("seguir Con SockWallet ");
                            // Llamada con ethers.js
                           const tx = await followControlContract.follow(selected_username, username_to_follow , {
                           gasLimit: 600000,
                           gasPrice: ethers.utils.parseUnits('60', 'gwei') // Gas price en gwei
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


async function unfollow_username(username_to_unfollow) {

 
    try{        

    	     const selected_username = document.getElementById('selector_NFTs').value;
             

            if (followControlContract.methods) {
                            console.log("dejar de seguir Con MetaMask ");
                            await followControlContract.methods.unfollow(selected_username,username_to_follow).send({from: globalWalletKey, gas: 600000, gasPrice: web3.utils.toWei('60', 'gwei') });
                            console.log('NFT Username is Delisted.');
                                                       

            } else {
                           console.log("dejar de seguir Con SockWallet ");
                            // Llamada con ethers.js
                           const tx = await followControlContract.unfollow(selected_username, username_to_follow , {
                           gasLimit: 600000,
                           gasPrice: ethers.utils.parseUnits('60', 'gwei') // Gas price en gwei
                           });

                           console.log("Transacción enviada:", tx.hash);
                           // Esperar confirmación
                           const receipt = await tx.wait();
                           console.log("Transacción confirmada:", receipt);
                           alert('Transaction ok :)');

                       } 

    } catch (error) {
           
          alert('Error al intentar dejar de seguir al NFTUSERNAME.');
          console.error('Error completo ccc:', error.code); // Mostrar el error completo para debug.
    
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
           
          alert('Error de conteo.');
          console.error('Error completo ccc:', error.code); // Mostrar el error completo para debug.
    
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