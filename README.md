# Interior Design Portfolio

Static site: no build step, no backend.

## Files
- index.html      page structure
- css/style.css   all styling (colours are the variables at the top)
- js/data.js      YOUR CONTENT: email, projects, expertise, journal
- js/app.js       filters, search, gallery, modal (usually no edits needed)
- assets/projects/<project-name>/01.webp ... 12.webp   your renders

## Edit
1. Open js/data.js and replace the placeholder email, projects, expertise and journal.
2. The folder name for a project is its title in lowercase with dashes,
   e.g. "Linen House" -> assets/projects/linen-house/
   If you rename a project, rename its folder (or create a new one).
3. Add images as 01.webp, 02.webp, ... (two digits). Missing images show placeholders.
   If a project has fewer than 12 images, change `var N=12;` in js/app.js.
4. Edit the headline and intro text in index.html.

## Preview
Double-click index.html, or run `python3 -m http.server` in this folder.

## Host free on GitHub Pages
1. Create a GitHub repo and upload all files (keep the folder structure).
2. Settings > Pages > Deploy from a branch > main > / (root) > Save.
3. Your site appears at https://<username>.github.io/<repo>/

Tip: export images around 1920px wide as WebP, 75-85% quality, 200-400 KB each.
