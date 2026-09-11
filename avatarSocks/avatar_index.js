
const categorias=[
    "cuerpo",
    "ojos",
    "pelo",       
];

const biblioteca = {

    cuerpo:[
        "00.svg",
        "01.svg"
        
    ],

    ojos:[
        "00.svg",
        "01.svg",
        "02.svg",
        "03.svg",
        "04.svg",
        "05.svg",
        "06.svg",
        "07.svg",
        "08.svg",
        "09.svg",
        "10.svg",
        "11.svg",
        "12.svg",
        "13.svg"
    ],

    pelo:[
        "00.svg",
        "01.svg",
        "02.svg",
        "03.svg",
        "04.svg",
        "05.svg",
        "06.svg"
    ],

    accesorios:[
        "sombrero_1.svg",
        "gafas_1.svg",
        "cadena_1.svg"
    ]

};

const paleta256 = [];

for(let i = 0; i < 256; i++){

    let r;
    let g;
    let b;

    if(i < 216){

        // Cubo RGB 6x6x6
        const nivel = [0, 51, 102, 153, 204, 255];

        r = nivel[Math.floor(i / 36)];
        g = nivel[Math.floor((i % 36) / 6)];
        b = nivel[i % 6];

    }else{

        // 40 tonos de gris
        const gris =
            Math.round(
                ((i - 216) * 255) / 39
            );

        r = gris;
        g = gris;
        b = gris;
    }

    const hex =
        "#" +
        r.toString(16).padStart(2,"0") +
        g.toString(16).padStart(2,"0") +
        b.toString(16).padStart(2,"0");

    paleta256.push(hex);
}



const avatar={};
const panel=document.getElementById("panel");
const avatarDiv=document.getElementById("avatar");

categorias.forEach(crearCategoria);




function crearPaletaColor(selector){

    const paleta =  document.createElement("div");

    paleta.className = "paletaFlotante";

    paleta.style.display = "grid";

    paleta.style.gridTemplateColumns =
        "repeat(16, 22px)";

    paleta.style.gap = "3px";

    paleta.style.position =
        "absolute";

    paleta.style.background =
        "white";

    paleta.style.padding =
        "8px";

    paleta.style.borderRadius =
        "8px";

    paleta.style.boxShadow =
        "0 3px 15px rgba(0,0,0,.4)";

    paleta.style.zIndex =
        "10000";


    paleta256.forEach((color, indice) => {

        const opcion =
            document.createElement("div");

        opcion.style.width = "22px";
        opcion.style.height = "22px";
        opcion.style.background = color;
        opcion.style.cursor = "pointer";

        opcion.title =
            indice.toString(16)
            .toUpperCase()
            .padStart(2,"0") +
            "  " +
            color;


        opcion.addEventListener(
            "click",
            function(){

                const categoria =
                    selector.dataset.categoria;

                const tipo =
                    selector.dataset.tipo;


                // Guardar índice del color
                avatar[categoria]
                    ["color" + tipo] =
                    indice
                    .toString(16)
                    .toUpperCase()
                    .padStart(2,"0");


                // Mostrar color seleccionado
                selector.style.background =
                    color;


                // Cerrar paleta
                paleta.remove();


                // Actualizar avatar
                pintar(categoria);

            }
        );


        paleta.appendChild(opcion);

    });


    document.body.appendChild(paleta);


    const rect =
        selector.getBoundingClientRect();


    paleta.style.left =
        rect.left + "px";

    paleta.style.top =
        (rect.bottom + 5) + "px";


    return paleta;
}

function colorPaletaAHex(indiceHex){
    const indice = parseInt(indiceHex,16);
    return paleta256[indice];
}



function crearCategoria(nombre){

    avatar[nombre]={
    documento:null,
    color1:"#00FF01",
    color2:"#0000FE",
    color3:"#FE0000",
    //color4:"#FFFF01",
    //color5:"#FF00FF"
};



    const div=document.createElement("div");

    div.className="categoria";


    div.innerHTML=`



<div class="filaControles">
   
        <span class="nombreCategoria">
            ${nombre}
        </span>

        <select
            class="biblioteca"
            data-categoria="${nombre}">

            <option value="">
                Seleccionar
            </option>

        </select>  


    <div class="colores">

            <div class="selectorColor"
                 data-categoria="${nombre}"
                 data-tipo="1">
            </div>

            <div class="selectorColor"
                 data-categoria="${nombre}"
                 data-tipo="2">
            </div>

            <div class="selectorColor"
                 data-categoria="${nombre}"
                 data-tipo="3">
            </div>

    </div>
</div>



`;

    panel.appendChild(div);
    const selector=div.querySelector(".biblioteca");

if(biblioteca[nombre]){

    biblioteca[nombre].forEach(archivo=>{

        const opcion=document.createElement("option");

        opcion.value=archivo;
        opcion.textContent=archivo;

        selector.appendChild(opcion);

    });

}

}

document.addEventListener(
    "click",
    function(e){

        const selector =
            e.target.closest(".selectorColor");


        if(!selector)
            return;


        // Evitar varias paletas abiertas
        document
            .querySelectorAll(".paletaFlotante")
            .forEach(p => p.remove());


        crearPaletaColor(selector);

    }
);

document.addEventListener("change", function(e){

    // =========================
    // BIBLIOTECA
    // =========================

    if(e.target.classList.contains("biblioteca")){

        const categoria =
            e.target.dataset.categoria;

        const archivo =
            e.target.value;

        if(!archivo)
            return;

        avatar[categoria].archivo =
            archivo.replace(".svg", "");

        cargarArchivoAutomatico(
            categoria,
            avatar[categoria].archivo
        );

    }


    // =========================
    // ARCHIVO MANUAL
    // =========================

    if(e.target.classList.contains("archivo")){

        leerArchivo(
            e.target.dataset.categoria,
            e.target.files[0]
        );

    }

});





document.addEventListener("input", function(e){

    if(!e.target.classList.contains("color"))
        return;

    const categoria =
        e.target.dataset.categoria;

    const tipo =
        e.target.dataset.tipo;

    // Guardar color
    avatar[categoria]["color" + tipo] =
        e.target.value;

    // Actualizar SOLO el avatar principal
    pintar(categoria);

});


document
    .getElementById("generarAvatar")
    .addEventListener("click", function(){

        const codigo =
            document
            .getElementById("codigoAvatar")
            .value
            .trim();


        if(!codigo){

            alert(
                "Primero introduce un código."
            );

            return;
        }


        generarAvatarDesdeCodigo(codigo);

    });


function leerArchivo(nombre,file){

    if(!file) return;

    const lector=new FileReader();

    lector.onload=function(e){

        const parser=new DOMParser();

        const doc=parser.parseFromString(
            e.target.result,
            "image/svg+xml"
        );

        avatar[nombre].documento=doc;

        prepararSVG(nombre);

        pintar(nombre);

        

    };

    lector.readAsText(file);

}

async function cargarArchivoAutomatico(
    nombre,
    archivo
){

    if(!archivo)
        return;


    const ruta ="avatarSocks/"+
        nombre + "/" +
        archivo + ".svg";


    try{

        const respuesta =
            await fetch(ruta);


        if(!respuesta.ok){

            throw new Error(
                "No se encontró: " +
                ruta
            );

        }


        const texto =
            await respuesta.text();


        const parser =
            new DOMParser();


        const doc =
            parser.parseFromString(
                texto,
                "image/svg+xml"
            );


        avatar[nombre].documento =
            doc;


        avatar[nombre].archivo =
            archivo;


        prepararSVG(nombre);


        pintar(nombre);

    }
    catch(error){

        console.error(
            "Error cargando " +
            nombre +
            ":",
            error
        );

    }

}


function prepararSVG(nombre){

    const doc=avatar[nombre].documento;

    const prefijo=nombre+"_";

    // Cambiar nombres de clases

    const style=doc.querySelector("style");

    if(style){

        let css=style.textContent;     
    

        css=css.replace(/\.fil0/g,"."+prefijo+"fil0");
        css=css.replace(/\.fil1/g,"."+prefijo+"fil1");
        css=css.replace(/\.fil2/g,"."+prefijo+"fil2");
        css=css.replace(/\.fil3/g,"."+prefijo+"fil3");
        //css=css.replace(/\.fil4/g,"."+prefijo+"fil4");       

        style.textContent=css;

    }

    // Cambiar class="" de todos los elementos

    doc.querySelectorAll("[class]").forEach(el=>{

        let clases=el.className.baseVal.split(" ");

        clases=clases.map(c=>prefijo+c);

        el.setAttribute("class",clases.join(" "));

    });

}




/*
function pintar(nombre){

    if(!avatar[nombre].documento)
        return;


    const doc =
        avatar[nombre].documento;

    const style =
        doc.querySelector("style");


    if(!style)
        return;


    let css =
        style.textContent;


    // =================================
    // APLICAR LOS 4 COLORES
    // =================================

    for(let i=0; i<4; i++){

        const color =
            avatar[nombre]["color" + (i+1)];


        const regex =
            new RegExp(
                "\\." +
                nombre +
                "_fil" +
                i +
                "\\s*\\{[^}]*fill:[^}]*\\}",
                "i"
            );


        css =
            css.replace(
                regex,

                "." +
                nombre +
                "_fil" +
                i +
                " {fill:" +
                color +
                "}"
            );

    }


    style.textContent =
        css;


    // =================================
    // BUSCAR CAPA
    // =================================

    let capa =
        document.getElementById(
            "capa_" + nombre
        );


    // =================================
    // CREAR CAPA SOLO UNA VEZ
    // =================================

    if(!capa){

        capa =
            document.createElement("div");

        capa.id =
            "capa_" + nombre;

        capa.className =
            "capa";

        avatarDiv.appendChild(capa);

    }


    // =================================
    // ACTUALIZAR SVG
    // =================================

    capa.innerHTML =
        doc.documentElement.outerHTML;

   //escribe el codigo del avatar existente
   document.getElementById("codigoAvatar").value =
        generarCodigoAvatar();     

}*/
function pintar(nombre){

    if(!avatar[nombre].documento)
        return;


    const doc =
        avatar[nombre].documento;


    const style =
        doc.querySelector("style");


    if(!style)
        return;


    let css =
        style.textContent;


    for(let i=0; i<3; i++){

        const color =
            colorPaletaAHex(
                avatar[nombre]
                ["color"+(i+1)]
            );


        const regex =
            new RegExp(
                "\\." +
                nombre +
                "_fil" +
                i +
                "\\s*\\{[^}]*fill:[^}]*\\}",
                "i"
            );


        css =
            css.replace(
                regex,

                "." +
                nombre +
                "_fil" +
                i +
                " {fill:" +
                color +
                "}"
            );

    }


    style.textContent =
        css;


    let capa =
        document.getElementById(
            "capa_" + nombre
        );


    if(!capa){

        capa =
            document.createElement("div");

        capa.id =
            "capa_" + nombre;

        capa.className =
            "capa";

        avatarDiv.appendChild(capa);

    }


    capa.innerHTML =
        doc.documentElement.outerHTML;

}



function pintarAvatarGenerado(nombre){

    if(!avatar[nombre].documento)
        return;


    const doc =
        avatar[nombre].documento;


    const style =
        doc.querySelector("style");


    if(!style)
        return;


    let css =
        style.textContent;


    // =========================
    // COLORES 0 - 3
    // =========================

    for(let i = 0; i < 4; i++){

        const color =
            avatar[nombre]
            ["color" + (i + 1)];


        const regex =
            new RegExp(
                "\\." +
                nombre +
                "_fil" +
                i +
                "\\s*\\{[^}]*fill:[^}]*\\}",
                "i"
            );


        css =
            css.replace(
                regex,

                "." +
                nombre +
                "_fil" +
                i +
                " {fill:" +
                color +
                "}"
            );

    }


    style.textContent =
        css;


    // =========================
    // CREAR CAPA NUEVA
    // =========================

    const contenedor =
        document.getElementById(
            "avatarGenerado"
        );


    const capa =
        document.createElement("div");


    capa.className =
        "capaGenerada";


    capa.id =
        "generado_" +
        nombre;


    capa.innerHTML =
        doc.documentElement.outerHTML;


    contenedor.appendChild(capa);

}


function generarCodigoAvatar(){

    return (

        // CUERPO
        (avatar.cuerpo.archivo || "00")
            .padStart(2,"0")
        +
        avatar.cuerpo.color1
            .padStart(2,"0")
        +
        avatar.cuerpo.color2
            .padStart(2,"0")
        +
        avatar.cuerpo.color3
            .padStart(2,"0")
        +

        // OJOS
        (avatar.ojos.archivo || "00")
            .padStart(2,"0")
        +
        avatar.ojos.color1
            .padStart(2,"0")
        +
        avatar.ojos.color2
            .padStart(2,"0")
        +
        avatar.ojos.color3
            .padStart(2,"0")
        +


        // PELO
        (avatar.pelo.archivo || "00")
            .padStart(2,"0")
        +
        avatar.pelo.color1
            .padStart(2,"0")
        +
        avatar.pelo.color2
            .padStart(2,"0")
        +
        avatar.pelo.color3
            .padStart(2,"0")

    ).toUpperCase();

}

//00-7a7a7a-040005-FE0000-FFFF01-00-000000-afa7a7-545454-FFFF01-00-ffffff-000000-ffffff-e2dcb1

//00-8a0000-ff0000-FE0000-FFFF01-00-ffffff-ff0000-000000-810909-00-ff0000-ff0000-000000-e2dcb1


document.getElementById("crearCodigo")
.addEventListener("click",function(){

    document.getElementById("codigoAvatar").value =
        generarCodigoAvatar();

});



  async function generarAvatarDesdeCodigo(codigo){

    codigo =
        codigo
        .trim()
        .toUpperCase();


    // 12 datos × 2 caracteres
    if(
        !/^[0-9A-F]{24}$/.test(codigo)
    ){

        alert(
            "Código de avatar inválido."
        );

        return;
    }


    // ==========================
    // CUERPO
    // ==========================

    const cuerpo = {

        archivo:
            codigo.substring(0,2),

        color1:
            codigo.substring(2,4),

        color2:
            codigo.substring(4,6),

        color3:
            codigo.substring(6,8)

    };


    // ==========================
    // OJOS
    // ==========================

    const ojos = {

        archivo:
            codigo.substring(8,10),

        color1:
            codigo.substring(10,12),

        color2:
            codigo.substring(12,14),

        color3:
            codigo.substring(14,16)

    };


    // ==========================
    // PELO
    // ==========================

    const pelo = {

        archivo:
            codigo.substring(16,18),

        color1:
            codigo.substring(18,20),

        color2:
            codigo.substring(20,22),

        color3:
            codigo.substring(22,24)

    };


    // ==========================
    // BORRAR AVATAR GENERADO
    // ==========================

    const contenedor =
        document.getElementById(
            "avatarGenerado"
        );


    contenedor.innerHTML = "";


    // ==========================
    // CREAR NUEVO
    // ==========================

    await crearCapaDesdeCodigo(
        "cuerpo",
        cuerpo
    );


    await crearCapaDesdeCodigo(
        "ojos",
        ojos
    );


    await crearCapaDesdeCodigo(
        "pelo",
        pelo
    );

}

/*
async function crearCapaDesdeCodigo(categoria, pieza){

    try{

        const ruta =
            categoria + "/" +
            pieza.archivo + ".svg";

        const respuesta = await fetch(ruta);

        if(!respuesta.ok){

            throw new Error(
                "No se encontró: " + ruta
            );

        }

        const textoSVG = await respuesta.text();

        const parser = new DOMParser();

        const doc = parser.parseFromString(
            textoSVG,
            "image/svg+xml"
        );

        // Guardamos temporalmente la pieza
        avatar[categoria].documento = doc;

        // Guardamos sus colores
        avatar[categoria].color1 = pieza.color1;
        avatar[categoria].color2 = pieza.color2;
        avatar[categoria].color3 = pieza.color3;
        avatar[categoria].color4 = pieza.color4;

        // Preparar las clases fil0, fil1, fil2, fil3
        prepararSVG(categoria);

        // Pintar usando el mismo sistema
        // que utiliza el avatar principal
        pintarAvatarGenerado(categoria);

    }
    catch(error){

        console.error(
            "Error cargando " + categoria,
            error
        );

    }
}
*/
async function crearCapaDesdeCodigo(categoria, pieza){

    try{

        const ruta = "avatarSocks/"+
            categoria + "/" +
            pieza.archivo + ".svg";

        const respuesta =
            await fetch(ruta);

        if(!respuesta.ok){

            throw new Error(
                "No se encontró: " + ruta
            );

        }

        const textoSVG =
            await respuesta.text();

        const parser =
            new DOMParser();

        const doc =
            parser.parseFromString(
                textoSVG,
                "image/svg+xml"
            );


        // =====================================
        // IMPORTANTE:
        // NO modificar avatar[categoria]
        // =====================================

        const prefijo =
            categoria + "_";

        const style =
            doc.querySelector("style");


        // =====================================
        // CAMBIAR NOMBRES DE LAS CLASES
        // =====================================

        if(style){

            let css =
                style.textContent;

            css = css.replace(
                /\.fil0/g,
                "." + prefijo + "fil0"
            );

            css = css.replace(
                /\.fil1/g,
                "." + prefijo + "fil1"
            );

            css = css.replace(
                /\.fil2/g,
                "." + prefijo + "fil2"
            );

            css = css.replace(
                /\.fil3/g,
                "." + prefijo + "fil3"
            );

            style.textContent = css;
        }


        // =====================================
        // CAMBIAR LAS CLASES DE LOS ELEMENTOS
        // =====================================

        doc.querySelectorAll("[class]").forEach(el => {

            let clases =
                el.className.baseVal.split(" ");

            clases =
                clases.map(c =>
                    prefijo + c
                );

            el.setAttribute(
                "class",
                clases.join(" ")
            );

        });


        // =====================================
        // APLICAR LOS 4 COLORES DEL CÓDIGO
        // =====================================

        if(style){

            let css =
                style.textContent;


            for(let i = 0; i < 3; i++){

                const color =
                    colorPaletaAHex(
                        pieza["color" + (i + 1)]
                    );


                const regex =
                    new RegExp(
                        "\\." +
                        categoria +
                        "_fil" +
                        i +
                        "\\s*\\{[^}]*fill:[^}]*\\}",
                        "i"
                    );


                css =
                    css.replace(
                        regex,

                        "." +
                        categoria +
                        "_fil" +
                        i +
                        " {fill:" +
                        color +
                        "}"
                    );

            }


                        style.textContent =
                            css;
                    }


        // =====================================
        // CREAR LA CAPA DEL AVATAR GENERADO
        // =====================================

        const contenedor =
            document.getElementById(
                "avatarGenerado"
            );


        const capa =
            document.createElement("div");


        capa.className =
            "capaGenerada";


        capa.id =
            "generado_" +
            categoria;


        capa.innerHTML =
            doc.documentElement.outerHTML;


        contenedor.appendChild(capa);

    }

    catch(error){

        console.error(
            "Error cargando " +
            categoria,
            error
        );

    }

}
