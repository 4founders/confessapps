const fs = require('fs');
const path = require('path');

const ROOT = './app/figma/components/ui'; // cambia a la carpeta que quieres procesar
const exts = new Set(['.ts', '.tsx', '.js', '.jsx']);

// Elimina @<versión> (ej: @1, @1.2, @1.2.3, @1.2.3-beta.1) justo antes de / o del final de la cadena
// No confunde el @ de los scopes porque exige @ seguido de dígito.
const VERSION_CHUNK = /@\d[\w.-]*(?=(?:\/|["']|\s*\)|$))/g;

function stripInCode(code) {
  // from "...@x.y.z"
  code = code.replace(/(from\s+["'][^"']*?)@\d[\w.-]*(?=(?:\/|["']))/g, '$1');
  // import "...@x.y.z"
  code = code.replace(/(\bimport\s+["'][^"']*?)@\d[\w.-]*(?=(?:\/|["']))/g, '$1');
  // dynamic import("...@x.y.z") y require("...@x.y.z")
  code = code.replace(/((?:import|require)\(\s*["'][^"']*?)@\d[\w.-]*(?=(?:\/|["']\s*\)))/g, '$1');
  return code;
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (exts.has(path.extname(entry))) {
      let src = fs.readFileSync(full, 'utf8');

      // Rapidez: si no hay @<dígito> entre comillas, saltamos.
      if (!/@\d/.test(src)) continue;

      const out = stripInCode(src);
      if (out !== src) {
        // Backup opcional
        fs.writeFileSync(full + '.bak', src, 'utf8');
        fs.writeFileSync(full, out, 'utf8');
        console.log('✔ Limpio:', full);
      }
    }
  }
}

function deleteBakFiles(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      deleteBakFiles(full);
    } else if (full.endsWith('.bak')) {
      fs.unlinkSync(full);
      console.log('🗑️ Eliminado:', full);
    }
  }
}

walk(ROOT);
deleteBakFiles(ROOT);
console.log('✅ Listo');
