import { Link } from "react-router-dom";

type CTASectionProps = {
  eyebrow: string;
  title: string;
  text: string;
  primary: {
    label: string;
    to: string;
  };
  secondary?: {
    label: string;
    to: string;
  };
};

export function CTASection({
  eyebrow,
  title,
  text,
  primary,
  secondary,
}: CTASectionProps) {
  return (
    <section className="cta-section">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="button-row">
        <Link className="button button-primary" to={primary.to}>
          {primary.label}
        </Link>
        {secondary ? (
          <Link className="button button-secondary" to={secondary.to}>
            {secondary.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
