function crearSwapUI() {
    const container = document.getElementById("menu_transfer");
    if (!container) return;

    container.innerHTML = "";

    const swapBox = document.createElement("div");
    swapBox.style.maxWidth = "420px";
    swapBox.style.margin = "auto";
    swapBox.style.background = "white";
    swapBox.style.borderRadius = "20px";
    swapBox.style.padding = "20px";
    swapBox.style.boxShadow = "0 6px 25px rgba(0,0,0,0.12)";
    swapBox.style.fontFamily = "Arial";

    // 🔥 TITULO
    const title = document.createElement("h1");
    title.innerText = "INTERCAMBIO";
    title.style.textAlign = "center";
    title.style.color = "dodgerblue";
    title.style.fontSize = "32px";
    title.style.marginBottom = "5px";

    const subtitle = document.createElement("p");
    subtitle.innerText = "Intercambia tus criptomonedas de forma fácil";
    subtitle.style.textAlign = "center";
    subtitle.style.color = "#555";
    subtitle.style.fontSize = "14px";
    subtitle.style.marginBottom = "15px";

    let fromToken = "SOCK";
    let toToken = "POL";

    function getTokenImage(token) {
        return token === "SOCK"
            ? "images/icons/sock_coin.SVG"
            : "images/icons/matic_coin.SVG";
    }

    function crearInput(label, token, esFrom = false) {
        const wrapper = document.createElement("div");
        wrapper.style.marginBottom = "8px"; // 🔥 más compacto

        const title = document.createElement("div");
        title.innerText = label;
        title.style.fontSize = "16px";
        title.style.fontWeight = "bold";
        title.style.marginBottom = "4px";

        const box = document.createElement("div");
        box.style.display = "flex";
        box.style.alignItems = "center";
        box.style.justifyContent = "space-between";
        box.style.border = "2px solid #ddd";
        box.style.borderRadius = "12px";
        box.style.padding = "10px";

        const input = document.createElement("input");
        input.type = "number";
        input.placeholder = "0.0";
        input.style.border = "none";
        input.style.outline = "none";
        input.style.fontSize = "22px";
        input.style.width = "100%";
        input.style.color = "#000";

        const tokenBox = document.createElement("div");
        tokenBox.style.display = "flex";
        tokenBox.style.alignItems = "center";
        tokenBox.style.gap = "6px";

        const img = document.createElement("img");
        img.src = getTokenImage(token);
        img.style.width = "28px";

        const name = document.createElement("span");
        name.innerText = token;
        name.style.fontSize = "18px";
        name.style.fontWeight = "bold";

        tokenBox.appendChild(img);
        tokenBox.appendChild(name);

        box.appendChild(input);
        box.appendChild(tokenBox);

        wrapper.appendChild(title);
        wrapper.appendChild(box);

        // 🔥 SOLO PARA FROM
        if (esFrom) {
            const maxBtn = document.createElement("button");
            maxBtn.innerText = "max";
            maxBtn.style.marginTop = "3px";
            maxBtn.style.background = "black";
            maxBtn.style.color = "white";
            maxBtn.style.border = "none";
            maxBtn.style.padding = "3px 8px";
            maxBtn.style.borderRadius = "6px";
            maxBtn.style.cursor = "pointer";
            maxBtn.style.fontSize = "12px";

            maxBtn.onclick = async () => {
                let balance = await obtenerBalance(token);

                // 🔥 restar 1 solo si es POL
                if (token === "POL") {
                    balance = Math.max(balance - 1, 0);
                }

                input.value = balance;
            };

            wrapper.appendChild(maxBtn);
        }

        return { wrapper, input, name, img };
    }


    const from = crearInput("FROM", fromToken, true);
    const to = crearInput("TO", toToken, false);

    // 🔁 BOTÓN SWAP
    const swapBtn = document.createElement("button");
    swapBtn.innerText = "⇅";
    swapBtn.style.background = "dodgerblue";
    swapBtn.style.color = "white";
    swapBtn.style.border = "none";
    swapBtn.style.borderRadius = "50%";
    swapBtn.style.width = "45px";
    swapBtn.style.height = "45px";
    swapBtn.style.cursor = "pointer";
    swapBtn.style.fontSize = "18px";

    swapBtn.onclick = () => {
        [fromToken, toToken] = [toToken, fromToken];

        from.name.innerText = fromToken;
        to.name.innerText = toToken;

        from.img.src = getTokenImage(fromToken);
        to.img.src = getTokenImage(toToken);

        from.input.value = "";
        to.input.value = "";
    };

    // 🔥 BOTÓN CALCULAR
    const calcularBtn = document.createElement("button");
    calcularBtn.innerText = "Calcular";
    calcularBtn.style.background = "dodgerblue";
    calcularBtn.style.color = "white";
    calcularBtn.style.border = "none";
    calcularBtn.style.borderRadius = "10px";
    calcularBtn.style.padding = "10px";
    calcularBtn.style.cursor = "pointer";
    calcularBtn.style.fontSize = "14px";

    calcularBtn.onclick = async () => {
        const amount = Number(from.input.value);
        if (!amount) return;

        const price = await obtenerPrecio();
        if (!price) return;

        let result;

        if (fromToken === "SOCK") {
            result = amount * price;
        } else {
            result = amount / price;
        }

        to.input.value = result.toFixed(6);
    };

    // 🔥 CONTENEDOR CENTRAL
    const centerBox = document.createElement("div");
    centerBox.style.display = "flex";
    centerBox.style.alignItems = "center";
    centerBox.style.justifyContent = "center";
    centerBox.style.gap = "10px";
    centerBox.style.margin = "10px 0";

    centerBox.appendChild(calcularBtn);
    centerBox.appendChild(swapBtn);

    // 🚀 BOTÓN FINAL
    const ejecutarBtn = document.createElement("button");
    ejecutarBtn.innerText = "SWAP";
    ejecutarBtn.style.width = "100%";
    ejecutarBtn.style.padding = "12px";
    ejecutarBtn.style.background = "dodgerblue";
    ejecutarBtn.style.color = "white";
    ejecutarBtn.style.border = "none";
    ejecutarBtn.style.borderRadius = "10px";
    ejecutarBtn.style.fontSize = "16px";
    ejecutarBtn.style.cursor = "pointer";
    ejecutarBtn.style.marginTop = "8px";

    ejecutarBtn.onclick = async () => {
        const amount = Number(from.input.value);

        if (!amount) {
            alert("Ingresa cantidad");
            return;
        }

        await ejecutarSwap(fromToken, toToken, amount);
    };

    // 🔥 ENSAMBLAR
    swapBox.appendChild(title);
    swapBox.appendChild(subtitle);
    swapBox.appendChild(from.wrapper);
    swapBox.appendChild(centerBox);
    swapBox.appendChild(to.wrapper);
    swapBox.appendChild(ejecutarBtn);

    container.appendChild(swapBox);
}


async function obtenerBalance(token) {
    // aquí conectas tu wallet interna
    if (token === "SOCK") {
        return await obtenerSaldoSOCK();
    } else {
        return await obtenerSaldoPOL();
    }
}


async function obtenerPrecio() {
    const res = await fetch("https://api.thesocks.net/precio-sock/");
    const data = await res.json();

    return Number(data.price);
}



const ROUTER = "0xf5b509bB0909a69B1c207E495f687a596C168E12";

const ROUTER_ABI = [
    "function exactInputSingle(tuple(address tokenIn,address tokenOut,address recipient,uint256 deadline,uint256 amountIn,uint256 amountOutMinimum,uint160 limitSqrtPrice)) payable returns (uint256 amountOut)"
];

const ERC20_ABI = [
    "function approve(address spender, uint amount) external returns (bool)",
    "function allowance(address owner, address spender) view returns (uint)"
];

async function ejecutarSwap(fromToken, toToken, amount) {


    const loadingAnimation = document.getElementById('loadingAnimation-swapp');
        loadingAnimation.style.display = 'block';
        
    try {

        


        console.log("🔄 Swap:", amount, fromToken, "→", toToken);

        if (!amount || Number(amount) <= 0) {
            alert("Cantidad inválida");
            return;
        }

        const ROUTER = "0xf5b509bB0909a69B1c207E495f687a596C168E12";
        const SOCK = "0x8f78976a0FDF8F66Ad81bb7D7c9b8D4A695022E3";
        const WPOL = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";

        const ROUTER_ABI = [
            "function exactInputSingle(tuple(address tokenIn,address tokenOut,address recipient,uint256 deadline,uint256 amountIn,uint256 amountOutMinimum,uint160 limitSqrtPrice)) payable returns (uint256 amountOut)"
        ];

        const ERC20_ABI = [
            "function approve(address spender, uint amount) external returns (bool)",
            "function allowance(address owner, address spender) view returns (uint)"
        ];

        const amountIn = ethers.utils.parseUnits(amount.toString(), 18);
        const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

        let tokenIn, tokenOut, value = 0;

        if (fromToken === "SOCK" && toToken === "POL") {
            tokenIn = SOCK;
            tokenOut = WPOL;
        } 
        else if (fromToken === "POL" && toToken === "SOCK") {
            tokenIn = WPOL;
            tokenOut = SOCK;
            value = amountIn;
        } 
        else {
            throw new Error("Par no soportado");
        }

        // 🔥 obtener precio desde tu backend
        const res = await fetch("https://api.thesocks.net/precio-sock/");
        const data = await res.json();

        const price = Number(data.price);

        if (!price || price <= 0) {
            throw new Error("Precio inválido");
        }

        // 🔥 calcular output esperado
        let expectedOut;

        if (fromToken === "SOCK") {
            expectedOut = amount * price;
        } else {
            expectedOut = amount / price;
        }

        // 🔥 aplicar slippage (2%)
        const minOut = calcularMinimo(expectedOut, 2);

        // 🔥 convertir a wei
        const amountOutMinimum = ethers.utils.parseUnits(
            minOut.toFixed(18),
            18
        );

        console.log("💰 Esperado:", expectedOut);
        console.log("🛡️ Mínimo con slippage:", minOut);

        // 🔥 PARAMS SEGUROS
        const params = {
            tokenIn,
            tokenOut,
            recipient: globalWalletKey,
            deadline,
            amountIn,
            amountOutMinimum,
            limitSqrtPrice: 0
        };

        // =====================================================
        // 🦊 METAMASK (web3.js)
        // =====================================================
        if (tokenContract.methods) {

            console.log("🦊 MetaMask swap");

            const routerWeb3 = new web3.eth.Contract(ROUTER_ABI, ROUTER);

            // ⚠️ Aquí normalmente V3 no es compatible directo con web3 tuple
            // 👉 RECOMENDACIÓN: usa ethers también con MetaMask

            const signer = provider.getSigner();
            const router = new ethers.Contract(ROUTER, ROUTER_ABI, signer);

            const tx = await router.exactInputSingle(params, {
                value: value
            });

            await tx.wait();

            console.log("✅ Swap completado (MetaMask)");
        }

        // =====================================================
        // 🔐 SOCK WALLET (ethers.js)
        // =====================================================
        else {

            console.log("🔐 SockWallet swap");

            const signer = new ethers.Wallet(
                localStorage.getItem("privateKey"),
                provider
            );

            const router = new ethers.Contract(ROUTER, ROUTER_ABI, signer);

            const token = new ethers.Contract(SOCK, ERC20_ABI, signer);

            // 🔥 GAS DINÁMICO (tu solución)
            const { maxFeePerGas, maxPriorityFeePerGas } =
                await obtenerGasEIP1559(provider);

            // 🔥 APPROVE
            if (fromToken === "SOCK") {
                const allowance = await token.allowance(
                    globalWalletKey,
                    ROUTER
                );

                if (allowance.lt(amountIn)) {

                    const approveTx = await token.approve(
                        ROUTER,
                        amountIn,
                        {
                            maxFeePerGas,
                            maxPriorityFeePerGas
                        }
                    );

                    await approveTx.wait();
                    console.log("✅ Approve OK");
                }
            }

            // 🔥 ESTIMAR GAS
            const estimatedGas = await router.estimateGas.exactInputSingle(
                params,
                { value }
            );

            const gasLimit = estimatedGas.mul(120).div(100);

            // 🚀 SWAP
            const tx = await router.exactInputSingle(
                params,
                {
                    value,
                    gasLimit,
                    maxFeePerGas,
                    maxPriorityFeePerGas
                }
            );

            console.log("📡 TX:", tx.hash);

            await tx.wait();

            console.log("✅ Swap completado");
        }

        loadingAnimation.style.display = 'none';
        alert("Swap realizado con éxito 🚀");


           
    } catch (error) {
        console.error("❌ Error en swap:", error);
        loadingAnimation.style.display = 'none';
        alert("Error en swap");
    }
}


function calcularMinimo(amountOut, slippage = 2) {
    const porcentaje = (100 - slippage) / 100;
    return amountOut * porcentaje;
}

function single_swapp() {
    crearSwapUI();
}
