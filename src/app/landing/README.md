# Landing Page (pixel-perfect recreation in code)

A faithful HTML/CSS recreation of the original landing image (`public/dhnew001.png`, 3840×13116).
Everything that was pixels is now real markup: text, cards, gradients, and buttons — only the
logos, ornaments, calligraphy mark, and small icons are cropped image assets.

## Route

This folder **is the site's home page**: `src/app/page.tsx` renders `<Landing />` at `/`
(that file also carries the page metadata and the Event structured data).
The folder keeps its own route as well, so it still answers at **`/landing`** — handy for
testing and for dropping the folder into another project unchanged.

The previous image-based home page was moved to `src/app/legacy-home/` (noindex, unlinked).

## Folder contents (fully self-contained)

```
src/app/landing/
├── page.tsx        # Next.js route (metadata + render)
├── Landing.tsx     # All markup (server component, no state)
├── landing.css     # All styles (scoped with .dhl- prefix)
├── components/
│   ├── CountdownTimer.tsx # Live hero countdown (rolling digits), ported from the home page
│   ├── ImageCarousel.tsx  # Winning-projects carousel: edition tabs (النسخة الثالثة / الثانية),
│   │                      # coverflow deck, drag/arrows/chips, lightbox
│   └── FAQSection.tsx     # Expandable FAQ, ported from the home page
├── assets/         # Cropped image assets from the original artwork
│   ├── carousel/   # 01/02/03.png carousel slides
│   └── fonts/      # Somar Bold / Medium / Light (referenced via @font-face in landing.css)
└── README.md
```

The page is the complete landing experience: the pixel-perfect recreation of the artwork
(header → hero → prizes → conditions → journey), followed by the interactive second half
ported 1:1 from the original home page — the winning-projects carousel and the FAQ accordion —
and a pixel-perfect coded recreation of the footer (real text and links: mailto/tel, with the
logo and ornament as cropped assets).

## How the pixel-perfect scaling works

- The design canvas is the original image's coordinate system: **3840 units wide**.
- `landing.css` defines `--u: calc(100cqw / 3840)` on a `container-type: inline-size` wrapper,
  so **1 unit = 1 original-image pixel**, at any viewport width.
- Every position/size/font-size is written as `calc(N * var(--u))` where `N` was measured
  directly from the image. The page therefore scales exactly like the image does.

## Moving it to another project

1. Copy the whole `src/app/landing/` folder into the target Next.js (App Router) project's `app/` dir.
2. That's it — fonts and images are imported relatively from inside the folder.
   - Requires a bundler that handles static image imports and CSS `url()` assets (Next.js does both out of the box).
3. Two constants at the top of `Landing.tsx` are the things you normally change:
   `REGISTER_URL` (the "سجل الآن" button) and `COUNTDOWN_TARGET` (the hero countdown deadline).
4. If the target project's global CSS injects aggressive resets, the component already guards against
   the common ones (e.g. Tailwind preflight's `img { max-width: 100% }` is undone with `max-width: none`).
5. The page is otherwise dependency-free — only React and the bundler are required.

## Notes

- The maroon area under "الوقت المتبقي على إغلاق التسجيل" — which the original artwork leaves empty
  for an overlay — holds the live countdown (`components/CountdownTimer.tsx`). It is the same
  rolling-digit timer as the original home page: at 1920px it renders pixel-identically to it
  (120px cards, 24px gaps, 2.5rem digits).
  - Its deadline is `COUNTDOWN_TARGET` in `Landing.tsx`; past that moment it shows
    "انتهى وقت التسجيل!" exactly like the home page does.
  - Sizing uses its own unit, `--cu`, defined in `landing.css` as
    `clamp(var(--u), 0.23px, calc(var(--u) * 1.4))`: it tracks the artwork scale on wide screens,
    stops shrinking below ~880px so the digits stay readable, and can never grow past 1.4×
    the artwork scale, which is what keeps it inside the gap between the label and the date panel
    at every width (verified from 320px to 2560px).
- Winner posters: edition 3 in `public/winners/web/`, edition 2 in `public/winners/web2/`
  (web-sized JPEGs; the full-size originals stay in `public/winners/` and `public/0{1,2,3}.png`).
  To add an edition, append to `EDITIONS` in `components/ImageCarousel.tsx` — each entry carries its
  own tab label, slides and `ratio` (poster height ÷ width, default 4:5), which drives both the card
  aspect and the stage height.
- The page is RTL (`dir="rtl"`) and uses the Somar font family bundled in `assets/fonts/`.
