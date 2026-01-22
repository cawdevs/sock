



async function recargar_con_btc() {
  const contenedor = document.getElementById("recargar-con-btc");
  contenedor.innerHTML = ""; // Limpiar contenido previo

  try {
    const response = await fetch(`https://api.thesocks.net/direccion_btc_eth/${globalWalletKey}`);
    if (!response.ok) throw new Error("Error al obtener la dirección BTC");
    const datos = await response.json(); // { direccion_btc: "...", saldo_btc: "..." }

    // Estilo contenedor principal
    contenedor.style.display = "flex";
    contenedor.style.flexDirection = "column";
    contenedor.style.alignItems = "center";
    contenedor.style.textAlign = "center";

    // Contenedor de dirección con ícono
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.justifyContent = "center";
    wrapper.style.flexWrap = "wrap";
    wrapper.style.marginBottom = "10px";

    const icono = document.createElement("img");
    icono.src = "images/icons/btc_icon.SVG";
    icono.alt = "BTC Icon";
    icono.style.width = "32px";
    icono.style.height = "32px";
    icono.style.marginRight = "10px";

    const direccionBTC = document.createElement("span");
    direccionBTC.textContent = datos.direccion_btc;
    direccionBTC.style.fontWeight = "bold";
    direccionBTC.style.wordBreak = "break-all";

    // Botón copiar
    const copiarIcono = document.createElement("span");
    copiarIcono.className = "glyphicon glyphicon-duplicate";
    copiarIcono.style.color = "green";
    copiarIcono.style.marginLeft = "8px";
    copiarIcono.style.cursor = "pointer";
    copiarIcono.title = "Copiar dirección";

    copiarIcono.onclick = () => {
      navigator.clipboard.writeText(datos.direccion_btc).then(() => {
        copiarIcono.style.color = "darkgreen";
        copiarIcono.title = "Copiado!";
        setTimeout(() => {
          copiarIcono.style.color = "green";
          copiarIcono.title = "Copiar dirección";
        }, 1500);
      });
    };

    wrapper.appendChild(icono);
    wrapper.appendChild(direccionBTC);
    wrapper.appendChild(copiarIcono);
    contenedor.appendChild(wrapper);

    // QR Code
    const qrContainer = document.createElement("div");
    qrContainer.id = "btc-wallet-QR";
    qrContainer.style.margin = "20px auto";
    contenedor.appendChild(qrContainer);

    new QRCode(qrContainer, {
      text: datos.direccion_btc,
      width: 256,
      height: 256,
    });

    // Saldo
    const saldo = document.createElement("div");
    saldo.textContent = `Saldo: ${datos.saldo_btc} BTC`;
    saldo.style.marginTop = "12px";
    saldo.style.fontSize = "18px";
    saldo.style.fontWeight = "bold";
    contenedor.appendChild(saldo);

    // Botón Convertir
    const botonConvertir = document.createElement("button");
    botonConvertir.textContent = "Convertir";
    botonConvertir.style.marginTop = "16px";
    botonConvertir.style.padding = "8px 20px";
    botonConvertir.style.fontSize = "16px";
    botonConvertir.style.cursor = "pointer";
    contenedor.appendChild(botonConvertir);

    // ======== SLIDER con etiquetas a los lados ========
    const sliderContainer = document.createElement("div");
    sliderContainer.style.display = "flex";
    sliderContainer.style.alignItems = "center";
    sliderContainer.style.marginTop = "24px";
    sliderContainer.style.width = "100%";
    sliderContainer.style.padding = "0 10px";

    const labelIzquierda = document.createElement("span");
    labelIzquierda.textContent = "100% POL";
    labelIzquierda.style.color = "purple";
    labelIzquierda.style.marginRight = "10px";
    labelIzquierda.style.fontWeight = "bold";

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = 0;
    slider.max = 100;
    slider.value = 50;
    slider.style.flex = "1";

    const labelDerecha = document.createElement("span");
    labelDerecha.textContent = "100% SOCKS";
    labelDerecha.style.color = "green";
    labelDerecha.style.marginLeft = "10px";
    labelDerecha.style.fontWeight = "bold";

    sliderContainer.appendChild(labelIzquierda);
    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(labelDerecha);
    contenedor.appendChild(sliderContainer);
  } catch (error) {
    contenedor.innerHTML = "<p style='color:red'>No se pudo obtener la dirección BTC</p>";
    console.error(error);
  }
}



async function obtenerSaldo_BTC() {

  let saldoElementBTC = document.getElementById('saldo_BTC');

  try {
    const response = await fetch(`https://api.thesocks.net/direccion_btc_eth/${globalWalletKey}`);
    if (!response.ok) throw new Error("Error al obtener la dirección BTC");

    const datos = await response.json(); 
    // { direccion_btc: "...", saldo_btc: "..." }

    const balanceBTC = datos.saldo_btc; // 👈 ojo con el nombre exacto

    const truncatedBalanceBTC = parseFloat(balanceBTC).toFixed(7);

    saldoElementBTC.innerText = truncatedBalanceBTC;
    saldoElementBTC.style.color = 'orange';

  } catch (error) {

    saldoElementBTC.innerText = "???";
    saldoElementBTC.style.color = 'red';
    console.error(error);
  }
}




