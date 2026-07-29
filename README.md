# International Workshop on the GKLS equation and beyond

Source code for the official workshop website.

- Workshop dates: 7–8 March 2027 (tentative)
- Venue: RIKEN Wako Campus, Saitama, Japan
- Pages: Home, Venue, Program, Contact, and Links
- Current site: https://gkls-equation-workshop.riken-quantu-3457.chatgpt.site/
- GitHub Pages: https://opensystem2027.github.io/

## Editing workshop information

Most frequently changed information is in `app/content.ts`. It contains the dates, description, topics, invited speakers, registration URL, organising committee, and contact details.

After changes are committed to the `main` branch, GitHub Actions automatically
rebuilds and publishes the public GitHub Pages site.

## Local development

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Then open the local URL printed in the terminal.

## Validation

```bash
npm run build
npm test
```

The project uses Next.js-compatible components through vinext and includes Cloudflare D1 support for the browser-based editor.
