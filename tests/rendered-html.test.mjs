import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete workshop preview", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>International Workshop on the GKLS equation and beyond<\/title>/i,
  );
  assert.match(html, /7–8 March 2026/);
  assert.match(html, /RIKEN Wako Campus, Saitama, Japan/);
  assert.match(html, /Invited speakers will be announced after confirmation\./);
  assert.match(html, /Registration will open soon\./);
  assert.match(html, /Information is subject to change\./);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps unconfirmed information explicit and editable", async () => {
  const [content, page] = await Promise.all([
    readFile(new URL("../app/content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(content, /export const invitedSpeakers: Speaker\[\] = \[\]/);
  assert.match(content, /export const programDays: ProgramDay\[\] = \[\]/);
  assert.match(content, /export const registrationUrl = ""/);
  assert.match(content, /registrationDeadline: "TBA"/);
  assert.match(content, /export const venueLinks = \{/);
  assert.match(content, /google\.com\/maps\/search/);
  assert.match(content, /riken\.jp\/en\/access\/wako-map/);
  assert.match(content, /name: "TBA"/);
  assert.match(content, /email: "TBA"/);
  assert.match(page, /may be available/);
  assert.match(page, /Registration form — TBA/);
  assert.match(page, /"Home", "#home"/);
  assert.match(page, /"Venue", "#venue"/);
  assert.match(page, /"Program", "#program"/);
  assert.match(page, /"Contact", "#contact"/);
  assert.match(page, /"Links", "#links"/);
  await access(new URL("../public/og.png", import.meta.url));
});
