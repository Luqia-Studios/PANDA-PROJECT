type SectionIntroProps = {
  kicker: string;
  title: string;
  text: string;
};

export function SectionIntro({ kicker, title, text }: SectionIntroProps) {
  return (
    <header className="section-intro">
      <p className="eyebrow">{kicker}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </header>
  );
}
