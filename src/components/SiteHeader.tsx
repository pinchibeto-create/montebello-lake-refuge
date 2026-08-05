import { useEffect, useState } from "react";
import logo from "@/assets/logo-cinco-lagos.jpeg.asset.json";
import { SITE, whatsappLink } from "@/lib/site";
import { IconWhatsapp } from "@/components/Icons";

const links = [
  { href: "#hospedaje", label: "Hospedaje" },
  { href: "#galeria", label: "Galería" },
  { href: "#servicios", label: "Servicios" },
  { href: "#ubicacion", label: "Ubicación" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-border bg-forest-deep/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <a href="#inicio" className="flex items-center gap-3">
          <img
            src={logo.url}
            alt="Cinco Lagos — cabañas en Montebello, Chiapas"
            className="h-10 w-10 rounded-sm object-cover md:h-11 md:w-11"
          />
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold uppercase tracking-[0.2em]">
              {SITE.name}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Montebello · Chiapas
            </span>
          </span>
        </a>

        <nav aria-label="Navegación principal" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-foreground/80 transition hover:text-turquoise"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-turquoise px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition hover:opacity-90 md:text-sm md:normal-case md:tracking-normal"
        >
          <IconWhatsapp className="h-4 w-4" />
          <span className="hidden sm:inline">Consulta disponibilidad</span>
          <span className="sm:hidden">Reservar</span>
        </a>
      </div>
    </header>
  );
}
