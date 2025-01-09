document.addEventListener('DOMContentLoaded', () => {
  const manifest = browser.runtime.getManifest(); // O browser.runtime.getManifest()
  const versionElement = document.getElementById('version');
  if (versionElement) {
    versionElement.textContent = manifest.version;
  } else {
    console.error('El elemento #version no se encontró en el DOM');
  }
});
