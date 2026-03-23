import { Link } from "react-router-dom";
import type { LinkCard } from "../types/content";

type FeatureCardProps = LinkCard;

export function FeatureCard({ buttonLabel, title, to }: FeatureCardProps) {
  return (
    <Link className="feature-card feature-card--compact action-card" to={to}>
      <h3>{title}</h3>
      <span className="button button-secondary button-small feature-card__button">
        {buttonLabel ?? `Apri ${title}`}
      </span>
    </Link>
  );
}
