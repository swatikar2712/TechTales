const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const svgPath = path.join(__dirname, 'public', 'favicon.svg');
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

  console.log('All icons generated!');
}

generate().catch(console.error);
