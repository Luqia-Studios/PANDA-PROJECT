import { Link } from "react-router-dom";

export function JournalLogPage() {
  return (
    <div className="page-stack">
      <section className="page-section journal-page__hero">
        <p className="eyebrow">Journal / Diario di bordo</p>
        <h1>Diario di bordo</h1>
        <p className="journal-page__lead">
          Questa sezione restera asciutta: appunti di strada, problemi reali, deviazioni e piccoli
          aggiornamenti. Nessun formato pesante, solo una traccia leggibile del viaggio.
        </p>
      </section>

      <section className="cta-section">
        <div className="button-row">
          <Link className="button button-secondary button-small" to="/journal">
            Torna a Journal
          </Link>
          <Link className="button button-secondary button-small" to="/route">
            Apri Roadbook
          </Link>
        </div>
      </section>
    </div>
  );
}
