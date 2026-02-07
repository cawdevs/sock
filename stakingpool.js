

function createStakingElements() {

    const parent = document.getElementById("menu_staking");
    if (!parent) {
        console.error("No existe el div #menu_staking");
        return;
    }

    // Limpia contenido previo
    parent.innerHTML = "";

    const container = document.createElement("div");
    container.style.maxWidth = "420px";
    container.style.margin = "20px auto";
    container.style.padding = "25px";
    container.style.borderRadius = "20px";
    container.style.background = "linear-gradient(135deg, #1e90ff, #4facfe)";
    container.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
    container.style.fontFamily = "Arial, sans-serif";
    container.style.color = "black";
    container.style.textAlign = "center";

    // ===== TITLE =====
    const title = document.createElement("h1");
    title.innerText = "STAKING";
    title.style.marginBottom = "5px";
    title.style.fontSize = "36px";
    title.style.letterSpacing = "2px";

    const subtitle = document.createElement("p");
    subtitle.innerText = "tus criptomonedas trabajando";
    subtitle.style.fontSize = "14px";
    subtitle.style.opacity = "0.9";
    subtitle.style.marginBottom = "25px";

    // ===== SELECT =====
    const select = document.createElement("select");
    select.style.width = "100%";
    select.style.padding = "12px";
    select.style.borderRadius = "12px";
    select.style.border = "none";
    select.style.marginBottom = "15px";
    select.style.fontSize = "16px";
    select.style.color = "#1e90ff";

    const options = [
        { value: 30, label: "30 días — 6% APY" },
        { value: 60, label: "60 días — 8% APY" },
        { value: 90, label: "90 días — 10% APY" }
    ];

    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.label;
        select.appendChild(option);
    });

    // ===== INPUT =====
    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Cantidad de SOCK";
    input.style.width = "100%";
    input.style.padding = "12px";
    input.style.borderRadius = "12px";
    input.style.border = "none";
    input.style.marginBottom = "20px";
    input.style.fontSize = "16px";
    input.style.color = "#1e90ff";

    // ===== BUTTON STAKE =====
    const stakeBtn = document.createElement("button");
    stakeBtn.innerText = "STAKING";
    stakeBtn.style.width = "100%";
    stakeBtn.style.padding = "14px";
    stakeBtn.style.borderRadius = "14px";
    stakeBtn.style.border = "none";
    stakeBtn.style.background = "#ffffff";
    stakeBtn.style.color = "#1e90ff";
    stakeBtn.style.fontSize = "16px";
    stakeBtn.style.fontWeight = "bold";
    stakeBtn.style.cursor = "pointer";
    stakeBtn.style.marginBottom = "10px";

    stakeBtn.onmouseover = () => stakeBtn.style.background = "#e6f2ff";
    stakeBtn.onmouseout  = () => stakeBtn.style.background = "#ffffff";

    // ===== BUTTON UNSTAKE =====
    const unstakeBtn = document.createElement("button");
    unstakeBtn.innerText = "DESTAKING";
    unstakeBtn.style.width = "100%";
    unstakeBtn.style.padding = "12px";
    unstakeBtn.style.borderRadius = "14px";
    unstakeBtn.style.border = "2px solid white";
    unstakeBtn.style.background = "transparent";
    unstakeBtn.style.color = "white";
    unstakeBtn.style.fontSize = "14px";
    unstakeBtn.style.cursor = "pointer";

    unstakeBtn.onmouseover = () => unstakeBtn.style.background = "rgba(255,255,255,0.15)";
    unstakeBtn.onmouseout  = () => unstakeBtn.style.background = "transparent";

    // ===== APPEND =====
    container.appendChild(title);
    container.appendChild(subtitle);
    container.appendChild(select);
    container.appendChild(input);
    container.appendChild(stakeBtn);
    container.appendChild(unstakeBtn);

    parent.appendChild(container);

    // Retorna referencias para lógica Web3
    return {
        select,
        input,
        stakeBtn,
        unstakeBtn
    };
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