
  // video_story.js

// Variables globales para seguimiento de publicaciones
let currentIndex_history = 0;        // índice de la última publicación revisada
let total_publication_history = 0;   // total de publicaciones

// Función para crear la historia de un video
async function createVideoStory(publication) {
    const { id, nftUsername, media, imageProfile } = publication;

    if (!media || !media.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) return null;

    const storyDiv = document.createElement('div');
    storyDiv.classList.add('video-story');

    // Video
    const video = document.createElement('video');
    video.controls = true;
    video.src = ipfsToSubdomain(media);
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    // Fallback si falla la carga
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

// Función principal para cargar los próximos 5 videos
async function get_video_stories(containerID, append = false) {
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
            const publication = await get_publication(i, containerID);

            if (publication && publication.media && publication.media.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
                const story = await createVideoStory(publication);
                if (story) {
                    container.appendChild(story);
                    count++;
                }
            }

            i--;
        }

        currentIndex_history = i;

        if (loadingAnimation) loadingAnimation.style.display = 'none';

        // Ocultar botón si ya no hay publicaciones
        const verMasBtn = document.getElementById("verMasBtnVideos");
        if (currentIndex_history < 1 && verMasBtn) verMasBtn.style.display = "none";

    } catch (error) {
        console.error('Error cargando historias de video:', error);
    }
}

