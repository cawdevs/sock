document.addEventListener("DOMContentLoaded", function () {
    function getReactions(username_selected,postId, container) {
        const icons = [
            { id: "comment", icon: "glyphicon-comment", color1: "gray", color2: "blue" },
            { id: "heart", icon: "glyphicon-heart", color1: "gray", color2: "red" },
            { id: "retweet", icon: "glyphicon-retweet", color1: "gray", color2: "lime" },
            { id: "trash", icon: "glyphicon-trash", color1: "gray", color2: "red" },
            { id: "send", icon: "glyphicon-send", color1: "gray", color2: "lime" },
            { id: "plus", icon: "glyphicon-plus", color1: "gray", color2: "lime" }
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
        }, 300);
    }

    // Función que se ejecuta cuando se hace clic en "Me gusta" ❤️
    function likePost(username_selected,postId) {
        //alert(`Has dado like a la publicación ${postId}`);

        console.log("Respuesta:", username_selected,postId);

        //consultar si ya le dio like
        const liked = true;

        fetch("https://api.thesocks.net/like-post/", {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username_selected,
                post_id: 10,
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
