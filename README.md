# Biomedical research portfolio

A static, no-build portfolio for a biomedical science student. It shows publications, articles, posters and talks, methods and background in compact "pocket" sections. Everything is placeholder content, ready to replace.

## Put it on GitHub Pages

1. Delete the old site files in your repo (`index.html`, `index.css`, `index.js`, the old `images/` and `fonts/` folders), then copy the contents of this folder into the repo root.
2. Commit and push to `main`.
3. In the repo, open **Settings > Pages**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
4. Your site appears at `https://<username>.github.io/github-portfolio/` after a minute or two.

## What to edit

| To change | Edit |
| --- | --- |
| Publications, articles, posters and talks | `js/content.js` (one entry per item; the page builds itself from it) |
| Your PDFs | Put them in `documents/` and update the `pdf` / `file` paths in `js/content.js` |
| Name, bio, contact links, methods, timeline, university | `index.html` (search for "Kenisya Saravenen", "University of Example" and "example.ac.uk") |
| Profile photo | Replace `images/profile-placeholder.svg`, or point the `<img>` in the About pocket at your own JPG or PNG |
| Colours | The variables at the top of `css/style.css` (`histology` is the light theme, `fluorescence` is the dark one) |

`me` in `js/content.js` must match your name exactly as written in author lists, so it gets bolded.

## Notes

- Fonts (Bricolage Grotesque and Source Serif 4) load from Google Fonts, with system fallbacks if offline.
- The hero animation pauses for visitors who prefer reduced motion. Theme choice is remembered in the browser.
- The DOI links point to placeholder DOIs and will not resolve until you replace them.
- To add a new section, copy any `<section class="pocket">` block in `index.html` and add a link for it in the nav.
