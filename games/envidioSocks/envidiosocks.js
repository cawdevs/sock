
function envidiosocks_game(){

    if(!document.getElementById("sockGameStyle")){

        const style = document.createElement("style");
        style.id = "sockGameStyle";

        style.innerHTML = `


#game{

    width:100%;
    max-width:420px;

}

#canvas{

    width:100%;
    display:block;

}

#acciones{
    display:flex;
    width:100%;
    gap:16px;
    margin-top:8px;
    touch-action:none;

}



#left,
#right{
    flex:1;
    height:70px;
    font-size:32px;
}

#left:active{
    transform:scale(0.92);
    background:#1e90ffcc;
}
right:active{
    transform:scale(0.92);
    background:#1e90ffcc;
}



#fire{
    width:60px;
    height:60px;
    flex:none;
    font-size:28px;
    border-radius:50%;
    background:dodgerblue;
    color:white;
    border:2px solid #ffffff;
    cursor:pointer;

#fire:active{
    transform:scale(0.92);
    background:#1e90ffcc;
}
}

        `;

        document.head.appendChild(style);

    }

    




let canvas;
let ctx;

let up;
let down;
let left;
let right;
let fire;
//



    
const principal = document.getElementById("gameContainer");
principal.innerHTML = "";

//=========================
// GAME
//=========================

const game = document.createElement("div");
game.id = "game";
principal.appendChild(game);

//=========================
// CANVAS
//=========================

canvas = document.createElement("canvas");
canvas.id = "canvas";
canvas.width = 300;
canvas.height = 500;
canvas.tabIndex = 0;

game.appendChild(canvas);

canvas.focus();

ctx = canvas.getContext("2d");

ctx.fillStyle = "red";
ctx.fillRect(0,0,300,500);

//=========================
// CONTROLES
//=========================

const acciones = document.createElement("div");
acciones.id = "acciones";

game.appendChild(acciones);

//=========================
// BOTÓN IZQUIERDA
//=========================

left = document.createElement("button");
left.id = "left";
//left.innerHTML = "◀";

//=========================
// BOTÓN WEAPON
//=========================

fire = document.createElement("button");
fire.id = "fire";
//weapon.innerHTML = "↻";

//=========================
// BOTÓN DERECHA
//=========================

right = document.createElement("button");
right.id = "right";
//right.innerHTML = "▶";

//=========================
// AGREGAR BOTONES
//=========================

acciones.appendChild(left);
acciones.appendChild(fire);
acciones.appendChild(right)

    //=========================
    // EVENTOS
    //=========================
left.onpointerdown   = ()=>press("left");
left.onpointerup     = ()=>release("left");
left.onpointerleave  = ()=>release("left");
left.onpointercancel = ()=>release("left");

right.onpointerdown   = ()=>press("right");
right.onpointerup     = ()=>release("right");
right.onpointerleave  = ()=>release("right");
right.onpointercancel = ()=>release("right");



/*weapon.onpointerdown = ()=>cambiarArma();
    weapon.onpointerdown = ()=>{
        if(gameOver)
            reiniciarJuego();
    };
*/
    // Libera todas las teclas si el dedo se levanta fuera del botón
window.addEventListener("pointerup", soltarTodo);
window.addEventListener("pointercancel", soltarTodo);
window.addEventListener("blur", soltarTodo);

    //=========================
    // INICIAR EL JUEGO
    //=========================

    //iniciarJuego();





//const canvas=document.getElementById("canvas");
//const ctx=canvas.getContext("2d");

const sprite=new Image();
sprite.src="games/envidioSocks/imagenes/naves_socks.png";

////////////////////////////////////////
const bloques = new Image();
bloques.src = "games/envidioSocks/imagenes/elemento.png";

const TAM = 50;


const VACIO    = 0;
const ACERO    = 1;
const MINA     = 2;
const MADERA   = 3;
const SOCK     = 4;
const POLYGON  = 5;
const EXPLOSION= 6;   // solo para dibujar




let niveles = [

{
    barras:[
        [1,5,1,5,5,1],
        [1,2,2,5,3,2],
        [0,1,1,5,5,0],
        [1,2,1,5,3,3],
        [0,5,1,1,1,4],
        [2,2,2,5,3,2],
        
    ],
    vidaJefe:20,
    vidaHero:20,
    spriteJefe:1
},

{
    barras:[
        [5,5,5,5,5],
        [0,4,4,4,0],        
        [2,4,0,5,3],
        [0,1,1,5,5],
        [0,1,0,2,1],
    ],
    vidaJefe:20,
    vidaHero:20,
    spriteJefe:2
},

{
    barras:[
        [5,0,3,0,5],
        [4,5,3,3,2],
        [1,2,3,2,1],
        [0,2,0,5,1],
        
    ],
    vidaJefe:30,
    vidaHero:30,
    spriteJefe:3
},

{
    barras:[
        [3,3,3,3,5],
        [4,5,3,1,2],
        [1,0,1,0,1],
        [1,0,1,4,5],
        
    ],
    vidaJefe:40,
    vidaHero:40,
    spriteJefe:4
},

{
    barras:[
        [2,0,0,0,1],
        [4,5,0,1,2],
        [2,2,3,1,1],
        [1,1,1,3,0],
        [0,0,0,2,2],
       
    ],
    vidaJefe:50,
    vidaHero:50,
    spriteJefe:5
},

{
    barras:[
        [1,0,3,0,3],
        [2,5,0,1,2],
        [1,0,4,1,3],
        [2,4,0,4,2],
        [1,1,1,0,1],
        
    ],
    vidaJefe:60,
    vidaHero:60,
    spriteJefe:6
},

{
    barras:[
        [5,0,5,0,5],
        [4,5,0,1,2],        
        [5,0,5,3,3],
        [3,3,3,1,2],
        [1,3,3,3,3],
       
    ],
    vidaJefe:80,
    vidaHero:80,
    spriteJefe:7
},
{
    barras:[
        [5,0,5,0,5],
        [4,5,0,1,2],
        [1,2,1,2,1],
        [5,1,5,1,5],
        [4,2,0,1,2],
        [1,4,4,4,1],
        
    ],
    vidaJefe:100,
    vidaHero:100,
    spriteJefe:8
},

{
    barras:[
        [1,0,1,2,3],
        [1,2,0,1,2],
        [1,2,3,2,1],
        [2,0,4,2,3],
        [4,2,0,1,2],
        [1,3,3,2,1],
        
    ],
    vidaJefe:120,
    vidaHero:120,
    spriteJefe:9
},

{
    barras:[
        [3,0,5,0,5],
        [4,3,0,1,2],
        [3,2,3,0,1],
        [3,0,3,3,3],
        [3,5,3,1,3],
        [3,2,0,2,4],
        [3,3,3,3,3],
        [3,5,0,1,5],
        [2,2,3,2,0],
                
    ],
    vidaJefe:140,
    vidaHero:140,
    spriteJefe:10
},

{
    barras:[
        [3,3,3,3,3],
        [3,5,3,1,3],
        [3,2,3,2,3],
        [1,2,1,2,3],
        [2,1,2,1,3],
        [4,2,3,4,3],
        
    ],
    vidaJefe:160,
    vidaHero:160,
    spriteJefe:11
},

{
    barras:[
        [5,0,5,0,5],
        [4,5,0,1,2],
        [0,2,1,2,1],
        [5,0,5,0,5],
        [4,5,0,0,2],
        [1,2,1,2,1],
        [5,0,5,0,5],
        [4,5,0,1,2],
        [1,4,0,4,1],
       
    ],
    vidaJefe:220,
    vidaHero:220,
    spriteJefe:0
}

];

const nivelesOriginales = JSON.parse(
    JSON.stringify(niveles)
);

let nivelActual = 0;
let puntos=0;
//let barraY = -TAM;
//let velocidadMapa = 4;

const TIEMPO_ENTRE_BARRAS = 1250; // milisegundos
const VELOCIDAD_BARRAS = 6;

//const SPRITE_W = 64;
//const SPRITE_H = 64;
let BLOQUE_W = 0;
let BLOQUE_H = 0;

let spriteNaveCargado = false;
let spriteBloquesCargado = false;
//////////////////////////////////////

const COLS=12;
const ROWS=1;

let FRAME_W;
let FRAME_H;

const HERO_W = 35;
const HERO_H = 35;

const HERO_SPRITE_W = 100;
const HERO_SPRITE_H = 120;



//const HERO_W = 30;//tamaño de a nave para las colisiones
//const HERO_H = 30;//tamaño de a nave para las colisiones
let explosiones=[];//explosiones 
//const keys={ left:false, right:false, up:false, down:false };
const keys = { left:false, right:false, fire:false };
const hero={ x:150, y:400, speed:4, angle:0, targetAngle:0, vida:20, vidaMax:20, frame:0, cooldown:0 };

//const jefe = { activo:false, x:150, y:-100, vx:2, vida:100, entrando:true, vibracion:0 };
//DESTRUIRconst jefe = { activo:false, x:150, y:-100, vx:2, vida:100, vidaMax:100, entrando:true, vibracion:0, herido:false };
const jefe = { activo:false, x:150, y:-100, vx:2, vida:20, vidaMax:20, entrando:true, vibracion:0, muriendo:false, tiempoExplosion:0, frame:1};
let porcentajeVida = jefe.vida / jefe.vidaMax;
const disparos = [];
const VELOCIDAD_BALA = 8;
const ANCHO_BALA = 8;
const ALTO_BALA = 16;

let totalSock = 0;
let totalPolygon = 0;
let totalMadera = 0;
let jefeAparecio = false;


let mostrarVictoria = false;
let tiempoVictoria = 0;


const sonidoApareceMalo = new Audio("games/envidioSocks/sonidos/aparece_jefe.mp3");
const sonidoShotHero = new Audio("games/envidioSocks/sonidos/shot.mp3");
const explosionJefe = new Audio("games/envidioSocks/sonidos/explosion_jefe.mp3");
const explosionHero = new Audio("games/envidioSocks/sonidos/explosion_hero.mp3");
const coinHero = new Audio("games/envidioSocks/sonidos/coin.mp3");
const soundBox = new Audio("games/envidioSocks/sonidos/box.mp3");

let gameOver = false;
let heroMuerto = false;


//const fire = document.getElementById("fire");
//const weapon = document.getElementById("weapon");


//const fondo = new Image();
//fondo.src = "espacio1.JFIF";
//===========================

const fondos = [];

for(let i=1;i<=12;i++){

    const img = new Image();

    img.src = "games/envidioSocks/imagenes/espacio" + i + ".jfif";

    fondos.push(img);

}
let fondoActual = 0;



sprite.onload=()=>{

	FRAME_W=sprite.width/COLS;

	FRAME_H=sprite.height/ROWS;

	requestAnimationFrame(loop);
}


let barras=[];

let indiceBarra=0;

contarNivel();
setInterval(()=>{

    barras.push({ datos:niveles[nivelActual].barras[indiceBarra], y:-TAM });

    indiceBarra++;

    if(indiceBarra>=niveles[nivelActual].barras.length)
        indiceBarra=0;

	},TIEMPO_ENTRE_BARRAS);



bloques.onload = ()=>{

    console.log(canvas);
    BLOQUE_W = bloques.width / 6;
    BLOQUE_H = bloques.height;
    spriteBloquesCargado = true;

    //iniciarJuego();

}

function iniciarJuego(){
    

    //if(spriteNaveCargado && spriteBloquesCargado){

        requestAnimationFrame(loop);

    //}

}
//===========================

function loop(){

	update();
	draw();
	requestAnimationFrame(loop);

}

//===========================

function update(){

    if(gameOver)
       return;

    let dx = 0;
    let dy = 0;

    //-------------------------
    // Leer teclado
    //-------------------------


    if(keys.left){
        dx = -hero.speed;
        hero.targetAngle = -10;
    }

    if(keys.right){
        dx = hero.speed;
        hero.targetAngle = 10;
    }

    if(keys.up){

        //dy = -hero.speed;

    }

    if(keys.down){

        //dy = hero.speed;

    }

    //-------------------------

    if(!keys.left && !keys.right){
        hero.targetAngle = 0;
    }

    hero.angle += (hero.targetAngle - hero.angle) * 0.15;

    //-------------------------
    // Movimiento X
    //-------------------------

    if(hero.cooldown > 0)
         hero.cooldown--;

    if(keys.fire && hero.cooldown == 0){
        disparar();
        hero.cooldown = 10;
    }

    hero.x += dx;
    corregirColisionX(dx);

    //-------------------------
    // Movimiento Y
    //-------------------------

    hero.y += dy;
    corregirColisionY(dy);

    //-------------------------
    // Límites del escenario
    //-------------------------

    if(hero.x<30) hero.x=30;

    if(hero.x>300) hero.x=300;

    if(hero.y<40) hero.y=40;

    if(hero.y>460) hero.y=460;

    //-------------------------

    actualizarMapa();
    // Y volvemos a comprobar las colisiones verticales
    empujarPorMapa();

    actualizarJefe();

    detectarColisiones();

    actualizarDisparos();

    detectarImpactoBalas();

    if(mostrarVictoria){
        tiempoVictoria--;

        if(tiempoVictoria <= 0){
           mostrarVictoria = false;
           siguienteNivel();
        }
    }

    
    if(hero.vida <= 0 && !heroMuerto){
        heroMuerto = true;
        reproducirExplosionJefeHero();
        crearExplosionHero();

    }

    

    //-------------------------

    for(let i=explosiones.length-1;i>=0;i--){

        explosiones[i].frame++;

        if(explosiones[i].frame>30){

            explosiones.splice(i,1);

        }

    }


   if(heroMuerto && explosiones.length == 0){
      gameOver = true;
   }

 

}

//===========================

function draw(){
   
    ctx.fillStyle="black";
    ctx.fillRect(0,0,300,500);



    ctx.drawImage(
       fondos[nivelActual % fondos.length],
       0,
       0,
       canvas.width,
       canvas.height
    );


    dibujarMapa();    

    dibujarDisparos();

    drawHero();

    dibujarJefe();

    dibujarExplosiones();
    /*
    ctx.fillStyle="white";
    ctx.font="16px Arial";
    ctx.fillText("SOCK : " + totalSock,100,220);
    ctx.fillText("POLYGON : " + totalPolygon,100,240);
    ctx.fillText("MADERA : " + totalMadera,100,260);
    ctx.fillText("Vida Malo : " + jefe.vida,100,280);
    ctx.fillText("Nivel " + (nivelActual + 1),100,300);
    */


    if(jefe.activo){
        ctx.fillStyle="red";
        ctx.fillRect(50,40,200,5);
        ctx.fillStyle="lime";
        ctx.fillRect(50,40,200*(jefe.vida/jefe.vidaMax),5);
       
    }
        
       
   ctx.fillStyle = "white";
   ctx.font = "bold 14px Arial";
   ctx.textAlign = "left";

   ctx.fillText("SCORE: " + puntos, 10, 20);
   ctx.fillText("NIVEL: " + (nivelActual + 1), 200, 20);

    ctx.fillStyle="red";
    ctx.fillRect(50,30,200,5);
    ctx.fillStyle="blue";
    ctx.fillRect(50,30,200*(hero.vida/hero.vidaMax),5);   

     
    ctx.fillText((hero.vida/hero.vidaMax),canvas.width/2,canvas.height/2 );
    

    if(mostrarVictoria){
        ctx.fillStyle="yellow";
        ctx.font="bold 48px Arial";
        ctx.textAlign="center";
        ctx.fillText("VICTORIA",canvas.width/2,canvas.height/2 );

    }

    if(gameOver){
        ctx.fillStyle = "red";
        ctx.font = "bold 40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER",canvas.width/2, canvas.height/2);
    }


}

//===========================
function drawHero(){

    ctx.save();

    // Mover el origen al centro de la nave
    ctx.translate(hero.x, hero.y);

    // Girar la nave
    ctx.rotate(hero.angle * Math.PI / 180);



    // Dibujar la nave
    ctx.drawImage(

        sprite,

        0,
        0,

        FRAME_W,
        FRAME_H,

        -HERO_SPRITE_W/2,
        -HERO_SPRITE_H/2,

        HERO_SPRITE_W,
        HERO_SPRITE_H

    );

    // ===== HITBOX =====
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    ctx.strokeRect(

        -HERO_W/2,
        -HERO_H/2,

        HERO_W,
        HERO_H

    );

    ctx.restore();

    

}

//===========================
function press(name){

    keys[name] = true;

    console.log(name, "ON");

}

function release(name){

    keys[name] = false;

    console.log(name, "OFF");

}

//===========================
/*
left.onpointerdown=()=>press("left");
left.onpointerup=()=>release("left");
left.onpointerleave=()=>release("left");

right.onpointerdown=()=>press("right");
right.onpointerup=()=>release("right");
right.onpointerleave=()=>release("right");

up.onpointerdown=()=>press("up");
up.onpointerup=()=>release("up");
up.onpointerleave=()=>release("up");

down.onpointerdown=()=>press("down");
down.onpointerup=()=>release("down");
down.onpointerleave=()=>release("down");
*/
/*
fire.onpointerdown = ()=>{
    disparar();
};
*/
fire.onpointerdown = ()=>{
    if(gameOver){
        reiniciarJuego();
        return;
    }
    press("fire");
};

fire.onpointerup     = ()=>release("fire");
fire.onpointerleave  = ()=>release("fire");
fire.onpointercancel = ()=>release("fire");



window.addEventListener("keydown", e=>{

    if(e.repeat) return; // evita repeticiones automáticas del teclado

    if(e.key=="ArrowLeft")
        press("left");

    if(e.key=="ArrowRight")
        press("right");

    if(e.code=="Space")
        press("fire");

});

window.addEventListener("keyup", e=>{

    if(e.key=="ArrowLeft")
        release("left");

    if(e.key=="ArrowRight")
        release("right");

    if(e.code=="Space")
        release("fire");

});



function actualizarMapa(){

    for(let barra of barras){
        barra.y += VELOCIDAD_BARRAS;
    }
    barras = barras.filter(barra=>barra.y<canvas.height+TAM);
}



function dibujarMapa(){

    for(let barra of barras){

        for(let i=0;i<barra.datos.length;i++){

            let tipo=barra.datos[i];

            if(tipo==VACIO)
                continue;

            let sx=(tipo-1)*BLOQUE_W;

            ctx.drawImage(

                bloques,

                sx,
                0,

                BLOQUE_W,
                BLOQUE_H,

                i*TAM,
                barra.y,

                TAM,
                TAM

            );

        }

    }

}


function detectarColisiones(){

    for(let barra of barras){

        for(let i=0;i<barra.datos.length;i++){

            let tipo = barra.datos[i];

            if(tipo==VACIO)
                continue;

            let x = i * TAM;
            let y = barra.y;

            if(colisionRectangulo(

                hero.x-HERO_W/2,
                hero.y-HERO_H/2,
                HERO_W,
                HERO_H,

                x,
                y,
                TAM,
                TAM

            )){

                procesarColision(tipo,barra,i);

            }

        }

    }

}

function colisionRectangulo(x1,y1,w1,h1, x2,y2,w2,h2 ){

    return (

        x1 < x2+w2 &&
        x1+w1 > x2 &&
        y1 < y2+h2 &&
        y1+h1 > y2

    );

}

function procesarColision(tipo, barra, indice){

    switch(tipo){

        case MINA:
            explosiones.push({ x: indice*TAM + TAM/2, y: barra.y + TAM/2,frame:0 });

            barra.datos[indice]=VACIO;

            hero.vida-=10;

            console.log("BOOM");
            console.log("MINA");

            reproducirExplosionHero();

            // Aquí luego quitaremos una vida
            // vidas--;

        break;

        case ACERO:

            console.log("ACERO");
            

            // Después aquí impediremos que la nave avance

        break;

        case SOCK:

            console.log("+100");
            reproducirCoin();
            puntos+=10;
            barra.datos[indice]=VACIO;
            totalSock--;
            revisarFinNivel();

            // puntos += 100;

        break;

        case POLYGON:

            console.log("+500");
            reproducirCoin();

            //hero.vida+=2;
            puntos+=100;

            barra.datos[indice]=VACIO;
            totalPolygon--;
            revisarFinNivel();

            // puntos += 500;

        break;

        case MADERA:

            console.log("MADERA");
           

            // Por ahora solo detiene la nave.
            // Más adelante las balas la destruirán.

        break;

    }

   

}

function dibujarExplosiones(){
     

    for(let explosion of explosiones){

        let s = explosion.size || 60;

        ctx.drawImage(

            bloques,

            5*BLOQUE_W,
            0,

            BLOQUE_W,
            BLOQUE_H,

            explosion.x-s/2,
            explosion.y-s/2,

            s,
            s

        );

    }

}

function corregirColisionX(dx){

    for(let barra of barras){

        for(let i=0;i<barra.datos.length;i++){

            let tipo = barra.datos[i];

            if(tipo!=ACERO && tipo!=MADERA)
                continue;

            let bx = i*TAM;
            let by = barra.y;

            

            if(

                hero.x-HERO_W/2 < bx+TAM &&
                hero.x+HERO_W/2 > bx &&
                hero.y-HERO_H/2 < by+TAM &&
                hero.y+HERO_H/2 > by

            ){

                if(dx>0){
                    // Venía de la izquierda
                    hero.x = bx - HERO_W/2;
                }
                else if(dx<0){
                    // Venía de la derecha
                    hero.x = bx + TAM + HERO_W/2;
                }

            }

        }

    }

}

function corregirColisionY(dy){

    for(let barra of barras){

        for(let i=0;i<barra.datos.length;i++){

            let tipo = barra.datos[i];

            if(tipo!=ACERO && tipo!=MADERA)
                continue;

            let bx = i*TAM;
            let by = barra.y;



            if(

                hero.x-HERO_W/2 < bx+TAM &&
                hero.x+HERO_W/2 > bx &&
                hero.y-HERO_H/2 < by+TAM &&
                hero.y+HERO_H/2 > by

            ){

                if(dy>0){
                    // Venía de arriba
                    hero.y = by - HERO_H/2;
                }
                else if(dy<0){
                    // Venía de abajo
                    hero.y = by + TAM + HERO_H/2;
                }

            }

        }

    }

}


function empujarPorMapa(){

    for(let barra of barras){

        for(let i=0;i<barra.datos.length;i++){

            let tipo = barra.datos[i];

            if(tipo!=ACERO && tipo!=MADERA)
                continue;

            let bx = i*TAM;
            let by = barra.y;

            if(

                hero.x-HERO_W/2 < bx+TAM &&
                hero.x+HERO_W/2 > bx &&
                hero.y-HERO_H/2 < by+TAM &&
                hero.y+HERO_H/2 > by

            ){

                // El bloque bajó encima de la nave,
                // así que la empuja hacia abajo.
                hero.y = by + TAM + HERO_H/2;

            }

        }

    }

}


function disparar(){

    disparos.push({

        x: hero.x,

        y: hero.y-40,

        activa:true

    });

    reproducirDisparo();

}

function actualizarDisparos(){

    for(let i=disparos.length-1;i>=0;i--){

        disparos[i].y-=VELOCIDAD_BALA;

        if(disparos[i].y<-20){

            disparos.splice(i,1);

        }

    }

}

function dibujarDisparos(){

    ctx.fillStyle="yellow";

    for(let bala of disparos){

        ctx.fillRect(

            bala.x-2,

            bala.y,

            ANCHO_BALA,

            ALTO_BALA

        );

    }

}


function detectarImpactoBalas(){

    for(let b=disparos.length-1;b>=0;b--){

        let bala=disparos[b];

        let eliminarBala=false;

        //========================
        // Impacto contra TIEF
        //========================
        //if(jefe.vida<=0){       
        //   destruirJefe();
        //}

        if(jefe.vida<=0 && !jefe.muriendo){
            jefe.muriendo = true;
            jefe.tiempoExplosion = 120;
        }

        if(jefe.activo){

            if(

                bala.x > jefe.x-55 &&
                bala.x < jefe.x+55 &&
                bala.y > jefe.y-45 &&
                bala.y < jefe.y+45

            ){

                jefe.vida--;

                jefe.vibracion = 10;

                disparos.splice(b,1);

                continue;

            }

        }

        for(let barra of barras){

            for(let i=0;i<barra.datos.length;i++){

                let tipo=barra.datos[i];

                if(tipo==VACIO)
                    continue;

                let bx=i*TAM;
                let by=barra.y;

                if(

                    bala.x>bx &&
                    bala.x<bx+TAM &&
                    bala.y>by &&
                    bala.y<by+TAM

                ){

                    //--------------------------------
                    // MADERA
                    //--------------------------------

                    if(tipo==MADERA){

                        barra.datos[i]=VACIO;
                        totalMadera--;
                        revisarFinNivel();
                        

                        explosiones.push({

                            x:bx+TAM/2,

                            y:by+TAM/2,

                            frame:0

                        });

                        reproducirBox();

                        eliminarBala=true;

                    }

                    //--------------------------------
                    // ACERO
                    //--------------------------------

                    else if(tipo==ACERO){

                        eliminarBala=true;

                    }

                    if(eliminarBala)
                        break;

                }

            }

            if(eliminarBala)
                break;

        }

        if(eliminarBala){

            disparos.splice(b,1);

        }

    }

}


function contarNivel(){

    totalSock = 0;
    totalPolygon = 0;
    totalMadera = 0;

    for(let barra of niveles[nivelActual].barras){

        for(let tipo of barra){

            switch(tipo){

                case SOCK:
                    totalSock++;
                break;

                case POLYGON:
                    totalPolygon++;
                break;

                case MADERA:
                    totalMadera++;
                break;

            }

        }

    }

}

function revisarFinNivel(){

    if(

        totalSock==0 &&
        totalPolygon==0 &&
        totalMadera==0 &&
        !jefeAparecio

    ){

        jefeAparecio = true;
        jefe.activo = true;
        
        console.log("APARECE EL TIEF");

        jefe.y = -100;
        jefe.entrando = true;
        jefe.x = 150;
        reproducirApareceMalo();


    }

}

function actualizarJefe(){


    if(jefe.vibracion>0){
       jefe.vibracion--;
    }

    if(!jefe.activo)
        return;

    if(jefe.entrando){

        jefe.y += 2;

        if(jefe.y >= 150){

            jefe.y = 150;

            jefe.entrando = false;

        }

    }else{

        jefe.x += jefe.vx;

        if(jefe.x > 260 || jefe.x < 40)

            jefe.vx *= -1;

    }


    if(jefe.muriendo){

        jefe.tiempoExplosion--;

        // Generar explosiones aleatorias
        if(jefe.tiempoExplosion % 8 == 0){

            explosiones.push({

                x:jefe.x + (Math.random()-0.5)*120,  
                
                y:jefe.y + (Math.random()-0.5)*90,

                frame:0,

                size:80

            });

        }

        // Explosión final
        if(jefe.tiempoExplosion<=0){
            reproducirExplosionJefeHero();
            explosiones.push({

                x:jefe.x,

                y:jefe.y,

                frame:0,

                size:180

            });


            jefe.activo=false;

            mostrarVictoria = true;
            tiempoVictoria = 180; // 3 segundos aprox.

        }

        return;

    }

}

function dibujarJefe(){

    if(!jefe.activo)
        return;

    ctx.save();

    let sacudidaX = 0;
    let sacudidaY = 0;

    if(jefe.vibracion>0){

        sacudidaX = (Math.random()-0.5)*8;
        sacudidaY = (Math.random()-0.5)*8;

    }

    

    ctx.translate(
        jefe.x+sacudidaX,
        jefe.y+sacudidaY
    );

    // Dibuja la nave
    ctx.drawImage(

        sprite,

        jefe.frame * FRAME_W,

        0,

        FRAME_W,
        FRAME_H,

        -55,
        -45,

        110,
        90

    );
   

    // VIDA CRÍTICA
    let porcentajeVida =
        jefe.vida / jefe.vidaMax;

    

    if(porcentajeVida <= 0.10){

        sacudidaX=(Math.random()-0.5)*40;
        sacudidaY=(Math.random()-0.5)*40;

        // Parpadeo
        if(Math.floor(Date.now()/100)%2==0){

            ctx.fillStyle="rgba(255,0,0,0.5)";

            ctx.fillRect(
                -55,
                -45,
                110,
                90
            );

        }

    }

    ctx.restore();

}

function destruirJefe(){

    jefe.activo = false;

    // Explosión central grande
    explosiones.push({

        x:jefe.x,
        y:jefe.y,
        frame:0

    });

    // Explosiones alrededor

    for(let i=0;i<15;i++){

        explosiones.push({

            x:jefe.x + (Math.random()-0.5)*120,

            y:jefe.y + (Math.random()-0.5)*100,

            frame:0

        });

    }

    console.log("VICTORIA");

}

function siguienteNivel(){

    nivelActual++;

    fondoActual=nivelActual;

    if(fondoActual >= fondos.length){
        fondoActual = 0;
    }

    // Si ya no hay más niveles
    if(nivelActual >= niveles.length){
        nivelActual = 0;
        hero.vida =niveles[nivelActual].vidaHero;
        hero.vidaMax = niveles[nivelActual].vidaHero;
        niveles = JSON.parse(JSON.stringify(nivelesOriginales));
    }

    // Limpiar barras viejas
    barras = [];

    // Reiniciar generación
    indiceBarra = 0;

    // Reiniciar contadores
    totalSock = 0;
    totalPolygon = 0;
    totalMadera = 0;

    jefeAparecio = false;
    jefe.activo = false;
    jefe.muriendo = false;
    jefe.entrando = true;

     // Cambiar sprite del jefe según el nivel
    jefe.frame =niveles[nivelActual].spriteJefe;
    jefe.vida =niveles[nivelActual].vidaJefe;    
    jefe.vidaMax = niveles[nivelActual].vidaJefe;


    // Volver a contar objetos del nuevo nivel
    contarNivel();


    console.log("NIVEL", nivelActual+1);

}


function reproducirDisparo(){
    const s = new Audio("games/envidioSocks/sonidos/shot.mp3");
    s.volume = 0.1;
    s.play();
}

function reproducirCoin(){
    const s = new Audio("games/envidioSocks/sonidos/coin.mp3");
    //s.volume = 0.3;
    s.play();
}

function reproducirBox(){
    const s = new Audio("games/envidioSocks/sonidos/box.mp3");
    //s.volume = 0.3;
    s.play();
}


function reproducirExplosionHero(){
    const s = new Audio("games/envidioSocks/sonidos/explosion_hero.mp3");
    //s.volume = 0.3;
    s.play();
}

function reproducirApareceMalo(){
    const s = new Audio("games/envidioSocks/sonidos/aparece_jefe.mp3");
    //s.volume = 0.3;
    s.play();
}

function reproducirExplosionJefeHero(){
    const s = new Audio("games/envidioSocks/sonidos/explosion_jefe.mp3");
    //s.volume = 0.3;
    s.play();
}

function crearExplosionHero(){

    for(let i=0;i<20;i++){

        explosiones.push({

            x: hero.x + (Math.random()-0.5)*120,

            y: hero.y + (Math.random()-0.5)*120,

            frame: 0,

            grande: true

        });

    }

    if(heroMuerto && explosiones.length == 0){
       gameOver = true;

}

}


function reiniciarJuego(){

    // Estado general
    gameOver = false;
    heroMuerto = false;


    // Nave
    hero.x = 150;
    hero.y = 550;
   
    hero.angle = 0;
    hero.targetAngle = 0;

    // Limpiar objetos
    balas = [];
    explosiones = [];
    barras = [];

    // Nivel
    nivelActual = 0;
    hero.vida = niveles[nivelActual].vidaHero;
    hero.vidaMax = niveles[nivelActual].vidaHero;
    niveles = JSON.parse(JSON.stringify(nivelesOriginales));

    // Reiniciar contadores
    totalSock = 0;
    totalPolygon = 0;
    totalMadera = 0;

    // Reiniciar jefe
    jefe.activo = false;
    jefe.muriendo = false;
    jefe.entrando = true;
    jefe.x = 150;
    jefe.y = -100;

    // Reiniciar score si quieres
    puntos = 0;

    // Volver a contar objetivos del nivel
    contarNivel();

    // Preparar generación de barras
    indiceBarra = 0;

}

function soltarTodo(){
    release("left");
    release("right");
    release("fire");
}

}