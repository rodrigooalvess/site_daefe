document.addEventListener("DOMContentLoaded", function () {

    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    if (slides.length > 0) {
        // A cada 3000 milissegundos (3 segundos), troca a foto
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 3000);
    }

    const track = document.getElementById('apoio-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const wrapper = document.querySelector('.carousel-wrapper');

    if (track && prevBtn && nextBtn && wrapper) {
        const scrollAmount = 330;

        const passarProximo = () => {
            if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        };

        nextBtn.addEventListener('click', passarProximo);

        prevBtn.addEventListener('click', () => {
            if (track.scrollLeft <= 10) {
                track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });

        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        if (isMobile) {
            let autoPlayTimer;
            const tempoDeEspera = 3000;

            const ligarAutoPlay = () => {
                autoPlayTimer = setInterval(passarProximo, tempoDeEspera);
            };

            const pausarAutoPlay = () => {
                clearInterval(autoPlayTimer);
            };

            ligarAutoPlay();

            wrapper.addEventListener('touchstart', pausarAutoPlay, { passive: true });
            wrapper.addEventListener('touchend', ligarAutoPlay, { passive: true });
        }
    }
});
