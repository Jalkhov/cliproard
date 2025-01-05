document.addEventListener('DOMContentLoaded', function () {
  const clipboardItemsTableBody = document.querySelector(
    '#clipboard_items_table tbody'
  );
  const addItemButton = document.getElementById('add_item_button');
  const clearAllButton = document.getElementById('clear_all');
  const contentInput = document.getElementById('contenido');
  const aliasInput = document.getElementById('alias');
  const visibleElements = document.getElementById('visible_elements');

  // Función para renderizar los elementos del portapapeles
  function displayClipboardItems(items) {
    clipboardItemsTableBody.innerHTML = ''; // Limpiar tabla
    items.forEach((item, index) => addClipboardItemRow(item, index, items));
  }

  // Agrega una fila a la tabla
  function addClipboardItemRow(item, index, items) {
    const tableRow = document.createElement('tr');

    const contentCell = document.createElement('td');
    contentCell.textContent = item.content;

    const aliasCell = document.createElement('td');
    aliasCell.textContent = item.alias || '';

    const actionsCell = document.createElement('td');
    const deleteButton = createDeleteButton(index, items);
    actionsCell.appendChild(deleteButton);

    tableRow.append(contentCell, aliasCell, actionsCell);
    clipboardItemsTableBody.appendChild(tableRow);
  }

  // Crea el botón para eliminar un elemento
  function createDeleteButton(index, items) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = browser.i18n.getMessage('deleteButton'); // Traducción
    deleteButton.classList.add('ui', 'tiny', 'red', 'button');

    deleteButton.addEventListener('click', () => {
      items.splice(index, 1);
      browser.storage.local.set({ clipboardItems: items }).then(() => {
        displayClipboardItems(items);
      });
    });

    return deleteButton;
  }

  // Muestra el valor de elementos visibles
  function displayVisibleElements(value) {
    visibleElements.value = value;
  }

  // Maneja cambios en el input de elementos visibles
  function handleVisibleElementsInput() {
    const value = parseInt(visibleElements.value, 10) || 0; // Asegura que sea un número
    browser.storage.local
      .set({ visibleElements: value })
      .then(() => console.log('Valor guardado:', value))
      .catch((err) => console.error('Error al guardar:', err));
  }

  // Agrega un nuevo elemento al portapapeles
  function addClipboardItem() {
    const content = contentInput.value.trim();
    const alias = aliasInput.value.trim();

    if (content !== '') {
      browser.storage.local.get('clipboardItems').then((result) => {
        let items = result.clipboardItems || [];
        items.push({ content, alias });
        browser.storage.local.set({ clipboardItems: items }).then(() => {
          displayClipboardItems(items);
          resetInputs();
        });
      });
    }
  }

  // Limpia los campos de entrada
  function resetInputs() {
    contentInput.value = '';
    aliasInput.value = '';
  }

  // Limpia todos los elementos del portapapeles
  function clearAllClipboardItems() {
    browser.storage.local.set({ clipboardItems: [] }).then(() => {
      displayClipboardItems([]);
    });
  }

  // Eventos
  visibleElements.addEventListener('input', handleVisibleElementsInput);
  addItemButton.addEventListener('click', addClipboardItem);
  clearAllButton.addEventListener('click', clearAllClipboardItems);

  // Inicialización
  getRawClipboardItems().then(displayClipboardItems);
  getVisibleElements().then(displayVisibleElements);
});
