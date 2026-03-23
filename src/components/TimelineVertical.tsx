import type { TimelineItem } from "../types/content";

type TimelineVerticalProps = {
  items: TimelineItem[];
};

export function TimelineVertical({ items }: TimelineVerticalProps) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <article className={`timeline-item is-${item.status}`} key={item.phase}>
          <div className="timeline-marker">
            <span>{item.phase}</span>
          </div>
          <div className="timeline-body">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
