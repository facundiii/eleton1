document.addEventListener('DOMContentLoaded', () => {

  let inactivityTimeout; // Variable para guardar el ID del temporizador

  // Función que reinicia el contador de 30 segundos
  function resetInactivityTimeout() {
    // Limpia cualquier temporizador anterior para empezar de nuevo
    clearTimeout(inactivityTimeout);

    // Crea un nuevo temporizador que se ejecutará en 30 segundos
    inactivityTimeout = setTimeout(() => {
      // Redirige al usuario a la página de inicio
      window.location.href = "../index.html"; 
    }, 30000); // 30000 milisegundos = 30 segundos
  }

  // Cualquier interacción del usuario reinicia el temporizador.
  document.addEventListener("mousemove", resetInactivityTimeout);
  document.addEventListener("keydown", resetInactivityTimeout);
  document.addEventListener("click", resetInactivityTimeout);
  document.addEventListener("touchstart", resetInactivityTimeout);

  // Inicia el temporizador por primera vez cuando la página carga
  resetInactivityTimeout();
  
});