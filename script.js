const slides = document.querySelectorAll(".slide");
const etoiles = document.querySelectorAll(".etoiles span");

let index = 0;

function afficherSlide(i){

    slides.forEach(slide => slide.classList.remove("active"));
    etoiles.forEach(e => e.classList.remove("active"));

    slides[i].classList.add("active");
    etoiles[i].classList.add("active");

    etoiles.forEach((e, position)=>{

        e.innerHTML = position === i ? "★" : "☆";

    });

}

etoiles.forEach((etoile, position)=>{

    etoile.addEventListener("click",()=>{

        index = position;
        afficherSlide(index);

    });

});

setInterval(()=>{

    index++;

    if(index >= slides.length){

        index = 0;

    }

    afficherSlide(index);

},5000);

const dots = document.querySelectorAll(".dot");

function updateDots(){

    dots.forEach((dot,i)=>{

        dot.innerHTML = (i===index) ? "★" : "☆";

    });

}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}