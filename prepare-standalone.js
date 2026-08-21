const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName),
                        path.join(dest, childItemName));
    });
  } else if (exists) {
    fs.copyFileSync(src, dest);
  }
}

const standaloneDir = path.join(__dirname, '.next', 'standalone');
const staticSrc = path.join(__dirname, '.next', 'static');
const staticDest = path.join(standaloneDir, '.next', 'static');
const publicSrc = path.join(__dirname, 'public');
const publicDest = path.join(standaloneDir, 'public');

if (fs.existsSync(standaloneDir)) {
  console.log('Copying static files to standalone directory...');
  
  if (fs.existsSync(staticSrc)) {
    copyRecursiveSync(staticSrc, staticDest);
    console.log('Copied .next/static -> .next/standalone/.next/static');
  }
  
  if (fs.existsSync(publicSrc)) {
    copyRecursiveSync(publicSrc, publicDest);
    console.log('Copied public -> .next/standalone/public');
  }
  
  console.log('\nStandalone build is ready in .next/standalone');
  console.log('To run the server: node .next/standalone/server.js');
} else {
  console.error('Standalone directory not found. Did you run `next build` with `output: "standalone"` in next.config.mjs?');
}
