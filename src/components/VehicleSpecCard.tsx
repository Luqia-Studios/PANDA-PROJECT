import type { VehicleSpec } from "../types/content";

type VehicleSpecCardProps = VehicleSpec;

export function VehicleSpecCard({
  label,
  value,
  note,
}: VehicleSpecCardProps) {
  return (
    <article className="spec-card">
      <p className="spec-label">{label}</p>
      <h3>{value}</h3>
      {note ? <p>{note}</p> : null}
    </article>
  );
}
