document.addEventListener("DOMContentLoaded", function(){

  const menuToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuClose = document.querySelector(".mobile-close");
  const aboutBtn = document.querySelector(".mobile-nav-list .dropdown > a");

  // ===== TOGGLE OPEN/CLOSE =====
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();

    mobileMenu.classList.toggle("active");

    if(mobileMenu.classList.contains("active")){
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  // ===== CLOSE BUTTON =====
  menuClose.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // ===== OUTSIDE CLICK CLOSE =====
  document.addEventListener("click", (e) => {
    if(
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(e.target) &&
      !menuToggle.contains(e.target)
    ){
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // ===== ABOUT DROPDOWN =====
  aboutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    aboutBtn.parentElement.classList.toggle("active");
  });

});
// slide 
document.addEventListener("DOMContentLoaded", function(){

  const slides = document.querySelectorAll(".co-slide");
  const dots = document.querySelectorAll(".dot");

  let current = 0;
  let startX = 0;
  let endX = 0;
  let autoSlide;

  // =========================
  // SHOW SLIDE
  // =========================
  function showSlide(index){
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      dots[i].classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    current = index;
  }

  // =========================
  // NEXT / PREV
  // =========================
  function nextSlide(){
    let next = (current + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide(){
    let prev = (current - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  // =========================
  // AUTO SLIDE
  // =========================
  function startAuto(){
    autoSlide = setInterval(nextSlide, 4000);
  }

  function stopAuto(){
    clearInterval(autoSlide);
  }

  startAuto();

  // =========================
  // DOT CLICK
  // =========================
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      stopAuto();
      startAuto();
    });
  });

  // =========================
  // TOUCH SWIPE (MOBILE)
  // =========================
  const slider = document.querySelector(".co-slider");

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", () => {
    let diff = startX - endX;

    if(Math.abs(diff) > 50){ // swipe sensitivity
      if(diff > 0){
        nextSlide(); // swipe left
      } else {
        prevSlide(); // swipe right
      }
    }

    stopAuto();
    startAuto();
  });

  // =========================
  // MOUSE DRAG (DESKTOP)
  // =========================
  let isDragging = false;

  slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
  });

  slider.addEventListener("mousemove", (e) => {
    if(!isDragging) return;
    endX = e.clientX;
  });

  slider.addEventListener("mouseup", () => {
    if(!isDragging) return;

    let diff = startX - endX;

    if(Math.abs(diff) > 50){
      if(diff > 0){
        nextSlide();
      } else {
        prevSlide();
      }
    }

    isDragging = false;

    stopAuto();
    startAuto();
  });

});