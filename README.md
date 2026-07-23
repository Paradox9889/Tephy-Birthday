# Tephy-Birthday
 A scene-based birthday website — each page is a full-screen moment in a short journey, from a quiet opening line to a final letter.

## Tech Stack

- **HTML / CSS / JavaScript** — no framework, no build step
- **[canvas-confetti](https://github.com/catdad/canvas-confetti)** (via CDN) — star-shaped confetti bursts on Page 5 and Page 7
- **Google Fonts** — Dancing Script (script/handwritten), Playfair Display (serif body text)

## File Structure

```
/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── images/
    │   ├── night-sky.png       → global background (Pages 1, 2, 3, 6, 8)
    │   ├── gift-scene.png      → Page 5 background (includes the gift box)
    │   ├── cake-scene.jpeg     → Page 7 photo (cake + candle)
    │   ├── gift-box.png        → (legacy, no longer used — see note below)
    │   └── memory1.jpg         → Page 6, Card 2 photo
    └── music/
        ├── piano.mp3           → background music (loops from Page 1 onward)
        ├── song1.mp3           → Page 6, Card 1 (the song card)
        └── memory3.mp3         → Page 6, Card 3 (voice memo)
```

> **Note:** `gift-box.png` and its related HTML/CSS (`.gift-box-img`, `#gift-box`) were removed once Page 5 switched to a full-background gift scene image. Safe to delete the file if it's still sitting in your assets folder.

## How It Works

- **One-page structure, JS-driven scenes.** Every "page" is a `<section class="page">` inside a single `index.html`. Only one has the `.active` class at a time; navigating just swaps which section is visible.
- **Background music** starts on Page 1's button tap (required — browsers block autoplay without a user gesture) and loops continuously. It automatically **ducks in volume** (not fully paused) whenever a card's own audio (song or voice memo) is playing on Page 6, then restores when that audio pauses or ends.
- **Per-page backgrounds:** Pages 1, 2, 3, 6, and 8 share one global night-sky background. Pages 5 and 7 each have their own distinct background image instead.

## Page-by-Page Notes

| Page | Scene | Key interaction |
|------|-------|------------------|
| 1 | Opening line | Tap "Ready...?" — starts music, moves to Page 2 |
| 2 | "Our paths crossed" | Auto-plays sequential fade-in lines with stars |
| 3 | Little stars (gratitude) | Tap each of 5 stars to reveal a message |
| 5 | Happy Birthday + gift | Tap **anywhere on the page** (not a button) to "open" the gift — background image itself is the box |
| 6 | Gift cards (2×2 grid) | Tap each card to flip; Card 1 (song) and Card 3 (voice memo) auto-play with background music ducking |
| 7 | Make a wish (cake) | Tap the CSS-animated flame overlaid on the real photo's candle to "blow it out" |
| 8 | Final letter | Scrollable letter card; "Revisit the Journey" restarts the whole site from Page 1 |

*(Page 4 was removed during development — flow goes directly from Page 3 to Page 5.)*

## Known Quirks & Fixes Worth Remembering

- **`music` variable scope:** declared once at the very top of `script.js` (outside `DOMContentLoaded`) so Pages 5–8 can reference it, *and* separately inside the `DOMContentLoaded` callback for Pages 1–3. Both are intentional — don't remove either.
- **Page 7's flame overlay** is positioned as a *percentage of the cake image's own box* (not the viewport), so it stays aligned with the real candle across all screen sizes. If you ever swap `cake-scene.jpeg` for a different photo, you'll need to re-check/re-tune the `top`/`left` percentages on `.flame-mask` and `.flame-overlay`, and update `aspect-ratio` on `.cake-image-wrap` to match the new image's actual dimensions.
- **Emoji in HTML:** if any emoji mysteriously stop rendering, swap them for their HTML numeric entity (e.g. `&#11088;` for ⭐) rather than the raw character — this fixed a real encoding issue that came up during development.
- **Scrolling:** each `.page` scrolls independently (`overflow-y: auto`) rather than the whole `body`, so long content (like Page 8's letter) doesn't get clipped on shorter screens. `.content` uses `margin: auto` specifically to prevent centered flex content from clipping at the top when it's taller than the viewport.

## Before Sharing

- [ ] Confirm all image files are full resolution (not thumbnails) — blurriness on load usually means a compressed source file
- [ ] Test the full flow on an actual phone, not just DevTools responsive mode (touch behavior differs)
- [ ] Double-check every audio file (`piano.mp3`, `song1.mp3`, `memory3.mp3`) is in place and named exactly as referenced in the HTML
- [ ] Fill in the real song title/artist on Page 6, Card 1
- [ ] Do one full click-through, start to finish, with sound on
