
document.addEventListener("DOMContentLoaded", function () {
  // ==============================
  // 2) Tu función getReactions (sin cambios)
  // ==============================
  function getReactions(username_selected, nftUsername_post, postId, container) {
    const icons = [
      { id: "comment", icon: "glyphicon-comment", color1: "gray", color2: "blue" },
      { id: "heart",   icon: "glyphicon-heart",   color1: "gray", color2: "red"  },
      { id: "send",    icon: "glyphicon-send",    color1: "green", color2: "green" },
      { id: "share",   icon: "glyphicon-share-alt",color1: "gray", color2: "black" },
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

      if (id === "heart") {
        const likeCount = document.createElement("span");
        likeCount.id = `likes-count-${postId}`;
        likeCount.style.marginLeft = "5px";
        likeCount.textContent = "0";
        span.appendChild(likeCount);

        fetch("https://api.thesocks.net/get-like-info/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nft_username: username_selected,
            id_publication: postId.toNumber ? postId.toNumber() : postId,
          })
        })
        .then(res => res.json())
        .then(data => {
          span.dataset.liked = data.user_like_status;
          span.style.color = data.user_like_status ? color2 : color1;
          likeCount.textContent = data.total_likes;
        });
      }
      else if (id === "send") {
        span.addEventListener("click", function () {
          toggleReaction(span);
          showSendOptions(nftUsername_post, postId, container);
        });
      }
      else if (id === "comment") {
        span.addEventListener("click",async function () {
          toggleReaction(span);
          await mostrarMenuComentarios(postId, nftUsername_post);
        });
      }
      else if (id === "share") {
        span.addEventListener("click", function () {
          toggleReaction(span);
          compartir_en_redes_sociales(postId);
        });
      }

      span.addEventListener("click", function () {
        toggleReaction(span);
        if (id === "heart") {
          likePost(username_selected, nftUsername_post, postId);
        }
      });

      container.appendChild(span);
    });
  }

  function toggleReaction(icon) {
    const newColor = icon.getAttribute("data-color2");
    const originalColor = icon.getAttribute("data-color1");
    icon.style.color = icon.style.color === originalColor ? newColor : originalColor;
  }

  function likePost(username_selected, nftUsername_post, postId) {
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
      headers: { "Content-Type": "application/json" },
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

  window.getReactions = getReactions; // Exponer globalmente
});

// ==============================
// 3) Función showSendOptions (sin cambios)
// ==============================
async function showSendOptions(nftUsername_post, postId, container) {
  const existing = document.getElementById(`send-options-${postId}`);
  if (existing) {
    existing.remove();
    return;
  }

  let recipientAddress;
  if (nftUsernameContract.methods) {
    recipientAddress = await nftUsernameContract.methods.getNFTOwner(nftUsername_post).call();
  } else {
    recipientAddress = await nftUsernameContract.getNFTOwner(nftUsername_post);
  }

  const optionsWrapper = document.createElement("div");
  optionsWrapper.className = "reaction-group";
  optionsWrapper.id = `send-options-${postId}`;
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
      console.log(`💸 Enviado $${amount} en la publicación ${postId}`);
      await transferSockTokens(recipientAddress, amount);
      setTimeout(() => {
        option.classList.remove("grow");
        optionsWrapper.remove();
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
    navigator.clipboard.writeText(enlace)
      .then(() => alert("Tu navegador no permite compartir directamente. El enlace fue copiado al portapapeles."))
      .catch(err => console.error("Error al copiar el enlace:", err));
  }
}

// ==============================
// 4) Función para mostrar el menú de comentarios
// ==============================
async function mostrarMenuComentarios(publicationId, username) {
  // ID único para el contenedor completo de comentarios
  const containerId = `comentarios-completos-${publicationId}`;
  const existing = document.getElementById(containerId);

  if (existing) {
    // Si ya existía, eliminarlo para “ocultar” el cuadro
    existing.remove();
    return;
  }

  // 1) Crear contenedor principal (overlay estático dentro del flujo)
  const contenedor = document.createElement('div');
  contenedor.id = containerId;
  contenedor.style.border = '1px solid #ccc';
  contenedor.style.borderRadius = '8px';
  contenedor.style.padding = '12px';
  contenedor.style.marginTop = '10px';
  contenedor.style.backgroundColor = '#fafafa';
  contenedor.style.maxHeight = '300px';       // Altura máxima total
  contenedor.style.display = 'flex';
  contenedor.style.flexDirection = 'column';
  contenedor.style.gap = '8px';               // Separación vertical entre secciones

  // 2) Crear sub-contenedor scrollable para comentarios anteriores
  const comentariosPrevios = document.createElement('div');
  comentariosPrevios.id = `scroll-comentarios-${publicationId}`;
  comentariosPrevios.style.overflowY = 'auto';
  comentariosPrevios.style.border = '1px solid #ddd';
  comentariosPrevios.style.borderRadius = '6px';
  comentariosPrevios.style.padding = '8px';
  comentariosPrevios.style.flexGrow = '1';     // Ocupa todo el espacio disponible
  comentariosPrevios.style.maxHeight = '200px';
  comentariosPrevios.innerHTML = 'Cargando comentarios…';


  /*
  // 3) Hacer fetch para cargar comentarios previos desde Django
  fetch(`https://api.thesocks.net/comentarios/?id=${publicationId}`)
    .then(res => res.json())
    .then(data => {
      comentariosPrevios.innerHTML = ''; // Limpiar mensaje de “Cargando…”
      if (data.comentarios && data.comentarios.length > 0) {
        data.comentarios.forEach(com => {
          const p = document.createElement('p');
          p.style.margin = '4px 0';
          p.innerHTML = `<strong>${com.usuario}</strong>: ${com.comentario}`;
          comentariosPrevios.appendChild(p);
        });
        // Sitúa siempre al final si hay scroll
        comentariosPrevios.scrollTop = comentariosPrevios.scrollHeight;
      } else {
        comentariosPrevios.innerHTML = 'No hay comentarios aún.';
      }
    })
    .catch(() => {
      comentariosPrevios.innerHTML = 'Error al cargar comentarios.';
    });

  */


  // 4) Crear contenedor “fila” para textarea + botón en la misma línea
  const filaInput = document.createElement('div');
  filaInput.style.display = 'flex';
  filaInput.style.gap = '6px';          // Espacio entre textarea y botón

  // 4.1) Textarea para escribir nuevo comentario
  const textarea = document.createElement('textarea');
  textarea.rows = 2;
  textarea.placeholder = 'Comentar publicación';
  textarea.style.flexGrow = '1';
  textarea.style.boxSizing = 'border-box';
  textarea.style.padding = '8px';
  textarea.style.border = '1px solid #ccc';
  textarea.style.borderRadius = '6px';
  textarea.style.resize = 'none';       // Evita que el usuario redimensione

  // 4.2) Botón “Comentar”
  const botonComentar = document.createElement('button');
  botonComentar.textContent = 'Comentar';
  botonComentar.style.padding = '8px 12px';
  botonComentar.style.backgroundColor = 'dodgerblue';
  botonComentar.style.color = '#fff';
  botonComentar.style.border = 'none';
  botonComentar.style.borderRadius = '6px';
  botonComentar.style.cursor = 'pointer';
  botonComentar.style.flexShrink = '0'; // No se reduzca de ancho

  // Acción al hacer clic en “Comentar”
  botonComentar.onclick = async () => {
    const texto = textarea.value.trim();
    if (!texto) {
      alert('Escribe un comentario antes de enviar.');
      return;
    }

    try {
      // Enviar comentario a Django
      const response = await fetch('https://api.thesocks.net/enviar-comentario/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publication_id: publicationId,
          usuario: username,
          comentario: texto
        })
      });

      if (!response.ok) throw new Error('Error en el servidor');

      // Agregar el nuevo comentario al contenedor scrollable
      const p = document.createElement('p');
      p.style.margin = '4px 0';
      p.innerHTML = `<strong>${username}</strong>: ${texto}`;
      comentariosPrevios.appendChild(p);
      comentariosPrevios.scrollTop = comentariosPrevios.scrollHeight;

      // Limpiar textarea
      textarea.value = '';
      // Opcional: cerrar el cuadro después de enviar comentando (si no quieres que permanezca abierto)
      // contenedor.remove();
    } catch (error) {
      alert('Error al enviar comentario.');
    }
  };

  // 5) Ensamblar fila de input
  filaInput.appendChild(textarea);
  filaInput.appendChild(botonComentar);

  // 6) Agregar ambas secciones al contenedor principal
  contenedor.appendChild(comentariosPrevios);
  contenedor.appendChild(filaInput);

  // 7) Insertar el contenedor justo después del botón de icono de mensaje
  //     Se asume que el botón tiene un ID único: `btn-comentario-${publicationId}`
  //     o bien, que recibes en el evento el propio elemento “this”.
  const btnIcono = document.getElementById(`btn-comentario-${publicationId}`);
  if (btnIcono) {
    btnIcono.insertAdjacentElement('afterend', contenedor);
  } else {
    // Si no tienes ID en el botón, puedes pasar el mismo elemento como parámetro
    // y hacer: elemento.insertAdjacentElement('afterend', contenedor);
    console.warn('No se encontró el botón de comentario para insertar contenedor.');
  }
}