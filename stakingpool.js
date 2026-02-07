
function createStakingElements() {

    const container = document.getElementById("menu_staking");
    container.innerHTML = "";

    // ======================
    // TÍTULOS
    // ======================
    const title = document.createElement("h1");
    title.innerText = "STAKING";
    title.style.textAlign = "center";
    title.style.color = "dodgerblue";
    title.style.fontSize = "36px";

    const subtitle = document.createElement("p");
    subtitle.innerText = "tus criptomonedas trabajando";
    subtitle.style.textAlign = "center";
    subtitle.style.color = "#555";

    // ======================
    // SELECT PLAZO
    // ======================
    const select = document.createElement("select");
    select.style.width = "100%";
    select.style.padding = "10px";
    select.style.borderRadius = "12px";
    select.style.border = "1px solid dodgerblue";
    select.style.background = "white";
    select.style.color = "#1e3a8a"; // 🔵 TEXTO AZUL
    select.style.fontSize = "15px";   


    select.innerHTML = `
        <option value="30">30 días — 5%</option>
        <option value="60">60 días — 8%</option>
        <option value="90">90 días — 12%</option>
    `;

    // ======================
    // INPUT + MAX
    // ======================
    const inputWrapper = document.createElement("div");
    inputWrapper.style.display = "flex";
    inputWrapper.style.gap = "10px";

    stakinMount = document.createElement("input");
    stakinMount.type = "number";
    stakinMount.placeholder = "Cantidad de SOCK";

    stakinMount.style.flex = "1";
    stakinMount.style.padding = "10px";
    stakinMount.style.borderRadius = "12px";
    stakinMount.style.border = "1px solid dodgerblue";
    stakinMount.style.background = "white";
    stakinMount.style.color = "#1e3a8a"; // 🔵 TEXTO AZUL
    stakinMount.style.fontSize = "15px";

    const maxBtn = document.createElement("button");
    maxBtn.innerText = "MAX";
    maxBtn.style.padding = "10px 16px";
    maxBtn.style.borderRadius = "12px";
    maxBtn.style.background = "dodgerblue";
    maxBtn.style.color = "white";
    maxBtn.style.border = "none";
    maxBtn.style.cursor = "pointer";

    maxBtn.onclick = maximaSock;

    inputWrapper.appendChild(stakinMount);
    inputWrapper.appendChild(maxBtn);

    // ======================
    // BOTONES
    // ======================
    const stakeBtn = document.createElement("button");
    stakeBtn.innerText = "STAKING";
    stakeBtn.style.width = "100%";
    stakeBtn.style.padding = "12px";
    stakeBtn.style.borderRadius = "14px";
    stakeBtn.style.background = "dodgerblue";
    stakeBtn.style.color = "white";
    stakeBtn.style.fontSize = "16px";
    stakeBtn.style.border = "none";
    stakeBtn.style.cursor = "pointer";

    stakeBtn.onclick = () => {
        const plazoDias = select.value;
        stakeSOCK(plazoDias);
    };

    const unstakeBtn = document.createElement("button");
    unstakeBtn.innerText = "DE-STAKING";
    unstakeBtn.style.width = "100%";
    unstakeBtn.style.padding = "12px";
    unstakeBtn.style.borderRadius = "14px";
    unstakeBtn.style.background = "#ccc";
    unstakeBtn.style.border = "none";
    unstakeBtn.style.cursor = "pointer";

    unstakeBtn.onclick = unstakeSOCK;

    // ======================
    // APPEND
    // ======================
    container.appendChild(title);
    container.appendChild(subtitle);
    container.appendChild(select);
    container.appendChild(inputWrapper);
    container.appendChild(stakeBtn);
    container.appendChild(unstakeBtn);
}




async function stakeSOCK(plazoDias) {

    if (!stakinMount || stakinMount.value <= 0) {
        alert("Ingresa una cantidad válida de SOCK");
        return;
    }

    const amountToApprove = web3.utils.toWei(stakinMount.value, 'ether');
    console.log("Staking:", amountToApprove, "Plazo:", plazoDias);

    // ===============================
    // 🦊 METAMASK (web3.js)
    // ===============================
    if (stakingContract.methods) {

        console.log("Con MetaMask");

        try {
            // 1️⃣ APPROVE
            await tokenContract.methods
                .approve(stakingPoolContractAddress, amountToApprove)
                .send({ from: globalWalletKey });

            console.log("Approve exitoso");

            // 2️⃣ STAKE
            await stakingContract.methods
                .stake(amountToApprove, plazoDias)
                .send({ from: globalWalletKey });

            console.log("Staking exitoso");

        } catch (error) {
            console.error("Error staking MetaMask:", error);
            alert("Error al hacer staking");
        }

    } 
    // ===============================
    // 🔐 SOCK WALLET (ethers.js)
    // ===============================
    else {

        console.log("Con SockWallet");

        try {
            // 1️⃣ APPROVE
            const approveTx = await tokenContract.approve(stakingContractAddress, amountToApprove);

            await approveTx.wait();
            console.log("Approve exitoso");

            // 2️⃣ STAKE
            const stakeTx = await stakingContract
                .stake(amountToApprove, plazoDias);

            await stakeTx.wait();
            console.log("Staking exitoso");

        } catch (error) {
            console.error("Error staking SockWallet:", error);
            alert("Error al hacer staking");
        }
    }
}




function maximaSock() {
    const saldoSpan = document.getElementById("saldo_CAW");
    if (!saldoSpan) return;

    const saldo = saldoSpan.innerText.trim();

    if (Number(saldo) <= 0) {
        alert("No tienes SOCK disponibles");
        return;
    }

    stakinMount.value = saldo;
}






















/*
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


     */