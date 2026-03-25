function crearSwapUI() {
    const container = document.getElementById("menu_transfer");
    if (!container) return;

    container.innerHTML = "";

    const swapBox = document.createElement("div");
    swapBox.style.maxWidth = "420px";
    swapBox.style.margin = "auto";
    swapBox.style.background = "white";
    swapBox.style.borderRadius = "20px";
    swapBox.style.padding = "25px";
    swapBox.style.boxShadow = "0 6px 25px rgba(0,0,0,0.12)";
    swapBox.style.fontFamily = "Arial";

    // 🔥 TITULO
    const title = document.createElement("h1");
    title.innerText = "SWAPP-INTERCAMBIO";
    title.style.textAlign = "center";
    title.style.color = "dodgerblue";
    title.style.fontSize = "36px";
    title.style.marginBottom = "5px";

    const subtitle = document.createElement("p");
    subtitle.innerText = "Intercambia tus criptomonedas de forma fácil";
    subtitle.style.textAlign = "center";
    subtitle.style.color = "#555";
    subtitle.style.fontSize = "16px";
    subtitle.style.marginBottom = "20px";

    let fromToken = "SOCK";
    let toToken = "POL";

    function getTokenImage(token) {
        return token === "SOCK"
            ? "images/icons/sock_coin.SVG"
            : "images/icons/matic_coin.SVG";
    }

    function crearInput(label, token) {
        const wrapper = document.createElement("div");
        wrapper.style.marginBottom = "18px";

        // 🔥 FROM / TO MÁS GRANDES
        const title = document.createElement("div");
        title.innerText = label;
        title.style.fontSize = "18px";
        title.style.fontWeight = "bold";
        title.style.marginBottom = "8px";
        title.style.color = "#000";

        const box = document.createElement("div");
        box.style.display = "flex";
        box.style.alignItems = "center";
        box.style.justifyContent = "space-between";
        box.style.border = "2px solid #ddd";
        box.style.borderRadius = "14px";
        box.style.padding = "14px";

        const input = document.createElement("input");
        input.type = "number";
        input.placeholder = "0.0";
        input.style.border = "none";
        input.style.outline = "none";
        input.style.fontSize = "26px"; // 🔥 GRANDE
        input.style.width = "100%";
        input.style.color = "#000";

        const tokenBox = document.createElement("div");
        tokenBox.style.display = "flex";
        tokenBox.style.alignItems = "center";
        tokenBox.style.gap = "8px";

        const img = document.createElement("img");
        img.src = getTokenImage(token);
        img.style.width = "34px"; // 🔥 MÁS GRANDE

        const name = document.createElement("span");
        name.innerText = token;
        name.style.fontSize = "20px"; // 🔥 DOBLE
        name.style.fontWeight = "bold";
        name.style.color = "#000";

        tokenBox.appendChild(img);
        tokenBox.appendChild(name);

        box.appendChild(input);
        box.appendChild(tokenBox);

        // 🔥 MAX estilo texto negro
        const maxBtn = document.createElement("span");
        maxBtn.innerText = "max";
        maxBtn.style.marginTop = "6px";
        maxBtn.style.display = "inline-block";
        maxBtn.style.cursor = "pointer";
        maxBtn.style.color = "#000";
        maxBtn.style.fontSize = "14px";

        maxBtn.onclick = async () => {
            const balance = await obtenerBalance(token);
            input.value = balance;
            input.dispatchEvent(new Event('input'));
        };

        wrapper.appendChild(title);
        wrapper.appendChild(box);
        wrapper.appendChild(maxBtn);

        return { wrapper, input, name, img };
    }

    const from = crearInput("FROM", fromToken);
    const to = crearInput("TO", toToken);

    // 🔁 BOTÓN SWAP MÁS GRANDE
    const swapBtn = document.createElement("button");
    swapBtn.innerText = "⇅";
    swapBtn.style.background = "dodgerblue";
    swapBtn.style.color = "white";
    swapBtn.style.border = "none";
    swapBtn.style.borderRadius = "50%";
    swapBtn.style.width = "50px";
    swapBtn.style.height = "50px";
    swapBtn.style.display = "block";
    swapBtn.style.margin = "15px auto";
    swapBtn.style.cursor = "pointer";
    swapBtn.style.fontSize = "20px";

    swapBtn.onclick = () => {
        [fromToken, toToken] = [toToken, fromToken];

        from.name.innerText = fromToken;
        to.name.innerText = toToken;

        from.img.src = getTokenImage(fromToken);
        to.img.src = getTokenImage(toToken);

        from.input.value = "";
        to.input.value = "";
    };

    // 🔄 cálculo automático
    from.input.oninput = async () => {
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

    // 🚀 BOTÓN SWAP PRINCIPAL
    const ejecutarBtn = document.createElement("button");
    ejecutarBtn.innerText = "SWAP";
    ejecutarBtn.style.width = "100%";
    ejecutarBtn.style.padding = "14px";
    ejecutarBtn.style.background = "dodgerblue";
    ejecutarBtn.style.color = "white";
    ejecutarBtn.style.border = "none";
    ejecutarBtn.style.borderRadius = "12px";
    ejecutarBtn.style.fontSize = "18px";
    ejecutarBtn.style.cursor = "pointer";
    ejecutarBtn.style.marginTop = "10px";

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
    swapBox.appendChild(swapBtn);
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
