"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { EditableSiteContent } from "../site-data";

type EditorProps = {
  initialContent: EditableSiteContent;
};

export default function Editor({ initialContent }: EditorProps) {
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then((response) => (response.ok ? response.json() : null))
      .then((saved) => saved && setContent(saved));
  }, []);

  function setWorkshop(
    key: keyof EditableSiteContent["workshop"],
    value: string,
  ) {
    setContent((current) => ({
      ...current,
      workshop: { ...current.workshop, [key]: value },
    }));
  }

  async function save() {
    setStatus("Saving…");
    const response = await fetch("/api/content", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(content),
    });
    setStatus(response.ok ? "Saved. The website is now updated." : "Could not save.");
  }

  return (
    <main className="editor-page">
      <header className="editor-header">
        <div>
          <p>Workshop website</p>
          <h1>Simple editor</h1>
          <span>Edit the text below, then press Save changes.</span>
        </div>
        <Link href="/">View website</Link>
      </header>

      <div className="editor-form">
        <section>
          <h2>Home — title and description</h2>
          <label>
            Workshop title
            <input
              value={content.workshop.heroTitle}
              onChange={(event) => setWorkshop("heroTitle", event.target.value)}
            />
          </label>
          <label>
            Short summary
            <textarea
              rows={3}
              value={content.workshop.summary}
              onChange={(event) => setWorkshop("summary", event.target.value)}
            />
          </label>
          <label>
            Description paragraphs (one paragraph per line)
            <textarea
              rows={7}
              value={content.aboutParagraphs.join("\n")}
              onChange={(event) =>
                setContent({
                  ...content,
                  aboutParagraphs: event.target.value
                    .split("\n")
                    .filter(Boolean),
                })
              }
            />
          </label>
        </section>

        <section>
          <h2>Registration and dates</h2>
          <div className="editor-grid">
            <label>
              Workshop dates
              <input
                value={content.workshop.date}
                onChange={(event) => setWorkshop("date", event.target.value)}
              />
            </label>
            <label>
              Registration deadline
              <input
                value={content.workshop.registrationDeadline}
                onChange={(event) =>
                  setWorkshop("registrationDeadline", event.target.value)
                }
              />
            </label>
          </div>
          <label>
            Registration form URL (leave blank while closed)
            <input
              value={content.registrationUrl}
              onChange={(event) =>
                setContent({ ...content, registrationUrl: event.target.value })
              }
            />
          </label>
        </section>

        <section>
          <h2>Location</h2>
          <div className="editor-grid">
            <label>
              Venue name
              <input
                value={content.workshop.venueName}
                onChange={(event) =>
                  setWorkshop("venueName", event.target.value)
                }
              />
            </label>
            <label>
              Short location
              <input
                value={content.workshop.venueShort}
                onChange={(event) =>
                  setWorkshop("venueShort", event.target.value)
                }
              />
            </label>
          </div>
          <label>
            Address
            <input
              value={content.workshop.venueAddress}
              onChange={(event) =>
                setWorkshop("venueAddress", event.target.value)
              }
            />
          </label>
        </section>

        <section>
          <h2>Topics</h2>
          <label>
            One topic per line
            <textarea
              rows={9}
              value={content.topics.join("\n")}
              onChange={(event) =>
                setContent({
                  ...content,
                  topics: event.target.value.split("\n").filter(Boolean),
                })
              }
            />
          </label>
        </section>

        <section>
          <h2>Invited speakers</h2>
          <label>
            One speaker per line: Name | Affiliation | Talk title (optional)
            <textarea
              rows={7}
              value={content.invitedSpeakers
                .map((speaker) =>
                  [speaker.name, speaker.affiliation, speaker.talkTitle ?? ""].join(
                    " | ",
                  ),
                )
                .join("\n")}
              onChange={(event) =>
                setContent({
                  ...content,
                  invitedSpeakers: event.target.value
                    .split("\n")
                    .filter(Boolean)
                    .map((line) => {
                      const [name = "", affiliation = "", talkTitle = ""] =
                        line.split("|").map((value) => value.trim());
                      return { name, affiliation, talkTitle };
                    }),
                })
              }
            />
          </label>
        </section>

        <section>
          <h2>Organising committee</h2>
          <label>
            One member per line: Name | Affiliation | Role
            <textarea
              rows={6}
              value={content.organizers
                .map((item) =>
                  [item.name, item.affiliation, item.role].join(" | "),
                )
                .join("\n")}
              onChange={(event) =>
                setContent({
                  ...content,
                  organizers: event.target.value
                    .split("\n")
                    .filter(Boolean)
                    .map((line) => {
                      const [name = "", affiliation = "", role = "Organizer"] =
                        line.split("|").map((value) => value.trim());
                      return { name, affiliation, role };
                    }),
                })
              }
            />
          </label>
        </section>

        <section>
          <h2>Contact</h2>
          <div className="editor-grid">
            <label>
              Contact name
              <input
                value={content.contact.name}
                onChange={(event) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, name: event.target.value },
                  })
                }
              />
            </label>
            <label>
              Email
              <input
                value={content.contact.email}
                onChange={(event) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, email: event.target.value },
                  })
                }
              />
            </label>
          </div>
          <label>
            Affiliation
            <input
              value={content.contact.affiliation}
              onChange={(event) =>
                setContent({
                  ...content,
                  contact: {
                    ...content.contact,
                    affiliation: event.target.value,
                  },
                })
              }
            />
          </label>
        </section>

        <div className="editor-save">
          <button type="button" onClick={save}>
            Save changes
          </button>
          <span role="status">{status}</span>
        </div>
      </div>
    </main>
  );
}
