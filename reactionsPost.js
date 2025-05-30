/**
document.addEventListener("DOMContentLoaded", function () {
    function getReactions(username_selected,postId, container) {
        const icons = [
            { id: "comment", icon: "glyphicon-comment", color1: "gray", color2: "blue" },
            { id: "heart", icon: "glyphicon-heart", color1: "gray", color2: "red" },
            //{ id: "retweet", icon: "glyphicon-retweet", color1: "gray", color2: "lime" },
            //{ id: "trash", icon: "glyphicon-trash", color1: "gray", color2: "red" },
            { id: "send", icon: "glyphicon-send", color1: "gray", color2: "lime" },
            //{ id: "plus", icon: "glyphicon-plus", color1: "gray", color2: "lime" }
        ];

        container.innerHTML = ""; // Limpiar contenido previo

        icons.forEach(({ id, icon, color1, color2 }) => {
            const span = document.createElement("span");
            span.className = `glyphicon ${icon}`;
            span.id = `icon-${id}-${postId}`;  // ID único para cada publicación
            span.setAttribute("data-color1", color1);
            span.setAttribute("data-color2", color2);
            span.style.color = color1;
            span.style.cursor = "pointer";

            span.addEventListener("click", function () {
                toggleReaction(span);
                
                // 🔴 DETECTAR CLICK EN EL ICONO ESPECÍFICO 🔴
                if (id === "heart") {
                    console.log(`❤️ Me gusta en la publicación ${postId}`);
                    likePost(username_selected,postId);
                } else if (id === "retweet") {
                    console.log(`🔄 Compartido en la publicación ${postId}`);
                    sharePost(postId);
                }
            });

            container.appendChild(span);
        });
    }

    function toggleReaction(icon) {
        const newColor = icon.getAttribute("data-color2");
        const originalColor = icon.getAttribute("data-color1");

        icon.classList.add("grow");
        setTimeout(() => {
            icon.classList.remove("grow");
            icon.style.color = newColor;
            icon.setAttribute("data-color2", originalColor);
            icon.setAttribute("data-color1", newColor);
        }, 500);
    }

    // Función que se ejecuta cuando se hace clic en "Me gusta" ❤️
    function likePost(username_selected,postId) {
        //alert(`Has dado like a la publicación ${postId}`);        
        
        //consultar si ya le dio like
        const liked = true;

        fetch("https://api.thesocks.net/like-post/", {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username_selected,
                post_id: postId.toNumber(), // convierte BigNumber a número normal,
                liked: liked
            })
        })
        .then(response => response.json())
        .then(data => console.log("Respuesta:", data))
        .catch(error => console.error("Error:", error));

    }



    // Función que se ejecuta cuando se hace clic en "Compartir" 🔄
    function sharePost(postId) {
        //alert(`Has compartido la publicación ${postId}`);
    }

    
    window.getReactions = getReactions; // Exponer la función globalmente
});

*/
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