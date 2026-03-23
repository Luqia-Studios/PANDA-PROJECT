import { Link } from "react-router-dom";
import { SectionIntro } from "../components/SectionIntro";
import { TimelineVertical } from "../components/TimelineVertical";
import { VehicleSpecCard } from "../components/VehicleSpecCard";
import { pandaSpecs, timeline } from "../data/siteContent";

export function PandaPage() {
  return (
    <div className="page-stack">
      <section className="page-section">
        <SectionIntro
          kicker="Scheda rapida"
          title="Quattro coordinate utili"
          text="Pochi dati, ma abbastanza per leggere il mezzo."
        />
        <div className="card-grid">
          {pandaSpecs.map((item) => (
            <VehicleSpecCard key={item.label} {...item} />
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionIntro
          kicker="Timeline"
          title="Dall'idea alla strada"
          text="Last Update 20/03/2026."
        />
        <TimelineVertical items={timeline} />
      </section>

      <section className="cta-section">
        <div className="button-row">
          <Link className="button button-primary" to="/route">
            Apri Roadbook
          </Link>
          <Link className="button button-secondary" to="/journal">
            Apri Journal
          </Link>
        </div>
      </section>
    </div>
  );
}
