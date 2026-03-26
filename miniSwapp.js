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


async function ejecutarSwap(fromToken, toToken, amount) {
    try {
        console.log("Swapping:", amount, fromToken, "→", toToken);

        // aquí iría tu contrato
        // usando ethers.js

        // ejemplo base:
        /*
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
            ROUTER_ADDRESS,
            ROUTER_ABI,
            signer
        );

        await contract.swapExactTokensForTokens(...);
        */

        alert("Swap ejecutado (simulado)");

    } catch (err) {
        console.error(err);
        alert("Error en swap");
    }
}


function single_swapp() {
    crearSwapUI();
}
