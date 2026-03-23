import type { ResourceItem } from "../types/content";

type ResourceCardProps = ResourceItem;

export function ResourceCard({
  category,
  title,
  description,
  bullets,
}: ResourceCardProps) {
  return (
    <article className="resource-card">
      <p className="resource-label">{category}</p>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul>
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  );
}
