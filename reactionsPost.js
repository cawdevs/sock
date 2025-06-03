
document.addEventListener("DOMContentLoaded", function () {
    function getReactions(username_selected,nftUsername_post, postId, container) {
        const icons = [
            { id: "comment", icon: "glyphicon-comment", color1: "gray", color2: "blue" },
            { id: "heart", icon: "glyphicon-heart", color1: "gray", color2: "red" },
            { id: "send", icon: "glyphicon-send", color1: "green", color2: "green" },
            { id: "share", icon: "glyphicon-share-alt", color1: "gray", color2: "black" },

           
        ];

        container.innerHTML = ""; // Limpiar contenido previo

        icons.forEach(({ id, icon, color1, color2 }) => {
            const span = document.createElement("span");
            span.className = `glyphicon ${icon}`;
            span.id = `icon-${id}-${postId}`;
            span.setAttribute("data-color1", color1);
            span.setAttribute("data-color2", color2);
            span.style.color = color1;
            span.style.cursor = "pointer";

            // Contador para los likes
            if (id === "heart") {
                const likeCount = document.createElement("span");
                likeCount.id = `likes-count-${postId}`;
                likeCount.style.marginLeft = "5px";
                likeCount.textContent = "0";
                span.appendChild(likeCount);

                // 👇 Aquí consultamos el estado del like y total
                fetch("https://api.thesocks.net/get-like-info/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nft_username: username_selected,
                        id_publication: postId.toNumber ? postId.toNumber() : postId,

                    })
                })
                .then(res => res.json())
                .then(data => {
                    console.log("Respuesta de like-info:", data);
                    span.dataset.liked = data.user_like_status;
                    span.style.color = data.user_like_status ? color2 : color1;
                    likeCount.textContent = data.total_likes;
                });
            }


            else if (id === "send") {
                span.addEventListener("click", function () {
                    toggleReaction(span);
                    showSendOptions(nftUsername_post,postId, container);
                });
            }

            else if (id === "comment") {
                span.addEventListener("click", function () {
                    toggleReaction(span);
                    showSendOptions(nftUsername_post,postId, container);
                    mostrarMenuComentarios(postId, nftUsername_post)

                });
            }
            
           

            else if (id === "share") {
                span.addEventListener("click", function () {
                    toggleReaction(span);
                    //creamos en el portapapeles un enlase a post 
                    //const enlace = `${window.location.origin}/ver.html?id=${postId}`;
                    //navigator.clipboard.writeText(enlace)
                          //.then(() => alert("¡Enlace copiado al portapapeles!"))
                          //.catch(err => console.error("Error al copiar el enlace:", err)); 

                    compartir_en_redes_sociales(postId)

                });
            }

            
            span.addEventListener("click", function () {
                toggleReaction(span);

                if (id === "heart") {
                    console.log(`❤️ Me gusta en la publicación ${postId}`);
                    likePost(username_selected,nftUsername_post, postId);
                } else if (id === "send") {
                    console.log(`✉️ Compartido en la publicación ${postId}`);
                    //sharePost(postId);
                }
            });

            container.appendChild(span);
        });
    }

    function toggleReaction(icon) {
        const newColor = icon.getAttribute("data-color2");
        const originalColor = icon.getAttribute("data-color1");


function mostrarMenuComentarios(publicationId, username) {
  // Eliminar menú si ya existe
  const existente = document.getElementById('menu-comentarios');
  if (existente) existente.remove();

  // Crear overlay
  const overlay = document.createElement('div');
  overlay.id = 'menu-comentarios';
  overlay.style.position = 'fixed';
  overlay.style.left = 0;
  overlay.style.right = 0;
  overlay.style.bottom = 0;
  overlay.style.top = 0;
  overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'flex-end';
  overlay.style.zIndex = 1000;
  overlay.style.overflow = 'hidden';

  // Crear contenedor del menú
  const menu = document.createElement('div');
  menu.style.backgroundColor = '#fff';
  menu.style.width = '100%';
  menu.style.maxHeight = '80%';
  menu.style.borderTopLeftRadius = '12px';
  menu.style.borderTopRightRadius = '12px';
  menu.style.padding = '15px';
  menu.style.boxSizing = 'border-box';
  menu.style.animation = 'slideUp 0.3s ease-out';
  menu.style.overflow = 'hidden';

  // Contenedor scrollable de comentarios
  const comentariosDiv = document.createElement('div');
  comentariosDiv.id = 'comentarios-antiguos';
  comentariosDiv.style.maxHeight = '200px';
  comentariosDiv.style.overflowY = 'auto';
  comentariosDiv.style.border = '1px solid #ccc';
  comentariosDiv.style.padding = '8px';
  comentariosDiv.style.marginBottom = '10px';
  comentariosDiv.innerHTML = 'Cargando comentarios...';

  // Cargar comentarios desde Django
  fetch(`https://api.thesocks.net/comentarios/?id=${publicationId}`)
    .then(res => res.json())
    .then(data => {
      comentariosDiv.innerHTML = '';
      if (data.comentarios && data.comentarios.length > 0) {
        data.comentarios.forEach(com => {
          const p = document.createElement('p');
          p.innerHTML = `<strong>${com.usuario}</strong>: ${com.comentario}`;
          comentariosDiv.appendChild(p);
        });
      } else {
        comentariosDiv.innerHTML = 'No hay comentarios aún.';
      }
    })
    .catch(() => {
      comentariosDiv.innerHTML = 'Error al cargar comentarios.';
    });

  // Textarea para nuevo comentario
  const textarea = document.createElement('textarea');
  textarea.rows = 2;
  textarea.placeholder = "Escribe tu comentario...";
  textarea.style.width = '100%';
  textarea.style.boxSizing = 'border-box';

  // Botón para responder
  const enviarBtn = document.createElement('button');
  enviarBtn.textContent = "Responder";
  enviarBtn.style.marginTop = '10px';
  enviarBtn.style.padding = '8px';
  enviarBtn.style.width = '100%';
  enviarBtn.style.cursor = 'pointer';

  enviarBtn.onclick = async () => {
    const comentario = textarea.value.trim();
    if (!comentario) return alert("Escribe algo antes de enviar.");

    try {
      const response = await fetch('https://api.thesocks.net/enviar-comentario/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publication_id: publicationId,
          usuario: username,
          comentario: comentario
        })
      });

      if (!response.ok) throw new Error("Error en el servidor");

      // Agregar comentario nuevo visualmente
      const p = document.createElement('p');
      p.innerHTML = `<strong>${username}</strong>: ${comentario}`;
      comentariosDiv.appendChild(p);
      comentariosDiv.scrollTop = comentariosDiv.scrollHeight;

      // Limpiar textarea y cerrar menú después de un segundo
      textarea.value = '';
      setTimeout(() => overlay.remove(), 800);

    } catch (e) {
      alert("Error al enviar comentario.");
    }
  };

  // Detectar scroll hacia abajo para cerrar el menú
  let startY = null;
  overlay.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  });

  overlay.addEventListener('touchmove', (e) => {
    const currentY = e.touches[0].clientY;
    if (startY && currentY - startY > 80) { // deslizó hacia abajo más de 80px
      overlay.remove();
    }
  });

  // Armar el menú
  menu.appendChild(comentariosDiv);
  menu.appendChild(textarea);
  menu.appendChild(enviarBtn);
  overlay.appendChild(menu);
  document.body.appendChild(overlay);
}

// Animación CSS para deslizar
const estiloAnimacion = document.createElement('style');
estiloAnimacion.textContent = `
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}`;
document.head.appendChild(estiloAnimacion);    

        icon.classList.add("grow");
        setTimeout(() => {
            icon.classList.remove("grow");
            icon.style.color = newColor;
            icon.setAttribute("data-color2", originalColor);
            icon.setAttribute("data-color1", newColor);
        }, 500);
    }

    function likePost(username_selected,nftUsername_post, postId) {

        console.log("Username que publica (nftUsername_post):", nftUsername_post);
        
        const heartIcon = document.getElementById(`icon-heart-${postId}`);
        const liked = heartIcon.dataset.liked === "true";
        const newLiked = !liked;

        const countSpan = document.getElementById(`likes-count-${postId}`);
        let currentLikes = parseInt(countSpan.textContent) || 0;
        countSpan.textContent = newLiked ? currentLikes + 1 : currentLikes - 1;

        heartIcon.style.color = newLiked ? heartIcon.getAttribute("data-color2") : heartIcon.getAttribute("data-color1");
        heartIcon.dataset.liked = newLiked;

        fetch("https://api.thesocks.net/like-post/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username_selected,
                username_post: nftUsername_post,  
                post_id: postId.toNumber ? postId.toNumber() : postId,
                liked: newLiked
            })
        })
        .then(response => response.json())
        .then(data => console.log("Respuesta:", data))
        .catch(error => console.error("Error:", error));
    }

    //function sharePost(postId) {
        // Lógica para compartir
      //  alert(`Compartiste la publicación ${postId}`);
    //}

    window.getReactions = getReactions; // Exponer globalmente
});

async function showSendOptions(nftUsername_post,postId, container) {
    // Evitar duplicación
    const existing = document.getElementById(`send-options-${postId}`);
    if (existing) {
        existing.remove();
        return;
    }


    let recipientAddress;
                
    if (nftUsernameContract.methods) {
             console.log("Con MetaMask ");
             recipientAddress     = await nftUsernameContract.methods.getNFTOwner(nftUsername_post).call();
                        
    } else {
            // Usando ethers.js
            console.log("Con SockWallet "); 
            recipientAddress     = await nftUsernameContract.getNFTOwner(nftUsername_post);
                                                   
    }

    const optionsWrapper = document.createElement("div");
    optionsWrapper.className = "reaction-group";
    optionsWrapper.id = `send-options-${postId}`;
    // 👇 Agrega esto
    optionsWrapper.style.display = "flex";
    optionsWrapper.style.flexDirection = "column";
    optionsWrapper.style.gap = "8px";

    const amounts = [10000, 20000, 50000];

    amounts.forEach(amount => {
        const option = document.createElement("span");
        option.className = "reaction-option";
        option.innerHTML = `<span class="glyphicon glyphicon-usd" style="font-size: 18px; margin-right: 5px;"></span>${amount}`;

        option.addEventListener("click", async () => {
            option.classList.add("grow");

            // Acción personalizada según cantidad
            console.log(`💸 Enviado $${amount} en la publicación ${postId}`);

            await transferSockTokens(recipientAddress, amount);

            setTimeout(() => {
                option.classList.remove("grow");
                optionsWrapper.remove(); // Ocultar opciones
            }, 600);
        });

        optionsWrapper.appendChild(option);
    });

    container.appendChild(optionsWrapper);
}



 function compartir_en_redes_sociales(idPublicacion) {
    const enlace = `${window.location.origin}/ver_post.html?id=${idPublicacion}`;
    
    if (navigator.share) {
      navigator.share({
        title: '¡Mira esta publicación!',
        text: 'Te comparto esta publicación de la red social descentralizada:',
        url: enlace
      })
      .then(() => console.log('Enlace compartido con éxito'))
      .catch((error) => console.error('Error al compartir:', error));
    } else {
      // Fallback si el navegador no soporta navigator.share
      navigator.clipboard.writeText(enlace)
        .then(() => alert("Tu navegador no permite compartir directamente. El enlace fue copiado al portapapeles."))
        .catch(err => console.error("Error al copiar el enlace:", err));
    }
  }