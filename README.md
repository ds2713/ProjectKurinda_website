# Kurinda website — static site

This is a plain HTML/CSS/JS rebuild of your Framer design. No platform, no monthly fee — just files.

## What's inside
- `index.html` — Home
- `project.html` — Project & Research
- `community.html` — Community Portal
- `alerts.html` — Alerts
- `team.html` — Team
- `updates.html` — Updates & News
- `style.css` — all styling, shared across every page
- `script.js` — mobile menu toggle

## Placeholder images
The aerial forest/river/wetland photos are currently colored gradient blocks (clearly not real photos) — I couldn't pull your actual image files from screenshots. To swap them in:
1. In Framer, open **Assets** and download the images you used.
2. Drop them into a new `assets/` folder next to these HTML files.
3. In each HTML file, find the element with class `hero`, `panel-photo`, `alert-photo`, or `news-photo`, and replace the CSS gradient `background` with `background-image: url('assets/your-image.jpg'); background-size: cover; background-position: center;` — or just add an `<img>` tag inside it.

## Hosting for free (no monthly cost)
Any of these work well for a static site like this:
- **Cloudflare Pages** — drag-and-drop deploy, free custom domain support, generous free tier.
- **Netlify** — drag-and-drop deploy, free tier, easy custom domain.
- **GitHub Pages** — free if you're OK using GitHub to store the files.

General steps (Cloudflare Pages / Netlify):
1. Create a free account.
2. Create a new site/project, choose "deploy without Git" or "drag and drop".
3. Drag this whole folder in (or a zip of it).
4. Once deployed, go to the project's custom domain settings and add your existing domain.
5. You'll be given DNS records (usually a CNAME, or two A records) — add those in your domain registrar's DNS settings.
6. Wait for DNS to propagate (a few minutes to a few hours), and your domain will point straight at this site.

## Making changes yourself
This is just text files — open them in any code/text editor (VS Code, Cursor, even Notepad):
- Page text: edit directly inside the HTML files.
- Colors/spacing/fonts: edit `style.css` — all the color values are set as variables at the top (`:root { ... }`) so you can change the whole palette in one place.
- Adding a page: copy an existing HTML file, rename it, update its content and the nav links across all pages.
- Buttons/links: change the `href="..."` value on any `<a>` tag.

You're also welcome to bring this back to me any time and ask for changes — new sections, different layout, more pages, whatever you need.
