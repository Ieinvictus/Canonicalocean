document.addEventListener("DOMContentLoaded", function(){

/* =========================
NAVBAR MOBILE MENU
========================= */

const toggle = document.querySelector(".nav-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const closeBtn = document.querySelector(".mobile-close");
const menuBox = document.querySelector(".mobile-menu-box");

/* TOGGLE OPEN / CLOSE */

toggle.addEventListener("click", function(e){

e.stopPropagation();

mobileMenu.classList.toggle("active");

document.body.style.overflow =
mobileMenu.classList.contains("active") ? "hidden" : "auto";

});

/* CLOSE BUTTON */

closeBtn.addEventListener("click", function(){

mobileMenu.classList.remove("active");
document.body.style.overflow="auto";

});


/* CLICK OUTSIDE CLOSE */

document.addEventListener("click", function(e){

if(
mobileMenu.classList.contains("active") &&
!menuBox.contains(e.target) &&
!toggle.contains(e.target)
){

mobileMenu.classList.remove("active");
document.body.style.overflow="auto";

}

});


/* ESC KEY CLOSE */

document.addEventListener("keydown", function(e){

if(e.key === "Escape"){

mobileMenu.classList.remove("active");
document.body.style.overflow="auto";

}

});


/* =========================
SLIDER
========================= */

const slider = document.querySelector(".co-slider");
const slides = document.querySelectorAll(".co-slide");
const dots = document.querySelectorAll(".dot");

let index = 0;
let startX = 0;
let endX = 0;

function showSlide(i){

slides.forEach(slide => slide.classList.remove("active"));
dots.forEach(dot => dot.classList.remove("active"));

slides[i].classList.add("active");
dots[i].classList.add("active");

index = i;

}


/* DOT CLICK */

dots.forEach((dot,i)=>{

dot.addEventListener("click", ()=>{
showSlide(i);
});

});


/* TOUCH */

slider.addEventListener("touchstart",(e)=>{
startX = e.touches[0].clientX;
});

slider.addEventListener("touchend",(e)=>{

endX = e.changedTouches[0].clientX;
handleSwipe();

});


/* MOUSE DRAG */

slider.addEventListener("mousedown",(e)=>{
startX = e.clientX;
});

slider.addEventListener("mouseup",(e)=>{

endX = e.clientX;
handleSwipe();

});


function handleSwipe(){

let diff = startX - endX;

if(diff > 50){

index++;

if(index >= slides.length){
index = 0;
}

showSlide(index);

}

else if(diff < -50){

index--;

if(index < 0){
index = slides.length - 1;
}

showSlide(index);

}

}

});