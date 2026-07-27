import {
  aboutParagraphs,
  airportRoutes,
  contact,
  invitedSpeakers,
  organizers,
  previewNotice,
  programDays,
  railRoutes,
  registrationUrl,
  topics,
  venueLinks,
  workshop,
} from "./content";

const navigation = [
  ["01", "Home", "#home"],
  ["02", "Venue", "#venue"],
  ["03", "Program", "#program"],
  ["04", "Contact", "#contact"],
  ["05", "Links", "#links"],
];

function StatusMark({ children }: { children: React.ReactNode }) {
  return <span className="status-mark">{children}</span>;
}

function SectionTitle({
  index,
  label,
  title,
  description,
}: {
  index: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="section-title">
      <p>
        <span>{index}</span>
        {label}
      </p>
      <h2>{title}</h2>
      {description ? <div>{description}</div> : null}
    </header>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <aside className="site-rail" aria-label="Workshop navigation">
        <a className="rail-brand" href="#home" aria-label="Workshop home">
          <span>NM</span>
          <strong>
            GKLS equation
            <small>&amp; beyond · 2026</small>
          </strong>
        </a>

        <nav>
          {navigation.map(([index, label, href]) => (
            <a href={href} key={href}>
              <span>{index}</span>
              {label}
            </a>
          ))}
        </nav>

        <div className="rail-meta">
          <p>{workshop.date}</p>
          <p>RIKEN Wako Campus</p>
          <span>English · In person</span>
        </div>
      </aside>

      <header className="mobile-header">
        <a href="#home" aria-label="Workshop home">
          <span>NM</span>
          <strong>GKLS equation &amp; beyond</strong>
        </a>
        <details>
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            {navigation.map(([, label, href]) => (
              <a href={href} key={href}>
                {label}
              </a>
            ))}
          </nav>
        </details>
      </header>

      <div className="site-frame">
        <div className="draft-notice" role="note">
          <span aria-hidden="true" />
          <strong>Pre-publication preview</strong>
          <p>{previewNotice}</p>
        </div>

        <main id="main-content">
          <section className="home-section" id="home">
            <div className="hero-pattern" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <div className="hero">
              <p className="eyebrow">{workshop.formalName}</p>
              <h1>{workshop.heroTitle}</h1>
              <p className="hero-summary">{workshop.summary}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#home-overview">
                  Workshop overview
                  <span aria-hidden="true">↓</span>
                </a>
                <a className="button button-outline" href="#home-registration">
                  Registration — Coming Soon
                </a>
              </div>
            </div>

            <div className="hero-facts" aria-label="Workshop summary">
              <div>
                <span>Dates</span>
                <strong>{workshop.date}</strong>
              </div>
              <div>
                <span>Location</span>
                <strong>{workshop.venueShort}</strong>
              </div>
              <div>
                <span>Format</span>
                <strong>{workshop.format}</strong>
              </div>
              <div>
                <span>Language</span>
                <strong>{workshop.language}</strong>
              </div>
            </div>

            <div className="home-content">
              <section className="home-block overview-block" id="home-overview">
                <SectionTitle
                  index="01.1"
                  label="About"
                  title="A focused forum for open quantum dynamics"
                />
                <div className="about-copy">
                  {aboutParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>

              <section
                className="home-block registration-block"
                id="home-registration"
              >
                <SectionTitle
                  index="01.2"
                  label="Participation"
                  title="Registration & dates"
                />
                <div className="registration-grid">
                  <article className="registration-card">
                    <p className="mini-label">Registration</p>
                    <h3>Registration will open soon.</h3>
                    {registrationUrl ? (
                      <a
                        className="button button-primary"
                        href={registrationUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Open registration form
                        <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <span
                        className="button button-disabled"
                        aria-disabled="true"
                      >
                        Registration form — TBA
                      </span>
                    )}
                    <small>
                      The number of participants may be limited due to venue
                      capacity.
                    </small>
                  </article>

                  <dl className="dates-card">
                    <div>
                      <dt>Workshop dates</dt>
                      <dd>{workshop.date}</dd>
                    </div>
                    <div>
                      <dt>Registration deadline</dt>
                      <dd>
                        <StatusMark>
                          {workshop.registrationDeadline}
                        </StatusMark>
                      </dd>
                    </div>
                    <div>
                      <dt>Travel support</dt>
                      <dd>Details to be announced</dd>
                    </div>
                  </dl>
                </div>
                <p className="support-note">
                  Limited travel support for students and early-career
                  researchers may be available. Details and eligibility criteria
                  will be announced later.
                </p>
              </section>

              <section className="home-block topics-block">
                <SectionTitle index="01.3" label="Scope" title="Topics" />
                <ol className="topics-grid">
                  {topics.map((topic, index) => (
                    <li key={topic}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{topic}</h3>
                    </li>
                  ))}
                </ol>
                <p className="related-note">Related topics are also welcome.</p>
              </section>

              <section className="home-block speakers-block">
                <SectionTitle
                  index="01.4"
                  label="Participants"
                  title="Invited Speakers"
                />
                {invitedSpeakers.length > 0 ? (
                  <div className="speaker-grid">
                    {invitedSpeakers.map((speaker) => (
                      <article className="speaker-card" key={speaker.name}>
                        {speaker.photo ? (
                          // Speaker photos are added only after confirmation.
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={speaker.photo} alt="" />
                        ) : (
                          <div
                            className="speaker-photo-placeholder"
                            aria-hidden="true"
                          />
                        )}
                        <div>
                          <h3>{speaker.name}</h3>
                          <p>{speaker.affiliation}</p>
                          {speaker.talkTitle ? (
                            <h4>{speaker.talkTitle}</h4>
                          ) : null}
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="announcement-card">
                    <span aria-hidden="true">+</span>
                    <div>
                      <StatusMark>Announcement pending</StatusMark>
                      <p>
                        Invited speakers will be announced after confirmation.
                      </p>
                    </div>
                  </div>
                )}
              </section>

              <section className="home-block location-block">
                <SectionTitle
                  index="01.5"
                  label="Location"
                  title="RIKEN Wako Campus"
                />
                <div className="location-summary">
                  <address>
                    <strong>{workshop.venueName}</strong>
                    <span>{workshop.venueAddress}</span>
                  </address>
                  <p>
                    The meeting room and on-campus directions will be announced
                    later. Complete travel information is provided in the Venue
                    section.
                  </p>
                  <a className="text-link" href="#venue">
                    View venue and travel information
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </section>

              <section className="home-block organizers-block">
                <SectionTitle
                  index="01.6"
                  label="Committee"
                  title="Organising committee"
                />
                <div className="organizer-grid">
                  {organizers.map((organizer, index) => (
                    <article
                      className="organizer-card"
                      key={`${organizer.name}-${index}`}
                    >
                      <span aria-hidden="true">
                        {organizer.name === "TBA"
                          ? "—"
                          : organizer.name.charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <h3>{organizer.name}</h3>
                        <p>{organizer.affiliation}</p>
                        <small>{organizer.role}</small>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </section>

          <section className="major-section venue-section" id="venue">
            <SectionTitle
              index="02"
              label="Venue"
              title="Getting to RIKEN Wako Campus"
              description="Public transport is recommended. Wako-shi Station is served by the Tobu Tojo Line and the Tokyo Metro Yurakucho and Fukutoshin lines."
            />

            <div className="venue-lead">
              <address>
                <p className="mini-label">Workshop venue</p>
                <strong>{workshop.venueName}</strong>
                <span>{workshop.venueAddress}</span>
              </address>
              <a
                className="button button-map"
                href={venueLinks.googleMaps}
                rel="noreferrer"
                target="_blank"
              >
                Open in Google Maps
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <section className="travel-panel">
              <header>
                <p className="mini-label">Rail access</p>
                <h3>From Ikebukuro to Wako-shi</h3>
              </header>
              <div className="rail-map" aria-label="Train route map">
                <div className="station station-origin">
                  <span>Tokyo hub</span>
                  <strong>Ikebukuro</strong>
                </div>
                <div className="rail-lines">
                  {railRoutes.map((route) => (
                    <div className="rail-line" key={route.line}>
                      <i aria-hidden="true" />
                      <p>
                        <strong>{route.line}</strong>
                        <span>{route.service}</span>
                      </p>
                      <small>{route.time}</small>
                    </div>
                  ))}
                </div>
                <div className="station station-destination">
                  <span>Nearest station</span>
                  <strong>Wako-shi</strong>
                </div>
              </div>
              <p className="route-reminder">
                When using Tokyo Metro, take a train bound for Wako-shi or the
                Tobu Tojo Line.
              </p>
            </section>

            <section className="station-access">
              <header>
                <p className="mini-label">Last mile</p>
                <h3>From Wako-shi Station to RIKEN</h3>
              </header>
              <div className="access-options">
                <article>
                  <span>01</span>
                  <h4>Walk</h4>
                  <strong>Approx. 15 min</strong>
                  <p>Leave via the South Exit and follow the route to campus.</p>
                </article>
                <article>
                  <span>02</span>
                  <h4>Bus</h4>
                  <strong>Approx. 10 min</strong>
                  <p>
                    Take Seibu Bus #39 toward Oizumigakuen and alight at
                    Hirosawa, the second stop.
                  </p>
                </article>
                <article>
                  <span>03</span>
                  <h4>Taxi</h4>
                  <strong>Approx. 10 min</strong>
                  <p>Taxis are available outside Wako-shi Station.</p>
                </article>
              </div>
              <a
                className="text-link"
                href={venueLinks.officialBusDirections}
                rel="noreferrer"
                target="_blank"
              >
                Official bus directions with photographs
                <span aria-hidden="true">↗</span>
              </a>
            </section>

            <section className="airport-panel">
              <header>
                <p className="mini-label">Airport connections</p>
                <h3>Suggested rail routes</h3>
              </header>
              <div className="airport-routes">
                {airportRoutes.map((route) => (
                  <article key={route.origin}>
                    <strong>{route.origin}</strong>
                    <ol>
                      {route.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </article>
                ))}
              </div>
              <p>
                Route times are indicative. Please check current timetables
                before travel.
              </p>
            </section>
          </section>

          <section className="major-section program-section" id="program">
            <SectionTitle
              index="03"
              label="Program"
              title="Workshop schedule"
              description="The detailed scientific program will be published after the speaker schedule has been confirmed."
            />
            {programDays.length > 0 ? (
              <div className="program-days">
                {programDays.map((day) => (
                  <article className="program-day" key={day.date}>
                    <header>
                      <span>{day.label}</span>
                      <h3>{day.date}</h3>
                    </header>
                    <div className="table-wrap">
                      <table>
                        <thead>
                          <tr>
                            <th scope="col">Time</th>
                            <th scope="col">Type</th>
                            <th scope="col">Speaker</th>
                            <th scope="col">Title</th>
                          </tr>
                        </thead>
                        <tbody>
                          {day.items.map((item) => (
                            <tr key={`${item.time}-${item.title}`}>
                              <td>{item.time}</td>
                              <td>{item.type}</td>
                              <td>{item.speaker ?? "—"}</td>
                              <td>{item.title}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="program-placeholder">
                <div>
                  <span>DAY 01</span>
                  <i />
                  <i />
                  <i />
                </div>
                <div>
                  <span>DAY 02</span>
                  <i />
                  <i />
                  <i />
                </div>
                <p>A detailed program will be announced later.</p>
              </div>
            )}
          </section>

          <section className="major-section contact-section" id="contact">
            <SectionTitle
              index="04"
              label="Contact"
              title="Workshop inquiries"
              description="For questions about the workshop, registration, or accessibility, please contact the organising committee."
            />
            <address className="contact-card">
              <p className="mini-label">Primary contact</p>
              <strong>{contact.name}</strong>
              <span>{contact.affiliation}</span>
              {contact.email !== "TBA" ? (
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              ) : (
                <StatusMark>Email address · TBA</StatusMark>
              )}
            </address>
          </section>

          <section className="major-section links-section" id="links">
            <SectionTitle
              index="05"
              label="Links"
              title="Useful information"
              description="Official resources for planning your visit to RIKEN Wako Campus."
            />
            <div className="links-grid">
              <a
                href={venueLinks.officialAccess}
                rel="noreferrer"
                target="_blank"
              >
                <span>Access</span>
                <strong>Official RIKEN Wako access information</strong>
                <i aria-hidden="true">↗</i>
              </a>
              <a
                href={venueLinks.googleMaps}
                rel="noreferrer"
                target="_blank"
              >
                <span>Map</span>
                <strong>RIKEN Wako Campus on Google Maps</strong>
                <i aria-hidden="true">↗</i>
              </a>
              <a
                href={venueLinks.officialCampusMap}
                rel="noreferrer"
                target="_blank"
              >
                <span>Campus</span>
                <strong>Official Wako Campus map</strong>
                <i aria-hidden="true">↗</i>
              </a>
              <a
                href={venueLinks.visitorEntry}
                rel="noreferrer"
                target="_blank"
              >
                <span>Visitors</span>
                <strong>RIKEN visitor entry procedures</strong>
                <i aria-hidden="true">↗</i>
              </a>
              <div className="link-disabled" aria-disabled="true">
                <span>Registration</span>
                <strong>Workshop registration form</strong>
                <StatusMark>TBA</StatusMark>
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div>
            <strong>{workshop.formalName}</strong>
            <span>RIKEN Wako Campus, Japan</span>
          </div>
          <div>
            <span>© 2026 Workshop Organizers</span>
            <small>
              This website is currently being updated. Information is subject to
              change.
            </small>
          </div>
        </footer>
      </div>
    </>
  );
}
