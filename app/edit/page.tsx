import { headers } from "next/headers";
import Link from "next/link";
import { getSiteContent } from "../site-data";
import Editor from "./Editor";

export const dynamic = "force-dynamic";

export default async function EditPage() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email") ?? "";
  const editors = (process.env.EDITOR_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (!editors.includes(email.toLowerCase())) {
    return (
      <main className="editor-denied">
        <h1>Editor access is restricted</h1>
        <p>Open this page while signed in with an authorized account.</p>
        <Link href="/">Return to the website</Link>
      </main>
    );
  }

  return <Editor initialContent={await getSiteContent()} />;
}
