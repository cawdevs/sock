//this is a java script to send a recieber tokens free SOCK and MATIC


//abi generado por IA
//FreeTokens_ContractABI = [{"constant":false,"inputs":[],"name":"conectar","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"requestTokensSock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[],"name":"receiveTokensSock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"obtenerSaldoEtherContrato","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"obtenerSaldoSockContrato","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_receiver","type":"address payable"}],"name":"sendEtherToAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

//abi generado por polygonSCAN
FreeTokens_ContractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"conectar","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"obtenerSaldoEtherContrato","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"obtenerSaldoSockContrato","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"receiveTokensSock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"requestTokensSock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_receiver","type":"address"}],"name":"sendEtherToAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

//const freeTokensContractAddress = '0x9402a9efbd39ab776191672702681b35d8b7b6c0';//polygon  
const freeTokensContractAddress = '0x2e274Ca1FD2C1a145917653A6C190B23744246bD';//polygon verificado  
let freeTokensContract;



async function tokensFree(token) {
	try {
	    //const accounts = await web3.eth.getAccounts();
	    //const myAddress = accounts[0];
	    //const contractFREETOKENS = new web3.eth.Contract(FreeTokens_ContractABI, freeTokensContractAddress);

	    if (token === "SOCK") {	 
	         
	                 
             const accountBalanceSOCK = await obtenerSaldo_SOCK();
             
             if (Number(accountBalanceSOCK) <= 0) {	

                 try{

                 	  if (nftUsernameContract.methods) {
                           console.log("Con MetaMask ");
                           alert('2M tokens free for you :)');        	 
		          	       const transaction = await freeTokensContract.methods.requestTokensSock().send({from: globalWalletKey, gas: 300000, gasPrice: web3.utils.toWei('50', 'gwei') }); 
		          
                                                      
                      } else {
                         	console.log("Con SockWallet ");
                         	const tx = await freeTokensContract.requestTokensSock({
            						gasLimit: 300000,
            						gasPrice: ethers.utils.parseUnits('50', 'gwei')
        					});

        			    	console.log("Transacción enviada con SockWallet:", tx.hash);

                            // Esperar la confirmación de la transacción
                            const receipt = await tx.wait();
                            console.log("Transacción confirmada con SockWallet:", receipt);
                            alert('Transaction ok :)');

                         }	
		          	  
		          }catch (error) {
					    console.error('Error al realizar la transacción:', error);
					    alert('Error al realizar la transacción: ' + error.message);
				  }

             }else{            

                 alert('El usuario tiene Tokens SOCK' );

             }
              
                  
	       	      
	    } else {
	      
	    }
	

	} catch (error) {
	    console.error('Error al realizar la transacción:', error);
	    alert('Error al realizar la transacción: ' + error.message);
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
