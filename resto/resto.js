// Redirección automática al inicio después de 30 segundos
let timeout;  

function resetTimeout() {  
  clearTimeout(timeout);  
  timeout = setTimeout(() => {  
    window.location.href = "../index.html";  
  }, 30000); // 30 segundos  
}  

// Reinicia el temporizador en cada interacción del usuario  
document.addEventListener("mousemove", resetTimeout);  
document.addEventListener("keydown", resetTimeout);  
document.addEventListener("click", resetTimeout);  
document.addEventListener("touchstart", resetTimeout);  

// Inicia el temporizador al cargar la página  
resetTimeout();

