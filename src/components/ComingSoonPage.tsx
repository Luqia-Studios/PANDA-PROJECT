import { Link } from "react-router-dom";

type ComingSoonPageProps = {
  eyebrow: string;
  backTo?: string;
  backLabel?: string;
};

export function ComingSoonPage({
  eyebrow,
  backTo,
  backLabel,
}: ComingSoonPageProps) {
  return (
    <div className="page-stack coming-soon-page">
      <section className="page-section coming-soon">
        <p className="eyebrow">{eyebrow}</p>
        <div className="coming-soon__pulse" aria-hidden="true">
          <span className="coming-soon__pulse-core" />
        </div>
        <h1>Coming soon</h1>
        {backTo && backLabel ? (
          <div className="button-row">
            <Link className="button button-secondary button-small" to={backTo}>
              {backLabel}
            </Link>
          </div>
        ) : null}
      </section>
    </div>
  );
}
