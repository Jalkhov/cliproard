function getRawClipboardItems() {
  return new Promise(function (resolve, reject) {
    browser.storage.local
      .get('clipboardItems')
      .then(function (result) {
        resolve(result.clipboardItems || []);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

// Crear el menú contextual dinámicamente
function createContextMenu() {
  browser.contextMenus.removeAll().then(function () {
    // Crear el menú principal
    let appname = browser.i18n.getMessage('appName');
    let insertfrom = browser.i18n.getMessage('insertFrom');
    browser.contextMenus.create({
      id: 'cliproard-parent',
      title: `${insertfrom} ${appname}`,
      contexts: ['editable'], // Solo aparece en campos editables
    });

    // Obtener elementos y añadir submenús
    getRawClipboardItems()
      .then(function (items) {
        items.forEach(function (item, index) {
          browser.contextMenus.create({
            id: 'cliproard-item-' + index,
            parentId: 'cliproard-parent',
            title: item.alias || item.content, // Mostrar alias o contenido
            contexts: ['editable'],
          });
        });
      })
      .catch(function (error) {
        console.error('Error loading clipboard items:', error);
      });
  });
}

// Manejar clics en los menús contextuales
browser.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId.startsWith('cliproard-item-')) {
    const index = parseInt(info.menuItemId.split('-').pop());
    getRawClipboardItems()
      .then(function (items) {
        const item = items[index];
        if (item && tab) {
          browser.tabs.sendMessage(tab.id, {
            action: 'insertText',
            text: item.content,
          });
        }
      })
      .catch(function (error) {
        console.error('Error handling menu click:', error);
      });
  }
});

// Actualizar el menú contextual si cambian los elementos
browser.storage.onChanged.addListener(function () {
  createContextMenu();
});

// Crear el menú al instalar la extensión
browser.runtime.onInstalled.addListener(function () {
  createContextMenu();
});
