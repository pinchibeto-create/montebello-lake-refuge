import { createFileRoute } from "@tanstack/react-router";
import { SeoGuidePage, makeSeoHead, type SeoPageConfig } from "@/components/SeoGuidePage";
import { photos } from "@/lib/photos";

const config: SeoPageConfig = {
  path: "/cabana-cristal-montebello",
  title: "Cabaña de Cristal en Montebello | Cinco Lagos",
  description: "Cabaña de cristal para dos personas en Lagunas de Montebello, Chiapas, con amplios ventanales frente al lago, baño privado y una estancia pensada para disfrutar el paisaje.",
  keywords: "cabaña de cristal Montebello, cabaña romántica Chiapas, cabaña para parejas Lagunas de Montebello, hospedaje frente al lago Chiapas",
  eyebrow: "Para dos personas",
  heading: "Una cabaña de cristal frente al lago en Montebello",
  intro: "La Cabaña Cristal está pensada para una estancia de dos personas en la que el paisaje entra al cuarto: dos paredes de cristal, cama junto a los ventanales y el lago como protagonista.",
  hero: photos.p09,
  sections: [
    {
      title: "El paisaje forma parte del cuarto",
      text: "La característica principal de esta cabaña son sus ventanales orientados hacia el lago. La idea no es aislarte del entorno, sino permitir que la luz, el agua y el bosque sean parte de la experiencia desde que despiertas.",
      bullets: [
        "Capacidad para 2 personas",
        "Dos paredes de cristal",
        "Vista hacia el lago",
        "Baño privado",
      ],
    },
    {
      title: "Una opción para viajar en pareja",
      text: "Si buscas una estancia tranquila, con poco equipaje y mucho tiempo para descansar, esta es la opción más íntima de Cinco Lagos. Funciona especialmente bien para escapadas de pareja o para quienes prefieren una cabaña pequeña con una relación directa con el paisaje.",
      bullets: [
        "Espacio pensado para dos",
        "Interior de madera",
        "Terraza exterior",
        "Acceso a la zona de Cinco Lagos",
      ],
    },
    {
      title: "Qué hacer durante la estancia",
      text: "Puedes combinar la cabaña con caminatas, fotografía, observación del paisaje y otras actividades disponibles dentro de Lagunas de Montebello. Si quieres conocer más lagos o visitar Chinkultic, conviene dejar tiempo suficiente y regresar antes de cerrar el día frente al agua.",
    },
  ],
  gallery: [photos.p09, photos.p10, photos.p11, photos.p12, photos.p27, photos.p01],
  faq: [
    {
      question: "¿Cuántas personas pueden hospedarse en la Cabaña Cristal?",
      answer: "La Cabaña Cristal está pensada para dos personas.",
    },
    {
      question: "¿La cabaña realmente tiene vista al lago?",
      answer: "Sí. Sus ventanales y terraza están orientados hacia el lago. Las fotografías de esta página corresponden a la cabaña real.",
    },
    {
      question: "¿Tiene baño privado?",
      answer: "Sí. La Cabaña Cristal cuenta con un cuarto y baño privado.",
    },
  ],
  related: [
    { href: "/cabanas-lagunas-de-montebello", label: "Todas las cabañas en Montebello" },
    { href: "/donde-hospedarse-lagunas-de-montebello", label: "Dónde hospedarse en Montebello" },
    { href: "/que-hacer-lagunas-de-montebello", label: "Qué hacer durante tu visita" },
    { href: "/como-llegar-a-lagunas-de-montebello", label: "Cómo llegar" },
    { href: "/chinkultic-y-montebello", label: "Combina Chinkultic y Montebello" },
  ],
  ctaTitle: "Consulta la Cabaña Cristal",
  ctaText: "Envíanos tus fechas por WhatsApp y te confirmamos disponibilidad para dos personas.",
  ctaMessage: "Hola, quiero consultar disponibilidad para la Cabaña Cristal de Cinco Lagos para dos personas.",
};

export const Route = createFileRoute("/cabana-cristal-montebello")({
  head: () => makeSeoHead(config),
  component: () => <SeoGuidePage config={config} />,
});
