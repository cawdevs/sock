



async function recargar_con_btc() {
  const contenedor = document.getElementById("recargar-con-btc");
  contenedor.innerHTML = ""; // Limpiar contenido previo

  try {
    // Llamar a Django para obtener dirección BTC y saldo
    const response = await fetch(`https://api.thesocks.net/direccion_btc_eth/${globalWalletKey}`);
                                
    if (!response.ok) {
      throw new Error("Error al obtener la dirección BTC");
    }

    const datos = await response.json(); // { direccion_btc: "...", saldo_btc: "..." }

    // Crear contenedor principal de info BTC
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "10px";

    // Crear imagen
    const icono = document.createElement("img");
    icono.src = "images/icons/btc_icon.SVG";
    icono.alt = "BTC Icon";
    icono.style.width = "32px";
    icono.style.height = "32px";

    // Crear texto de dirección
    const direccionBTC = document.createElement("span");
    direccionBTC.textContent = datos.direccion_btc;
    direccionBTC.style.fontWeight = "bold";
    direccionBTC.style.wordBreak = "break-all";

    // Añadir imagen + dirección al contenedor
    wrapper.appendChild(icono);
    wrapper.appendChild(direccionBTC);
    contenedor.appendChild(wrapper);

    // Crear contenedor para el QR
    const qrContainer = document.createElement("div");
    qrContainer.id = "btc-wallet-QR";
    qrContainer.style.marginTop = "10px";
    contenedor.appendChild(qrContainer);

    // Crear QR
    var qrcode = new QRCode(qrContainer, {
      text: datos.direccion_btc,
      width: 256,
      height: 256,
    });

    // Mostrar saldo
    const saldo = document.createElement("div");
    saldo.textContent = `Saldo: ${datos.saldo_btc} BTC`;
    saldo.style.marginTop = "10px";
    contenedor.appendChild(saldo);

    // Botón convertir
    const botonConvertir = document.createElement("button");
    botonConvertir.textContent = "Convertir";
    botonConvertir.style.marginTop = "10px";
    contenedor.appendChild(botonConvertir);
  } catch (error) {
    contenedor.innerHTML = "<p style='color:red'>No se pudo obtener la dirección BTC</p>";
    console.error(error);
  }
}