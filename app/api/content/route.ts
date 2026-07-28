import { headers } from "next/headers";
import { NextResponse } from "next/server";
import {
  getSiteContent,
  saveSiteContent,
  type EditableSiteContent,
} from "../../site-data";

function getEditorEmail(requestHeaders: Headers) {
  const email = requestHeaders.get("oai-authenticated-user-email") ?? "";
  const editors = (process.env.EDITOR_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return editors.includes(email.toLowerCase()) ? email : null;
}

export async function GET() {
  const editorEmail = getEditorEmail(await headers());
  if (!editorEmail) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  return NextResponse.json(await getSiteContent());
}

export async function POST(request: Request) {
  const editorEmail = getEditorEmail(await headers());
  if (!editorEmail) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const content = (await request.json()) as EditableSiteContent;
  await saveSiteContent(content, editorEmail);
  return NextResponse.json({ ok: true });
}
