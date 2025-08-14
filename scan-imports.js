// scan-imports-inline.js
const fs = require('fs');
const path = require('path');

const folder = './app/figma/components/ui'; // carpeta de componentes
const imports = new Set();

function scanFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) scanFiles(fullPath);
    else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const regex = /from\s+['"]([^'"]+)['"]/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        const pkg = match[1];
        // Solo paquetes npm (no relativos)
        if (!pkg.startsWith('.') && !pkg.startsWith('/')) imports.add(pkg);
      }
    }
  });
}

scanFiles(folder);

console.log([...imports].join(' ')); // imprime todo en una línea
