# Saksham Singla — portfolio

Personal website for Saksham Singla, a student developer building offline-first
software for schools and communities with poor connectivity.

**Live site:** https://sakshamsingla2022.github.io

## What's here

| Page | What it covers |
|---|---|
| `index.html` | Introduction and featured projects |
| `about.html` | Background, quick facts and GitHub activity |
| `projects.html` | Case studies: Code Gaon, Bloom Back, ScoreUp, vaqeelsaab.com |
| `skills.html` | Languages, frameworks and tools |
| `recognition.html` | Awards, certificates and roles |
| `contact.html` | Email and GitHub |

## How it's built

Plain HTML, CSS and JavaScript, with no framework and no build step. The site
is served directly from the `main` branch by GitHub Pages.

- `style.css` holds all styling. Colours and sizes are design tokens at the top of `:root`.
- `script.js` handles links, images, the phone menu, the copy-email button and the GitHub graph.
- Pages are designed for cheap phones and slow networks first, and are checked for
  accessibility (keyboard use, focus outlines, contrast) and with Lighthouse.

## Editing

- **Links** (LinkedIn, résumé, ScoreUp, Google Play): fill in the `LINKS` object at the
  top of `script.js`. An empty value keeps that button or row hidden.
- **Images**: copy the file into `assets/`, then add its name to the `IMAGES` list in
  `script.js`. Until then the page shows a placeholder tile.
- The sidebar is repeated in every page; a change to it must be made in all of them.
