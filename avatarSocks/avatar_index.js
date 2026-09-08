
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

const avatar={};

const panel=document.getElementById("panel");

const avatarDiv=document.getElementById("avatar");

categorias.forEach(crearCategoria);

function crearCategoria(nombre){

    avatar[nombre]={
    documento:null,
    color1:"#00FF01",
    color2:"#0000FE",
    color3:"#FE0000",
    color4:"#FFFF01",
    //color5:"#FF00FF"
};



    const div=document.createElement("div");

    div.className="categoria";


    div.innerHTML=`



<!--
   <input
    type="file"
    accept=".svg"
    data-categoria="${nombre}"
    class="archivo">
-->


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

        <input type="color"
               value="#00FF01"
               data-categoria="${nombre}"
               data-tipo="1"
               class="color">

        <input type="color"
               value="#0000FE"
               data-categoria="${nombre}"
               data-tipo="2"
               class="color">

        <input type="color"
               value="#FE0000"
               data-categoria="${nombre}"
               data-tipo="3"
               class="color">

        <input type="color"
               value="#FFFF01"
               data-categoria="${nombre}"
               data-tipo="4"
               class="color">
<!--
        <input type="color"
               value="#FF00FF"
               data-categoria="${nombre}"
               data-tipo="5"
               class="color">
--!>
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





function pintar(nombre){
   
    if(!avatar[nombre].documento)
        return;

    const doc=avatar[nombre].documento;

    const style=doc.querySelector("style");

    let css=style.textContent;

    for(let i=0;i<5;i++){

        css=css.replace(

            new RegExp(
                "\\."+nombre+"_fil"+i+"\\s*\\{fill:[^}]+\\}"
            ),

            "."+nombre+"_fil"+i+
            " {fill:"+avatar[nombre]["color"+(i+1)]+"}"

        );

    }

    style.textContent=css;

    let capa=document.getElementById("capa_"+nombre);

    if(!capa){

        capa=document.createElement("div");

        capa.id="capa_"+nombre;

        capa.className="capa";

        avatarDiv.appendChild(capa);

    }

    capa.innerHTML=doc.documentElement.outerHTML;

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
    return [

        avatar.cuerpo.archivo || "00",
        avatar.cuerpo.color1.replace("#",""),
        avatar.cuerpo.color2.replace("#",""),
        avatar.cuerpo.color3.replace("#",""),
        avatar.cuerpo.color4.replace("#",""),

        avatar.ojos.archivo || "00",
        avatar.ojos.color1.replace("#",""),
        avatar.ojos.color2.replace("#",""),
        avatar.ojos.color3.replace("#",""),
        avatar.ojos.color4.replace("#",""),

        avatar.pelo.archivo || "00",
        avatar.pelo.color1.replace("#",""),
        avatar.pelo.color2.replace("#",""),
        avatar.pelo.color3.replace("#",""),
        avatar.pelo.color4.replace("#","")

    ].join("-");

}

//00-7a7a7a-040005-FE0000-FFFF01-00-000000-afa7a7-545454-FFFF01-00-ffffff-000000-ffffff-e2dcb1

//00-8a0000-ff0000-FE0000-FFFF01-00-ffffff-ff0000-000000-810909-00-ff0000-ff0000-000000-e2dcb1


document.getElementById("crearCodigo")
.addEventListener("click",function(){

    document.getElementById("codigoAvatar").value =
        generarCodigoAvatar();

});



  async function generarAvatarDesdeCodigo(codigo){

    const partes =
        codigo.trim().split("-");


    if(partes.length !== 15){

        alert("Código de avatar inválido");

        return;
    }


    const cuerpo = {

        archivo: partes[0],

        color1: "#" + partes[1],
        color2: "#" + partes[2],
        color3: "#" + partes[3],
        color4: "#" + partes[4]

    };


    const ojos = {

        archivo: partes[5],

        color1: "#" + partes[6],
        color2: "#" + partes[7],
        color3: "#" + partes[8],
        color4: "#" + partes[9]

    };


    const pelo = {

        archivo: partes[10],

        color1: "#" + partes[11],
        color2: "#" + partes[12],
        color3: "#" + partes[13],
        color4: "#" + partes[14]

    };


    // =================================
    // BORRAR TODO EL AVATAR ANTERIOR
    // =================================

    const contenedor =
        document.getElementById(
            "avatarGenerado"
        );

    contenedor.innerHTML = "";


    // =================================
    // GENERAR NUEVO AVATAR
    // =================================

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


            for(let i = 0; i < 4; i++){

                const color =
                    pieza["color" + (i + 1)];


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
