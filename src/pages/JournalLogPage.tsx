import { Link } from "react-router-dom";
import { journalLog } from "../data/journalContent";

export function JournalLogPage() {
  return (
    <div className="page-stack journal-page">
      <section className="page-section journal-page__hero">
        <p className="eyebrow">Journal / Sezione 02</p>
        <h1>Diario di bordo</h1>
        <p className="journal-page__lead">
          Una lettura ordinata dei momenti che contano: lavoro, test e soglia verso la strada.
        </p>
        <div className="button-row">
          <Link className="button button-secondary button-small" to="/journal">
            Torna a Journal
          </Link>
        </div>
      </section>

      <section className="page-section journal-block">
        <div className="journal-log">
          {journalLog.map((entry, index) => (
            <details className="journal-log-item" key={entry.index} open={index === 0}>
              <summary className="journal-log-item__summary">
                <span className="journal-log-item__index">{entry.index}</span>
                <div className="journal-log-item__body">
                  <div className="journal-log-item__head">
                    <h3>{entry.title}</h3>
                    <span className="journal-log-item__toggle" aria-hidden="true" />
                  </div>
                </div>
              </summary>

              <div className="journal-log-item__content">
                <p className="journal-log-item__date">{entry.date}</p>
                <p className="journal-log-item__lead">{entry.note}</p>
                {entry.article.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
