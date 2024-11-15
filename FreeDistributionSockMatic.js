//this is a java script to send a recieber tokens free SOCK and MATIC


//abi generado por IA
//FreeTokens_ContractABI = [{"constant":false,"inputs":[],"name":"conectar","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"requestTokensSock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[],"name":"receiveTokensSock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"obtenerSaldoEtherContrato","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"obtenerSaldoSockContrato","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_receiver","type":"address payable"}],"name":"sendEtherToAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

//abi generado por polygonSCAN
FreeTokens_ContractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"conectar","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"obtenerSaldoEtherContrato","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"obtenerSaldoSockContrato","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"receiveTokensSock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"requestTokensSock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_receiver","type":"address"}],"name":"sendEtherToAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]


//const freeTokensContractAddress = '0x9402a9efbd39ab776191672702681b35d8b7b6c0';//polygon  
const freeTokensContractAddress = '0x2e274Ca1FD2C1a145917653A6C190B23744246bD';//polygon verificado  


async function tokensFree(token) {
	try {
	    const accounts = await web3.eth.getAccounts();
	    const myAddress = accounts[0];
	    const contractFREETOKENS = new web3.eth.Contract(FreeTokens_ContractABI, freeTokensContractAddress);



	    if (token === "SOCK") {	 
	         let accountBalanceSOCK;

	         try{ 
	         	 	 
	         		accountBalanceSOCK = await tokenContract.balanceOf(myAddress);
	                alert(' accountBalanceSOCK  '+accountBalanceSOCK);	 


	         }catch (error) {
				    console.error('Error al realizar la transacción:', error);
				    alert('Error al realizar la transacción: ' + error.message);
			 }
	         
             
             
             if (Number(accountBalanceSOCK) <= 0) {	

                 try{
		          	  alert('2M tokens free  ');        	 
		          	  const transaction = await contractFREETOKENS.methods.requestTokensSock().send({from: myAddress, gas: 300000, gasPrice: web3.utils.toWei('50', 'gwei') }); 
		          }catch (error) {
					    console.error('Error al realizar la transacción:', error);
					    alert('Error al realizar la transacción: ' + error.message);
				  }

             }else{            

                 alert('El usuario tiene Tokens SOCK' );

             }
               
             
	        
	       
	      
	    } else {
	      const balanceEther = await web3.eth.getBalance(myAddress);
	      if (balanceEther <= web3.utils.toWei('0.0001', 'ether')) {
	        const transaction = await contractFREETOKENS.methods.conectar().send({from: myAddress, gas: 300000, gasPrice: web3.utils.toWei('50', 'gwei') });       
	        console.log('Transacción exitosa:', transaction);
	      } else {
	        console.log('El usuario tiene Ether.');
	      }
	    }
	

	} catch (error) {
	    console.error('Error al realizar la transacción:', error);
	    alert('Error al realizar la transacción: ' + error.message);
	}


}

async function tokensFree_wallet(token) {
    try {
        const myAddress = globalWalletKey; // Define la dirección de tu billetera personalizada
        const contractFREETOKENS = new ethers.Contract(nftContractAddress, NFT_ContractABI, provider); // Usando ethers.js con tu proveedor

         const tokenContract = new ethers.Contract(tokenContractAddress, CAW_tokenABI, provider);

        if (token === "SOCK") {
            let accountBalanceSOCK;

            try {
                // Usar ethers.js para obtener el balance del contrato de tokens SOCK
                accountBalanceSOCK = await tokenContract.balanceOf(myAddress);
                alert('Account Balance SOCK: ' + accountBalanceSOCK);
            } catch (error) {
                console.error('Error al obtener el balance de tokens:', error);
                alert('Error al obtener el balance de tokens: ' + error.message);
            }

            if (Number(accountBalanceSOCK) <= 0) {
                try {
                    alert('2M tokens free');
                    // Realizar transacción usando ethers.js
                    const tx = await contractFREETOKENS.requestTokensSock({ from: myAddress, gasLimit: 300000, gasPrice: ethers.utils.parseUnits('50', 'gwei') });
                    await tx.wait(); // Espera a que la transacción se complete
                    alert('Transacción completada');
                } catch (error) {
                    console.error('Error al realizar la transacción:', error);
                    alert('Error al realizar la transacción: ' + error.message);
                }
            } else {
                alert('El usuario tiene Tokens SOCK');
            }
        } else {
            const balanceEther = await provider.getBalance(myAddress); // Obtener el balance de Ether usando el proveedor
            if (balanceEther.lte(ethers.utils.parseEther('0.0001'))) {
                try {
                    const tx = await contractFREETOKENS.conectar({ from: myAddress, gasLimit: 300000, gasPrice: ethers.utils.parseUnits('50', 'gwei') });
                    await tx.wait();
                    console.log('Transacción exitosa:', tx);
                } catch (error) {
                    console.error('Error al realizar la transacción:', error);
                    alert('Error al realizar la transacción: ' + error.message);
                }
            } else {
                console.log('El usuario tiene Ether.');
            }
        }

    } catch (error) {
        console.error('Error en la función tokensFree_wallet:', error);
        alert('Error en la función tokensFree_wallet: ' + error.message);
    }
}

async function sendETHtowallet(){

	    const accounts = await web3.eth.getAccounts();
	    const myAddress = accounts[0];
	    const contractFREETOKENS = new web3.eth.Contract(FreeTokens_ContractABI, freeTokensContractAddress);
	    
	    const walletelement = document.getElementById('text-address-to-send-ETH');      
	    const friendAddress=walletelement.value;

	    

	    const balanceEther = await web3.eth.getBalance(friendAddress); 
	    
	    if (balanceEther <= web3.utils.toWei('0.0', 'ether')) {
	          try{
	          	 alert('friendAddress  '+ friendAddress);
	             const transaction = await contractFREETOKENS.methods.sendEtherToAddress(friendAddress).send({from: myAddress, gas: 300000, gasPrice: web3.utils.toWei('50', 'gwei') });      
	            
	          }catch(error) {
				    console.error('Error al realizar la transacción:', error);
				    alert('Error al realizar la transacción: ' + error.message);
			 }
	    }else{
	      alert('El usuario ya posee ETHER');

	      console.log('El usuario tiene Ether.');
	    }

	    walletelement.innerHTML = '';

}
