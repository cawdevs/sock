
  async function createVideoStory(publication) {
      const { id, nftUsername, media, imageProfile } = publication;

      if (!media || !media.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) return null;

      const storyDiv = document.createElement('div');
      storyDiv.classList.add('video-story');

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

  // Función para cargar las historias
  async function get_video_stories(containerID, append = false) {
      try {
          const container = document.getElementById(containerID);
          const loadingAnimation = document.getElementById('loadingAnimation-principal');
          loadingAnimation.style.display = 'block';

          if (!append) container.innerHTML = '';

          let total_publication;
          if (publisherContract.methods) {
              total_publication = await publisherContract.methods.publicationCount().call();
          } else {
              total_publication = await publisherContract.publicationCount();
          }

          let currentIndex = total_publication;
          let count = 0;
          let i = currentIndex;

          while (count < 5 && i >= 1) {
              let publication = await get_publication_data(i);
              const story = await createVideoStory(publication);
              if (story) {
                  container.appendChild(story);
                  count++;
              }
              i--;
          }

          currentIndex = i;
          loadingAnimation.style.display = 'none';

          if (currentIndex < 1) document.getElementById("verMasBtn").style.display = "none";
      } catch (error) {
          console.error('Error cargando historias de video:', error);
      }
  }


