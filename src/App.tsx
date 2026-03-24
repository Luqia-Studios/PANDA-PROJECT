import { Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { FooterNavMobile } from "./components/FooterNavMobile";
import { MenuSheet } from "./components/MenuSheet";
import { menuNav, primaryNav } from "./data/siteContent";

const HomePage = lazy(() =>
  import("./pages/HomePage").then((module) => ({
    default: module.HomePage,
  })),
);
const PandaPage = lazy(() =>
  import("./pages/PandaPage").then((module) => ({
    default: module.PandaPage,
  })),
);
const RoutePage = lazy(() =>
  import("./pages/RoutePage").then((module) => ({
    default: module.RoutePage,
  })),
);
const JournalPage = lazy(() =>
  import("./pages/JournalPage").then((module) => ({
    default: module.JournalPage,
  })),
);
const JournalGalleryPage = lazy(() =>
  import("./pages/JournalGalleryPage").then((module) => ({
    default: module.JournalGalleryPage,
  })),
);
const JournalLogPage = lazy(() =>
  import("./pages/JournalLogPage").then((module) => ({
    default: module.JournalLogPage,
  })),
);
const JournalOtherPage = lazy(() =>
  import("./pages/JournalOtherPage").then((module) => ({
    default: module.JournalOtherPage,
  })),
);
const ContactPage = lazy(() =>
  import("./pages/ContactPage").then((module) => ({
    default: module.ContactPage,
  })),
);

const INSTAGRAM_URL = "https://www.instagram.com/lucaorlandi____/";
const CONTACT_NAV_ITEM = {
  label: "Contatti",
  to: "/contact",
  description: "Come scrivermi o proporre qualcosa.",
} as const;

const pageLabels: Record<string, string> = {
  "/": "Home",
  "/panda": "About",
  "/route": "Roadbook",
  "/journal": "Journal",
  "/journal/foto": "Foto",
  "/journal/diario": "Diario di bordo",
  "/journal/altro": "Altro",
  "/contact": "Contatti",
};

function getPrimarySection(pathname: string) {
  if (pathname.startsWith("/journal")) {
    return "/journal";
  }

  return primaryNav.find((item) => item.to === pathname)?.to ?? pathname;
}

function RouteLoader() {
  return (
    <div className="page-stack page-stack--loading">
      <section className="page-section page-loading">
        <p className="eyebrow">Loading</p>
      </section>
    </div>
  );
}

function AppShell() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = location.pathname === "/";
  const isRoadbook = location.pathname === "/route";
  const activePrimarySection = getPrimarySection(location.pathname);
  const currentLabel = pageLabels[location.pathname] ?? "Panda Project";
  const visiblePrimaryNav = primaryNav.filter(
    (item) => item.to !== activePrimarySection,
  );
  const menuPrimaryNav = location.pathname.startsWith("/journal")
    ? primaryNav
    : visiblePrimaryNav;
  const desktopNavItems =
    location.pathname === "/contact"
      ? visiblePrimaryNav
      : [...visiblePrimaryNav, CONTACT_NAV_ITEM];

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#content">
        Vai al contenuto
      </a>

      <MenuSheet
        currentLabel={currentLabel}
        onClose={() => setMenuOpen(false)}
        open={menuOpen}
        primaryItems={menuPrimaryNav}
        secondaryItems={menuNav}
      />
      <FooterNavMobile
        currentLabel={currentLabel}
        instagramUrl={INSTAGRAM_URL}
        isHome={isHome}
        items={desktopNavItems}
        onMenuOpen={() => setMenuOpen(true)}
      />

      <main
        className={`page-shell${isHome ? " page-shell--home" : ""}${isRoadbook ? " page-shell--roadbook" : ""}`}
        id="content"
      >
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<Navigate replace to="/panda" />} path="/project" />
            <Route element={<PandaPage />} path="/panda" />
            <Route element={<RoutePage />} path="/route" />
            <Route element={<Navigate replace to="/route" />} path="/live-map" />
            <Route element={<JournalPage />} path="/journal" />
            <Route element={<JournalGalleryPage />} path="/journal/foto" />
            <Route element={<JournalLogPage />} path="/journal/diario" />
            <Route element={<JournalOtherPage />} path="/journal/altro" />
            <Route
              element={<Navigate replace to="/journal/altro" />}
              path="/resources"
            />
            <Route element={<Navigate replace to="/contact" />} path="/support" />
            <Route
              element={<Navigate replace to="/contact" />}
              path="/partners"
            />
            <Route element={<ContactPage />} path="/contact" />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default function App() {
  return <AppShell />;
}
