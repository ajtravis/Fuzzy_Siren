# fuzzysiren.com

Marketing site for **Fuzzy Siren LLC**. Plain HTML/CSS/JS, no build step required to host it.

## Hosting

Any static host works (GitHub Pages, Netlify, Cloudflare Pages). For GitHub Pages: *Settings → Pages → Source: Deploy from a branch → `main` / root*, then add `fuzzysiren.com` as the custom domain (a `CNAME` file is included).

## Editing pages

Pages are generated from `_src/` so the header/footer stay in sync:

- `_src/template.html` – shared head, nav and footer
- `_src/pages/*.html` – per-page content (the first two comment lines set the title and meta description)

After editing, run `python _src/gen.py` to regenerate the top-level `*.html` files, then commit both. (You can also just edit the top-level files directly if you prefer; just don't re-run the generator afterwards.)

## Mailing list

The signup forms (home, games, contact pages) POST emails to a Google Apps Script attached to a Google Sheet. Setup instructions and the script are in [`docs/mailing-list-setup.md`](docs/mailing-list-setup.md). The web-app URL goes in `SIGNUP_ENDPOINT` at the top of `js/main.js`; until it is set, the form shows a "signups open soon" message. There is no contact form; the Contact page links to ajt@fuzzysiren.com.

## Assets

`assets/` holds the logo badge (transparent PNG), the original logo, icons/favicon, the social-share image (`og-image.jpg`) and a press-kit zip.
