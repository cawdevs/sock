// Variables globales para seguimiento de publicaciones
let currentIndex_history = 0;        // índice de la última publicación revisada
let total_publication_history = 0;   // total de publicaciones

// 🔹 Crear el elemento de historia de video
async function createVideoStory(publicationObject) {
    const { id, nftUsername, media, imageProfile } = publicationObject;

    if (!media || !media.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) return null;

    const storyDiv = document.createElement('div');
    storyDiv.classList.add('video-story');

    // Video
    const video = document.createElement('video');
    video.controls = true;
    video.src = ipfsToSubdomain(media);
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    video.addEventListener('error', async () => {
        try {
            const res = await fetch(ipfsToSubdomain(media), { mode: 'cors' });
            if (res.ok) {
                const blob = await res.blob();
                video.src = URL.createObjectURL(blob);
            }
        } catch (e) {
            console.error("Error cargando video:", e);
        }
    });

    // Foto circular del NFTUsername
    if (imageProfile) {
        const circleDiv = document.createElement('div');
        circleDiv.classList.add('nft-profile-circle');

        const img = document.createElement('img');
        img.src = imageProfile;
        img.alt = nftUsername;

        img.addEventListener("click", async function () {
            await get_NFTUsername_profile(nftUsername);
            await get_NFTUsername_publication(nftUsername, "modal_publication-nftusername");
            $('#UsernameProfileModal').modal('show');
        });

        circleDiv.appendChild(img);
        storyDiv.appendChild(circleDiv);
    }

    storyDiv.appendChild(video);
    return storyDiv;
}



//////////////////////////////////////////////////////////////////////////////////
let currentStart = 0; // 🔹 Para controlar paginación
const limit = 5;      // 🔹 Videos por carga

async function get_video_stories(containerID, append = false) {
    try {
        const container = document.getElementById(containerID);
        if (!container) return;

        if (!append) {
            container.innerHTML = '';
            currentStart = 0;
        }

        // 🔹 Obtener IDs de videos desde Django
        const videoIds = await getVideoPublications(currentStart, limit);

        // 🔹 Mostrar videos
        for (const videoId of videoIds) {
            const publicationObject = await get_publication_object(videoId);
            
            if (publicationObject && publicationObject.publicationType != 3) {
                
                if (publicationObject.media && publicationObject.media.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
                    const story = await createVideoStory(publicationObject);
                    if (story) container.appendChild(story);
                }
            }
        }

        currentStart += videoIds.length;

        // 🔹 Eliminar botón viejo si existe
        const oldBtn = document.getElementById("verMasBtnVideos");
        if (oldBtn) oldBtn.remove();

        // 🔹 Agregar botón solo si hay más videos
        if (videoIds.length === limit) {
            const btnWrapper = document.createElement("div");
            btnWrapper.id = "verMasBtnVideos";
            btnWrapper.style.display = "flex";
            btnWrapper.style.alignItems = "center";
            btnWrapper.style.justifyContent = "center";
            btnWrapper.style.height = "200px"; // Igual que videos
            btnWrapper.style.width = "auto";

            const verMasBtn = document.createElement("button");
            verMasBtn.innerText = "Ver más";
            verMasBtn.onclick = () => get_video_stories(containerID, true);

            // 🔹 Estilos botón
            verMasBtn.style.backgroundColor = "dodgerblue";
            verMasBtn.style.color = "white";
            verMasBtn.style.border = "none";
            verMasBtn.style.padding = "10px 20px";
            verMasBtn.style.cursor = "pointer";
            verMasBtn.style.fontSize = "16px";
            verMasBtn.style.borderRadius = "8px";
            verMasBtn.style.height = "100%"; // Ocupa toda la altura del wrapper
            verMasBtn.style.width = "100%"; // Ocupa todo el ancho del wrapper

            btnWrapper.appendChild(verMasBtn);
            container.appendChild(btnWrapper);
        }

    } catch (error) {
        console.error('Error cargando historias de video:', error);
    }
}
/////////////////////////////////////////////







// 🔹 Obtener publicaciones de video
async function get_video_storiesX(containerID, append = false) {
    try {
        const container = document.getElementById(containerID);
        if (!container) return;

        if (!append) container.innerHTML = '';

        // Obtener total de publicaciones si no está definido
        if (!total_publication_history) {
            if (publisherContract.methods) {
                total_publication_history = await publisherContract.methods.publicationCount().call();
            } else {
                total_publication_history = await publisherContract.publicationCount();
            }
            currentIndex_history = total_publication_history;
        }

        let count = 0;
        let i = currentIndex_history;

        while (count < 5 && i >= 1) {
            const publicationObject = await get_publication_object(i); // 🔹 Ahora solo datos

            // 🔹 Verificar que la publicación no esté eliminada
            if (publicationObject && publicationObject.publicationType != 3) {
                if (publicationObject.media && publicationObject.media.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
                    const story = await createVideoStory(publicationObject);
                    if (story) {
                        container.appendChild(story);
                        count++;
                    }
                }
            }
            i--;
        }

        currentIndex_history = i;

        

        // 🔹 Crear botón dinámicamente SOLO si hay más videos
        const oldBtn = document.getElementById("verMasBtnVideos");
        if (oldBtn) oldBtn.remove(); // eliminar botón anterior

        if (currentIndex_history >= 1) {
            const verMasBtn = document.createElement("button");
            verMasBtn.id = "verMasBtnVideos";
            verMasBtn.innerText = "Ver más";
            verMasBtn.onclick = () => get_video_stories(containerID, true);

            // 🔹 Estilos para que sea igual de ancho que los videos
            verMasBtn.style.backgroundColor = "dodgerblue";
            verMasBtn.style.color = "white";
            verMasBtn.style.border = "none";
            verMasBtn.style.padding = "10px";
            verMasBtn.style.cursor = "pointer";
            verMasBtn.style.fontSize = "16px";
            verMasBtn.style.borderRadius = "8px";
            verMasBtn.style.height = "200px"; // igual altura que videos
            verMasBtn.style.width = "auto";
            verMasBtn.style.alignSelf = "center";

            container.appendChild(verMasBtn);
        }

    } catch (error) {
        console.error('Error cargando historias de video:', error);
    }
}



// 🔹 Nueva función: obtener el objeto completo de publicación sin renderizar
async function get_publication_object(id_publication) {
    try {
        let publication = [];

        // Obtener publicación desde contrato
        if (publisherContract.methods) {
            publication = await publisherContract.methods.getPublication(id_publication).call();
        } else {
            publication = await publisherContract.getPublication(id_publication);
        }

        const publicationData = publication[0];
        const jsonMetadata = JSON.parse(publicationData.jsonMetadata);

        // Construir objeto
        const publicationObject = {
            id: publicationData.id,
            content: publicationData.content,
            nftUsername: publicationData.nftUsername,
            publicationType: publicationData.publicationType,
            timestamp: new Date(publicationData.timestamp * 1000).toLocaleString(),
            media: jsonMetadata.media || '',
            clasificacion: jsonMetadata.clasificacion || 'para > 18'
        };

        // Obtener info de perfil
        try {
            let profileText;
            if (profileContract.methods) {
                profileText = await profileContract.methods.getProfileByUsername(publicationObject.nftUsername).call();
            } else {
                profileText = await profileContract.getProfileByUsername(publicationObject.nftUsername);
            }

            let jsonProfile = {};
            if (profileText && profileText[1]) {
                jsonProfile = JSON.parse(profileText[1]);
            }

            publicationObject.imageProfile = jsonProfile.fotoPerfil || '';
            publicationObject.usernameProfile = jsonProfile.nombre || '';
        } catch (error) {
            console.error("Error al obtener el perfil:", error);
            publicationObject.imageProfile = '';
            publicationObject.usernameProfile = '';
        }

        return publicationObject;
    } catch (error) {
        console.error('Error en get_publication_object:', error);
        return null;
    }
}



function getVideoPublications(start = 0, limit = 5) {
    console.log(`📤 Solicitando ${limit} videos desde índice ${start}`);

    return fetch("https://api.thesocks.net/get-video-publications/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            start: start,
            limit: limit
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "ok") {
            console.log(`🎥 Videos obtenidos:`, data.videos);
            return data.videos; // Devuelve lista de IDs
        } else {
            console.warn("⚠ No se pudieron obtener videos:", data.error);
            return [];
        }
    })
    .catch(error => {
        console.error("❌ Error al obtener videos:", error);
        return [];
    });
}




