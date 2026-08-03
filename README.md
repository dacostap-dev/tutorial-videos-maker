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
- Chapters, descriptions, tags, and video timestamps.
- Accent, background, and phone colors.

To use a custom logo, import an image from `src` and assign it to
`brand.logoSrc`. To use another local video, import the asset and assign it to
`video.src`.

The video should use a browser-friendly format such as MP4 with H.264 video.
