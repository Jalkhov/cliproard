document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    const message = browser.i18n.getMessage(key);

    // Usando un enfoque más conciso y legible
    if (element instanceof HTMLInputElement && element.placeholder) {
      element.placeholder = message || `Missing translation for: ${key}`;
    } else {
      element.textContent = message || `Missing translation for: ${key}`;
    }
  });
});
