function crearSwapUI() {
    const container = document.getElementById("menu_transfer");
    if (!container) return;

    container.innerHTML = "";

    const swapBox = document.createElement("div");
    swapBox.style.maxWidth = "400px";
    swapBox.style.margin = "auto";
    swapBox.style.background = "white";
    swapBox.style.borderRadius = "16px";
    swapBox.style.padding = "20px";
    swapBox.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
    swapBox.style.fontFamily = "Arial";

    let fromToken = "SOCK";
    let toToken = "POL";

    function getTokenImage(token) {
        return token === "SOCK"
            ? "images/icons/sock_coin.SVG"
            : "images/icons/matic_coin.SVG";
    }

    function crearInput(label, token) {
        const wrapper = document.createElement("div");
        wrapper.style.marginBottom = "15px";

        const title = document.createElement("div");
        title.innerText = label;
        title.style.fontSize = "12px";
        title.style.marginBottom = "5px";

        const box = document.createElement("div");
        box.style.display = "flex";
        box.style.alignItems = "center";
        box.style.justifyContent = "space-between";
        box.style.border = "1px solid #ddd";
        box.style.borderRadius = "10px";
        box.style.padding = "10px";

        const input = document.createElement("input");
        input.type = "number";
        input.placeholder = "0.0";
        input.style.border = "none";
        input.style.outline = "none";
        input.style.fontSize = "18px";
        input.style.width = "100%";

        const tokenBox = document.createElement("div");
        tokenBox.style.display = "flex";
        tokenBox.style.alignItems = "center";
        tokenBox.style.gap = "5px";

        const img = document.createElement("img");
        img.src = getTokenImage(token);
        img.style.width = "22px";

        const name = document.createElement("span");
        name.innerText = token;

        tokenBox.appendChild(img);
        tokenBox.appendChild(name);

        box.appendChild(input);
        box.appendChild(tokenBox);

        // MAX button
        const maxBtn = document.createElement("button");
        maxBtn.innerText = "MAX";
        maxBtn.style.marginTop = "5px";
        maxBtn.style.background = "dodgerblue";
        maxBtn.style.color = "white";
        maxBtn.style.border = "none";
        maxBtn.style.padding = "5px 10px";
        maxBtn.style.borderRadius = "6px";
        maxBtn.style.cursor = "pointer";

        maxBtn.onclick = async () => {
            const balance = await obtenerBalance(token);
            input.value = balance;
            input.dispatchEvent(new Event('input')); // 🔥 recalcula automático
        };

        wrapper.appendChild(title);
        wrapper.appendChild(box);
        wrapper.appendChild(maxBtn);

        return { wrapper, input, name, img };
    }

    const from = crearInput("From", fromToken);
    const to = crearInput("To", toToken);

    // 🔁 botón swap
    const swapBtn = document.createElement("button");
    swapBtn.innerText = "⇅";
    swapBtn.style.background = "dodgerblue";
    swapBtn.style.color = "white";
    swapBtn.style.border = "none";
    swapBtn.style.borderRadius = "50%";
    swapBtn.style.width = "40px";
    swapBtn.style.height = "40px";
    swapBtn.style.display = "block";
    swapBtn.style.margin = "10px auto";
    swapBtn.style.cursor = "pointer";

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

    // 🚀 botón swap
    const ejecutarBtn = document.createElement("button");
    ejecutarBtn.innerText = "Swap";
    ejecutarBtn.style.width = "100%";
    ejecutarBtn.style.padding = "12px";
    ejecutarBtn.style.background = "dodgerblue";
    ejecutarBtn.style.color = "white";
    ejecutarBtn.style.border = "none";
    ejecutarBtn.style.borderRadius = "10px";
    ejecutarBtn.style.fontSize = "16px";
    ejecutarBtn.style.cursor = "pointer";

    ejecutarBtn.onclick = async () => {
        const amount = Number(from.input.value);

        if (!amount) {
            alert("Ingresa cantidad");
            return;
        }

        await ejecutarSwap(fromToken, toToken, amount);
    };

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
