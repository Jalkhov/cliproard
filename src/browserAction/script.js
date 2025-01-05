document.addEventListener('DOMContentLoaded', function () {
  const clipboardList = document.getElementById('items');
  const openInTabButton = document.getElementById('open_options');
  const title = document.getElementById('title');
  const ITEM_HEIGHT = 29; // Altura fija de cada elemento en píxeles

  // Muestra los elementos del portapapeles
  function displayClipboardItems(items) {
    clipboardList.innerHTML = ''; // Limpiar la lista

    if (!items || items.length === 0) {
      displayNoItemsMessage();
      return;
    }

    items.forEach(addClipboardItem);
  }

  // Muestra un mensaje cuando no hay elementos
  function displayNoItemsMessage() {
    const noItemsMessage = document.createElement('p');
    noItemsMessage.className = 'ui center aligned header';
    noItemsMessage.textContent = browser.i18n.getMessage('noItems');
    clipboardList.appendChild(noItemsMessage);
  }

  // Agrega un elemento a la lista del portapapeles
  function addClipboardItem(item) {
    const alias = item.alias || 'Sin alias';

    const clipboardItem = document.createElement('a');
    clipboardItem.className = 'item';
    clipboardItem.textContent = alias;
    clipboardItem.addEventListener('click', function () {
      copyToClipboard(item.content);
    });

    clipboardList.appendChild(clipboardItem);
  }

  // Copia el contenido al portapapeles
  function copyToClipboard(content) {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        changeText();
        console.log('Contenido copiado al portapapeles: ', content);
      })
      .catch((err) => {
        console.error('Error al copiar al portapapeles: ', err);
      });
  }

  // Configura el número de elementos visibles con scroll
  function configVisibleElements(value) {
    const maxHeight = ITEM_HEIGHT * value;

    clipboardList.style.maxHeight = `${maxHeight}px`; // Limita la altura máxima del contenedor
    clipboardList.style.overflowY = 'auto'; // Habilita el scroll vertical
  }

  // Maneja la apertura de opciones en una nueva pestaña
  function handleOpenOptions() {
    browser.runtime.openOptionsPage();
  }

  function changeText() {
    const originalText = title.textContent;
    const originalColor = window.getComputedStyle(title).color;

    // Aplicar transición suave
    title.style.transition = 'color 1.5s ease';
    title.style.color = 'green';
    title.textContent = 'Copied!';

    setTimeout(function () {
      title.textContent = originalText;
      title.style.color = originalColor;
    }, 500);
  }

  // Eventos
  openInTabButton.addEventListener('click', handleOpenOptions);

  // Inicialización
  getRawClipboardItems().then(displayClipboardItems);
  getVisibleElements().then(configVisibleElements);
});
