# ClipRoard

cliproardd is a browser extension that allows users to save frequently used text elements, manage them conveniently, and insert them into any editable field with a right-click. It's a versatile tool for improving productivity and efficiency when working with repetitive text.

## Features

- **Save Clipboard Items:** Easily save text elements from the options page for future use.
- **Insert Text via Context Menu:** Quickly insert saved elements into any editable field using the right-click context menu.
- **Customizable Display:** Configure the number of visible elements in the extension popup to match your workflow.

## Installation

### For Firefox

1. Download the extension from the Firefox Add-ons Store.
2. Click "Add to Firefox" and confirm the installation.

### Manual Installation

1. Clone or download this repository.
2. Go to your browser's extensions page:
   - Firefox: Navigate to `about:addons`.
3. Click "Install Add-on From File."
4. Select the extension's directory.

## Usage

### Save Clipboard Items

1. Open the extension popup by clicking on the cliproardd icon in the toolbar.
2. Enter a text element and click "Save."
3. Your element will be added to the list of saved items.

### Insert Text via Context Menu

1. Right-click in any editable field (e.g., input or textarea).
2. Navigate to the "Insert from cliproardd" submenu.
3. Select an element to insert it into the field.

### Customize Display

1. Open the options page from the extension settings.
2. Set the desired number of visible elements.
3. Save your changes.

## Permissions

The extension requires the following permissions:

- `storage`: To save and manage clipboard items.
- `clipboardWrite`: To write data to the clipboard.
- `clipboardRead`: To read data from the clipboard.
- `contextMenus`: To add the context menu for element insertion.

## Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Jalkhov/cliproard.git
   ```
2. Navigate to the project directory:
   ```bash
   cd cliproard
   ```
3. Install dependencies (if any):
   ```bash
   npm install
   ```
4. Load the extension manually as described in the "Manual Installation" section.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributions

Contributions are welcome! Feel free to open issues, suggest features, or submit pull requests.

## Note

This project is intended to implement new technologies and practices as a way of learning, so sometimes there may be unnecessary and even excessive things for such a small project, so it could be taken as an experimental repository at times.
