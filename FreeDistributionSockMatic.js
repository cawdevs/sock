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
	      //const balanceSock = await contractFREETOKENS.methods.balanceOfSOCK(myAddress).call();
	      //if (balanceCAW <= 2000) {
	        const transaction = await contractFREETOKENS.methods.requestTokensSock().send({from: myAddress, gas: 300000, gasPrice: web3.utils.toWei('50', 'gwei') }); 
	        
	        //console.log('Transacción exitosa:', transaction);
	      //} else {
	        //  console.log('El usuario ya tiene suficientes tokens CAW.');
	      
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


async function sendETHtowallet(){

	    const accounts = await web3.eth.getAccounts();
	    const myAddress = accounts[0];
	    const contractFREETOKENS = new web3.eth.Contract(FreeTokens_ContractABI, freeTokensContractAddress);
	    
	    const walletelement = document.getElementById('text-address-to-send-ETH');      
	    const friendAddress=walletelement.value;

	    alert('friendAddress  '+ friendAddress);

	    const balanceEther = await web3.eth.getBalance(friendAddress); 
	    
	    if (balanceEther <= web3.utils.toWei('0.0', 'ether')) {
	          try{
	             const transaction = await contractFREETOKENS.methods.send({from: myAddress, gas: 300000, gasPrice: web3.utils.toWei('50', 'gwei') });      
	          }catch{
	               console.error('Error al realizar la transacción:', error);
	          } 
	    }else{
	      alert('El usuario ya posee ETHER');

	      console.log('El usuario tiene Ether.');
	    }

	    walletelement.innerHTML = '';

}
