

//myModalEnviarTokens


async function modal_enviarTokens(nftusername = undefined, key_wallet= undefined){

	alert("enviarTokens() sock"); 
	$('#myModalEnviarTokens').modal('show');
    
    const modal = document.getElementById("modal-enviar-tokens");
    modal.innerHTML = ""; // Limpiar contenido previo
    modal.style= "padding: 40px";

    // Estilos comunes para los elementos
    // Estilos comunes para los elementos
    const filaEstilo = "display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; gap: 10px;";
    const entradaEstilo = "flex-grow: 1; padding: 8px; font-size: 16px; border: 1px solid #ccc; border-radius: 10px;";
    const botonEstilo = "padding: 10px 20px; font-size: 16px; background-color: black; color: white; border: 2px solid lime; border-radius: 20px; cursor: pointer;";
    // Fila 1: Selector de tokens y la imagen
    const fila1 = document.createElement("div");
    fila1.style = filaEstilo;

		    const selectorTokens = document.createElement("select");
		    selectorTokens.style = entradaEstilo;
		    selectorTokens.innerHTML = `
		        <option value="sock_coin">SOCK</option>
		        <option value="matic_coin">POLYGON</option>
		    `;

		    const imagenToken = document.createElement("img");
		    imagenToken.src = "SOCK.SVG"; // Por defecto
		    imagenToken.alt = "Token seleccionado";
		    imagenToken.style = "width: 75px; height: 75px; margin-left: 10px;";

		    imagenToken.src = "images/icons/" + selectorTokens.value + ".SVG";

		    selectorTokens.addEventListener("change", () => {
		        imagenToken.src = "images/icons/"+`${selectorTokens.value}.SVG`;
		    });

    fila1.appendChild(selectorTokens);
    fila1.appendChild(imagenToken);
    modal.appendChild(fila1);



    // Verificar si nftusername existe y asignarlo como valor predeterminado
	if (typeof nftusername !== "undefined" && nftusername) {
		    // Fila 3: Entrada para NFTUSERNAME
		    const fila3 = document.createElement("div");
		    fila3.style = filaEstilo;

		    const entradaNFTUsername = document.createElement("input");
		    entradaNFTUsername.type = "text";
		    entradaNFTUsername.placeholder = "NFTUSERNAME";
		    entradaNFTUsername.style = entradaEstilo;

		    
		    entradaNFTUsername.value = nftusername;
		    entradaNFTUsername.readOnly = true; // Hacer el campo no editable
		
    		fila3.appendChild(entradaNFTUsername);
    		modal.appendChild(fila3);
    
    } 



    // Fila 4: Entrada para número de wallet
    const fila4 = document.createElement("div");
    fila4.style = filaEstilo;

		    const entradaWallet = document.createElement("input");
		    entradaWallet.type = "text";
		    entradaWallet.placeholder = "Wallet 0x.....";
		    entradaWallet.style = entradaEstilo;

		    // Verificar si nftusername existe y asignarlo como valor predeterminado
			if (typeof key_wallet !== "undefined" && key_wallet) {
			    entradaWallet.value = key_wallet;
			    entradaWallet.readOnly = true; // Hacer el campo no editable
			}

    fila4.appendChild(entradaWallet);
    modal.appendChild(fila4);



     // Fila 2: Entrada para cantidad de tokens
    const fila2 = document.createElement("div");
    fila2.style = filaEstilo;

		    const entradaCantidad = document.createElement("input");
		    entradaCantidad.type = "number";
		    entradaCantidad.placeholder = "Cantidad de tokens";
		    entradaCantidad.style = entradaEstilo;

    fila2.appendChild(entradaCantidad);
    modal.appendChild(fila2);




    // Fila 5: Botón para enviar
    const fila5 = document.createElement("div");
    fila5.style = "text-align: center; margin-top: 20px;";

		    const botonEnviar = document.createElement("button");
		    botonEnviar.textContent = "Enviar";
		    botonEnviar.style = botonEstilo;

		    botonEnviar.addEventListener("click", async () => {
		        const token = selectorTokens.value;
		        const cantidad = entradaCantidad.value;
		        //const username = entradaNFTUsername.value;
		        const keywallet = entradaWallet.value;

		        if (!cantidad || !keywallet) {
		            alert("Por favor, completa todos los campos antes de enviar.");
		            return;
		        }

		        if (token === "sock_coin") {
		            await transferSockTokens(keywallet, cantidad);
		        } else if (token === "matic_coin") {
		            await transferMatic(keywallet, cantidad);
		        } else {
		            alert("Token no reconocido.");
		        }
		    });

    fila5.appendChild(botonEnviar);
    modal.appendChild(fila5);

} 



// Transferencia de SOCK tokens
// Transferencia de SOCK tokens
async function transferSockTokens(recipientAddress, amount) {

    alert("eSock " + recipientAddress + " " + amount);

    const loadingAnimation = document.getElementById('loadingAnimation-sendSocks');

    loadingAnimation.style.display = 'block';

    try {

        // Validar dirección
        if (!ethers.utils.isAddress(recipientAddress)) {
            throw new Error("Dirección inválida");
        }

        // Validar monto
        if (!amount || Number(amount) <= 0) {
            throw new Error("Monto inválido");
        }

        // Convertir a unidades del token
        const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);

        let tx;

        if (tokenContract.methods) {

            //------------------------------------------------
            // MetaMask (Web3.js)
            //------------------------------------------------

            tx = await tokenContract.methods
                .transfer(
                    recipientAddress,
                    amountInWei.toString()
                )
                .send({
                    from: globalWalletKey
                });

        } else {

            
            //------------------------------------------------
            // 1️⃣ Verificar saldo SOCK
            //------------------------------------------------

            const walletAddress = await wallet.getAddress();

            const sockBalance = await tokenContract.balanceOf(walletAddress);

            if (sockBalance.lt(amountInWei)) {

                loadingAnimation.style.display = 'none';

                alert(
                    "Saldo SOCK insuficiente.\n\n" +
                    "Disponible: " +
                    ethers.utils.formatUnits(sockBalance, 18) +
                    " SOCK\n\n" +
                    "Intentas enviar: " +
                    ethers.utils.formatUnits(amountInWei, 18) +
                    " SOCK"
                );

                return;
            }

            //------------------------------------------------
            // 2️⃣ Obtener gas EIP1559
            //------------------------------------------------

            let maxFeePerGas;
            let maxPriorityFeePerGas;

            try {

                const gasData = await obtenerGasEIP1559(provider);
                maxFeePerGas = gasData.maxFeePerGas;
                maxPriorityFeePerGas = gasData.maxPriorityFeePerGas;
                console.log( "Gas EIP1559 calculado" );

            } catch (error) {

                console.error( "Error obteniendo gas:", error );
                throw error;
            }

            //------------------------------------------------
            // 3️⃣ Estimar gas
            //------------------------------------------------

            let estimatedGas;

            try {

                estimatedGas =
                    await tokenContract.estimateGas.transfer(
                        recipientAddress,
                        amountInWei
                    );

                console.log(
                    "Gas estimado:",
                    estimatedGas.toString()
                );

            } catch (error) {

                console.error("Error estimando gas:", error);
                throw error;
            }

            //------------------------------------------------
            // 4️⃣ Aplicar margen de seguridad
            //------------------------------------------------

            const gasLimit = estimatedGas.mul(140).div(100);

            console.log( "Gas limit final:", gasLimit.toString() );

            //------------------------------------------------
            // 5️⃣ Verificar saldo MATIC para gas
            //------------------------------------------------

            const estimatedGasCost = gasLimit.mul(maxFeePerGas);

            const maticBalance = await wallet.getBalance();

            if (maticBalance.lt(estimatedGasCost)) {

                loadingAnimation.style.display = 'none';

                alert(
                    "Saldo MATIC insuficiente para pagar el gas.\n\n" +
                    "Disponible: " +
                    ethers.utils.formatEther(maticBalance) +
                    " MATIC\n\n" +
                    "Necesario aprox: " +
                    ethers.utils.formatEther(estimatedGasCost) +
                    " MATIC"
                );

                return;
            }

            //------------------------------------------------
            // 6️⃣ Enviar transacción
            //------------------------------------------------

            tx = await tokenContract.transfer(
                recipientAddress,
                amountInWei,
                {
                    gasLimit,
                    maxFeePerGas,
                    maxPriorityFeePerGas
                }
            );

            console.log(
                "Transacción enviada:",
                tx.hash
            );

            //------------------------------------------------
            // 7️⃣ Esperar confirmación
            //------------------------------------------------

            const receipt = await tx.wait();

            console.log(
                "Transacción confirmada:",
                receipt.transactionHash
            );
        }

        alert("Transferencia de SOCK exitosa.");

        loadingAnimation.style.display = 'none';

        $('#myModalEnviarTokens').modal('hide');

    } catch (error) {

        loadingAnimation.style.display = 'none';

        console.error(
            "Error en la transferencia de SOCK:",
            error
        );

        alert(
            "Error en la transferencia de SOCK.\n\n" +
            (error.reason ||
             error.data?.message ||
             error.message ||
             "Error desconocido")
        );
    }
}




// Transferencia de MATIC
// Transferencia de MATIC
async function transferMatic(recipientAddress, amount) {

    alert("Matic " + recipientAddress + amount);

    const loadingAnimation = document.getElementById('loadingAnimation-sendPol');
    loadingAnimation.style.display = 'block';

    try {

        const amountInWei =  ethers.utils.parseEther(amount.toString());

        let tx;

        if (tokenContract.methods) {

            // Usando MetaMask
            tx = await ethereum.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from: globalWalletKey,
                        to: recipientAddress,
                        value: amountInWei.toHexString(),
                    },
                ],
            });

        } else {

            //------------------------------------------------
            // SockWallet (Ethers.js)
            //------------------------------------------------

            // 1️⃣ Obtener gas EIP1559
            let maxFeePerGas;
            let maxPriorityFeePerGas;

            try {

                const gasData = await obtenerGasEIP1559(provider);
                maxFeePerGas = gasData.maxFeePerGas;

                maxPriorityFeePerGas = gasData.maxPriorityFeePerGas;

                console.log("Gas EIP1559 calculado" );

            } catch (error) {

                console.error("Error obteniendo gas:", error);
                throw error;
            }

            //------------------------------------------------
            // 2️⃣ Estimar gas
            //------------------------------------------------

            let estimatedGas;

            try {

                estimatedGas =
                    await wallet.estimateGas({
                        to: recipientAddress,
                        value: amountInWei
                    });

                console.log("Gas estimado:", estimatedGas.toString());

            } catch (error) {

                console.error( "Error estimando gas:", error );
                throw error;
            }

            //------------------------------------------------
            // 3️⃣ Margen de seguridad
            //------------------------------------------------

            const gasLimit = estimatedGas.mul(140).div(100);

            console.log( "Gas limit final:", gasLimit.toString() );

            //------------------------------------------------
            // 4️⃣ Calcular costo máximo del gas
            //------------------------------------------------

            const estimatedGasCost = gasLimit.mul(maxFeePerGas);

            //------------------------------------------------
            // 5️⃣ Obtener saldo MATIC
            //------------------------------------------------

            const maticBalance = await wallet.getBalance();

            //------------------------------------------------
            // 6️⃣ Verificar saldo suficiente
            //------------------------------------------------

            const totalNeeded = amountInWei.add(estimatedGasCost);

            if (maticBalance.lt(totalNeeded)) {

                loadingAnimation.style.display = 'none';

                alert(
                    "Saldo MATIC insuficiente.\n\n" +
                    "Disponible: " +
                    ethers.utils.formatEther(maticBalance) +
                    " MATIC\n\n" +
                    "Intentas enviar: " +
                    ethers.utils.formatEther(amountInWei) +
                    " MATIC\n\n" +
                    "Gas estimado: " +
                    ethers.utils.formatEther(estimatedGasCost) +
                    " MATIC\n\n" +
                    "Necesitas aproximadamente: " +
                    ethers.utils.formatEther(totalNeeded) +
                    " MATIC"
                );

                return;
            }

            //------------------------------------------------
            // 7️⃣ Enviar transacción
            //------------------------------------------------

            tx =
                await wallet.sendTransaction({
                    to: recipientAddress,
                    value: amountInWei,
                    gasLimit,
                    maxFeePerGas,
                    maxPriorityFeePerGas
                });

            console.log(
                "Transacción enviada:",
                tx.hash
            );

            //------------------------------------------------
            // 8️⃣ Esperar confirmación
            //------------------------------------------------

            const receipt =
                await tx.wait();

            console.log(
                "Confirmada:",
                receipt.transactionHash
            );
        }

        alert("Transferencia de MATIC exitosa.");

        loadingAnimation.style.display = 'none';

        $('#myModalEnviarTokens').modal('hide');

    } catch (error) {

        loadingAnimation.style.display = 'none';

        console.error(
            "Error en la transferencia de MATIC:",
            error
        );

        alert(
            "Error en la transferencia de MATIC.\n\n" +
            (error.reason ||
             error.data?.message ||
             error.message ||
             "Error desconocido")
        );
    }
}

