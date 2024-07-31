
async function claimRewards(){

    const accounts = await web3.eth.getAccounts();
    const myAddress = accounts[0];
    const contractStakingPool = new web3.eth.Contract(StakingPool_ContractABI, stakingPoolContractAddress);
    
    try{

      const rewards = await contractStakingPool.methods.claimRewards().call();
      alert("rewards  "+ rewards);
      updateStakingPool();
    
    }catch{

       console.error("Error in contract:", error);

    }
    
}

async function updateStakingPool() {


    const accounts = await web3.eth.getAccounts();
    const myAddress = accounts[0];
    
    const contractStakingPool = new web3.eth.Contract(StakingPool_ContractABI, stakingPoolContractAddress);
    

    let totalStaked, totalRewards, stakerDetails; // Declarar las variables fuera del bloque try

    try {
        totalStaked = await contractStakingPool.methods.getTotalStaked().call();
        totalRewards = await contractStakingPool.methods.getTotalRewards().call();
        stakerDetails = await contractStakingPool.methods.getStaker(myAddress).call();
        //alert("staker "+totalStaked+""+totalRewards+stakerDetails)
        
    } catch (error) {
        console.error("Error in contract call:", error);
    }


    const elementuseramountstaked = document.getElementById("user-amount-staked");
    const elementuserlastclaimrewards = document.getElementById("user-last-claim-rewards");
    const elementusertotalrewardsearned = document.getElementById("user-total-rewards-earned"); 

    const elementtotalStaked = document.getElementById('total-staked');
    const elementtotalRewards = document.getElementById('total-rewards');
    

    elementuseramountstaked.innerText = '';
    elementuserlastclaimrewards.innerText = '';
    elementusertotalrewardsearned.innerText =''; 

    elementtotalStaked.innerText = '';
    elementtotalRewards.innerText ='';   

    const staking_pool_date = tiempoTranscurrido(stakerDetails[1]);  

  
    elementuseramountstaked.innerText =  "Your CAW in STAKING: " + web3.utils.fromWei(stakerDetails[0], 'ether');
    elementuserlastclaimrewards.innerText = "Date :"+ staking_pool_date+ " " + "Claim within 30 days";
    elementusertotalrewardsearned.innerText ="Your Rewards CAW: "+ stakerDetails[2]; 
    
    elementtotalStaked.innerText = "Total in STAKING CAW: " + web3.utils.fromWei(totalStaked, 'ether');
    elementtotalRewards.innerText = "Total Rewars CAW: "+ web3.utils.fromWei(totalRewards, 'ether');


    const elementmenustaking = document.getElementById('menu_staking'); 
    elementmenustaking.style.display="block";


      



}


async function stake_unstake(value){
	   //alert('stakingA '); 

      const accounts = await web3.eth.getAccounts();
      const myAddress = accounts[0];

      const contractStakingPool = new web3.eth.Contract(StakingPool_ContractABI, stakingPoolContractAddress);
      const tokenContract = new web3.eth.Contract(CAW_tokenABI, tokenContractAddress);

      let amountToApprove;
      
      if (value===0){

      	    const stakinMount = document.getElementById('mount-staking');      	      
            amountToApprove = web3.utils.toWei(stakinMount.value, 'ether');
            //alert('staking '+ amountToApprove); 
            
            try{
                 await tokenContract.methods.approve(stakingPoolContractAddress, amountToApprove).send({ from: myAddress });
            } catch (error) {
            	console.error("Error en la aprobación:", error);
            } 

            await new Promise(resolve => setTimeout(resolve, 3000));


            try{
                 await contractStakingPool.methods.stake(amountToApprove).send({ from: myAddress });

            } catch (error) {
                   console.error("Error en la aprobación:", error);
            } 


      }else{

      	    const unstakinMount = document.getElementById('mount-unstaking');
      	    amountToApprove = web3.utils.toWei(unstakinMount.value, 'ether'); // 1 millón de CAW
            //alert('staking '+ amountToApprove);
                        
            try{
            	await contractStakingPool.methods.unstake(amountToApprove).send({ from: myAddress });
            } catch (error) {
            	console.error("Error en la aprobación:", error);
            } 

      }

}


     