document.addEventListener('DOMContentLoaded', () => {
  // Variables principales
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  const carouselImages = document.querySelector('.carousel-images');
  const buttons = document.querySelectorAll('.day-buttons button');
  const totalImages = buttons.length;

  let currentIndex = 0;
  let intervalId;
  let inactivityTimeout;
  let touchStartX = 0;
  let touchEndX = 0;

  function changeSlide(index) {
    currentIndex = (index + totalImages) % totalImages;
    const offset = -currentIndex * (100 / totalImages);
    carouselImages.style.transform = `translateX(${offset}%)`;

    buttons.forEach((btn, btnIndex) => {
      btn.classList.toggle('active', btnIndex === currentIndex);
    });
    
    // Al cambiar de slide, reiniciamos el carrusel y el timeout
    startCarousel();
    resetInactivityTimeout();
  }

  function startCarousel() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      changeSlide(currentIndex + 1);
    }, 15000);
  }

  function resetInactivityTimeout() {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
      window.location.href = "../index.html";
    }, 30000);
  }

  // Asigna eventos de clic a los botones
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      changeSlide(index);
    });
  });

  // --- Funcionalidad de Deslizamiento Táctil (Swipe) ---
  function handleSwipe() {
    const swipeThreshold = 50; // Mínimo de píxeles para considerar un swipe
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe a la izquierda
      changeSlide(currentIndex + 1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe a la derecha
      changeSlide(currentIndex - 1);
    }
  }

  carouselWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(intervalId); // Pausa el carrusel al tocar
  });

  carouselWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startCarousel(); // Reanuda el carrusel después del swipe
  });
  // --- Fin de la funcionalidad de Swipe ---


  // Eventos para reiniciar el temporizador de inactividad
  // Se deja 'click' para compatibilidad y pruebas en PC
  const userEvents = ["click", "touchstart"];
  userEvents.forEach(eventType => {
    document.body.addEventListener(eventType, resetInactivityTimeout);
  });

  // --- Configuración Inicial ---
  if (totalImages > 0) {
    changeSlide(0);
  }
});