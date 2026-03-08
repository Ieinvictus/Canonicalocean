/* SELECT ELEMENTS */

const hero = document.querySelector(".hero");
const cans = document.querySelectorAll(".can");

/* PARALLAX CANS */

hero.addEventListener("mousemove", (e) => {

const x = (window.innerWidth / 2 - e.pageX) / 40;
const y = (window.innerHeight / 2 - e.pageY) / 40;

cans.forEach((can,i) => {

if(i === 0){

can.style.transform =
`translate(${x}px, ${y}px) rotate(-12deg)`;

}

else{

can.style.transform =
`translate(${-x}px, ${-y}px) rotate(12deg)`;

}

});

});

/* FLOAT LOOP */

function floatCans(){

cans.forEach((can,i)=>{

if(i===0){

can.animate(
[
{transform:"translateY(0px) rotate(-12deg)"},
{transform:"translateY(-15px) rotate(-12deg)"},
{transform:"translateY(0px) rotate(-12deg)"}
],
{
duration:4000,
iterations:Infinity,
easing:"ease-in-out"
}
);

}

else{

can.animate(
[
{transform:"translateY(0px) rotate(12deg)"},
{transform:"translateY(-15px) rotate(12deg)"},
{transform:"translateY(0px) rotate(12deg)"}
],
{
duration:4000,
iterations:Infinity,
easing:"ease-in-out"
}
);

}

});

}

/* START FLOAT */

floatCans();