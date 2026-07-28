import {
  airportRoutes,
  programDays,
  railRoutes,
  venueLinks,
} from "./content";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { getSiteContent } from "./site-data";

const navigation = [
  ["01", "Home", "/"],
  ["02", "Venue", "/venue"],
  ["03", "Program", "/program"],
  ["04", "Links", "/links"],
] as const;

export type WorkshopPageName =
  | "home"
  | "venue"
  | "program"
  | "links";

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

export async function WorkshopPage({
  activePage = "home",
}: {
  activePage?: WorkshopPageName;
}) {
  const {
    workshop,
    topics,
    invitedSpeakers,
    organizers,
    contact,
    registrationUrl,
  } = await getSiteContent();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <aside className="site-rail" aria-label="Workshop navigation">
        <Link className="rail-brand" href="/" aria-label="Workshop home">
          <strong>International Workshop on the GKLS equation beyond</strong>
        </Link>

        <nav>
          {navigation.map(([index, label, href]) => (
            <Link href={href} key={href}>
              <span>{index}</span>
              {label}
            </Link>
          ))}
        </nav>

        <div className="rail-meta">
          <p>{workshop.date}</p>
          <p>RIKEN Wako Campus</p>
          <span>English · In person</span>
        </div>
      </aside>

      <header className="mobile-header">
        <Link href="/" aria-label="Workshop home">
          <strong>International Workshop on the GKLS equation beyond</strong>
        </Link>
        <MobileMenu items={navigation} />
      </header>

      <div className={`site-frame page-${activePage}`}>
        <main id="main-content">
          {activePage === "home" ? (
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
              <section
                className="home-block registration-block"
                id="home-registration"
              >
                <SectionTitle
                  index="01.1"
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
              </section>

              <section className="home-block topics-block">
                <SectionTitle index="01.2" label="Scope" title="Topics" />
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
                  index="01.3"
                  label="Participants"
                  title="Invited Speakers"
                />
                <ul className="standard-list speaker-list">
                  {invitedSpeakers.length > 0 ? (
                    invitedSpeakers.map((speaker) => (
                      <li key={speaker.name}>
                        <strong>{speaker.name}</strong>
                        <span>{speaker.affiliation}</span>
                        {speaker.talkTitle ? <em>{speaker.talkTitle}</em> : null}
                      </li>
                    ))
                  ) : (
                    <li>
                      <strong>To be announced</strong>
                    </li>
                  )}
                </ul>
              </section>

              <section className="home-block location-block">
                <SectionTitle
                  index="01.4"
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
                  <Link className="text-link" href="/venue">
                    View venue and travel information
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </section>

              <section className="home-block organizers-block">
                <SectionTitle
                  index="01.5"
                  label="Committee"
                  title="Organising committee"
                />
                <ul className="standard-list organizer-list">
                  {organizers.map((organizer, index) => (
                    <li key={`${organizer.name}-${index}`}>
                      <strong>{organizer.name}</strong>
                      <span>{organizer.affiliation}</span>
                      <em>{organizer.role}</em>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            </section>
          ) : null}

          {activePage === "venue" ? (
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
              <a
                className="button button-outline"
                href={venueLinks.officialHomepage}
                rel="noreferrer"
                target="_blank"
              >
                RIKEN official website
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
          ) : null}

          {activePage === "program" ? (
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
                <p>A detailed program will be announced later.</p>
              </div>
            )}
            </section>
          ) : null}

          {activePage === "links" ? (
            <section className="major-section links-section" id="links">
            <SectionTitle
              index="04"
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
          ) : null}
        </main>

        <footer className="site-footer">
          <div>
            <strong>{workshop.formalName}</strong>
            <span>RIKEN Wako Campus, Japan</span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
          <div>
            <span>© 2027 Workshop Organizers</span>
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

export default function Home() {
  return <WorkshopPage activePage="home" />;
}
