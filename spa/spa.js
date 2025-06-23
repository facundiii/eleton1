document.addEventListener('DOMContentLoaded', () => {
  // --- Variables principales (se adaptan solas) ---
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  const carouselImages = document.querySelector('.carousel-images');
  const buttons = document.querySelectorAll('.day-buttons button');
  // totalImages se calculará automáticamente como 4
  const totalImages = buttons.length;

  let currentIndex = 0;
  let intervalId;
  let inactivityTimeout;
  let touchStartX = 0;
  let touchEndX = 0;

  // --- Lógica del carrusel (funciona para cualquier número de imágenes) ---
  function changeSlide(index) {
    currentIndex = (index + totalImages) % totalImages;
    // El desplazamiento también es dinámico: -100% / 4 = -25% por slide
    const offset = -currentIndex * (100 / totalImages);
    carouselImages.style.transform = `translateX(${offset}%)`;

    buttons.forEach((btn, btnIndex) => {
      btn.classList.toggle('active', btnIndex === currentIndex);
    });
    
    startCarousel();
    resetInactivityTimeout();
  }

  function startCarousel() {
    clearInterval(intervalId);
    // Usamos 15 segundos como en la última versión de "actividades"
    intervalId = setInterval(() => {
      changeSlide(currentIndex + 1);
    }, 15000); // 15 segundos
  }

  // --- Lógica de deslizamiento táctil (sin cambios) ---
  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      changeSlide(currentIndex + 1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
      changeSlide(currentIndex - 1);
    }
  }

  carouselWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(intervalId);
  });

  carouselWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  // --- Lógica de botones y temporizador de inactividad (sin cambios) ---
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      changeSlide(index);
    });
  });

  function resetInactivityTimeout() {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
      window.location.href = "../index.html";
    }, 30000); // 30 segundos
  }

  const userEvents = ["click", "touchstart", "mousemove", "keydown"];
  userEvents.forEach(eventType => {
    document.body.addEventListener(eventType, resetInactivityTimeout);
  });

  // --- Inicio ---
  if (totalImages > 0) {
    changeSlide(0);
  }
});