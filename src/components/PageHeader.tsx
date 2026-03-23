import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  image: string;
  status?: string;
  actions?: ReactNode;
  imageOnly?: boolean;
};

export function PageHeader({
  eyebrow,
  title,
  lead,
  image,
  status,
  actions,
  imageOnly = false,
}: PageHeaderProps) {
  return (
    <header className={`page-header${imageOnly ? " page-header--image-only" : ""}`}>
      <div className="page-header__image">
        <img src={image} alt={title} />
      </div>
      {!imageOnly ? (
        <div className="page-header__content">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1>{title}</h1>
          {lead ? <p>{lead}</p> : null}
          {status ? <span className="header-status">{status}</span> : null}
          {actions ? <div className="page-header__actions">{actions}</div> : null}
        </div>
      ) : null}
    </header>
  );
}
