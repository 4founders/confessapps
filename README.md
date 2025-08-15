## A considerar:
Proyecto desarrollado principalmente con FigmaMake.

Para actualizar el resultado de figma:

1. Extaer .zip descargado de figma y pegarlos dentro de @/app/figma/
2. Ejecutar y copiar el resultado de:
```bash
node scan-imports.js
```
3. Ejecutar 
```bash
npm i resultado_paso_2
```
4. Ejecutar
```bash
node remove-version.js
```
5. Ejecutar
```bash
node use-client.js
```
6. Copiar el globals.css de @/app/figma/ y pegar y reemplazar en  @/app/. Además agregar en la primera linea 
```css
@import "tailwindcss";
```

7. ver app:
```bash
npm run dev
```
