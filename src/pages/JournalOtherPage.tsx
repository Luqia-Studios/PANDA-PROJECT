import { Link } from "react-router-dom";
import { journalOther } from "../data/journalContent";

export function JournalOtherPage() {
  return (
    <div className="page-stack journal-page">
      <section className="page-section journal-page__hero">
        <p className="eyebrow">Journal / Sezione 03</p>
        <h1>Altro</h1>
        <p className="journal-page__lead">
          Tutto quello che completa il journal senza stare nella gallery o nel diario principale.
        </p>
        <div className="button-row">
          <Link className="button button-secondary button-small" to="/journal">
            Torna a Journal
          </Link>
        </div>
      </section>

      <section className="page-section journal-block">
        <div className="journal-other-grid">
          {journalOther.map((item) => (
            <article className="journal-other-card action-card" key={item.title}>
              <p className="eyebrow">{item.eyebrow}</p>
              <h3>{item.title}</h3>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
