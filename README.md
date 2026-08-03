# Tutorial Videos Maker

Reusable React template for interactive app tutorial videos.

## Development

```bash
npm install
npm run dev
```

## Customize A Tutorial

Edit `src/config/tutorial.ts`. The configuration controls:

- Brand name, eyebrow, and optional logo asset.
- Metadata, language, and indexing behavior.
- Intro copy and navigation messages.
- Video asset, MIME type, poster, autoplay, and mute behavior.
- Chapters, descriptions, tags, source timestamps, and scene durations.
- Accent, background, and phone colors.

To use a custom logo, import an image from `src` and assign it to
`brand.logoSrc`. To use another local video, import the asset and assign it to
`video.src`.

The video should use a browser-friendly format such as MP4 with H.264 video.
Update `video.durationSeconds` whenever the source video changes. Chapter
`sourceStart` and `sourceEnd` values are expressed in seconds.

## Render A Video

The interactive site is the preview. Remotion renders the same visual language
as a fixed `1080x1920` MP4 for use inside the app.

```bash
npm run video:studio
npm run video:render
```

The render reads the timeline from `src/config/tutorial.ts` and writes
`out/tutorial.mp4`. Keep source videos in `public/assets/` and reference them
with a path such as `assets/remate.mp4`.

Each chapter can define a narration script and an optional pre-generated audio
asset:

```ts
narration: {
  text: "Primero seleccioná las cuotas...",
  audioSrc: "audio/step-1.mp3",
}
```

Audio files referenced by `audioSrc` belong in `public/audio/`. The current
render pipeline supports those files but does not call a TTS provider. This
keeps rendering deterministic and avoids putting API keys in the browser.
