# fuzzysiren.com

Marketing site for **Fuzzy Siren LLC**. Plain HTML/CSS/JS, no build step required to host it.

## Hosting

Any static host works (GitHub Pages, Netlify, Cloudflare Pages). For GitHub Pages: *Settings → Pages → Source: Deploy from a branch → `main` / root*, then add `fuzzysiren.com` as the custom domain (a `CNAME` file is included).

## Editing pages

Pages are generated from `_src/` so the header/footer stay in sync:

- `_src/template.html` – shared head, nav and footer
- `_src/pages/*.html` – per-page content (the first two comment lines set the title and meta description)

After editing, run `python _src/gen.py` to regenerate the top-level `*.html` files, then commit both. (You can also just edit the top-level files directly if you prefer; just don't re-run the generator afterwards.)

## Forms

The mailing-list and contact forms post to the `data-endpoint` on each `<form>`. They ship with a `REPLACE_ME` placeholder, which makes them fall back to opening the visitor's email client addressed to `ajt@fuzzysiren.com`. To collect submissions without the mailto fallback:

1. Create a free form at https://formspree.io (or similar) pointed at `ajt@fuzzysiren.com`.
2. Replace `https://formspree.io/f/REPLACE_ME` in `_src/pages/index.html`, `games.html` and `contact.html` with your endpoint and regenerate.

## Assets

`assets/` holds the logo badge (transparent PNG), the original logo, icons/favicon, the social-share image (`og-image.jpg`) and a press-kit zip.
