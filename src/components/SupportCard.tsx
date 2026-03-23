import { Link } from "react-router-dom";
import type { SupportItem } from "../types/content";

type SupportCardProps = SupportItem;

export function SupportCard({
  label,
  title,
  description,
  ctaLabel,
  to,
}: SupportCardProps) {
  return (
    <article className="support-card action-card">
      <p className="feature-label">{label}</p>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link className="button button-secondary button-small" to={to}>
        {ctaLabel}
      </Link>
    </article>
  );
}
