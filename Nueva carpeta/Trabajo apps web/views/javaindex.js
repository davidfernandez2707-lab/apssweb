const navbar = document.getElementById('navbar')
const elementos = document.querySelectorAll('.aparecer');


function scrollNavbar(){
    if (window.scrollY > 100) {
        navbar.classList.add('nav-scroll')
    } else {
        navbar.classList.remove('nav-scroll')
    }
}

const opciones = {
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px" 
};

const aparecerAlHacerScroll = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('mostrar'); 
            observer.unobserve(entry.target);       
        }
    });
}, opciones);

elementos.forEach(el => {
    aparecerAlHacerScroll.observe(el);
});