// =====================================
// ЭКРАНЫ
// =====================================

const pages = document.querySelector("#pages");

let page = 0;

let locked = false;

// =====================================
// ЦИЛИНДР
// =====================================

const wheel = document.querySelector(".cylinderWheel");

const services = document.querySelectorAll(".service");

const dots = document.querySelectorAll(".dot");

let angle = 0;

let currentService = 0;

// =====================================
// ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ
// =====================================

function goTo(index){

    page=index;

    pages.style.transform=
    `translateY(-${page*100}vh)`;

}

// =====================================
// АКТИВНАЯ КАРТОЧКА
// =====================================

function updateService(){

    services.forEach(card=>{

        card.classList.remove("active");

    });

    services[currentService].classList.add("active");

    dots.forEach(dot=>{

        dot.classList.remove("active");

    });

    if(dots[currentService]){

        dots[currentService].classList.add("active");

    }

}

// =====================================
// ВРАЩЕНИЕ БАРАБАНА
// =====================================

function rotateCylinder(dir){

    angle+=dir*120;

    wheel.style.transform=

    `rotateX(${angle}deg)`;

    currentService-=dir;

    if(currentService<0)
        currentService=2;

    if(currentService>2)
        currentService=0;

    updateService();

}

// =====================================
// КОЛЕСО
// =====================================

window.addEventListener("wheel",e=>{

if(locked)return;

locked=true;

setTimeout(()=>{

locked=false;

},700);

// Первый экран

if(page==0){

if(e.deltaY>0){

goTo(1);

}

return;

}

// Второй экран

if(page==1){

if(e.deltaY>0){

rotateCylinder(1);

}

else{

if(currentService===0){

goTo(0);

}

else{

rotateCylinder(-1);

}

}

}

});

// =====================================
// КЛАВИШИ
// =====================================

window.addEventListener("keydown",e=>{

if(e.key==="ArrowDown"){

if(page===0){

goTo(1);

}

else{

rotateCylinder(1);

}

}

if(e.key==="ArrowUp"){

if(page===1){

if(currentService===0){

goTo(0);

}

else{

rotateCylinder(-1);

}

}

}

});

// =====================================

updateService();
