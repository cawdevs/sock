// Importa ethers desde la ruta correcta
import { ethers } from "./ethers.js-main/dist/ethers.min.js";

// Código para la configuración del proveedor
let globalWalletKey = "";

const provider = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/8gJweGU1u8NB60FICShTvPFy3oUu_zsA");

// Otros códigos que quieras incluir...


    window.onload = async function() {
                         
    const privateKey = obtenerClaveDesencriptada(); // Desencriptar la clave privada con la contraseña
    
    if (!privateKey) return;

          
             
            alert(`Exito se conecto la key privada:`);

            // Crear una instancia de web3 usando la clave privada
            const wallet = new ethers.Wallet(privateKey);

            //const provider = new ethers.providers.Web3Provider(window.ethereum);
              // Conectar a Alchemy
    
    
            const myAddress = wallet.address;


            alert(`Exito myAddress:xxxx ` + myAddress);
            
            globalWalletKey = myAddress;
            const start = myAddress.slice(0, 6);
            const end = myAddress.slice(-4);
            document.getElementById('addres-wallet').innerText = `${start}...${end}`;
            document.getElementById('addres-wallet').style.color = 'white'; // Cambia el color del texto a blanco

            // Mostrar el saldo de ETH
            await obtenerSaldo(wallet);

            // Aquí puedes llamar a la función para conectar con MetaMask
            ///conectarMetaMask();

            // Cualquier otra lógica necesaria se puede agregar aquí
        };

        // Función para obtener el saldo
        async function obtenerSaldo(wallet) {
            
            const balanceWei = await provider.getBalance(wallet.address);
            alert(`balanceWei: `+ balanceWei);
            const balanceEther = ethers.utils.formatEther(balanceWei);
            document.getElementById('saldo_ETH').innerText = `Saldo en ETH: ${balanceEther}`;
        }

      
        // Función para obtener la clave privada desencriptada
// Cambia la función de desencriptación para que use la contraseña pasada


    // Función para desencriptar la clave privada
function obtenerClaveDesencriptada() {
    const encryptedKey = localStorage.getItem("encryptedPrivateKey");
    const password = localStorage.getItem("walletPassword")?.trim(); // Asegúrate de limpiar espacios en blanco

    alert(`Clave encriptada obtenida: ${encryptedKey}`);
    alert(`Contraseña guardada obtenida: ${password}`);

    if (encryptedKey) {
        try {
            // Intenta desencriptar la clave
            const decryptedKey = CryptoJS.AES.decrypt(encryptedKey, password).toString(CryptoJS.enc.Utf8);
            if (!decryptedKey) {
                alert("Error: la clave privada desencriptada está vacía.");
                return null;
            }
            return decryptedKey;
        } catch (error) {
            alert("Error al desencriptar la clave privada. Asegúrate de ingresar la contraseña correcta.");
            return null;
        }
    } else {
        alert("No hay ninguna billetera almacenada.");
        return null;
    }
}