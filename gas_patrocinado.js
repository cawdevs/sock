async function probarGasSponsorship() {

    const alchemyApiKey = "8gJweGU1u8NB60FICShTvPFy3oUu_zsA";

    const policyId =
        "d1210abe-1f5f-4bd0-81d1-30b494b1f9bb";

    const chainId = "0x89"; // Polygon Mainnet

    const walletAddress = signer.address;

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
                                to: walletAddress,
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

    return result;
}



document.getElementById("btnGasSponsorship").addEventListener("click", async () => {
    try {
        await probarGasSponsorship();
    } catch (error) {
        console.error("Error probando Gas Sponsorship:", error);
    }
});