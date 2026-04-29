# Cities of Paradox: Hong Kong × Singapore

A Vue 3 monorepo scaffold for COR2646 final project submission.

This app is designed as an interactive comparative map/exhibition, not a tourist guide. It foregrounds seven Hong Kong-Singapore pairings, the connecting line argument for each pairing, and attached media artefacts with visible source trails.

## Project Structure

```text
root/
  package.json
  README.md
  apps/
    web/
      package.json
      index.html
      src/
        main.js
        App.vue
        data/
          pairs.js
          sources.js
        components/
          HeroSection.vue
          ExhibitionMap.vue
          PairNavigator.vue
          ArtefactPairPanel.vue
          SiteCard.vue
          ArtefactGallery.vue
          YoutubeEmbed.vue
          ConnectionLegend.vue
          TimelineStrip.vue
          RubricAlignment.vue
          BibliographyPanel.vue
          SourceBadge.vue
        styles/
          global.css
```

## Setup

1. Ensure Node.js 18+ and npm are installed.
2. Install dependencies from the root:

```bash
npm install
```

## Run

From the root directory:

```bash
npm run dev
```

This runs the Vue app in `apps/web` through the root script.

## Build

From the root directory:

```bash
npm run build
```

## How to Edit Pair Content (`pairs.js`)

- File: `apps/web/src/data/pairs.js`
- Each pair object contains:
  - title/theme/line argument
  - Hong Kong + Singapore site cards
  - comparison analysis blocks
  - artefact arrays
  - source IDs
- Update wording carefully and keep claims source-backed.

## How to Add Your Own Photos

1. Put your image files in `apps/web/public` (for example, `apps/web/public/student-media/`).
2. Update each site `image` path in `pairs.js` to your local file path, e.g. `/student-media/victoria-harbour.jpg`.
3. Update `alt` text with accurate, descriptive wording.

## How to Replace Placeholder Media

- Current placeholder assets:
  - `apps/web/public/placeholders/site-placeholder.svg`
  - `apps/web/public/placeholders/artefact-placeholder.svg`
- Replace artefact image paths (`artefacts[].image`) in `pairs.js` with your own media paths.
- Keep placeholder labels for anything you have not personally documented.

## How to Update the YouTube Video

- Pair 5 has a default embed in `pairs.js` under `featuredVideo.src`.
- To change it, replace:
  - `featuredVideo.src` (embedded default)
  - `featuredVideo.alternateSrc` (stored alternate link)
- The `YoutubeEmbed` component does not autoplay.

## Print / Submission View

- Use the top button: `Print / Submission View`.
- This expands all pair dossiers for full review.
- Use the `Print` button (visible in submission view) or browser print dialog.
- Print CSS is included for readable output.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Create a new Vercel project and import the repo.
3. Set project root to repository root.
4. Build command: `npm run build`
5. Output directory: `apps/web/dist`

## Deploy to Netlify

1. Connect repo to Netlify.
2. Build command: `npm run build`
3. Publish directory: `apps/web/dist`

## Academic Integrity Note

“This app is a scaffold. The student should review, edit, cite, and add their own judgement, photos, and reflections before submission.”

## Source Note

“Facts should be checked against the listed official sources. Do not add new factual claims without sources.”
