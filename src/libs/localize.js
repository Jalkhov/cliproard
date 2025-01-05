document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    const message = browser.i18n.getMessage(key);

    // Diagnóstico (opcional, puedes quitarlo en producción)
    console.log(`Key: ${key}, Message: ${message}`);

    // Usando un enfoque más conciso y legible
    if (element instanceof HTMLInputElement && element.placeholder) {
      element.placeholder = message || `Missing translation for: ${key}`;
    } else {
      element.textContent = message || `Missing translation for: ${key}`;
    }
  });
});
