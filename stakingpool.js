
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
            // INFO GLOBAL
            // ======================

            const globalInfo = document.createElement("div");
            globalInfo.id = "staking_global_info";
            globalInfo.style.marginTop = "20px";
            globalInfo.style.padding = "15px";
            globalInfo.style.background = "#f0f8ff";
            globalInfo.style.borderRadius = "12px";
            globalInfo.style.display="none";



            // ======================
            // INFO USER
            // ======================

            const userInfo = document.createElement("div");
            userInfo.id = "staking_user_info";
            userInfo.style.marginTop = "20px";
            userInfo.style.padding = "15px";
            userInfo.style.background = "#eef2ff";
            userInfo.style.borderRadius = "12px";

           

    let userData;

    if (stakingContract.methods) {
            userData = await stakingContract.methods.userStake(globalWalletKey).call();
    } else {
            userData = await stakingContract.userStake(globalWalletKey);
    }

    

    if (!userData.active) {         
  
              // ======================
              // SELECT PLAZO
              // ======================
              const select = document.createElement("select");
              select.style.width = "100%";
              select.style.padding = "10px";
              select.style.marginTop = "20px";
              select.style.borderRadius = "12px";
              select.style.border = "1px solid dodgerblue";
              select.style.background = "white";
              select.style.color = "#1e3a8a"; // 🔵 TEXTO AZUL
              select.style.fontSize = "15px";   


              select.innerHTML = `
                <option value="1">30 días — 5%</option>
                <option value="2">60 días — 8%</option>
                <option value="3">90 días — 12%</option>
              `;

              // ======================
              // INPUT + MAX
              // ======================
              const inputWrapper = document.createElement("div");
              inputWrapper.style.display = "flex";
              inputWrapper.style.gap = "10px";
              inputWrapper.style.marginTop = "20px";

              stakinMount = document.createElement("input");
              stakinMount.id="input_staking";
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
              stakeBtn.style.marginTop = "20px";
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

              container.appendChild(select);
              container.appendChild(inputWrapper);
              container.appendChild(stakeBtn);
     }
   


    //unstakeBtn.onclick = unstakeSOCK;

    // ======================
    // APPEND
    // ======================
    container.appendChild(title);
    container.appendChild(subtitle);
    container.appendChild(globalInfo);
    container.appendChild(userInfo);
    

    cargarInfoStaking();

   
}




async function stakeSOCK(plazoDias) {

    try {

        const stakinMount = document.getElementById("input_staking");

        if (!stakinMount) {
            alert("Input no encontrado");
            return;
        }

        const amount = stakinMount.value;

        if (!amount || Number(amount) <= 0) {
            alert("Ingresa una cantidad válida de SOCK");
            return;
        }

        const amountToApprove = ethers.utils.parseUnits(amount, "ether");

        console.log("📌 Staking:", amount, "SOCK");
        console.log("📆 Plazo:", plazoDias, "días");

        // =====================================================
        // 🦊 METAMASK (web3.js)
        // =====================================================
        if (stakingContract.methods) {

            console.log("🦊 Con MetaMask");

            const amountWeb3 = web3.utils.toWei(amount, "ether");

            const currentAllowance = await tokenContract.methods
                .allowance(globalWalletKey, stakingContractAddress)
                .call();

            if (Number(currentAllowance) < Number(amountWeb3)) {

                await tokenContract.methods
                    .approve(stakingContractAddress, amountWeb3)
                    .send({ from: globalWalletKey });

                console.log("✅ Approve exitoso");
            }

            await stakingContract.methods
                .stake(amountWeb3, plazoDias)
                .send({ from: globalWalletKey });

            console.log("✅ Staking exitoso");
        }

        // =====================================================
        // 🔐 SOCK WALLET (ethers.js)
        // =====================================================
        else {

            console.log("🔐 Con SockWallet");

            const provider = stakingContract.provider;
            console.log("🔐 provider");
            
            const { maxFeePerGas, maxPriorityFeePerGas } = await obtenerGasEIP1559(provider);
            console.log("🔐 max fee y priority");

            const currentAllowance = await tokenContract.allowance(
                globalWalletKey,
                stakingContractAddress
            );

            if (currentAllowance.lt(amountToApprove)) {

                console.log("🔐 allowance");

                const approveTx = await tokenContract.approve(
                    stakingContractAddress,
                    amountToApprove,
                    {
                        maxFeePerGas,
                        maxPriorityFeePerGas,
                    }
                );

                await approveTx.wait();
                console.log("✅ Approve confirmado");
            }

            const estimatedGas = await stakingContract.estimateGas.stake(
                amountToApprove,
                plazoDias
            );

            const gasLimit = estimatedGas.mul(120).div(100);

            const stakeTx = await stakingContract.stake(
                amountToApprove,
                plazoDias,
                {
                    gasLimit,
                    maxFeePerGas,
                    maxPriorityFeePerGas,
                }
            );

            console.log("📡 Transacción enviada:", stakeTx.hash);

            await stakeTx.wait();
            console.log("✅ Staking confirmado");
        }

        alert("Staking realizado con éxito 🚀");

    } catch (error) {
        console.error("❌ Error en staking:", error);
        alert("Error al hacer staking");
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




async function obtenerGasEIP1559(provider) {

    try {

        const feeData = await provider.getFeeData();

        const minPriority = ethers.utils.parseUnits("30", "gwei"); // 🔥 mínimo seguro Polygon
        const minMaxFee   = ethers.utils.parseUnits("80", "gwei"); // margen seguro

        let maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
        let maxFeePerGas = feeData.maxFeePerGas;

        // Si vienen muy bajos → usar mínimo seguro
        if (!maxPriorityFeePerGas || maxPriorityFeePerGas.lt(minPriority)) {
            maxPriorityFeePerGas = minPriority;
        }

        if (!maxFeePerGas || maxFeePerGas.lt(minMaxFee)) {
            maxFeePerGas = minMaxFee;
        }

        console.log("⛽ Gas final usado:", {
            maxFee: ethers.utils.formatUnits(maxFeePerGas, "gwei"),
            priority: ethers.utils.formatUnits(maxPriorityFeePerGas, "gwei"),
        });

        return { maxFeePerGas, maxPriorityFeePerGas };

    } catch (error) {
        console.error("Error obteniendo gas:", error);
        throw error;
    }
}




// =====================================================
// 📊 ACTUALIZAR INFORMACIÓN GLOBAL + USUARIO
// =====================================================

async function cargarInfoStaking() {

    try {

        let userAddress;

        if (stakingContract.methods) {
            userAddress = globalWalletKey;
        } else {
            userAddress = await stakingContract.signer.getAddress();
        }

        // =========================
        // GLOBAL INFO
        // =========================

        let totalStaked;
        let totalStakers;
        let rewardsAvailable;
        let contractBalance;

        if (stakingContract.methods) {

            totalStaked = await stakingContract.methods.totalStaked().call();
            totalStakers = await stakingContract.methods.totalStakers().call();
            rewardsAvailable = await stakingContract.methods.rewardsAvailable().call();
            contractBalance = await tokenContract.methods.balanceOf(stakingContractAddress).call();

        } else {

            totalStaked = await stakingContract.totalStaked();
            totalStakers = await stakingContract.totalStakers();
            rewardsAvailable = await stakingContract.rewardsAvailable();
            contractBalance = await tokenContract.balanceOf(stakingContractAddress);
        }

        document.getElementById("staking_global_info").innerHTML = `
            <p><b>Contrato Balance:</b> ${ethers.utils.formatEther(contractBalance)} SOCK</p>
            <p><b>Total Staked:</b> ${ethers.utils.formatEther(totalStaked)} SOCK</p>
            <p><b>Rewards Disponibles:</b> ${ethers.utils.formatEther(rewardsAvailable)} SOCK</p>
            <p><b>Total Stakers:</b> ${totalStakers}</p>
        `;

        // =========================
        // USER INFO
        // =========================

        let userData;

        if (stakingContract.methods) {
            userData = await stakingContract.methods.userStake(userAddress).call();
        } else {
            userData = await stakingContract.userStake(userAddress);
        }

        if (!userData.active) {

            document.getElementById("staking_user_info").innerHTML =
                `<p>No tienes staking activo</p>`;

            return;
        }

        let reward;

        if (stakingContract.methods) {
            reward = await stakingContract.methods.calculateReward(userAddress).call();
        } else {
            reward = await stakingContract.calculateReward(userAddress);
        }

        const finishTime =
            Number(userData.startTime) + Number(userData.duration);

        const now = Math.floor(Date.now() / 1000);
        const finished = now >= finishTime;

        document.getElementById("staking_user_info").innerHTML = `
            <h3>Tu Staking</h3>
            <p><b>Cantidad:</b> ${ethers.utils.formatEther(userData.amount)} SOCK</p>
            <p><b>APY:</b> ${userData.apy}%</p>
            <p><b>Reward actual:</b> ${ethers.utils.formatEther(reward)} SOCK</p>
            <p><b>Finaliza:</b> ${new Date(finishTime * 1000).toLocaleString()}</p>
            ${finished ? `<button onclick="withdrawSOCK()" style="margin-top:10px;padding:10px;border-radius:10px;background:dodgerblue;color:white;border:none;cursor:pointer;">Withdraw</button>` : `<p style="color:red;">Stake bloqueado</p>`}
        `;

    } catch (error) {
        console.error("Error cargando info staking:", error);
    }
}




