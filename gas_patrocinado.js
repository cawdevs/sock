async function probarGasSponsorship() {

    const alchemyApiKey = "8gJweGU1u8NB60FICShTvPFy3oUu_zsA";
    const policyId = "d1210abe-1f5f-4bd0-81d1-30b494b1f9bb";
    const chainId = "0x89";
    const walletAddress = globalWalletKey;

    // Wallet
    const privateKey = localStorage.getItem("privateKey");

    if (!privateKey) {
        throw new Error("No existe privateKey en localStorage");
    }

    //const signer = new ethers.Wallet(privateKey, provider);

    console.log("🔐 Wallet:", signer.address);

    // Preparar operación
    const response = await fetch(
        `https://api.g.alchemy.com/v2/${alchemyApiKey}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "wallet_prepareCalls",
                params: [
                    {
                        from: walletAddress,
                        chainId: chainId,

                        calls: [
                            {
                                to: "0x0000000000000000000000000000000000000000",
                                value: "0x0",
                                data: "0x"
                            }
                        ],

                        capabilities: {
                            paymasterService: {
                                policyId: policyId
                            }
                        }
                    }
                ]
            })
        }
    );

    const result = await response.json();

    if (!result.result) {
        console.error("❌ Error de Alchemy:", result);
        return result;
    }

    console.log("📦 Preparación:", result.result);

    const prepared = result.result;

    // ------------------------------------------------
    // CASO 1: primera operación EIP-7702
    // ------------------------------------------------

    if (Array.isArray(prepared.data)) {

        const data = prepared.data;

        console.log("🔐 Primera operación EIP-7702");

        if (data.length !== 2) {
            throw new Error(
                "Estructura EIP-7702 inesperada: " +
                JSON.stringify(data)
            );
        }

        // Firma autorización
        const authRequest = data[0].signatureRequest;
        const authPayload = authRequest.rawPayload;

        const signingKey =
            new ethers.utils.SigningKey(privateKey);

        const authSignature =
            ethers.utils.joinSignature(
                signingKey.signDigest(authPayload)
            );

        // Firma UserOperation
        const userOpRequest =
            data[1].signatureRequest;

        const userOpHash =
            userOpRequest.data.raw;

        const userOpSignature =
            await signer.signMessage(
                ethers.utils.arrayify(userOpHash)
            );

        window.signedPreparedCalls = {

            type: "array",

            data: [

                {
                    ...data[0],

                    signature: {
                        type: "secp256k1",
                        data: authSignature
                    }
                },

                {
                    ...data[1],

                    signature: {
                        type: "secp256k1",
                        data: userOpSignature
                    }
                }

            ],

            capabilities: {
                paymasterService: {
                    policyId: policyId
                }
            }
        };

        console.log("✅ Operación firmada.");

        return result;
    }


    // ------------------------------------------------
    // CASO 2: cuenta EIP-7702 ya delegada
    // ------------------------------------------------

    if (prepared.type === "user-operation-v070") {

        console.log("🔐 Cuenta EIP-7702 ya delegada.");

        const userOpRequest =
            prepared.signatureRequest;

        const userOpHash =
            userOpRequest.data.raw;

        const userOpSignature =
            await signer.signMessage(
                ethers.utils.arrayify(userOpHash)
            );

        window.signedPreparedCalls = {

            type: "user-operation-v070",

            data: {
                ...prepared.data
            },

            chainId: prepared.chainId,

            signature: {
                type: "secp256k1",
                data: userOpSignature
            },

            capabilities: {
                paymasterService: {
                    policyId: policyId
                }
            }
        };

        console.log("✅ Operación firmada.");

        return result;
    }


    throw new Error(
        "Tipo de respuesta no reconocido: " +
        prepared.type
    );
}



async function enviarGasSponsorship() {

    const alchemyApiKey = "8gJweGU1u8NB60FICShTvPFy3oUu_zsA";

    if (!window.signedPreparedCalls) {
        console.error(
            "❌ Primero debes preparar y firmar la operación."
        );
        return;
    }

    console.log("🚀 Enviando operación patrocinada...");

    const response = await fetch(
        `https://api.g.alchemy.com/v2/${alchemyApiKey}`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 2,
                method: "wallet_sendPreparedCalls",

                params: [
                    window.signedPreparedCalls
                ]
            })
        }
    );

    const result = await response.json();

    console.log("📨 Respuesta wallet_sendPreparedCalls:");
    console.log(result);

    // ==========================================
    // CONSULTAR ESTADO DE LA OPERACIÓN
    // ==========================================

    const callId = result.id;

    console.log("🔎 Call ID:", callId);
    console.log("⏳ Consultando estado de la operación...");

    let transactionHash = null;

    for (let intento = 0; intento < 30; intento++) {

        const statusResponse = await fetch(
            `https://api.g.alchemy.com/v2/${alchemyApiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    id: 3,
                    method: "wallet_getCallsStatus",
                    params: [callId]
                })
            }
        );

        const statusData = await statusResponse.json();

        console.log("📊 Estado:", statusData);

        if (statusData.error) {
            console.error("❌ Error consultando estado:", statusData.error);
            return;
        }

        const status = statusData.result.status;

        console.log("🔢 Código de estado:", status);

        // 100 = pendiente
        if (status === 100) {

            console.log("⏳ La operación sigue pendiente...");

            // Esperar 2 segundos
            await new Promise(resolve => setTimeout(resolve, 2000));

            continue;
        }

        // 200 = confirmada
        if (status === 200) {

            console.log("✅ OPERACIÓN CONFIRMADA");

            if (
                statusData.result.receipts &&
                statusData.result.receipts.length > 0
            ) {

                transactionHash =
                    statusData.result.receipts[0].transactionHash;

                console.log(
                    "🎉 Transaction Hash:",
                    transactionHash
                );

                console.log(
                    "🔗 PolygonScan:",
                    "https://polygonscan.com/tx/" + transactionHash
                );

            } else {

                console.warn(
                    "⚠️ La operación está confirmada pero no se encontró receipt."
                );
            }

            break;
        }

        // 400 / 500 / 600 = algún tipo de fallo
        console.error(
            "❌ La operación terminó con estado:",
            status
        );

        console.error(
            "Detalles:",
            statusData.result
        );

        break;
    }

    if (!transactionHash) {
        console.warn(
            "⚠️ No se obtuvo transactionHash todavía."
        );
    }





    if (result.error) {

        console.error(
            "❌ Alchemy rechazó la operación:",
            result.error
        );

        return;
    }

    console.log(
        "✅ Operación enviada:",
        result.result
    );
}




document.getElementById("btnGasSponsorship").addEventListener("click", async () => {
    try {
        await probarGasSponsorship();
    } catch (error) {
        console.error("Error probando Gas Sponsorship:", error);
    }
});


document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("btnEnviarGasSponsorship")
        .addEventListener("click", async () => {

            try {

                await enviarGasSponsorship();

            } catch (error) {

                console.error(
                    "❌ Error enviando operación:",
                    error
                );
            }

        });

});