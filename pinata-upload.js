import { PinataSDK } from "https://esm.sh/pinata";

// No se coloca el JWT aquí.
// La autorización se realiza mediante la URL firmada de Django.
const pinata = new PinataSDK({
    pinataJwt: ""
});

// Esta función queda disponible para publicationPost.js.
window.subirArchivoAlServidorYRetornarURL = async function(file = null) {

    try {
        if (!file) {
            throw new Error("No se ha seleccionado ningún archivo.");
        }

        // 1. Solicitar a Django la URL firmada.
        const respuestaFirma = await fetch(
            "https://api.thesocks.net/generar-url-pinata/",
            {
                method: "POST",
                credentials: "omit"
            }
        );

        if (!respuestaFirma.ok) {
            throw new Error(
                "Error al solicitar URL firmada a Django: " +
                respuestaFirma.status
            );
        }

        const datosFirma = await respuestaFirma.json();

        if (!datosFirma.url_firmada) {
            throw new Error("Django no devolvió una URL firmada.");
        }

        // 2. Subir directamente el archivo a Pinata.
        const resultado = await pinata.upload.public
            .file(file)
            .name(file.name)
            .url(datosFirma.url_firmada);

        // 3. Comprobar el CID.
        if (!resultado || !resultado.cid) {
            throw new Error("Pinata no devolvió un CID válido.");
        }

        console.log("Archivo subido correctamente:", resultado.cid);

        // 4. Devolver el CID a publicationPost.js.
        return resultado.cid;

    } catch (error) {
        console.error("Error al subir archivo a Pinata:", error);
        throw error;
    }
};