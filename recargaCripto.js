
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
    /*
    const botonConvertir = document.createElement("button");
    botonConvertir.textContent = "Convertir";
    botonConvertir.style.marginTop = "16px";
    botonConvertir.style.padding = "8px 20px";
    botonConvertir.style.fontSize = "16px";
    botonConvertir.style.cursor = "pointer";
    contenedor.appendChild(botonConvertir);

     // Agregar evento de clic
    botonConvertir.addEventListener('click', async function(event) {
        event.preventDefault(); // Evita que el enlace navegue a otra página
        
        await convertBTC_to_SOCK(); // Llama a la función asíncrona
        console.log('Conversión BTC a SOCK '); 
         
        
        
    });
    */


    /*

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
    */

    //si el saldo btc es cero o muy minimo que no paresca el boton

   
    const saldo = parseFloat(datos.saldo_btc || 0);

    boton_convertir_BTC_SOCK = document.getElementById('boton-convertir-BTC-SOCK');

    if (saldo > 0) {
        boton_convertir_BTC_SOCK.style.display = "block";
    } else {
        boton_convertir_BTC_SOCK.style.display = "none";
    }

    cargarEstado(); //carga el estado de las transacciones BTC del usuario


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

    //const balanceBTC = datos.saldo_btc; // 👈 ojo con el nombre exacto

    //const truncatedBalanceBTC = parseFloat(balanceBTC).toFixed(7);

    saldoElementBTC.innerText = datos.saldo_btc;
    saldoElementBTC.style.color = 'white';
    return datos.saldo_btc; 


  } catch (error) {

    saldoElementBTC.innerText = "???";
    saldoElementBTC.style.color = 'red';
    console.error(error);
    return false;
  }
}


/*
async function convertBTC_to_SOCK() {
    try {
        const saldoBTC = await obtenerSaldo_BTC();
        console.log("Saldo BTC:", saldoBTC);     

        const cantidadBTC = 0.0001; // ejemplo

        if (saldoBTC < cantidadBTC) {
            console.log("Saldo insuficiente");
            return;
        }
        

        console.log("Conversión completada");
    } catch (error) {
        console.error("Error en conversión:", error);
    }
}

*/

///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////





let orderId = null;
async function iniciarConversion() {

    const mensaje = document.getElementById("mensaje_btc");

    mensaje.innerText = "⏳ Enviando BTC...";

    try {
        const res = await fetch("https://api.thesocks.net/iniciar_conversion_BTC_SOCK/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                direccion_eth: globalWalletKey
            })
        });

        const data = await res.json();

        if (data.error) {
            mensaje.innerText = "❌ " + data.error;
            return;
        }

        // 🔥 guardar ID
        localStorage.setItem("conversion_id", data.order_id);

        mensaje.innerText = "✅ BTC enviado\nTXID: " + data.txid;

        mostrarBotonConsultar(data.order_id);

    } catch (e) {
        mensaje.innerText = "❌ Error de red";
    }
}

async function consultarEstado(id) {

    const mensaje = document.getElementById("mensaje_btc");

    mensaje.innerText = "🔍 Consultando confirmaciones...";

    const res = await fetch(`https://api.thesocks.net/consultar_estado/${id}/`);
    const data = await res.json();

    if (data.error) {
        mensaje.innerText = "❌ " + data.error;
        return;
    }

    mensaje.innerText =
        "Confirmaciones: " + data.confirmaciones;

    if (data.estado === "confirmado") {
        mensaje.innerText += "\n✅ Confirmado";
        mostrarBotonReclamar(id);
    }
}


async function reclamarSock(id) {

    const mensaje = document.getElementById("mensaje_btc");

    mensaje.innerText = "💰 Enviando SOCK...";

    const res = await fetch(`https://api.thesocks.net/reclamar_sock/${id}/`);
    const data = await res.json();

    if (data.error) {
        mensaje.innerText = "❌ " + data.error;
        return;
    }

    mensaje.innerText =
        "✅ SOCK enviados\nTX: " + data.tx_sock;

    // limpiar ID
    localStorage.removeItem("conversion_id");
}



async function cargarEstado() {

    const id = localStorage.getItem("conversion_id");

    if (!id) return;

    const mensaje = document.getElementById("mensaje_btc");

    mensaje.innerText = "🔄 Recuperando estado...";

    const res = await fetch(`https://api.thesocks.net/consultar_estado/${id}/`);
    const data = await res.json();

    if (data.error) return;

    if (data.estado === "btc_enviado") {
        mostrarBotonConsultar(id);
    }

    if (data.estado === "confirmado") {
        mostrarBotonReclamar(id);
    }

    if (data.estado === "completado") {
        mensaje.innerText = "✅ Conversión completada";
        localStorage.removeItem("conversion_id");
    }
}


function mostrarBotonConsultar(id) {

    //ocultar boton de convertir BTC-SOCK
    boton_convertir_BTC_SOCK = document.getElementById('boton-convertir-BTC-SOCK');
    boton_convertir_BTC_SOCK.style.display = "none";

    const contenedor = document.getElementById("acciones");

    contenedor.innerHTML = `
        <button onclick="consultarEstado(${id})" class="btn" style="
            margin: 20px auto;
            display: block;
            font-size: 18px;
            border-radius: 20px;
            background-color: var(--fondo);
            color: white;
            padding: 10px 20px;
            border: none;
            text-align: center;
        ">
            Consultar confirmaciones
        </button>
    `;
}


function mostrarBotonReclamar(id) {

    //ocultar boton de convertir BTC-SOCK
    boton_convertir_BTC_SOCK = document.getElementById('boton-convertir-BTC-SOCK');
    boton_convertir_BTC_SOCK.style.display = "none";

    const contenedor = document.getElementById("acciones");

    contenedor.innerHTML = `
        <button onclick="reclamarSock(${id})"class="btn" style="
            margin: 20px auto;
            display: block;
            font-size: 18px;
            border-radius: 20px;
            background-color: lime;
            color: black;
            padding: 10px 20px;
            border: none;
            text-align: center;
        " >
            Reclamar SOCK
        </button>
    `;
}
















































async function recargaTarjetaCredito() {

    if (!globalWalletKey || globalWalletKey.length < 10) {
        alert("Wallet no válida");
        return;
    }

    try {

        alert("Se abrirá la ventana de pago 💳");

        const response = await fetch(`https://api.thesocks.net/transak/session/?walletAddress=${globalWalletKey}`);
        const data = await response.json();

        console.log("DATA:", data);

        const widgetUrl = data.data.widgetUrl;

        // 🔥 abrir popup
        //window.open(widgetUrl, "Transak", "width=500,height=700");
        window.location.href = widgetUrl;

    } catch (error) {
        console.error("Error:", error);
        alert("Error creando sesión de pago");
    }
}

/*
async function recargaTarjetaCredito() {

    const response = await fetch("https://api.thesocks.net/transak/session/?walletAddress=${globalWalletKey}");
    const data = await response.json();

    const widgetUrl = data.data.widgetUrl;

    window.open(widgetUrl, "_blank");
}*/

window.addEventListener("message", (event) => {

    // 🔐 seguridad básica
    if (!event.origin.includes("transak.com")) return;

    const data = event.data;

    console.log("Evento Transak:", data);

    // ✅ pago exitoso
    if (data.eventName === "TRANSAK_ORDER_SUCCESSFUL") {

        alert("✅ Pago completado");

        // 🔥 actualizar saldo
        obtenerSaldo(globalWalletKey);
    }

    // ❌ pago fallido
    if (data.eventName === "TRANSAK_ORDER_FAILED") {

        alert("❌ El pago falló");
    }

});