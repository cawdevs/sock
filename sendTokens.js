

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
async function transferSockTokens(recipientAddress, amount) {
	alert("eSock"+  recipientAddress +amount); 
    try {
        // Convertir la cantidad a Wei según los decimales del contrato (18 decimales en ERC20)
        const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);                
        // Transferir los tokens SOCK
        let tx;
        if (tokenContract.methods) {
            // Usando MetaMask (Web3.js)
            tx = await tokenContract.methods.transfer(recipientAddress, amountInWei).send({
                from: globalWalletKey,
                gasLimit: 300000,
                gasPrice: web3.utils.toWei('60', 'gwei'),
            });
        } else {
            // Usando SockWallet (Ethers.js)
            tx = await tokenContract.transfer(recipientAddress, amountInWei, {
                gasLimit: 300000,
                gasPrice: ethers.utils.parseUnits('90', 'gwei'),
            });
            console.log("Transacción enviada con SockWallet:", tx.hash);
            await tx.wait(); // Confirmar la transacción.
        }

        alert("Transferencia de SOCK exitosa.");

    } catch (error) {
        console.error("Error en la transferencia de SOCK:", error);
        alert("Error en la transferencia de SOCK.");
    }
}




// Transferencia de MATIC
async function transferMatic(recipientAddress, amount) {
	alert("Matic"+  recipientAddress +amount); 
    try {
        const amountInWei = ethers.utils.parseEther(amount.toString());

       
        // Transferir MATIC
        let tx;
        if (window.ethereum) {
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
            // Usando SockWallet (Ethers.js)
            tx = await wallet.sendTransaction({
                to: recipientAddress,
                value: amountInWei,
                gasLimit: 300000,
                gasPrice: ethers.utils.parseUnits('90', 'gwei'),
            });
            console.log("Transacción enviada con SockWallet:", tx.hash);
            await tx.wait(); // Confirmar la transacción.
        }

        alert("Transferencia de MATIC exitosa.");
    } catch (error) {
        console.error("Error en la transferencia de MATIC:", error);
        alert("Error en la transferencia de MATIC.");
    }
}

