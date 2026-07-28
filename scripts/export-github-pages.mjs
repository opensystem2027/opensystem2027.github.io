import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const sourceOrigin =
  process.env.STATIC_SOURCE_ORIGIN ?? "http://localhost:4310";
const publicOrigin =
  process.env.PAGES_PUBLIC_ORIGIN ??
  "https://hiroki-nakaba.github.io/opensystem";
const outputDirectory = "pages-dist";
const routes = ["/", "/venue", "/program", "/links"];

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`${sourceOrigin}/`);
      if (response.ok) return;
    } catch {
      // The preview server may still be starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Preview server did not start at ${sourceOrigin}`);
}

function routeRelativePath(route, target) {
  const rootPrefix = route === "/" ? "./" : "../";
  const [pathWithQuery, hash = ""] = target.split("#", 2);
  const [path, query = ""] = pathWithQuery.split("?", 2);
  const suffix = `${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;

  if (path === "" || path === "/") return `${rootPrefix}${suffix}`;

  const cleanPath = path.replace(/^\/+/, "");
  const isFile = /\.[a-z0-9]+$/i.test(cleanPath);
  return `${rootPrefix}${cleanPath}${isFile ? "" : "/"}${suffix}`;
}

function prepareHtml(route, renderedHtml) {
  const closingHtml = renderedHtml.indexOf("</html>");
  if (closingHtml < 0) {
    throw new Error(`Rendered ${route} did not contain a complete HTML document`);
  }

  const canonicalPath = route === "/" ? "/" : `${route}/`;
  let html = renderedHtml.slice(0, closingHtml + "</html>".length);

  html = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b[^>]*rel="modulepreload"[^>]*\/?>/gi, "")
    .replace(
      /<link\b[^>]*rel="stylesheet"[^>]*href="\/app\/globals\.css"[^>]*\/?>/gi,
      `<link rel="stylesheet" href="${routeRelativePath(route, "/assets/styles.css")}"/>`,
    )
    .replace(
      /\b(href|src)="\/([^"]*)"/g,
      (_match, attribute, target) =>
        `${attribute}="${routeRelativePath(route, `/${target}`)}"`,
    )
    .replaceAll(`${sourceOrigin}/og.png`, `${publicOrigin}/og.png`)
    .replace(
      "</head>",
      `<link rel="canonical" href="${publicOrigin}${canonicalPath}"/></head>`,
    );

  return html;
}

await waitForServer();
await rm(outputDirectory, { force: true, recursive: true });
await mkdir(outputDirectory, { recursive: true });

const cssResponse = await fetch(`${sourceOrigin}/app/globals.css`);
if (!cssResponse.ok) {
  throw new Error(`Could not load stylesheet: ${cssResponse.status}`);
}
await mkdir(join(outputDirectory, "assets"), { recursive: true });
await writeFile(
  join(outputDirectory, "assets", "styles.css"),
  await cssResponse.text(),
);

for (const route of routes) {
  const response = await fetch(`${sourceOrigin}${route}`);
  if (!response.ok) {
    throw new Error(`Could not render ${route}: ${response.status}`);
  }

  const destination =
    route === "/"
      ? join(outputDirectory, "index.html")
      : join(outputDirectory, route.slice(1), "index.html");
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, prepareHtml(route, await response.text()));
}

await cp("public", outputDirectory, { recursive: true });
await writeFile(join(outputDirectory, ".nojekyll"), "");

console.log(`Exported ${routes.length} pages to ${outputDirectory}`);
