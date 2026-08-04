# Tutorial Videos Maker

Plantilla React reutilizable para crear vídeos tutoriales interactivos de
aplicaciones.

## Desarrollo

```bash
npm install
npm run dev
```

## Personalizar Un Tutorial

Edita `src/config/tutorial.ts`. La configuración controla:

- Nombre de la marca, subtítulo y logo opcional.
- Metadata, idioma y comportamiento de indexación.
- Textos de introducción y mensajes de navegación.
- Asset de vídeo, tipo MIME, poster, autoplay y silencio.
- Modo de composición: `video` continuo o `photos` por capítulos.
- Capítulos, descripciones, etiquetas, timestamps y duración de escenas.
- Duración de la introducción, outro y cues de audio de la narración.
- Colores de acento, fondo y teléfono.

Para usar un logo personalizado, importa una imagen desde `src` y asígnala a
`brand.logoSrc`. Para usar otro vídeo local, importa el asset y asígnalo a
`video.src`.

En modo `video`, el vídeo debe utilizar un formato compatible con navegadores,
como MP4 con vídeo H.264. Actualiza `video.durationSeconds` cada vez que cambie
el vídeo fuente. Los valores `sourceStart` y `sourceEnd` se expresan en
segundos.

### Modo Fotos

Para crear un tutorial a partir de capturas, cambia `mode` a `"photos"` y
asigna una lista `photos` a cada capítulo. La introducción puede seguir usando
`sourceStart: null`; los capítulos de fotos no necesitan `sourceStart` ni
`sourceEnd`.

```ts
mode: "photos",

timeline: {
  chapterGapSeconds: 0,
  photoTransitionSeconds: 0.35,
},

chapters: [
  {
    id: "step-1",
    label: "Paso 1",
    title: "Selecciona tus cuotas",
    description: "Elige las cuotas con las que quieres participar.",
    tag: "Selección de cuotas",
    photos: [
      {
        src: "assets/select-1.png",
        durationSeconds: 3,
      },
      {
        src: "assets/select-2.png",
        durationSeconds: 3,
        transitionSeconds: 0.5,
        fit: "contain",
      },
    ],
  },
]
```

`durationSeconds` define cuánto permanece cada foto. Las transiciones se
solapan entre fotos, por lo que la duración del capítulo se calcula restando
los tiempos de transición a la suma de las duraciones. Usa `fit: "contain"`
para conservar capturas completas o `fit: "cover"` para llenar el teléfono
recortando los bordes.

El modo fotos mantiene el mismo teléfono vertical, encabezado, pasos, audio,
intro y outro del modo video. Los cambios de capítulo conservan un fade y las
fotos usan crossfade; no se agrega zoom automático para mantener legibles los
textos de las capturas. La previsualización web también cambia al visor de
fotos cuando `mode` es `"photos"`.

## Renderizar Un Vídeo

El sitio interactivo funciona como previsualización. Remotion renderiza el
mismo lenguaje visual como un MP4 fijo Full HD horizontal de `1920x1080`. El
video de la aplicación se mantiene dentro de un teléfono vertical para no
deformar la grabación fuente.

```bash
npm run video:studio
npm run video:render
```

El render utiliza el timeline de `src/config/tutorial.ts` y escribe
`out/tutorial.mp4`. Guarda los vídeos fuente en `public/assets/` y refiérelos
con una ruta como `assets/remate.mp4`.

### Sincronizar El Audio Con El Vídeo

La sincronización es manual y usa una única línea de tiempo absoluta para el
vídeo final. Por defecto el render no pone pausas ni modifica la velocidad del
vídeo, y no analiza automáticamente qué aparece en pantalla. Si se configura un
`videoHold`, se congela un frame sin detener el audio. Cada capítulo muestra un
segmento definido del vídeo fuente y cada audio comienza en el segundo indicado
por su cue.

Los valores principales son:

- `audioCues[].startSeconds`: segundo del vídeo final en el que comienza la voz.
  Incluye la introducción y el outro.
- `chapters[].sourceStart`: segundo del vídeo fuente desde el que comienza un
  capítulo.
- `chapters[].sourceEnd`: segundo del vídeo fuente en el que termina un capítulo.
- `chapters[].durationSeconds`: duración explícita del capítulo final cuando no
  se quiere calcularla a partir de los timestamps fuente.
- `output.introDurationSeconds`: duración de la introducción antes de mostrar el
  primer segmento del vídeo fuente.

Por ejemplo, si la voz se escucha antes de que aparezca la acción, aumenta
`startSeconds`. Si se escucha tarde, reduce ese valor. Si la imagen muestra el
segmento equivocado, ajusta `sourceStart`, `sourceEnd` o la duración del
capítulo. Después de cada cambio, regenera el MP4 y revisa nuevamente la
sincronización.

Cada cue de audio puede definir un guion de narración y un asset de audio
previamente generado. `startSeconds` usa el tiempo absoluto del vídeo final,
incluyendo la introducción:

```ts
audioCues: [
  {
    id: "select-installments",
    startSeconds: 11,
    text: "Escribe la cantidad de cuotas con las que deseas participar y pulsa Siguiente.",
    audioSrc: "audio/select-installments.wav",
  },
]
```

Los archivos referenciados por `audioSrc` deben estar en `public/audio/`. El
pipeline actual soporta esos archivos, pero no llama directamente a un
proveedor TTS. Esto mantiene los renders deterministas y evita exponer claves
de API en el navegador.

### Pausar El Vídeo Sin Pausar El Audio

Si una narración necesita más tiempo para explicar una pantalla, agrega un hold
de vídeo en `videoHolds`. El render mantiene un frame congelado durante el tiempo
indicado mientras los audios continúan reproduciéndose:

```ts
videoHolds: [
  {
    sourceAtSeconds: 29,
    durationSeconds: 3,
    frameSrc: "assets/remate-hold-29.jpg",
  },
]
```

`sourceAtSeconds` usa el tiempo del vídeo fuente, no el tiempo final del render.
El hold desplaza automáticamente los capítulos y los cues de audio posteriores.
Genera el frame congelado desde el vídeo fuente y guárdalo en `public/assets/`.

## Grabar La Voz De ChatGPT

Las voces se graban desde la aplicación de ChatGPT para Mac utilizando
BlackHole. El proyecto espera un archivo de audio por escena o capítulo.

### Configurar El Audio En macOS

1. Instala BlackHole 2ch con Homebrew:

   ```bash
   brew install blackhole-2ch
   ```
2. Abre `Audio MIDI Setup` en macOS.
3. Crea un **dispositivo de salida múltiple** que incluya los altavoces o
   auriculares de la Mac y `BlackHole 2ch`.
4. Usa los altavoces o auriculares como fuente de reloj principal y activa la
   corrección de deriva para BlackHole si macOS muestra esa opción.
5. Configura la salida de macOS, o la salida de la aplicación de ChatGPT si
   está disponible, en el dispositivo de salida múltiple.
6. Configura la entrada de la aplicación de grabación como `BlackHole 2ch`.

Puedes grabar con QuickTime, OBS, Audacity u otra aplicación de audio. Usa
48 kHz cuando sea posible y monitorea con auriculares para evitar feedback o
eco.

### Configurar La Voz De ChatGPT

Usa la voz de alta calidad definida para el proyecto. Las opciones actuales son
`Sol` o `Maple`; mantén una única voz en toda la serie de tutoriales.

Indicaciones recomendadas para la voz:

- Español neutro, claro y profesional.
- Español neutro para Perú, con tratamiento de tú.
- Ritmo moderado, con pausas breves entre instrucciones.
- Leer el guion exactamente como está escrito.
- Pronunciar de forma consistente los nombres de productos y términos técnicos.

Graba un archivo por cada capítulo configurado, utilizando nombres que
coincidan con sus IDs:

```text
audio/raw/intro.wav
audio/raw/step-1.wav
audio/raw/step-2.wav
audio/raw/step-3.wav
```

Mantén las grabaciones originales fuera de `public/` y coloca las versiones
limpias en:

```text
public/audio/intro.wav
public/audio/step-1.wav
public/audio/step-2.wav
public/audio/step-3.wav
```

Para archivos M4A procesados, puedes usar una subcarpeta como
`public/audio/processed/` y referenciarla desde `audioSrc`.

Después referencia cada archivo en `src/config/tutorial.ts` dentro de
`audioCues`:

```ts
{
  id: "select-installments",
  startSeconds: 11,
  text: "Escribe la cantidad de cuotas con las que deseas participar y pulsa Siguiente.",
  audioSrc: "audio/select-installments.wav",
}
```

### Procesar El Audio

Para el flujo actual, recorta únicamente los primeros `1.5` segundos de cada
grabación. No uses eliminación automática de silencios, normalización ni
conversión a mono, porque pueden cambiar el inicio o el carácter de la voz.
Por ejemplo:

```bash
ffmpeg -y -i public/audio/intro-question.m4a \
  -af "atrim=start=1.5,asetpts=PTS-STARTPTS" \
  -c:a aac \
  -b:a 192k \
  -ar 48000 \
  -ac 2 \
  public/audio/processed/intro-question.m4a
```

Si necesitas quitar solo un segundo, cambia `start=1.5` por `start=1.0`. WAV,
MP3 y M4A están soportados, pero los archivos M4A procesados se pueden guardar
en `public/audio/processed/`. Revisa la duración de cada audio contra el
siguiente cue y el final de su escena; un audio que se extienda fuera del
timeline puede ser recortado durante el render.

Como la voz es generada por un servicio de IA, revisa las condiciones de uso y
los requisitos del producto antes de publicar el tutorial. Añade una
declaración para los usuarios finales cuando lo exija el servicio de voz
seleccionado o la política de la empresa.
