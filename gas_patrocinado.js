async function probarGasSponsorship() {

    const alchemyApiKey = "8gJweGU1u8NB60FICShTvPFy3oUu_zsA";

    const policyId =
        "d1210abe-1f5f-4bd0-81d1-30b494b1f9bb";

    const chainId = "0x89"; // Polygon Mainnet

    const walletAddress = globalWalletKey;


    // ==========================================
    // WALLET / SIGNER
    // ==========================================

    const privateKey = localStorage.getItem("privateKey");

    if (!privateKey) {
        throw new Error("No existe privateKey en localStorage");
    }

    //const signer = new ethers.Wallet(privateKey, provider);

    console.log("🔐 Wallet:", signer.address);


    // ==========================================
    // PREPARAR OPERACIÓN
    // ==========================================

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


    console.log("Respuesta Alchemy:");
    console.log(result);


    if (!result.result) {
        console.error("❌ Alchemy devolvió un error:", result);
        return result;
    }


    console.log("DATA:", result.result.data);
    console.log("DETALLES:", result.result.details);

    const data = result.result.data;

    console.log("Tipo de respuesta:", result.result.type);


    // ==========================================
    // PRIMERA OPERACIÓN EIP-7702
    // ==========================================

    if (Array.isArray(data) && data.length === 2) {


        // ==========================================
        // 1. FIRMA DE AUTORIZACIÓN EIP-7702
        // ==========================================

        const authRequest =
            data[0].signatureRequest;

        console.log(
            "🔐 Authorization request:",
            authRequest
        );


        const authPayload =
            authRequest.rawPayload;


        // IMPORTANTE:
        // EIP-7702 necesita firmar el digest directamente.
        // NO usar signMessage() aquí.

        const signingKey =
            new ethers.utils.SigningKey(privateKey);


        const authSignatureObject =
            signingKey.signDigest(authPayload);


        const authSignature =
            ethers.utils.joinSignature(
                authSignatureObject
            );


        console.log("✅ Firma EIP-7702:");
        console.log(authSignature);


        // ==========================================
        // 2. FIRMA DE USER OPERATION
        // ==========================================

        const userOpRequest =
            data[1].signatureRequest;


        console.log(
            "🔐 UserOperation request:",
            userOpRequest
        );


        const userOpHash =
            userOpRequest.data.raw;


        // UserOperation usa personal_sign
        const userOpSignature =
            await signer.signMessage(
                ethers.utils.arrayify(userOpHash)
            );


        console.log("✅ Firma UserOperation:");
        console.log(userOpSignature);


        // ==========================================
        // VALIDACIONES
        // ==========================================

        console.log(
            "📏 Longitud firma EIP-7702:",
            authSignature.length
        );

        console.log(
            "📏 Longitud firma UserOperation:",
            userOpSignature.length
        );


        // NO ENVIAMOS TODAVÍA
        console.log(
            "⏸️ Firmas preparadas. Todavía NO se ha enviado la operación."
        );
    }


    return result;
}




document.getElementById("btnGasSponsorship").addEventListener("click", async () => {
    try {
        await probarGasSponsorship();
    } catch (error) {
        console.error("Error probando Gas Sponsorship:", error);
    }
});