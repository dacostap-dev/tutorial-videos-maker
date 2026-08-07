# tutorial-videos-maker

Proyecto React + Vite + Tailwind CSS.

## Servidor De Desarrollo

Ejecutá `npm run dev` para iniciar el servidor de desarrollo de Vite.

## Estructura Del Proyecto

Esta es la estructura principal del proyecto. Empezá por los archivos
relacionados con la tarea y seguí los imports solo cuando sea necesario.

- `src/main.tsx` - Entrada de React; importa `src/index.css` y monta `src/App.tsx` en `#root`.
- `src/App.tsx` - Componente principal de la previsualización interactiva.
- `src/config/tutorials/` - Configuraciones editables de marca, contenido, vídeo, metadata y tema por tutorial.
- `src/components/` - Componentes visuales reutilizables del reproductor tutorial.
- `src/video/` - Composición Remotion, timeline y entrada del renderizador.
- `public/assets/tutorials/` - Vídeos e imágenes estáticas organizadas por tutorial.
- `src/index.css` - Entrada global de CSS e importación de Tailwind CSS v4.
- `index.html` - Shell HTML de Vite que contiene `#root` y carga `src/main.tsx`.
- `package.json` - Dependencias y scripts de desarrollo, build, render y formato.
- `vite.config.ts` - Configuración de Vite con React y Tailwind CSS v4.
- `.mise.toml` - Versión de Node.js del proyecto.

## Dependencias

- Runtime: React 19 y React DOM 19.
- Estilos: Tailwind CSS v4 mediante `@tailwindcss/vite`.
- Build y vídeo: Vite 8, Remotion, TypeScript 5.7 y `@vitejs/plugin-react`.
- Formato: oxfmt.

## Estilos

El proyecto utiliza **Tailwind CSS v4** mediante el plugin `@tailwindcss/vite`
configurado en `vite.config.ts`. `src/index.css` importa Tailwind con
`@import 'tailwindcss';`. Usá las utilidades de Tailwind directamente en JSX
y colocá el CSS global o la personalización del tema de Tailwind v4 en
`src/index.css`.

`src/main.tsx` importa `src/index.css`, por lo que la configuración global de
fuentes pertenece a `src/index.css`. Las declaraciones `@import` de CSS deben
permanecer al principio del archivo.

## Calidad Del Código

- Usá comillas dobles en strings que contengan apóstrofes (`"We're here to help"`) o escapá el apóstrofe si usás comillas simples.
- Verificá que las etiquetas JSX estén cerradas y que las llaves estén balanceadas.
- Exportá los componentes como exports default.
