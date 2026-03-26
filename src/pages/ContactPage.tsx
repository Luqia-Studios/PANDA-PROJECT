import { Link } from "react-router-dom";

export function ContactPage() {
  return (
    <div className="page-stack">
      <section className="page-section journal-page__hero">
        <p className="eyebrow">Contatti</p>
        <h1>Contatti</h1>
        <p className="journal-page__lead">
          Per ora il canale diretto piu semplice resta Instagram.
        </p>
      </section>

      <section className="cta-section">
        <div className="button-row">
          <a
            className="button button-primary"
            href="https://www.instagram.com/lucaorlandi____/"
            rel="noreferrer"
            target="_blank"
          >
            Apri Instagram
          </a>
          <Link className="button button-secondary" to="/journal">
            Apri Journal
          </Link>
        </div>
      </section>
    </div>
  );
}
