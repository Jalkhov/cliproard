// Escucha los mensajes en todos los navegadores
browser.runtime.onMessage.addListener(function (message) {
  if (message.action === 'insertText' && message.text) {
    const activeElement = document.activeElement;
    if (
      activeElement &&
      (activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA')
    ) {
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;
      const value = activeElement.value;

      activeElement.value =
        value.substring(0, start) + message.text + value.substring(end);
      activeElement.selectionStart = activeElement.selectionEnd =
        start + message.text.length;
    }
  }
});
