# Tutorial Videos Maker

Plantilla React reutilizable para crear vídeos tutoriales interactivos de
aplicaciones.

## Desarrollo

```bash
npm install
npm run dev
```

## Personalizar Un Tutorial

Editá `src/config/tutorial.ts`. La configuración controla:

- Nombre de la marca, subtítulo y logo opcional.
- Metadata, idioma y comportamiento de indexación.
- Textos de introducción y mensajes de navegación.
- Asset de vídeo, tipo MIME, poster, autoplay y silencio.
- Capítulos, descripciones, etiquetas, timestamps y duración de escenas.
- Colores de acento, fondo y teléfono.

Para usar un logo personalizado, importá una imagen desde `src` y asignala a
`brand.logoSrc`. Para usar otro vídeo local, importá el asset y asignalo a
`video.src`.

El vídeo debe utilizar un formato compatible con navegadores, como MP4 con
vídeo H.264. Actualizá `video.durationSeconds` cada vez que cambie el vídeo
fuente. Los valores `sourceStart` y `sourceEnd` se expresan en segundos.

## Renderizar Un Vídeo

El sitio interactivo funciona como previsualización. Remotion renderiza el
mismo lenguaje visual como un MP4 fijo de `1080x1920` para usarlo dentro de la
aplicación.

```bash
npm run video:studio
npm run video:render
```

El render utiliza el timeline de `src/config/tutorial.ts` y escribe
`out/tutorial.mp4`. Guardá los vídeos fuente en `public/assets/` y referencialos
con una ruta como `assets/remate.mp4`.

Cada capítulo puede definir un guion de narración y un asset de audio
previamente generado:

```ts
narration: {
  text: "Primero seleccioná las cuotas...",
  audioSrc: "audio/step-1.mp3",
}
```

Los archivos referenciados por `audioSrc` deben estar en `public/audio/`. El
pipeline actual soporta esos archivos, pero no llama directamente a un
proveedor TTS. Esto mantiene los renders deterministas y evita exponer claves
de API en el navegador.

## Grabar La Voz De ChatGPT

Las voces se graban desde la aplicación de ChatGPT para Mac utilizando
BlackHole. El proyecto espera un archivo de audio por escena o capítulo.

### Configurar El Audio En macOS

1. Instalá BlackHole 2ch con Homebrew:

   ```bash
   brew install blackhole-2ch
   ```
2. Abrí `Audio MIDI Setup` en macOS.
3. Creá un **dispositivo de salida múltiple** que incluya los altavoces o
   auriculares de la Mac y `BlackHole 2ch`.
4. Usá los altavoces o auriculares como fuente de reloj principal y activá la
   corrección de deriva para BlackHole si macOS muestra esa opción.
5. Configurá la salida de macOS, o la salida de la aplicación de ChatGPT si
   está disponible, en el dispositivo de salida múltiple.
6. Configurá la entrada de la aplicación de grabación como `BlackHole 2ch`.

Podés grabar con QuickTime, OBS, Audacity u otra aplicación de audio. Usá
48 kHz cuando sea posible y monitoreá con auriculares para evitar feedback o
eco.

### Configurar La Voz De ChatGPT

Usá la voz de alta calidad definida para el proyecto. Las opciones actuales son
`Sol` o `Maple`; mantené una única voz en toda la serie de tutoriales.

Indicaciones recomendadas para la voz:

- Español neutro, claro y profesional.
- Pronunciación rioplatense cuando se use voseo.
- Ritmo moderado, con pausas breves entre instrucciones.
- Leer el guion exactamente como está escrito.
- Pronunciar de forma consistente los nombres de productos y términos técnicos.

Grabá un archivo por cada capítulo configurado, utilizando nombres que
coincidan con sus IDs:

```text
audio/raw/intro.wav
audio/raw/step-1.wav
audio/raw/step-2.wav
audio/raw/step-3.wav
```

Mantené las grabaciones originales fuera de `public/` y colocá las versiones
limpias en:

```text
public/audio/intro.wav
public/audio/step-1.wav
public/audio/step-2.wav
public/audio/step-3.wav
```

Después referenciá cada archivo en `src/config/tutorial.ts`:

```ts
narration: {
  text: "Primero seleccioná las cuotas...",
  audioSrc: "audio/step-1.wav",
}
```

### Procesar El Audio

Recortá los silencios largos al principio y al final de la voz. Después
normalizá el archivo antes de renderizar:

```bash
ffmpeg -i audio/raw/step-1.wav \
  -af "loudnorm=I=-16:TP=-1.5:LRA=11" \
  -ar 48000 \
  -ac 1 \
  public/audio/step-1.wav
```

Se recomienda usar WAV durante la edición. MP3 también está soportado cuando
se necesitan archivos más pequeños. Revisá la duración de cada audio contra
el timeline de su capítulo; un audio más largo que la escena puede ser
recortado durante el render.

Como la voz es generada por un servicio de IA, revisá las condiciones de uso y
los requisitos del producto antes de publicar el tutorial. Añadí una
declaración para los usuarios finales cuando lo exija el servicio de voz
seleccionado o la política de la empresa.
