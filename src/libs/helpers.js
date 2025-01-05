async function getRawClipboardItems() {
  try {
    const result = await browser.storage.local.get('clipboardItems');
    return result.clipboardItems || [];
  } catch (error) {
    console.error('Error getting clipboard items from storage:', error);
    return [];
  }
}

async function getVisibleElements() {
  try {
    const result = await browser.storage.local.get('visibleElements');
    return result.visibleElements ?? 10; // Default to 10 if not set
  } catch (error) {
    console.error('Error getting visible elements from storage:', error);
    return 10; // Default value
  }
}
