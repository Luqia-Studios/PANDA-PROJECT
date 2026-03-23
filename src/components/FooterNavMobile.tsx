import { NavLink } from "react-router-dom";
import type { NavItem } from "../types/content";

type FooterNavMobileProps = {
  currentLabel: string;
  instagramUrl: string;
  isHome?: boolean;
  items: NavItem[];
  onMenuOpen: () => void;
};

export function FooterNavMobile({
  currentLabel,
  instagramUrl,
  isHome = false,
  items,
  onMenuOpen,
}: FooterNavMobileProps) {
  return (
    <nav
      className={`footer-nav${isHome ? " is-home" : ""}`}
      aria-label="Navigazione principale"
    >
      <div className="footer-nav__mobile-actions">
        <a
          aria-label="Apri Instagram"
          className="footer-nav__icon-link"
          href={instagramUrl}
          rel="noreferrer"
          target="_blank"
        >
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect height="16" rx="4" stroke="currentColor" strokeWidth="2" width="16" x="4" y="4" />
            <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
            <circle cx="17.5" cy="6.5" fill="currentColor" r="1.2" />
          </svg>
        </a>

        <button
          aria-label="Apri navigazione"
          className="footer-nav__toggle"
          onClick={onMenuOpen}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div aria-current="page" className="footer-nav__current">
        <span className="footer-nav__current-label">{currentLabel}</span>
      </div>

      <div className="footer-nav__desktop" aria-label="Sezioni principali">
        {items.map((item) => (
          <NavLink
            className={({ isActive }) =>
              `footer-nav__link${isActive ? " active" : ""}`
            }
            key={item.to}
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
