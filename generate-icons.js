const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const svgPath = path.join(__dirname, 'public', 'app-icon.svg');
const svg = fs.readFileSync(svgPath);

async function generate() {
  // Generate logo192.png
  await sharp(svg)
    .resize(192, 192)
    .png()
    .toFile(path.join(__dirname, 'public', 'logo192.png'));
  console.log('Created logo192.png');

  // Generate logo512.png
  await sharp(svg)
    .resize(512, 512)
    .png()
    .toFile(path.join(__dirname, 'public', 'logo512.png'));
  console.log('Created logo512.png');

  // Generate favicon as 32x32 PNG (modern browsers support PNG favicons)
  await sharp(svg)
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, 'public', 'favicon.png'));
  console.log('Created favicon.png');

  // Generate 64x64 for ICO replacement
  await sharp(svg)
    .resize(64, 64)
    .png()
    .toFile(path.join(__dirname, 'public', 'favicon-64.png'));
  console.log('Created favicon-64.png');

  // Generate favicon.ico (32x32 PNG wrapped as .ico)
  const pngBuffer = await sharp(svg)
    .resize(32, 32)
    .png()
    .toBuffer();

  // Create ICO file from PNG
  const imageSize = pngBuffer.length;
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0);      // Reserved
  icoHeader.writeUInt16LE(1, 2);      // ICO type
  icoHeader.writeUInt16LE(1, 4);      // 1 image

  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(32, 0);         // Width
  dirEntry.writeUInt8(32, 1);         // Height
  dirEntry.writeUInt8(0, 2);          // Color palette
  dirEntry.writeUInt8(0, 3);          // Reserved
  dirEntry.writeUInt16LE(1, 4);       // Color planes
  dirEntry.writeUInt16LE(32, 6);      // Bits per pixel
  dirEntry.writeUInt32LE(imageSize, 8);  // Image size
  dirEntry.writeUInt32LE(22, 12);     // Offset (6 + 16 = 22)

  const ico = Buffer.concat([icoHeader, dirEntry, pngBuffer]);
  fs.writeFileSync(path.join(__dirname, 'public', 'favicon.ico'), ico);
  console.log('Created favicon.ico');

  console.log('All icons generated!');
}

generate().catch(console.error);
