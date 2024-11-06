// Importa ethers desde la ruta correcta
import { ethers } from "./ethers.js-main/dist/ethers.min.js";

// Código para la configuración del proveedor
let globalWalletKey = "";

const provider = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/8gJweGU1u8NB60FICShTvPFy3oUu_zsA");

// Otros códigos que quieras incluir...