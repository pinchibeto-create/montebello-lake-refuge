import { createFileRoute } from "@tanstack/react-router";
import { SeoGuidePage, makeSeoHead, type SeoPageConfig } from "@/components/SeoGuidePage";
import { photos } from "@/lib/photos";

const config: SeoPageConfig = {
  path: "/cabanas-lagunas-de-montebello",
  title: "Cabañas en Lagunas de Montebello | Cinco Lagos",
  description: "Cabañas en Lagunas de Montebello, Chiapas, con opciones frente al lago para parejas, familias y grupos. Conoce Cinco Lagos y consulta disponibilidad por WhatsApp.",
  keywords: "cabañas Lagunas de Montebello, cabañas Montebello Chiapas, hospedaje Lagunas de Montebello, cabañas frente al lago Chiapas, Cinco Lagos",
  eyebrow: "Hospedaje en Montebello",
  heading: "Cabañas en Lagunas de Montebello para quedarte frente al paisaje",
  intro: "Cinco Lagos reúne cuatro formas de hospedarte en Montebello: desde una cabaña de cristal para dos hasta opciones familiares y para grupos. El lago no es una excursión desde aquí: forma parte de la estancia.",
  hero: photos.p01,
  sections: [
    {
      title: "Cuatro formas de hospedarte",
      text: "La elección depende de cuántas personas viajan y del tipo de experiencia que buscas. Las cabañas pequeñas funcionan muy bien para familias; la Cabaña Cristal está pensada para dos; y las cabañas Grande y Mayor permiten alojar grupos de hasta ocho personas.",
      bullets: [
        "Cabañas pequeñas: hasta 5 personas",
        "Cabaña Cristal: 2 personas",
        "Cabaña Grande: hasta 8 personas",
        "Cabaña Mayor: hasta 8 personas",
      ],
    },
    {
      title: "Dormir en Montebello cambia el viaje",
      text: "Quedarte en la zona te permite vivir el paisaje con otro ritmo. Puedes salir a explorar durante el día y regresar a descansar frente al agua, sin convertir Montebello únicamente en una parada rápida dentro de un recorrido más largo.",
      bullets: [
        "Tiempo para disfrutar el lago temprano y al final del día",
        "Más flexibilidad para combinar miradores, senderos y otras lagunas",
        "Regreso directo a tu cabaña después de explorar",
        "Una experiencia más tranquila que visitar y regresar el mismo día",
      ],
    },
    {
      title: "Lo que sí puedes esperar",
      text: "Cinco Lagos muestra fotografías reales del alojamiento para que puedas elegir con claridad. Las opciones cuentan con baño privado y distintos tipos de terraza o balcón; varias de ellas tienen vista directa al lago.",
      bullets: [
        "Fotografías reales de las cabañas",
        "Baño privado",
        "Agua caliente",
        "Estacionamiento",
        "Entorno natural en Lagunas de Montebello",
      ],
    },
  ],
  gallery: [photos.p01, photos.p02, photos.p09, photos.p22, photos.p14, photos.p27],
  faq: [
    {
      question: "¿Qué cabaña conviene si viajo en pareja?",
      answer: "La Cabaña Cristal tiene capacidad para dos personas y dos paredes de cristal orientadas hacia el lago. También puedes consultar otras opciones si prefieres más espacio.",
    },
    {
      question: "¿Hay cabañas para familias o grupos?",
      answer: "Sí. Las cabañas pequeñas alojan hasta cinco personas y las cabañas Grande y Mayor alojan hasta ocho personas, de acuerdo con su distribución.",
    },
    {
      question: "¿Cómo consulto disponibilidad?",
      answer: "Puedes enviar tus fechas y el número de personas por WhatsApp. El equipo de Cinco Lagos te confirma qué opciones están disponibles para tu estancia.",
    },
  ],
  related: [
    { href: "/cabana-cristal-montebello", label: "Cabaña Cristal para dos" },
    { href: "/cabanas-familiares-montebello", label: "Cabañas para familias y grupos" },
    { href: "/donde-hospedarse-lagunas-de-montebello", label: "Dónde hospedarse en Montebello" },
    { href: "/que-hacer-lagunas-de-montebello", label: "Qué hacer en Lagunas de Montebello" },
    { href: "/como-llegar-a-lagunas-de-montebello", label: "Cómo llegar a Montebello" },
    { href: "/chinkultic-y-montebello", label: "Chinkultic y Montebello" },
  ],
  ctaTitle: "Encuentra la cabaña para tus fechas",
  ctaText: "Dinos cuándo llegas, cuándo sales y cuántas personas viajan. Te decimos qué cabañas están disponibles.",
  ctaMessage: "Hola, quiero consultar cabañas disponibles en Lagunas de Montebello. ¿Me ayudan a elegir la mejor opción para mis fechas?",
};

export const Route = createFileRoute("/cabanas-lagunas-de-montebello")({
  head: () => makeSeoHead(config),
  component: () => <SeoGuidePage config={config} />,
});
