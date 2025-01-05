const archiver = require('archiver');
const fs = require('fs'); // Import the standard fs module
const { promises: fsp } = fs; // Destructure the promises API
const path = require('path');

async function createZipArchive(sourceDir, outputFile) {
  try {
    const outputDir = path.dirname(outputFile);
    await fsp.mkdir(outputDir, { recursive: true });

    const output = fs.createWriteStream(outputFile); // Use regular fs.createWriteStream

    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.on('error', (err) => {
      console.error('Error creating ZIP archive:', err);
      // Important: Close the stream on error to prevent resource leaks
      output.close();
    });

    output.on('close', () => {
      console.log(`Extension packaged: ${archive.pointer()} total bytes`);
    });

    archive.pipe(output);
    archive.directory(sourceDir, false);
    await archive.finalize();

    console.log('ZIP archive created successfully!');
  } catch (err) {
    console.error('Error creating ZIP archive:', err);
  }
}

const sourceDir = path.join(__dirname, '../src');
const outputFile = path.join(__dirname, '../dist/cliproard.zip');

createZipArchive(sourceDir, outputFile);
