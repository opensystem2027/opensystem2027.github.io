import { env } from "cloudflare:workers";
import {
  contact,
  invitedSpeakers,
  organizers,
  registrationUrl,
  topics,
  workshop,
} from "./content";

export type EditableSiteContent = {
  workshop: typeof workshop;
  topics: string[];
  invitedSpeakers: typeof invitedSpeakers;
  organizers: typeof organizers;
  contact: typeof contact;
  registrationUrl: string;
};

export const defaultSiteContent: EditableSiteContent = {
  workshop,
  topics,
  invitedSpeakers,
  organizers,
  contact,
  registrationUrl,
};

function markDateAsTentative(date: string) {
  const dateIn2027 = date.replace("2026", "2027");
  return /tentative/i.test(dateIn2027)
    ? dateIn2027
    : `${dateIn2027} (tentative)`;
}

async function ensureContentTable() {
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS site_content (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      content_json TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      updated_by TEXT NOT NULL
    )`,
  ).run();
}

export async function getSiteContent(): Promise<EditableSiteContent> {
  if (!env.DB) return defaultSiteContent;

  try {
    await ensureContentTable();
    const row = await env.DB.prepare(
      "SELECT content_json FROM site_content WHERE id = 1",
    ).first<{ content_json: string }>();

    if (!row) return defaultSiteContent;
    const saved = JSON.parse(row.content_json) as Partial<EditableSiteContent>;

    return {
      ...defaultSiteContent,
      ...saved,
      workshop: {
        ...workshop,
        ...saved.workshop,
        date: markDateAsTentative(saved.workshop?.date ?? workshop.date),
      },
      contact: { ...contact, ...saved.contact },
    };
  } catch {
    return defaultSiteContent;
  }
}

export async function saveSiteContent(
  content: EditableSiteContent,
  editorEmail: string,
) {
  await ensureContentTable();
  await env.DB.prepare(
    `INSERT INTO site_content (id, content_json, updated_at, updated_by)
     VALUES (1, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       content_json = excluded.content_json,
       updated_at = excluded.updated_at,
       updated_by = excluded.updated_by`,
  )
    .bind(JSON.stringify(content), new Date().toISOString(), editorEmail)
    .run();
}
