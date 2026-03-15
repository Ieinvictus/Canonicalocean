/* =========================
DRINK SLIDER
========================= */

document.querySelectorAll(".drink-track").forEach((track)=>{

const drinks = Array.from(track.querySelectorAll(".drink"));
const section = track.closest(".drink-section");

const bg = section.querySelector(".drink-bg");
const drinkText = section.querySelector(".drink-text");
const nav = document.querySelector(".inv-navbar");

let index = 0;
let startX = 0;
let activated = false;


/* =========================
BACKGROUND UPDATE
========================= */

function updateBackground(color){

if(!bg) return;

bg.style.transition = "background-color 0.6s ease";
bg.style.backgroundColor = color;

if(activated && nav){

let glassColor = color + "cc";

if(color === "#000" || color === "#000000" || color === "#111111"){
glassColor = "rgba(0,0,0,0.75)";
}

nav.style.transition = "background 0.4s ease";
nav.style.background = glassColor;

}

if(drinkText){

if(color === "#ffffff" || color === "#f8f9fa"){
drinkText.classList.remove("white-text");
}else{
drinkText.classList.add("white-text");
}

}

}


/* =========================
POSITION UPDATE
========================= */

function update(){

drinks.forEach(el=>{
el.classList.remove(
"center",
"left",
"right",
"far-left",
"far-right"
);
});

const total = drinks.length;

const center = index;
const left = (index - 1 + total) % total;
const right = (index + 1) % total;
const farLeft = (index - 2 + total) % total;
const farRight = (index + 2) % total;

drinks[center].classList.add("center");
drinks[left].classList.add("left");
drinks[right].classList.add("right");
drinks[farLeft].classList.add("far-left");
drinks[farRight].classList.add("far-right");

if(activated){
const color = drinks[center].dataset.color;
updateBackground(color);
}

}

function next(){
index++;
if(index >= drinks.length){
index = 0;
}
requestAnimationFrame(update);
}

function prev(){
index--;
if(index < 0){
index = drinks.length - 1;
}
requestAnimationFrame(update);
}


/* =========================
SWIPE SUPPORT
========================= */

track.addEventListener("touchstart",(e)=>{
startX = e.touches[0].clientX;
});

track.addEventListener("touchend",(e)=>{

activated = true;

if(drinkText){
drinkText.classList.add("show");
}

let endX = e.changedTouches[0].clientX;

if(startX - endX > 50){
next();
}

if(endX - startX > 50){
prev();
}

});


/* =========================
CLICK SUPPORT
========================= */

drinks.forEach((drink,i)=>{

drink.addEventListener("click",()=>{

activated = true;

if(drinkText){
drinkText.classList.add("show");
}

index = i;
requestAnimationFrame(update);

});

});


if(drinkText){
drinkText.classList.remove("white-text");
drinkText.classList.add("show");
}

update();

window.addEventListener("resize",()=>{
requestAnimationFrame(update);
});

});


/* =========================
NAVBAR SCROLL EFFECT
========================= */

window.addEventListener("scroll", function(){

const nav = document.querySelector(".inv-navbar");

if(!nav) return;

if(window.scrollY > 120){
nav.classList.add("scrolled");
}else{
nav.classList.remove("scrolled");
}

});


/* =========================
MOBILE MENU
========================= */

document.addEventListener("DOMContentLoaded", function(){

const navToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileClose = document.querySelector(".mobile-close");
const mobileBox = document.querySelector(".mobile-menu-box");


/* TOGGLE MENU */

navToggle.addEventListener("click", function(e){

e.stopPropagation();

mobileMenu.classList.toggle("active");

document.body.style.overflow =
mobileMenu.classList.contains("active") ? "hidden" : "auto";

});


/* CLOSE BUTTON */

mobileClose.addEventListener("click", function(){

mobileMenu.classList.remove("active");
document.body.style.overflow = "auto";

});


/* OUTSIDE CLICK CLOSE */

document.addEventListener("click", function(e){

if(
mobileMenu.classList.contains("active") &&
!mobileBox.contains(e.target) &&
!navToggle.contains(e.target)
){

mobileMenu.classList.remove("active");
document.body.style.overflow = "auto";

}

});


/* ESC KEY CLOSE */

document.addEventListener("keydown", function(e){

if(e.key === "Escape"){

mobileMenu.classList.remove("active");
document.body.style.overflow = "auto";

}

});

});