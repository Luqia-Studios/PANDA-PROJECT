import { Link } from "react-router-dom";
import { journalGallery } from "../data/journalContent";

const archiveLayoutPattern = [
  "journal-photo-card--landscape",
  "journal-photo-card--portrait",
  "journal-photo-card--square",
  "journal-photo-card--landscape",
] as const;

export function JournalGalleryPage() {
  const [leadImage, ...restImages] = journalGallery;
  const spotlightImages = restImages.slice(0, 2);
  const archiveImages = restImages.slice(2);

  return (
    <div className="page-stack journal-page journal-photo-page">
      <section className="page-section journal-page__hero">
        <p className="eyebrow">Journal / Sezione 01</p>
        <h1>Foto</h1>
        <p className="journal-page__lead">
          Una galleria costruita per crescere nel tempo: i primi scatti stanno in evidenza, i
          prossimi entrano nell&apos;archivio senza rompere il layout.
        </p>
        <div className="journal-photo-page__stats">
          <article className="journal-photo-stat">
            <span>Archivio</span>
            <strong>{journalGallery.length} scatti</strong>
          </article>
          <article className="journal-photo-stat">
            <span>Stato</span>
            <strong>In aggiornamento</strong>
          </article>
          <article className="journal-photo-stat">
            <span>Uso</span>
            <strong>Nuovi upload pronti</strong>
          </article>
        </div>
        <div className="button-row">
          <Link className="button button-secondary button-small" to="/journal">
            Torna a Journal
          </Link>
        </div>
      </section>

      {leadImage ? (
        <section className="page-section journal-block">
          <div className="journal-photo-showcase">
            <figure className="journal-photo-card journal-photo-card--lead">
              <img alt={leadImage.alt} src={leadImage.src} />
            </figure>

            <div className="journal-photo-showcase__side">
              {spotlightImages.map((image, index) => (
                <figure
                  className={`journal-photo-card ${
                    index === 0
                      ? "journal-photo-card--stack-large"
                      : "journal-photo-card--stack-small"
                  }`}
                  key={image.src}
                >
                  <img alt={image.alt} src={image.src} />
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {archiveImages.length ? (
        <section className="page-section journal-block">
          <header className="journal-block__header">
            <p className="eyebrow">Archivio aperto</p>
            <h2>Galleria</h2>
            <p>Qui dentro entrano i prossimi scatti mantenendo la stessa struttura visiva.</p>
          </header>

          <div className="journal-photo-grid">
            {archiveImages.map((image, index) => (
              <figure
                className={`journal-photo-card ${archiveLayoutPattern[index % archiveLayoutPattern.length]}`}
                key={image.src}
              >
                <img alt={image.alt} src={image.src} />
              </figure>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
