import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("builds the complete multi-page workshop site", async () => {
  const [page, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /International Workshop on the GKLS equation and beyond/);
  assert.match(page, /Invited speakers will be announced after confirmation\./);
  assert.match(page, /Registration will open soon\./);
  assert.match(page, /Information is subject to\s+change\./);
  assert.doesNotMatch(page + layout, /codex-preview|react-loading-skeleton/i);
  await access(new URL("../dist/server/index.js", import.meta.url));
  await Promise.all(
    ["venue", "program", "contact", "links"].map((route) =>
      access(new URL(`../app/${route}/page.tsx`, import.meta.url)),
    ),
  );
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
  assert.match(page, /"Home", "\/"/);
  assert.match(page, /"Venue", "\/venue"/);
  assert.match(page, /"Program", "\/program"/);
  assert.match(page, /"Contact", "\/contact"/);
  assert.match(page, /"Links", "\/links"/);
  await access(new URL("../public/og.png", import.meta.url));
});
